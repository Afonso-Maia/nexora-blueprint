# Link, History, Journey, and Resilience Implementation

**Status:** Completed
**Date:** 2026-08-11

## Delivered outcome

One source-derived relationship graph now records headings, resolved outbound local references, and deterministic inbound backlinks for every authoritative document. The same graph blocks missing source targets and heading fragments and enforces successor records for deprecated or superseded documents. Canonical documents show their inbound authoritative references without changing source prose.

The publication adds clearly labelled generated or orientation views for guided journeys and Blueprint history. Seven manifest-driven journeys cover the approved overview, discovery, page thread, ADR chain, safe-purchase, portfolio, and publication-readiness paths. The portfolio path begins with the product promise, traverses phase order and one page/ADR chain, and ends with governance and readiness.

The history view presents changelog milestones and the complete ADR chronology as complementary source-linked records. A dedicated accessible 404 provides search and index-based recovery without guessing a redirect. Search failure and disabled-script states point to journeys, decisions, and coverage.

## Mechanical and browser evidence

- 1,159 local source references resolve to canonical documents and valid heading fragments at the time of this increment.
- Journey manifests require audience, purpose, reading scope, prerequisite, outcome, and valid canonical targets.
- Rendered validation covers all canonical and generated routes, internal links and fragments, landmark/H1 presence, artifact disclosure patterns, and initial size budgets.
- The production artifact builds 285 static pages and a 2.08 MiB Pagefind output at the time of this increment.
- Exact `ADR-0042` search returns status-visible results; `português` returns diacritic-aware results.
- At 390 CSS pixels the tested generated views have no document-level horizontal overflow; the wide coverage table is a labelled, focusable local scroll region.
- The coverage query `EVA-001` reports one of 89 pages and retains its canonical source deep link.
- The 404 has a unique H1 and four explicit recovery destinations.

## Resilience and presentation controls

Core content remains static HTML. Reduced-motion and forced-color adaptations, visible focus, narrow reflow, and theme-independent print rules are publication CSS contracts. Print removes navigation chrome, preserves source status context, expands external link destinations, avoids clipping where possible, and keeps tables as tables.

CI performs locked installation, source generation/validation, type checking, production build, rendered validation, security checks, dependency audit, deterministic archive creation, digesting, and bounded artifact retention.

## Remaining boundary

This completed increment does not close external or human sign-off gates. Provider/domain selection, real preview and production infrastructure, headers/TLS/DNS evidence, deployment/rollback/recovery rehearsal, named owner acceptance, assistive-technology review, disabled-user review, print-preview sign-off, and post-launch scheduling remain blocking items in [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md).

## References

- [Phase Navigation and Guided Journeys](07-phase-navigation-and-guided-journeys.md)
- [Cross-Reference and Related-Content Strategy](12-cross-reference-and-related-content-strategy.md)
- [Supersession, Archival, and Historical Continuity](16-supersession-archival-and-historical-continuity.md)
- [Changelog and Decision-History Presentation](17-changelog-and-decision-history-presentation.md)
- [Link Integrity, URL Durability, and Redirects](32-link-integrity-url-durability-and-redirects.md)
- [Performance Budgets and Resilience](40-performance-budgets-and-resilience.md)
