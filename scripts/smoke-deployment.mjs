const origin = process.argv[2];
if (!origin || !origin.startsWith('https://')) throw new Error('Expected an HTTPS deployment origin');
const routes = ['/', '/journeys/', '/decisions/', '/coverage/', '/09-publication/42-publication-readiness-portfolio-journey-and-handoff/', '/404.html'];
for (const route of routes) {
  const response = await fetch(new URL(route, origin), { redirect: 'manual' });
  if (response.status !== 200) throw new Error(`${route}: expected 200, received ${response.status}`);
  const body = await response.text();
  if (!body.includes('<main') || !body.includes('<h1')) throw new Error(`${route}: missing rendered document landmarks`);
  if (!response.headers.get('content-security-policy')) throw new Error(`${route}: missing Content-Security-Policy`);
  if (!/noindex/i.test(response.headers.get('x-robots-tag') ?? '')) throw new Error(`${route}: preview-safe indexing header missing`);
}
const missing = await fetch(new URL('/publication-smoke-missing-route/', origin), { redirect: 'manual' });
if (missing.status !== 404 || !(await missing.text()).includes('Page not found')) throw new Error('Custom 404 behavior failed');
console.log(`Smoke-tested ${routes.length} routes, security headers, indexing isolation, and custom 404 at ${origin}.`);
