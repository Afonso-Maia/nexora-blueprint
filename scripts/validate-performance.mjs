import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const assetDirectory = path.join(dist, '_astro');
const failures = [];

const budgets = {
  artifactBytes: 40 * 1024 * 1024,
  htmlMaximumBytes: 450 * 1024,
  htmlP95Bytes: 225 * 1024,
  searchIndexBytes: 2.5 * 1024 * 1024,
  immutableAssetsBytes: 128 * 1024,
  cssTotalBytes: 96 * 1024,
  cssFileBytes: 64 * 1024,
  javascriptTotalBytes: 32 * 1024,
  javascriptFileBytes: 16 * 1024,
  fontTotalBytes: 0,
  rasterImageTotalBytes: 0,
};

async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(target));
    else result.push({ path: target, bytes: (await stat(target)).size });
  }
  return result;
}

function percentile(sorted, fraction) {
  return sorted[Math.max(0, Math.ceil(sorted.length * fraction) - 1)] ?? 0;
}

const files = await walk(dist);
const relative = (file) => path.relative(dist, file.path).split(path.sep).join('/');
const total = (selected) => selected.reduce((sum, file) => sum + file.bytes, 0);
const html = files.filter((file) => file.path.endsWith('.html')).sort((a, b) => a.bytes - b.bytes);
const assets = files.filter((file) => file.path.startsWith(`${assetDirectory}${path.sep}`));
const css = assets.filter((file) => file.path.endsWith('.css'));
const javascript = assets.filter((file) => file.path.endsWith('.js'));
const fonts = assets.filter((file) => /\.(?:woff2?|ttf|otf)$/i.test(file.path));
const rasterImages = files.filter((file) => /\.(?:avif|gif|jpe?g|png|webp)$/i.test(file.path));
const htmlSizes = html.map((file) => file.bytes);
const searchIndex = files.find((file) => relative(file) === 'search-index.json');

const measurements = {
  artifactBytes: total(files),
  htmlCount: html.length,
  htmlMedianBytes: percentile(htmlSizes, 0.5),
  htmlP95Bytes: percentile(htmlSizes, 0.95),
  htmlMaximumBytes: htmlSizes.at(-1) ?? 0,
  htmlMaximumPath: relative(html.at(-1) ?? { path: '' }),
  searchIndexBytes: searchIndex?.bytes ?? 0,
  immutableAssetsBytes: total(assets),
  cssTotalBytes: total(css),
  cssMaximumBytes: Math.max(0, ...css.map((file) => file.bytes)),
  javascriptTotalBytes: total(javascript),
  javascriptMaximumBytes: Math.max(0, ...javascript.map((file) => file.bytes)),
  fontTotalBytes: total(fonts),
  rasterImageTotalBytes: total(rasterImages),
};

for (const key of ['artifactBytes', 'htmlMaximumBytes', 'htmlP95Bytes', 'searchIndexBytes', 'immutableAssetsBytes', 'cssTotalBytes', 'javascriptTotalBytes', 'fontTotalBytes', 'rasterImageTotalBytes']) {
  if (measurements[key] > budgets[key]) failures.push(`${key} is ${measurements[key]} bytes; budget is ${budgets[key]}`);
}
if (measurements.cssMaximumBytes > budgets.cssFileBytes) failures.push(`largest CSS is ${measurements.cssMaximumBytes} bytes; per-file budget is ${budgets.cssFileBytes}`);
if (measurements.javascriptMaximumBytes > budgets.javascriptFileBytes) failures.push(`largest JavaScript is ${measurements.javascriptMaximumBytes} bytes; per-file budget is ${budgets.javascriptFileBytes}`);
if (!searchIndex) failures.push('search-index.json is missing');
for (const asset of assets) {
  if (!/\.[A-Za-z0-9_-]{5,}\.[a-z0-9]+$/i.test(path.basename(asset.path))) failures.push(`immutable asset lacks digest identity: ${relative(asset)}`);
}

const representativeRoutes = ['index.html', 'coverage/index.html', '03-product-structure/01-page-inventory/index.html'];
for (const route of representativeRoutes) {
  const file = files.find((candidate) => relative(candidate) === route);
  if (!file) failures.push(`representative resilient route is missing: ${route}`);
  else {
    const source = await readFile(file.path, 'utf8');
    if (!/<main\b/.test(source) || !/<h1\b/.test(source)) failures.push(`${route} lacks static main content and heading`);
    if (!source.includes('Authoritative source') && route !== 'coverage/index.html') failures.push(`${route} lacks static authority context`);
  }
}

await mkdir(path.join(root, '.astro'), { recursive: true });
await writeFile(path.join(root, '.astro/performance-report.json'), `${JSON.stringify({ schemaVersion: 1, budgets, measurements }, null, 2)}\n`);

if (failures.length) throw new Error(`Performance validation failed:\n- ${failures.join('\n- ')}`);
console.log(`Validated performance budgets: HTML p95 ${(measurements.htmlP95Bytes / 1024).toFixed(1)} KiB, largest HTML ${(measurements.htmlMaximumBytes / 1024).toFixed(1)} KiB, search ${(measurements.searchIndexBytes / 1024 / 1024).toFixed(2)} MiB, immutable assets ${(measurements.immutableAssetsBytes / 1024).toFixed(1)} KiB.`);
