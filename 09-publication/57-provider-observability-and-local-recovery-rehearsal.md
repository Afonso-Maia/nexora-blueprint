# Provider Observability and Local Recovery Rehearsal

**Status:** Completed
**Date:** 2026-08-19

## Purpose

Record read-only provider evidence and the safe local portion of the approved recovery gate. This implementation does not promote, reassign, or roll back the production alias.

## Provider evidence

Vercel project `prj_mmkXuae2AINVg6NiQr0NtnigUq95` reports Node `24.x`, the temporary canonical and branch aliases, and latest deployment `dpl_8u3Dgmf74LgMdR3jTN68zjVvnoWY` READY from commit `720f16cd028846ffda97486a222b49a33499db16`. The deployment was built in `iad1`, has no alias error, and is a rollback candidate. Its immediate predecessor is also a rollback candidate.

Provider build logs prove locked pnpm 10.18.3 installation, 291 authoritative documents, 42 ADRs, 89 pages, nine templates, 1,216 resolved links, 296 rendered pages, and passing rendered and performance budgets. The build completed and deployed successfully. Vercel runtime-error aggregation found no errors in the preceding seven days; this static publication emitted no function or edge runtime log volume.

The live project still reports its framework as unset, despite the committed Astro configuration and successful static artifact. Native builds also retain the explicitly documented engine-enforcement bypass. Neither condition is represented as production acceptance.

## Recovery rehearsal

CI now runs a deterministic tree-integrity rehearsal after staging the Vercel Build Output API artifact. It:

1. inventories every staged path and content digest into a single SHA-256 tree identity;
2. verifies custom 404, immutable asset caching, Content-Security-Policy, and preview `noindex` controls;
3. copies the release into an isolated temporary baseline and active tree;
4. corrupts the active landing document and proves the digest mismatch is detected;
5. replaces the active tree from the baseline and requires exact digest restoration; and
6. deletes the temporary copies and writes `.astro/recovery-rehearsal-report.json`.

The report is packaged inside the same CI release archive as the built site and other generated evidence. Any missing control, undetected corruption, or non-identical restoration blocks packaging.

## Boundary

This proves artifact-level detection and restoration mechanics without changing public state. It does not prove Vercel alias reassignment, platform access recovery, DNS recovery, real outage timing, or a production rollback. Those operations remain blocked on explicit production authority and final domain ownership.

## References

- [CI/CD and Deployment Architecture](36-ci-cd-and-deployment-architecture.md)
- [Hosting, Domain, Redirects, and Availability](37-hosting-domain-redirects-and-availability.md)
- [Performance Budgets and Resilience](40-performance-budgets-and-resilience.md)
- [Vercel Hosting Selection and Deployment Preparation](47-vercel-hosting-selection-and-deployment-preparation.md)
