import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const outputRoot = path.resolve('.vercel/output');
const target = process.argv[2] ?? 'preview';
const token = process.env.VERCEL_TOKEN;
const project = process.env.VERCEL_PROJECT_ID;
const team = process.env.VERCEL_ORG_ID;

if (!['preview', 'staged-production'].includes(target)) {
  throw new Error('Target must be preview or staged-production.');
}
if (!token || !project || !team) {
  throw new Error('VERCEL_TOKEN, VERCEL_PROJECT_ID, and VERCEL_ORG_ID are required.');
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(absolute));
    else if (entry.isFile()) files.push(absolute);
  }
  return files;
}

async function api(endpoint, options = {}) {
  const url = new URL(endpoint, 'https://api.vercel.com');
  url.searchParams.set('teamId', team);
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Vercel API ${response.status} ${response.statusText}: ${detail}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

const paths = await walk(outputRoot);
if (paths.length === 0) throw new Error('No staged Vercel output was found.');

const files = [];
for (const absolute of paths) {
  const body = await readFile(absolute);
  const sha = createHash('sha1').update(body).digest('hex');
  const relative = path.relative(process.cwd(), absolute).split(path.sep).join('/');
  const size = (await stat(absolute)).size;
  await api('/v2/files', {
    method: 'POST',
    headers: {
      'content-type': 'application/octet-stream',
      'x-vercel-digest': sha,
    },
    body,
  });
  files.push({ file: relative, sha, size });
}

const deployment = await api('/v13/deployments', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    name: 'nexora-blueprint',
    project,
    files,
    target: target === 'staged-production' ? 'production' : undefined,
    projectSettings: { framework: null },
    meta: { blueprintArtifact: process.env.GITHUB_SHA ?? 'local' },
  }),
});

if (!deployment.url) throw new Error('Vercel did not return a deployment URL.');
process.stdout.write(`https://${deployment.url}\n`);
