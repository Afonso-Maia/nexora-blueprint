import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractStatus, loadAdrs, loadCoverage } from '../src/lib/blueprint-data.mjs';
import { journeys } from '../src/lib/journeys.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectories = ['00-overview','01-brand','02-information-architecture','03-product-structure','04-design-system','05-admin-dashboard','06-engineering','07-testing','08-roadmap','09-publication','adrs','product-decisions'];
const rootSources = ['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'assets/README.md'];
const generatedRoutes = new Set(['/coverage/', '/decisions/', '/history/', '/journeys/']);

async function markdownFiles(directory) {
  const entries = await readdir(path.join(repositoryRoot, directory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relative = path.posix.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(relative)));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(relative);
  }
  return files;
}

function canonicalRoute(sourcePath) {
  const stem = sourcePath.replace(/\.md$/i, '');
  if (stem === 'README') return '/';
  return `/${stem.replace(/(^|\/)README$/i, '')}/`.replace(/\/+/g, '/');
}

function githubSlug(value) {
  return value.toLowerCase().trim().replace(/<[^>]+>/g, '').replace(/\s+/g, '-').replace(/[^\p{L}\p{N}_-]/gu, '');
}

function headingsFrom(source, sourcePath) {
  const headings = [];
  const seen = new Map();
  let fenced = false;
  for (const line of source.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    const match = line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
    if (!match) continue;
    const title = match[2].replace(/\s+\{#[^}]+\}\s*$/, '').trim();
    const explicit = match[2].match(/\s+\{#([^}]+)\}\s*$/)?.[1];
    const base = explicit ?? githubSlug(title);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    headings.push({ depth: match[1].length, title, fragment: count ? `${base}-${count}` : base });
  }
  const titles = headings.filter(({ depth }) => depth === 1);
  if (titles.length !== 1) throw new Error(`${sourcePath}: expected exactly one level-one title, found ${titles.length}`);
  return headings;
}

function markdownLinks(source) {
  return [...source.matchAll(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g)].map(([, label, raw]) => ({
    label: label.trim(), target: raw.trim().replace(/^<|>$/g, ''),
  }));
}

function lifecycleFrom(source) {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const successor = source.match(/^(?:-\s*)?(?:\*\*)?(?:Superseded by|Successor):(?:\*\*)?\s*(.+)$/im)?.[1]?.trim() ?? frontmatter.match(/^supersededBy:\s*(.+)$/m)?.[1]?.trim();
  const supersedes = source.match(/^(?:-\s*)?(?:\*\*)?Supersedes:(?:\*\*)?\s*(.+)$/im)?.[1]?.trim() ?? frontmatter.match(/^supersedes:\s*(.+)$/m)?.[1]?.trim();
  return { successor, supersedes };
}

function lifecycleTarget(value, from) {
  if (!value) return null;
  const linked = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  const label = linked?.[1] ?? value.replace(/^['"]|['"]$/g, '');
  const target = linked?.[2] ?? label;
  const [pathname] = target.split('#', 1);
  let document;
  if (pathname.startsWith('/')) document = byRoute.get(pathname.endsWith('/') ? pathname : `${pathname}/`);
  else {
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(from.sourcePath), pathname));
    document = bySource.get(resolved);
  }
  if (!document) throw new Error(`${from.sourcePath}: lifecycle target does not resolve: ${value}`);
  return { label, href: document.canonicalRoute, sourcePath: document.sourcePath };
}

const sources = [...rootSources, ...(await Promise.all(sourceDirectories.map(markdownFiles))).flat()].sort();
const documents = [];
const bySource = new Map();
const byRoute = new Map();

for (const sourcePath of sources) {
  const source = await readFile(path.join(repositoryRoot, sourcePath), 'utf8');
  const headings = headingsFrom(source, sourcePath);
  const route = canonicalRoute(sourcePath);
  if (byRoute.has(route)) throw new Error(`Duplicate canonical route ${route}: ${byRoute.get(route).sourcePath}, ${sourcePath}`);
  const status = extractStatus(source);
  const document = { sourcePath, canonicalRoute: route, title: headings.find(({depth}) => depth === 1).title, status, headings, outbound: [], inbound: [], ...lifecycleFrom(source) };
  documents.push(document); bySource.set(sourcePath, document); byRoute.set(route, document);
}

for (const document of documents) {
  const source = await readFile(path.join(repositoryRoot, document.sourcePath), 'utf8');
  for (const link of markdownLinks(source)) {
    if (!link.label || /^(?:click here|here|read more)$/i.test(link.label)) throw new Error(`${document.sourcePath}: inaccessible link text “${link.label || '(empty)'}”`);
    if (/^(?:mailto:|https?:)/i.test(link.target)) continue;
    if (/^[a-z]+:/i.test(link.target)) throw new Error(`${document.sourcePath}: unsupported URL scheme: ${link.target}`);
    const [rawPathname, rawFragment] = link.target.split('#', 2);
    const fragment = rawFragment ? decodeURIComponent(rawFragment) : null;
    let targetDocument;
    if (!rawPathname) targetDocument = document;
    else if (rawPathname.startsWith('/')) {
      const route = rawPathname.endsWith('/') ? rawPathname : `${rawPathname}/`;
      if (generatedRoutes.has(route)) continue;
      targetDocument = byRoute.get(route);
    }
    else {
      const pathname = decodeURIComponent(rawPathname.split('?', 1)[0]);
      const resolved = path.resolve(repositoryRoot, path.dirname(document.sourcePath), pathname);
      if (!resolved.startsWith(`${repositoryRoot}${path.sep}`) && resolved !== repositoryRoot) throw new Error(`${document.sourcePath}: reference escapes repository: ${link.target}`);
      await access(resolved).catch(() => { throw new Error(`${document.sourcePath}: missing internal target: ${link.target}`); });
      if (pathname.toLowerCase().endsWith('.md')) targetDocument = bySource.get(path.relative(repositoryRoot, resolved).split(path.sep).join('/'));
    }
    if ((rawPathname?.toLowerCase().endsWith('.md') || rawPathname?.startsWith('/') || !rawPathname) && !targetDocument) throw new Error(`${document.sourcePath}: internal document is outside manifest: ${link.target}`);
    if (!targetDocument) continue;
    if (fragment && !targetDocument.headings.some((heading) => heading.fragment === fragment)) throw new Error(`${document.sourcePath}: missing heading fragment ${link.target}`);
    const href = `${targetDocument.canonicalRoute}${fragment ? `#${fragment}` : ''}`;
    document.outbound.push({ label: link.label, sourcePath: targetDocument.sourcePath, href });
    if (targetDocument !== document) targetDocument.inbound.push({ title: document.title, sourcePath: document.sourcePath, href: document.canonicalRoute });
  }
}

for (const journey of journeys) {
  if (!journey.audience || !journey.purpose || !journey.scope || !journey.prerequisite || !journey.outcome) throw new Error(`Journey ${journey.id}: incomplete manifest context`);
  for (const [label, href] of journey.steps) {
    if (!label || !href.startsWith('/')) throw new Error(`Journey ${journey.id}: invalid step`);
    const [route, fragment] = href.split('#', 2);
    if (generatedRoutes.has(route)) continue;
    const target = byRoute.get(route);
    if (!target) throw new Error(`Journey ${journey.id}: missing canonical target ${href}`);
    if (fragment && !target.headings.some((heading) => heading.fragment === fragment)) throw new Error(`Journey ${journey.id}: missing fragment ${href}`);
  }
}

for (const document of documents) {
  document.successor = lifecycleTarget(document.successor, document);
  document.supersedes = lifecycleTarget(document.supersedes, document);
  document.inbound = [...new Map(document.inbound.map((item) => [item.sourcePath, item])).values()].sort((a,b) => a.sourcePath.localeCompare(b.sourcePath));
  if (['Superseded','Deprecated'].includes(document.status) && !document.successor) throw new Error(`${document.sourcePath}: ${document.status} documents require a “Superseded by” or “Successor” record`);
}

for (const origin of documents) {
  const visited = new Set([origin.sourcePath]);
  let current = origin;
  while (current.successor) {
    if (visited.has(current.successor.sourcePath)) throw new Error(`${origin.sourcePath}: circular supersession chain`);
    visited.add(current.successor.sourcePath);
    current = bySource.get(current.successor.sourcePath);
  }
}

const outputDirectory = path.join(repositoryRoot, '.astro');
await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, 'blueprint-manifest.json'), `${JSON.stringify({ schemaVersion: 2, documentCount: documents.length, documents }, null, 2)}\n`);
const [adrs, coverage] = await Promise.all([loadAdrs(), loadCoverage()]);
await writeFile(path.join(outputDirectory, 'coverage-report.json'), `${JSON.stringify({ schemaVersion: 1, adrCount: adrs.length, pageCount: coverage.pages.length, templateCount: coverage.templateCount, pageIds: coverage.pages.map((page) => page.id) }, null, 2)}\n`);
console.log(`Validated ${documents.length} authoritative documents, ${adrs.length} ADRs, ${coverage.pages.length} pages, ${coverage.templateCount} templates, and ${documents.reduce((sum, item) => sum + item.outbound.length, 0)} resolved local links.`);
