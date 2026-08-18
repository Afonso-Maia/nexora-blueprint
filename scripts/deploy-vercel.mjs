import { execFile } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const outputRoot = path.resolve('.vercel/output');
const target = process.argv[2] ?? 'preview';
const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID;
const orgId = process.env.VERCEL_ORG_ID;

if (!['preview', 'staged-production'].includes(target)) {
  throw new Error('Target must be preview or staged-production.');
}
if (!token || !projectId || !orgId) {
  throw new Error('VERCEL_TOKEN, VERCEL_PROJECT_ID, and VERCEL_ORG_ID are required.');
}

await readFile(path.join(outputRoot, 'config.json'));
await readFile(path.join(outputRoot, 'static', 'index.html'));

await mkdir('.vercel', { recursive: true });
await writeFile(
  '.vercel/project.json',
  `${JSON.stringify({ orgId, projectId }, null, 2)}\n`,
  { mode: 0o600 },
);

const vercelBinary = path.resolve('node_modules/.bin/vercel');
const args = ['deploy', '--prebuilt', '--yes', '--token', token];
if (target === 'staged-production') args.push('--prod');

const { stdout, stderr } = await execFileAsync(vercelBinary, args, {
  env: { ...process.env, VERCEL_TELEMETRY_DISABLED: '1' },
  maxBuffer: 10 * 1024 * 1024,
});

const deploymentUrls = `${stdout}\n${stderr}`.match(/https:\/\/[^\s]+/g) ?? [];
const deploymentUrl = deploymentUrls.at(-1)?.replace(/[),.;]+$/, '');
if (!deploymentUrl) {
  throw new Error('Vercel CLI did not return a deployment URL.');
}

process.stdout.write(`${deploymentUrl}\n`);
