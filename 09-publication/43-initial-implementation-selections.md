# Initial Publication Implementation Selections

**Status:** Approved
**Date:** 2026-08-09

## Purpose

Record the first controlled implementation selections required to begin the repository-native Blueprint publication without changing approved product truth or the Phase 7 publication architecture.

## Selections

| Concern | Initial selection | Control |
| --- | --- | --- |
| Runtime | Node.js 24 LTS, minimum 24.18.0 and below 25 | Pin the supported major line in `package.json` and `.nvmrc`; review before the line leaves LTS support. |
| Package manager | pnpm 10.18.3 | Pin through the `packageManager` field and commit one lockfile. |
| Site generator | Astro 7.2.0 | Pin exactly; upgrades require a reviewed build and rendered regression evidence. |
| Documentation framework | Astro Starlight 0.41.7 | Pin exactly with its compatible Astro peer range. |
| Image processing | Sharp 0.35.3 | Pin exactly as a build dependency; generated output is not authoritative. |
| Search | Build-generated static JSON index with a repository-owned Starlight search override | Keep queries local, expose status and authoritative paths in results, collect no behavioral analytics, and operate under the publication CSP without WebAssembly evaluation exceptions. This mechanically equivalent local implementation supersedes the initial Pagefind implementation choice without changing ADR-0041. |
| Analytics | None at launch | A later provider requires a separate privacy and governance selection. |
| Hosting | Deferred until the portable static artifact and preview workflow are proven | Compare candidates against the approved hosting, rollback, headers, preview, export, and recovery requirements. |
| Dependency updates | Reviewed, exact-version updates with a regenerated lockfile | Require validation, production build, representative rendered review, and rollback compatibility. |

## First implementation increment

The first increment proves that existing repository-root Markdown remains authoritative and produces deterministic canonical routes without a copied content tree. It includes representative root, phase, ADR, long-table, and technical documents; source and route validation; Starlight navigation; local search; and a reproducible static production build.

Broad metadata migration, custom visual components, hosting selection, public domain selection, analytics, and public launch remain outside this increment.

## References

- [Phase 7 Framing and Publication Architecture](01-framing-and-publication-architecture.md)
- [Build and Preview Workflow](35-build-and-preview-workflow.md)
- [Hosting, Domain, Redirects, and Availability](37-hosting-domain-redirects-and-availability.md)
- [Security, Dependency, and Supply-Chain Controls](39-security-dependency-and-supply-chain-controls.md)
- [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md)
