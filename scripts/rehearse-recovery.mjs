import { createHash } from 'node:crypto';
import { cp, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, '.vercel', 'output');
const reportPath = path.join(root, '.astro', 'recovery-rehearsal-report.json');

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(target)); else result.push(target);
  }
  return result;
}

async function treeDigest(directory) {
  const hash = createHash('sha256');
  const inventory = [];
  for (const file of await files(directory)) {
    const relative = path.relative(directory, file).split(path.sep).join('/');
    const contents = await readFile(file);
    const digest = createHash('sha256').update(contents).digest('hex');
    inventory.push({ path: relative, bytes: contents.length, digest });
    hash.update(`${relative}\0${contents.length}\0${digest}\n`);
  }
  return { digest: hash.digest('hex'), inventory };
}

const sourceTree = await treeDigest(source);
const config = JSON.parse(await readFile(path.join(source, 'config.json'), 'utf8'));
if (!config.routes?.some((route) => route.src === '/(.*)' && route.status === 404)) throw new Error('Recovery source lacks the custom 404 route');
if (!config.routes?.some((route) => route.src === '/_astro/(.*)' && route.headers?.['Cache-Control']?.includes('immutable'))) throw new Error('Recovery source lacks immutable asset caching');
if (!config.routes?.some((route) => route.headers?.['Content-Security-Policy'] && /noindex/.test(route.headers?.['X-Robots-Tag'] ?? ''))) throw new Error('Recovery source lacks security or preview-isolation headers');

const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'nexora-recovery-'));
const baseline = path.join(temporaryRoot, 'baseline');
const active = path.join(temporaryRoot, 'active');
let corruptionDetected = false;
let restoredTree;
try {
  await cp(source, baseline, { recursive: true });
  await cp(baseline, active, { recursive: true });
  const baselineTree = await treeDigest(baseline);
  if (baselineTree.digest !== sourceTree.digest) throw new Error('Baseline copy does not match the staged release tree');

  await writeFile(path.join(active, 'static', 'index.html'), '<!doctype html><title>corrupted recovery candidate</title>\n');
  corruptionDetected = (await treeDigest(active)).digest !== sourceTree.digest;
  if (!corruptionDetected) throw new Error('Release-tree corruption was not detected');

  await rm(active, { recursive: true, force: true });
  await cp(baseline, active, { recursive: true });
  restoredTree = await treeDigest(active);
  if (restoredTree.digest !== sourceTree.digest) throw new Error('Restored release tree does not match the approved baseline');
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

const report = {
  schemaVersion: 1,
  sourceTreeDigest: sourceTree.digest,
  restoredTreeDigest: restoredTree.digest,
  fileCount: sourceTree.inventory.length,
  totalBytes: sourceTree.inventory.reduce((sum, file) => sum + file.bytes, 0),
  corruptionDetected,
  restorationPassed: restoredTree.digest === sourceTree.digest,
  controls: ['custom-404', 'immutable-assets', 'content-security-policy', 'preview-noindex'],
};
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Rehearsed corruption detection and exact-tree restoration for ${report.fileCount} files (${report.sourceTreeDigest}).`);
