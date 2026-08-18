import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const manifest = JSON.parse(await readFile(path.join(root, '.astro/blueprint-manifest.json'), 'utf8'));
const failures = [];
const htmlByRoute = new Map();

async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(target)); else result.push(target);
  }
  return result;
}

for (const file of (await files(dist)).filter((file) => file.endsWith('.html'))) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '/' : `/${relative.replace(/index\.html$/, '')}`;
  htmlByRoute.set(route, { file, html: await readFile(file, 'utf8') });
}

for (const document of manifest.documents) if (!htmlByRoute.has(document.canonicalRoute)) failures.push(`Missing rendered route ${document.canonicalRoute}`);
for (const route of ['/404.html','/coverage/','/decisions/','/history/','/journeys/']) if (!htmlByRoute.has(route)) failures.push(`Missing required rendered route ${route}`);

for (const [route, page] of htmlByRoute) {
  const mainCount = [...page.html.matchAll(/<main[\s>]/g)].length;
  const h1Count = [...page.html.matchAll(/<h1[\s>]/g)].length;
  if (mainCount !== 1 || h1Count !== 1) failures.push(`${route}: expected one main landmark and one H1, found ${mainCount} and ${h1Count}`);
  if (!/<html\b[^>]*\blang="en"/.test(page.html)) failures.push(`${route}: missing authoritative source language`);
  const ids = [...page.html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) failures.push(`${route}: duplicate IDs ${duplicateIds.join(', ')}`);
  for (const image of page.html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(image[0])) failures.push(`${route}: image lacks alt text`);
  for (const dialog of page.html.matchAll(/<dialog\b([^>]*)>/g)) if (!/(aria-label=|aria-labelledby=)/.test(dialog[1])) failures.push(`${route}: dialog lacks an accessible name`);
  const withoutHiddenGraphics = page.html.replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, '');
  for (const graphic of withoutHiddenGraphics.matchAll(/<svg\b([^>]*)>/g)) if (!/(aria-hidden="true"|aria-label=|aria-labelledby=)/.test(graphic[1])) failures.push(`${route}: SVG is neither named nor hidden`);
  for (const button of page.html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const visibleText = button[2].replace(/<[^>]+>/g, '').trim();
    if (!visibleText && !/(aria-label=|aria-labelledby=|title=)/.test(button[1])) failures.push(`${route}: button lacks an accessible name`);
  }
  for (const link of page.html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const content = link[2].replace(/<[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/[^>]+>/g, '').replace(/<[^>]+>/g, '').trim();
    if (!content && !/(aria-label=|aria-labelledby=|title=)/.test(link[1])) failures.push(`${route}: link lacks an accessible name`);
  }
  const canonical = page.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical || !canonical.startsWith('https://nexora-blueprint.vercel.app/')) failures.push(`${route}: missing environment canonical URL`);
  if (page.html.includes(root) || /(?:API_KEY|SECRET|TOKEN)=/.test(page.html)) failures.push(`${route}: artifact exposes a private path or secret-like value`);
  for (const match of page.html.matchAll(/\shref="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:https?:|mailto:|data:|javascript:)/.test(href)) continue;
    const url = new URL(href, `https://nexora-blueprint.vercel.app${route}`);
    if (!url.pathname.startsWith('/')) continue;
    const targetRoute = url.pathname.endsWith('/') || url.pathname.endsWith('.html') ? url.pathname : `${url.pathname}/`;
    const target = htmlByRoute.get(targetRoute);
    if (!target && !/\.[a-z0-9]+$/i.test(url.pathname)) failures.push(`${route}: broken rendered route ${href}`);
    if (target && url.hash) {
      const targetIds = new Set([...target.html.matchAll(/\sid="([^"]+)"/g)].map((id) => id[1]));
      if (!targetIds.has(decodeURIComponent(url.hash.slice(1)))) failures.push(`${route}: broken rendered fragment ${href}`);
    }
  }
  if ((await stat(page.file)).size > 650 * 1024) failures.push(`${route}: HTML exceeds 650 KiB budget`);
  for (const table of page.html.matchAll(/<table\b[\s\S]*?<\/table>/g)) {
    if (!/<caption\b[^>]*>[^<]+<\/caption>/.test(table[0])) failures.push(`${route}: table lacks a non-empty caption`);
    for (const header of table[0].matchAll(/<th\b([^>]*)>/g)) if (!/\bscope="(?:col|row|colgroup|rowgroup)"/.test(header[1])) failures.push(`${route}: table header lacks explicit scope`);
  }
  for (const diagram of page.html.matchAll(/<pre\b[^>]*data-language="text"[\s\S]*?<\/pre>/g)) {
    const before = page.html.slice(Math.max(0, diagram.index - 400), diagram.index);
    const group = before.match(/<div\b[^>]*class="[^"]*\btext-diagram\b[^>]*role="group"[^>]*aria-labelledby="([^"]+)"[^>]*>[\s\S]*<p\b[^>]*id="([^"]+)"[^>]*class="[^"]*\bgenerated-diagram-caption\b[^>]*>[^<]+<\/p>[\s\S]*$/);
    if (!group || group[1] !== group[2]) failures.push(`${route}: text diagram lacks a consistently labelled group`);
  }
}

const searchRecovery = htmlByRoute.get('/coverage/')?.html ?? '';
if (!searchRecovery.includes('<noscript>') || !searchRecovery.includes('/journeys/')) failures.push('Search unavailable state lacks index recovery');
const notFound = htmlByRoute.get('/404.html')?.html ?? '';
for (const route of ['/journeys/','/decisions/','/coverage/']) if (!notFound.includes(`href="${route}"`)) failures.push(`404 lacks recovery route ${route}`);

for (const document of manifest.documents) {
  const rendered = htmlByRoute.get(document.canonicalRoute)?.html ?? '';
  if (!/class="[^"]*\bprint-identity\b/.test(rendered)) failures.push(`${document.canonicalRoute} lacks print identity`);
  if (!rendered.includes(`https://nexora-blueprint.vercel.app${document.canonicalRoute}`)) failures.push(`${document.canonicalRoute} lacks canonical print URL`);
  if (!rendered.includes('Printed or saved copies may be stale')) failures.push(`${document.canonicalRoute} lacks stale-copy warning`);
}

const searchIndexPath = path.join(dist, 'search-index.json');
let searchBytes = 0;
try {
  const searchIndex = JSON.parse(await readFile(searchIndexPath, 'utf8'));
  searchBytes = (await stat(searchIndexPath)).size;
  if (!Array.isArray(searchIndex) || searchIndex.length !== manifest.documents.length + 4) failures.push('Static search index has incorrect document coverage');
  for (const field of ['title', 'route', 'status', 'kind', 'sourcePath', 'text']) if (!Object.hasOwn(searchIndex[0] ?? {}, field)) failures.push(`Static search index lacks ${field}`);
} catch (error) {
  failures.push(`Static search index is missing or invalid: ${error.message}`);
}
if (searchBytes > 15 * 1024 * 1024) failures.push(`Static search index exceeds 15 MiB budget (${searchBytes} bytes)`);
if (failures.length) throw new Error(`Rendered validation failed:\n- ${failures.slice(0,50).join('\n- ')}${failures.length > 50 ? `\n- …and ${failures.length-50} more` : ''}`);
console.log(`Validated ${htmlByRoute.size} rendered pages, internal routes and fragments; static search is ${(searchBytes/1024/1024).toFixed(2)} MiB.`);
