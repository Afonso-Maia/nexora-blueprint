import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const output = path.join(root, '.vercel', 'output');
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'X-Robots-Tag': 'noindex, nofollow',
};
const config = {
  version: 3,
  framework: { version: 'astro@7.2.0' },
  routes: [
    { src: '/_astro/(.*)', headers: { ...securityHeaders, 'Cache-Control': 'public, max-age=31536000, immutable' }, continue: true },
    { src: '/(.*)', headers: { ...securityHeaders, 'Cache-Control': 'public, max-age=0, must-revalidate' }, continue: true },
    { src: '/pagefind/(.*)', headers: { 'Content-Security-Policy': "default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; connect-src 'self'; script-src 'self' 'wasm-unsafe-eval' 'unsafe-eval'" }, continue: true },
    { handle: 'filesystem' },
    { src: '/', dest: '/index.html' },
    { src: '/(.+)/', dest: '/$1/index.html' },
    { src: '/(.*)', dest: '/404.html', status: 404 },
  ],
};

if (!config.routes.some((route) => route.src === '/' && route.dest === '/index.html')) {
  throw new Error('Vercel output must route the publication root to /index.html.');
}

await readFile(path.join(dist, 'index.html'));
await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, 'static'), { recursive: true });
await cp(dist, path.join(output, 'static'), { recursive: true });
await writeFile(path.join(output, 'config.json'), `${JSON.stringify(config, null, 2)}\n`);
console.log('Staged validated static output in .vercel/output for prebuilt deployment.');
