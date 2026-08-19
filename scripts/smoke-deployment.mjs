import { writeFile } from 'node:fs/promises';

const origin = process.argv[2];
if (!origin || !origin.startsWith('https://')) throw new Error('Expected an HTTPS deployment origin');
const reportPath = process.env.SMOKE_REPORT_PATH;
const checks = [];
const routes = ['/', '/journeys/', '/decisions/', '/coverage/', '/09-publication/42-publication-readiness-portfolio-journey-and-handoff/', '/404.html'];
let failure;
try {
  for (const route of routes) {
    const response = await fetch(new URL(route, origin), { redirect: 'manual' });
    const body = await response.text();
    const assertions = {
      status: response.status === 200,
      landmarks: body.includes('<main') && body.includes('<h1'),
      csp: Boolean(response.headers.get('content-security-policy')),
      noindex: /noindex/i.test(response.headers.get('x-robots-tag') ?? ''),
    };
    checks.push({ route, status: response.status, assertions });
    if (!assertions.status) throw new Error(`${route}: expected 200, received ${response.status}`);
    if (!assertions.landmarks) throw new Error(`${route}: missing rendered document landmarks`);
    if (!assertions.csp) throw new Error(`${route}: missing Content-Security-Policy`);
    if (!assertions.noindex) throw new Error(`${route}: preview-safe indexing header missing`);
  }
  const missing = await fetch(new URL('/publication-smoke-missing-route/', origin), { redirect: 'manual' });
  const missingBody = await missing.text();
  checks.push({ route: '/publication-smoke-missing-route/', status: missing.status, assertions: { custom404: missing.status === 404 && missingBody.includes('Page not found') } });
  if (missing.status !== 404 || !missingBody.includes('Page not found')) throw new Error('Custom 404 behavior failed');
  const search = await fetch(new URL('/search-index.json', origin));
  const searchIndex = search.status === 200 ? await search.json() : null;
  checks.push({ route: '/search-index.json', status: search.status, assertions: { coverage: Array.isArray(searchIndex) && searchIndex.length >= 280 } });
  if (search.status !== 200) throw new Error(`Static search index returned ${search.status}`);
  if (!Array.isArray(searchIndex) || searchIndex.length < 280) throw new Error('Static search index failed');
} catch (error) {
  failure = error;
} finally {
  if (reportPath) await writeFile(reportPath, `${JSON.stringify({ origin, checkedAt: new Date().toISOString(), passed: !failure, checks, failure: failure?.message ?? null }, null, 2)}\n`);
}
if (failure) throw failure;
console.log(`Smoke-tested ${routes.length} routes, static search, security headers, indexing isolation, and custom 404 at ${origin}.`);
