# Phase 7 Readiness Evidence Index

**Status:** In progress
**Date:** 2026-08-19

## Purpose

Provide the single evidence-led audit requested by the approved Phase 7 handoff. This index distinguishes completed gates from evidence that requires a person, final domain choice, or authority to change production state. It does not mark Phase 7 complete.

## Release identity

The pre-launch implementation version remains `0.1.0`. A release candidate is identified by its reviewed full Git commit, CI run, deterministic archive name, archive SHA-256 digest, and staged-tree SHA-256 digest. CI packages the source manifest, coverage report, performance report, recovery rehearsal, and readiness report with the exact static site and Vercel Build Output API tree.

## Evidence index

| Gate | State | Primary evidence |
| --- | --- | --- |
| One canonical route for every eligible source | Pass | Manifest and rendered validation in records 43, 46, and 51 |
| 89 pages and nine templates with complete mappings | Pass | Generated coverage explorer and `.astro/coverage-report.json` |
| Sequential ADR index with status and durable links | Pass | Generated decision index and manifest validation |
| Source, metadata, local link, anchor, generated-index, type, and build checks | Pass | Publication CI and records 43–46 |
| Authority, status, lifecycle, supersession, backlinks, and history | Pass | Records 44 and 46 plus rendered notices and indexes |
| Search, status context, privacy, no-script and unavailable-index recovery | Pass | Records 48 and 53 plus hosted evidence in record 45 |
| Guided phase navigation and approved portfolio journey | Pass | Generated `/journeys/` view and record 46 |
| Tables, diagrams, technical content, themes, errors, and landmarks | Automated and representative browser evidence pass | Records 50–52; manual assistive-technology scope remains below |
| Individual-document print | Pass | Records 49 and 55 |
| Security, dependency, public-repository privacy, headers, and asset budgets | Pass | CI audit, security validation, record 53, and hosted smoke evidence |
| CI, immutable packaging, availability monitoring, and artifact restoration | Pass for safe prerequisite scope | Records 56 and 57; production promotion and alias rollback remain below |
| Contribution, ownership, freshness, and incident intake | Pass | CODEOWNERS, issue forms, contribution guidance, and record 54 |
| Generated views remain non-authoritative and source-linked | Pass | Whole-site rendered validation and generated-view authority statements |

## Explicit blocking evidence

| Blocking gate | Why it cannot be completed autonomously | Narrow completion input |
| --- | --- | --- |
| Assistive technology and disabled-user validation | Self-certification cannot substitute for the approved screen-reader matrix, disabled-user review, and independent accessibility approval | Human reviewers perform and sign the protocol in record 45 |
| Full manual keyboard/focus, forced colors, and explicit browser zoom | The connected browser driver does not reliably produce the required whole-page Tab sequence or forced-color/zoom state | Human browser session records the protocol; any defects return to implementation |
| Constrained-network browser metrics | Static budgets pass, but accepted cold/warm LCP, CLS, and interaction evidence needs a reliable throttled browser lab or field source | Run and retain approved browser-lab evidence |
| Vercel engine enforcement | Vercel native builds still require the preview-only engine bypass despite the repository's correct Node 24.19 requirement | Provider supplies a conforming runtime or an approved exact-artifact path removes the rebuild |
| Exact-artifact production promotion and alias rollback | These mutate public production state and require explicit production authority | Approve the controlled rehearsal using a selected CI artifact and rollback candidate |
| Provider/DNS access and outage recovery | Account and final DNS state are external and operationally sensitive | Final domain exists and owner authorizes the rehearsal |
| Final hostname, launch date, indexing, and post-launch review | These are controlled business/launch values | Owner selects hostname and date, approves indexing, and schedules review |

## Machine-readable audit

`pnpm validate:readiness` requires every safe prerequisite artifact and emits `.astro/readiness-report.json`. It blocks regressions in coverage, recovery, or performance, reports each gate as `pass`, `blocked-human`, `blocked-external`, `blocked-authority`, or `blocked-user`, and keeps `readyForCompletion` false while any blocker remains. CI packages the report with every release candidate.

## Completion rule

Phase 7 and the root README remain “In progress.” They may change to completed only when every blocking row has accepted evidence, the machine-readable report has no blocked gates, a final release identity is recorded, production smoke and rollback pass, and the owner signs go/no-go with a post-launch review date.

## References

- [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md)
- [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md)
- [Provider Observability and Local Recovery Rehearsal](57-provider-observability-and-local-recovery-rehearsal.md)
