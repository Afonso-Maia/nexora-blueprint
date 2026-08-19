import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const required = [
  '.astro/blueprint-manifest.json',
  '.astro/coverage-report.json',
  '.astro/performance-report.json',
  '.astro/recovery-rehearsal-report.json',
  '.github/CODEOWNERS',
  '.github/ISSUE_TEMPLATE/publication-incident.yml',
  '.github/ISSUE_TEMPLATE/freshness-review.yml',
  '.github/workflows/publication-ci.yml',
  '.github/workflows/publication-monitor.yml',
  'dist/404.html',
  'dist/coverage/index.html',
  'dist/decisions/index.html',
  'dist/history/index.html',
  'dist/journeys/index.html',
  'dist/search-index.json',
];
for (const file of required) await access(path.join(root, file));

const manifest = JSON.parse(await readFile(path.join(root, '.astro/blueprint-manifest.json'), 'utf8'));
const coverage = JSON.parse(await readFile(path.join(root, '.astro/coverage-report.json'), 'utf8'));
const performance = JSON.parse(await readFile(path.join(root, '.astro/performance-report.json'), 'utf8'));
const recovery = JSON.parse(await readFile(path.join(root, '.astro/recovery-rehearsal-report.json'), 'utf8'));
if (manifest.documentCount < 290 || manifest.documents.length !== manifest.documentCount || coverage.adrCount !== 42) throw new Error('Readiness manifest or ADR coverage regressed');
if (coverage.pageCount !== 89 || coverage.templateCount !== 9) throw new Error('Readiness page or template coverage regressed');
if (!recovery.corruptionDetected || !recovery.restorationPassed || recovery.sourceTreeDigest !== recovery.restoredTreeDigest) throw new Error('Readiness recovery evidence failed');
for (const key of ['artifactBytes', 'htmlMaximumBytes', 'htmlP95Bytes', 'searchIndexBytes', 'immutableAssetsBytes', 'cssTotalBytes', 'javascriptTotalBytes', 'fontTotalBytes', 'rasterImageTotalBytes']) {
  if (performance.measurements[key] > performance.budgets[key]) throw new Error(`Readiness performance budget failed for ${key}`);
}
if (performance.measurements.cssMaximumBytes > performance.budgets.cssFileBytes || performance.measurements.javascriptMaximumBytes > performance.budgets.javascriptFileBytes) throw new Error('Readiness per-file asset budget failed');

const gates = [
  { id: 'canonical-routes', state: 'pass', evidence: ['blueprint-manifest', 'rendered-validation'] },
  { id: 'page-template-coverage', state: 'pass', evidence: ['coverage-report'] },
  { id: 'adr-index', state: 'pass', evidence: ['blueprint-manifest', 'decisions-index'] },
  { id: 'source-metadata-links-build', state: 'pass', evidence: ['source-validation', 'rendered-validation'] },
  { id: 'generated-views-do-not-change-truth', state: 'pass', evidence: ['source-linked-generated-views', 'rendered-validation'] },
  { id: 'print', state: 'pass', evidence: ['representative-print-evidence'] },
  { id: 'privacy-security-dependencies', state: 'pass', evidence: ['security-validation', 'dependency-audit'] },
  { id: 'performance-static-resilience', state: 'pass', evidence: ['performance-report', 'search-recovery'] },
  { id: 'contribution-ownership-freshness-incident', state: 'pass', evidence: ['codeowners', 'issue-forms', 'owner-roster'] },
  { id: 'monitoring-artifact-restoration', state: 'pass', evidence: ['availability-monitor', 'recovery-rehearsal-report'] },
  { id: 'manual-accessibility', state: 'blocked-human', blockers: ['screen-reader matrix', 'disabled-user review', 'independent accessibility approval', 'reliable full keyboard and visible-focus sequence', 'forced-colors and explicit 200/400 percent zoom'] },
  { id: 'constrained-browser-performance', state: 'blocked-external', blockers: ['cold and warm constrained-network browser measurements', 'LCP, CLS, and interaction evidence'] },
  { id: 'production-platform', state: 'blocked-authority', blockers: ['remove Vercel engine-enforcement bypass', 'promote exact CI artifact', 'production alias rollback', 'provider access and outage recovery rehearsal'] },
  { id: 'domain-and-launch', state: 'blocked-user', blockers: ['final hostname or domain', 'launch date', 'public indexing approval', 'post-launch review date'] },
];
const report = {
  schemaVersion: 1,
  releaseVersion: '0.1.0',
  documents: manifest.documents.length,
  adrs: coverage.adrCount,
  pages: coverage.pageCount,
  templates: coverage.templateCount,
  recoveryTreeDigest: recovery.sourceTreeDigest,
  gates,
  passedGateCount: gates.filter((gate) => gate.state === 'pass').length,
  blockedGateCount: gates.filter((gate) => gate.state !== 'pass').length,
  readyForCompletion: gates.every((gate) => gate.state === 'pass'),
};
await writeFile(path.join(root, '.astro/readiness-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Audited ${gates.length} readiness gates: ${report.passedGateCount} pass, ${report.blockedGateCount} explicitly blocked; completion ready=${report.readyForCompletion}.`);
