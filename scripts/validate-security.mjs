import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git','node_modules','.astro','.vercel','dist']);
async function files(directory) {
  const result=[];
  for (const entry of await readdir(directory,{withFileTypes:true})) {
    if (ignored.has(entry.name)) continue;
    const file=path.join(directory,entry.name);
    if(entry.isDirectory()) result.push(...await files(file)); else result.push(file);
  }
  return result;
}
const failures=[];
for(const file of await files(root)) {
  if((await stat(file)).size>2*1024*1024) continue;
  const source=await readFile(file,'utf8').catch(()=>null); if(source===null) continue;
  if(/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(source)) failures.push(`${path.relative(root,file)}: private key material`);
  if(/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/.test(source)) failures.push(`${path.relative(root,file)}: AWS credential-like value`);
  if(/<script\b|<iframe\b|javascript:/i.test(source) && file.endsWith('.md')) failures.push(`${path.relative(root,file)}: prohibited active Markdown content`);
  if(/!\[[^\]]*\]\(https?:\/\//i.test(source) && file.endsWith('.md')) failures.push(`${path.relative(root,file)}: remote-hotlinked Markdown asset`);
}
const lock=await readFile(path.join(root,'pnpm-lock.yaml'),'utf8');
if(!lock.includes('lockfileVersion:')) failures.push('pnpm-lock.yaml: missing lockfile identity');
const config=await readFile(path.join(root,'astro.config.mjs'),'utf8');
if(/analytics|gtag|segment|hotjar/i.test(config)) failures.push('astro.config.mjs: unapproved analytics reference');
if(failures.length) throw new Error(`Security validation failed:\n- ${failures.join('\n- ')}`);
console.log('Validated repository secret patterns, active Markdown, remote assets, lockfile presence, and analytics absence.');
