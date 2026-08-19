# Scheduled Availability Monitoring Implementation

**Status:** Completed
**Date:** 2026-08-19

## Purpose

Record the initial external availability monitor for the selected Vercel-hosted publication. This implementation record applies approved publication operations decisions; it does not set a launch service-level objective or replace provider observability.

## Implementation

GitHub Actions runs a secretless smoke test every six hours and on manual dispatch against the temporary canonical origin. The workflow has read-only repository permission, a five-minute timeout, concurrency cancellation, pinned Node 24.19.0, and no deployment credentials.

Publication workflows use the current Node 24 action majors: checkout v7, setup-node v7, upload-artifact v7, download-artifact v8 where needed, and pnpm/action-setup v6 where needed. This removes reliance on GitHub's temporary forced execution of Node 20 actions under Node 24.

Each run checks the landing page, generated journeys, decisions, coverage, the long Phase 7 readiness document, the directly addressable 404 document, a real missing route, the static search index, main and H1 landmarks, Content-Security-Policy, and preview-safe `noindex` headers. A timestamped JSON report records every completed assertion and the first failure. Reports upload even when the smoke step fails and retain for 14 days.

Repository security validation mechanically requires the scheduled workflow, diagnostic artifact, read-only permission, and absence of secret references. The same smoke script remains usable for isolated immutable deployment checks.

## Hosted evidence

Manual dispatch run `32213726794` passed from commit `7e5f464f0c7c61f89e393501326911dac8126684` using checkout v7, setup-node v7, and upload-artifact v7. It retained diagnostic artifact `9351624088` with GitHub-recorded digest `sha256:ccb51ce97eab876ee454acdad3ff4354094b89f2df15bd6d07ac94c41dd32a52` through 2026-09-02.

Publication CI run `32213718588` independently passed locked installation, source validation, Astro check, production build, rendered and performance checks, security validation, dependency audit, Vercel staging, deterministic packaging, digest generation, and artifact upload for the same commit. Artifact `9351632523` has GitHub-recorded digest `sha256:862606c407a50f771c052448c5ef6330e7fff3f9c0a1d8295ce0a797222dffc5` and the same retention boundary. Neither run emitted the superseded Node 20 action-runtime annotation.

## Operational boundary

GitHub-hosted monitoring is independent of Vercel execution but not of GitHub availability or the public Internet path used by GitHub runners. Alert routing is the failed workflow notification available to the sole maintainer. A second-network monitor, launch availability target, Vercel log review, and provider/DNS recovery rehearsal remain required before final launch acceptance.

The temporary origin remains intentionally non-indexed. When a final domain and launch approval exist, the smoke contract must separate production indexing expectations from preview isolation before removing `noindex`.

## References

- [CI/CD and Deployment Architecture](36-ci-cd-and-deployment-architecture.md)
- [Hosting, Domain, Redirects, and Availability](37-hosting-domain-redirects-and-availability.md)
- [Performance Budgets and Resilience](40-performance-budgets-and-resilience.md)
- [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md)
