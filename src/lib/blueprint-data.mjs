import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const repositoryRoot = path.resolve(process.cwd());

export const allowedStatuses = [
  'Proposed',
  'Approved',
  'Accepted',
  'Planned',
  'In progress',
  'Completed',
  'Superseded',
  'Deprecated',
];

export function extractStatus(source) {
  const value = source
    .match(/^(?:-\s*)?(?:\*\*)?Status:(?:\*\*)?\s*(.+)$/im)?.[1]
    ?.replaceAll('**', '')
    .trim();
  return allowedStatuses.find((status) => status.toLowerCase() === value?.toLowerCase()) ?? null;
}

export function statusVariant(status) {
  if (['Approved', 'Accepted', 'Completed'].includes(status)) return 'success';
  if (status === 'In progress') return 'note';
  if (status === 'Planned' || status === 'Proposed') return 'caution';
  if (status === 'Superseded' || status === 'Deprecated') return 'danger';
  return 'default';
}

export function parseMarkdownTable(source, heading) {
  const headingIndex = source.indexOf(heading);
  if (headingIndex < 0) throw new Error(`Missing source heading: ${heading}`);
  const lines = source.slice(headingIndex + heading.length).split('\n');
  const rows = [];
  let inTable = false;

  for (const line of lines) {
    if (!line.startsWith('|')) {
      if (inTable) break;
      continue;
    }
    const cells = line
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim());
    if (cells.every((cell) => /^:?-+:?$/.test(cell))) {
      inTable = true;
      continue;
    }
    if (inTable) rows.push(cells);
  }
  return rows;
}

export async function loadAdrs() {
  const directory = path.join(repositoryRoot, 'adrs');
  const files = (await readdir(directory))
    .filter((file) => /^ADR-\d{4}-.+\.md$/.test(file))
    .sort();

  const adrs = await Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(directory, file), 'utf8');
      const heading = source.match(/^#\s+(ADR-(\d{4}):\s*(.+))$/m);
      if (!heading) throw new Error(`Invalid ADR title: ${file}`);
      const references = [...source.matchAll(/\[([^\]]+)\]\((\.\.\/[^)]+\.md(?:#[^)]+)?)\)/g)].map(
        ([, label, target]) => ({ label, href: sourceLink('adrs', target) }),
      );
      return {
        id: `ADR-${heading[2]}`,
        number: Number(heading[2]),
        title: heading[3],
        status: extractStatus(source),
        date: source.match(/^(?:-\s*)?\*\*Date:\*\*\s*(.+)$/m)?.[1]?.trim() ?? null,
        route: `/adrs/${file.replace(/\.md$/, '')}/`,
        sourcePath: `adrs/${file}`,
        references,
      };
    }),
  );

  for (const [index, adr] of adrs.entries()) {
    const expectedNumber = index + 1;
    if (adr.number !== expectedNumber) {
      throw new Error(`ADR sequence gap: expected ADR-${String(expectedNumber).padStart(4, '0')}, found ${adr.id}`);
    }
    if (!adr.status) throw new Error(`${adr.id}: missing or invalid status`);
  }

  return adrs;
}

function sourceLink(fromDirectory, target) {
  const [pathname, fragment] = target.split('#', 2);
  const resolved = path.posix.normalize(path.posix.join(fromDirectory, pathname));
  const route = resolved
    .replace(/\.md$/, '')
    .replace(/(^|\/)README$/, '')
    .replace(/^/, '/')
    .replace(/\/$/, '');
  return `${route || '/'}${route ? '/' : ''}${fragment ? `#${fragment}` : ''}`;
}

function parsePageOwners(source) {
  const owners = new Map();
  const pattern = /^####\s+([A-Z]{3}-\d{3})\s+—\s+(.+)$([\s\S]*?)(?=^####\s+[A-Z]{3}-\d{3}\s+—|^###\s+|^##\s+|\z)/gm;
  for (const match of source.matchAll(pattern)) {
    const owner = match[3].match(/^- \*\*Ownership:\*\*\s*([^;\n]+)/m)?.[1]?.trim() ?? 'Not recorded';
    owners.set(match[1], { owner, inventoryAnchor: `${match[1].toLowerCase()}--${slug(match[2])}` });
  }
  return owners;
}

function slug(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function mapIdsByGroup(rows) {
  const result = new Map();
  for (const [group, , ids] of rows) {
    if (group.includes('Total')) continue;
    for (const id of ids.split(',').map((value) => value.trim())) result.set(id, group);
  }
  return result;
}

export async function loadCoverage() {
  const [designSource, inventorySource, engineeringSource, testingSource, roadmapSource] =
    await Promise.all([
      readFile(path.join(repositoryRoot, '04-design-system/26-page-to-system-mapping.md'), 'utf8'),
      readFile(path.join(repositoryRoot, '03-product-structure/01-page-inventory.md'), 'utf8'),
      readFile(path.join(repositoryRoot, '06-engineering/36-page-and-template-engineering-mapping.md'), 'utf8'),
      readFile(path.join(repositoryRoot, '07-testing/44-page-and-template-testing-mapping.md'), 'utf8'),
      readFile(path.join(repositoryRoot, '08-roadmap/42-increment-to-page-and-template-mapping.md'), 'utf8'),
    ]);

  const owners = parsePageOwners(inventorySource);
  const increments = mapIdsByGroup(parseMarkdownTable(roadmapSource, '## Complete canonical coverage'));
  const engineeringProfiles = new Map(
    parseMarkdownTable(engineeringSource, '## Template implementation profiles').map((row) => [
      row[0],
      { rendering: row[1], emphasis: row[2] },
    ]),
  );
  const testingProfiles = new Map(
    parseMarkdownTable(testingSource, '## Template evidence profiles').map((row) => [row[0], row[1]]),
  );
  const pages = [];
  let currentTemplate = null;

  for (const line of designSource.split('\n')) {
    const templateHeading = line.match(/^## (.+?) — \d+ pages$/);
    if (templateHeading) currentTemplate = templateHeading[1];
    const row = line.match(/^\| ([A-Z]{3}-\d{3}) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/);
    if (!row || !currentTemplate) continue;
    const owner = owners.get(row[1]);
    pages.push({
      id: row[1],
      name: row[2].trim(),
      template: currentTemplate,
      patterns: row[3].trim(),
      emphasis: row[4].trim(),
      owner: owner?.owner ?? 'Not recorded',
      inventoryHref: `/03-product-structure/01-page-inventory/#${owner?.inventoryAnchor ?? row[1].toLowerCase()}`,
      increment: increments.get(row[1]) ?? 'Not mapped',
      engineering: engineeringProfiles.get(currentTemplate),
      testing: testingProfiles.get(currentTemplate),
    });
  }

  const templateCount = new Set(pages.map((page) => page.template)).size;
  const ids = new Set(pages.map((page) => page.id));
  if (pages.length !== 89 || ids.size !== 89) {
    throw new Error(`Coverage must contain 89 unique pages; found ${pages.length} rows and ${ids.size} IDs`);
  }
  if (templateCount !== 9) throw new Error(`Coverage must contain nine templates; found ${templateCount}`);
  for (const page of pages) {
    if (page.increment === 'Not mapped') throw new Error(`${page.id}: missing primary delivery increment`);
    if (!page.engineering || !page.testing) throw new Error(`${page.id}: missing template profile coverage`);
  }

  return { pages, templateCount };
}
