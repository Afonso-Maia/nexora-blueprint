# CSP-Safe Local Search Implementation

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record the completed implementation amendment that preserves ADR-0041's private, build-generated local-search outcome without requiring WebAssembly evaluation exceptions. This is an implementation record subordinate to the approved publication architecture; it does not change authoritative product truth or approve public launch.

## Implementation

- Starlight's Pagefind integration is disabled and its search component is replaced through the documented component override.
- The build emits `/search-index.json` directly from the authoritative Astro content collection plus four clearly labelled generated orientation views.
- Every entry contains its title, canonical route, publication status where available, publication kind, authoritative repository path, and normalized searchable source text.
- Search ranking prioritizes exact titles, title prefixes, title matches, and repository-path matches before body matches. All query processing remains in the browser and no analytics or third-party request is introduced.
- The native dialog supplies an explicit label, live result count, keyboard shortcut, Escape and close behavior, focus return, empty-result guidance, status/source context, and generated recovery links.
- The publication CSP no longer contains `'wasm-unsafe-eval'` or `'unsafe-eval'`; the same policy is emitted by Vercel configuration, portable `_headers`, and staged Build Output API configuration.

## Mechanical evidence

- Source validation continues to prove routes, headings, local links and fragments, lifecycle relationships, mappings, and journey targets.
- Rendered validation requires one search entry per authoritative document plus the four generated views, checks every required field, enforces the 15 MiB budget, and requires no-script and unavailable-index recovery links.
- Deployment smoke validation fetches and parses the hosted index and blocks when its route or minimum coverage is unavailable.
- A client-local `?search-unavailable=1` resilience switch deterministically exercises the real failure branch without changing server state or transmitting a test value. The state announces the load failure, disables the unusable input, and preserves named links to journeys, decisions, and coverage. Rendered validation requires the switch and announcement to remain in the built client asset.
- Node 24.19.0 validation, Astro check, production build, security validation, Vercel staging, dependency audit, and whitespace validation passed before commit `c80e72d258b12bb3c277fba026711b4c0b07dff4`.

## Hosted evidence

Vercel deployment `dpl_2VdSf8FiuxenUYMkW1PwP85ekAUD` is correlated with commit `c80e72d258b12bb3c277fba026711b4c0b07dff4` and reached READY on the temporary canonical alias. Hosted smoke checks passed six representative routes, the static search index, defensive headers, indexing isolation, and custom 404 behavior.

Browser checks passed `ADR-0042` with `Accepted`, authoritative kind, and source-path context; the Portuguese term `português`; empty-result guidance; input focus and keyboard close with focus return; and 390 CSS-pixel reflow without horizontal document, dialog, or result overflow. A fresh browser tab emitted no console errors. The failure branch, its deterministic switch, and its three recovery destinations are mechanically present; hosted fault-injection browser evidence remains required after deployment.

## Boundary

This increment completes the search implementation successor. It does not waive manual assistive-technology review, unavailable-index fault injection, constrained-network measurements, the Vercel Node patch exception, immutable CI-artifact promotion, rollback/recovery rehearsal, named blocking owners, final domain selection, or launch approval.

## References

- [Search Architecture](10-search-architecture.md)
- [Search Analytics and Publication Privacy](38-search-analytics-and-publication-privacy.md)
- [Security, Dependency, and Supply-Chain Controls](39-security-dependency-and-supply-chain-controls.md)
- [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md)
- [Vercel Hosting Selection and Deployment Preparation](47-vercel-hosting-selection-and-deployment-preparation.md)
- [ADR-0041](../adrs/ADR-0041-local-private-documentation-search.md)
