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
  if (!/<main[\s>]/.test(page.html) || !/<h1[\s>]/.test(page.html)) failures.push(`${route}: missing main landmark or H1`);
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
}

const searchRecovery = htmlByRoute.get('/coverage/')?.html ?? '';
if (!searchRecovery.includes('<noscript>') || !searchRecovery.includes('/journeys/')) failures.push('Search unavailable state lacks index recovery');
const notFound = htmlByRoute.get('/404.html')?.html ?? '';
for (const route of ['/journeys/','/decisions/','/coverage/']) if (!notFound.includes(`href="${route}"`)) failures.push(`404 lacks recovery route ${route}`);

const allFiles = await files(dist);
const searchBytes = (await Promise.all(allFiles.filter((file)=>file.includes('/pagefind/')).map(async(file)=>(await stat(file)).size))).reduce((a,b)=>a+b,0);
if (searchBytes > 15 * 1024 * 1024) failures.push(`Pagefind exceeds 15 MiB budget (${searchBytes} bytes)`);
if (failures.length) throw new Error(`Rendered validation failed:\n- ${failures.slice(0,50).join('\n- ')}${failures.length > 50 ? `\n- …and ${failures.length-50} more` : ''}`);
console.log(`Validated ${htmlByRoute.size} rendered pages, internal routes and fragments; Pagefind is ${(searchBytes/1024/1024).toFixed(2)} MiB.`);
