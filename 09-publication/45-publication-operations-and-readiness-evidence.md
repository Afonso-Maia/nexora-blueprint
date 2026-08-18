# Publication Operations and Readiness Evidence

**Status:** In progress
**Date:** 2026-08-11

## Purpose

Record implementation evidence, controlled selections, ownership, and operational procedures for the repository-native publication. This is an implementation record subordinate to the approved Phase 7 decisions; it does not authorize public launch or change product truth.

## Local release identity

The reproducible release identity is the reviewed Git commit plus the SHA-256 digest of the CI-produced `nexora-blueprint-<commit>.tar.gz` artifact. Version `0.1.0` identifies the pre-launch publication implementation. CI retains the archive and digest for 14 days; release-snapshot retention remains unselected until a host and operating owner are approved.

## Controlled-value register

| Concern | Current value | State and control |
| --- | --- | --- |
| Runtime and publication dependencies | Recorded in [Initial Publication Implementation Selections](43-initial-implementation-selections.md) | Selected and exactly pinned |
| Search and analytics | Local Pagefind; no behavioral analytics | Selected for launch architecture; queries stay on-device |
| Workflow platform | GitHub Actions | Approved by Phase 4 and implemented for publication CI |
| Public hosting provider | Vercel | Selected for both Nexora repositories; this record and workflow apply only to the Blueprint repository |
| Public domain and base path | Temporary provider hostname `nexora-blueprint.vercel.app`; root base path | Custom hostname remains unselected; public indexing stays disabled until final domain and launch approval |
| Launch date | Not selected | Public indexing remains disabled |
| Performance budgets | 650 KiB maximum per rendered HTML document; 15 MiB total Pagefind output | Initial measured blocking budgets; revisit from hosted constrained-network evidence |
| Availability and recovery targets | Not selected | Define with provider capability and named operational owner |
| Vercel preview build runtime | Provider Node 24 currently resolves to `24.15.0` | Below repository minimum `24.18.0`; provider-only engine enforcement bypass is allowed for non-indexed evidence, never release acceptance |
| Release archive retention | Not selected | CI preview artifacts retain for 14 days only |
| Post-launch review | Not scheduled | Set relative to approved launch date |

## Hosting comparison

The portable `dist/` artifact and `_headers` contract were evaluated against provider capabilities. Cost, contractual privacy terms, support, account ownership, regional measurements, and hands-on recovery evidence require an account-level evaluation before selection.

| Candidate | Build-once artifact | Preview isolation | Headers and redirects | Promotion and rollback | Portability and concern |
| --- | --- | --- | --- | --- | --- |
| Cloudflare Pages | Direct Upload accepts prebuilt assets | Branch previews are supported; access policy requires configuration | Repository `_headers` and `_redirects` are supported | Production deployments can be rolled back, but preview deployments are not rollback targets | Strong static fit and export path; exact identity model, plan, logs, privacy terms, and account ownership remain to be verified |
| Vercel | CLI/API can create deployments from file hashes | Separate Preview and Production environments; previews receive `noindex` by default | Platform configuration supports response headers and redirects | Existing deployments can be promoted without rebuilding; rollback depth depends on plan | Strong preview/promotion model; plan-dependent rollback and provider configuration reduce repository portability |
| GitHub Pages | Actions uploads a prebuilt Pages artifact | Environment protection exists, but per-pull-request preview isolation is not native-equivalent | Custom response-header control and general redirect handling are insufficient for the approved gate | Artifact deployment is supported; first-class instant rollback is weaker | Lowest workflow complexity but does not satisfy the full headers, preview, and rollback contract without another edge layer |

Capability references: [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), [Cloudflare redirects](https://developers.cloudflare.com/pages/configuration/redirects/), [Cloudflare rollback](https://developers.cloudflare.com/pages/configuration/rollbacks/), [Vercel deployments](https://vercel.com/docs/deployments/overview), [Vercel promotion](https://vercel.com/docs/deployments/promoting-a-deployment), [Vercel rollback](https://vercel.com/docs/instant-rollback), and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Vercel is selected. Native Vercel Git deployment is the active non-indexed hosted-preview path, using the committed source, locked dependency graph, Node 24, and repository build command. The independently packaged CI artifact remains the required production release candidate; native preview evidence does not waive the approved build-once promotion gate. Cloudflare Pages remains the documented exit candidate if Vercel ceases to satisfy the gate.

## Vercel deployment control

CI stages `dist/` as `.vercel/output/static`, generates Build Output API version 3 routing and header configuration, and packages both from the same validated build. The connected Vercel project separately builds Git revisions for hosted preview evidence using settings committed in `vercel.json`. Preview acceptance requires correlating the deployment with its Git SHA and running canonical-route, generated-view, CSP, indexing-isolation, search, asset, and custom-404 checks.

Native Vercel Git preview does not consume GitHub deployment secrets. The existing environment-protected `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` values remain quarantined while the exact-artifact production mechanism is unresolved. Vercel does not currently document GitHub-issued OIDC as CLI deployment authentication; any future token-based promotion is an owned exception to the preferred short-lived workload-identity posture and must be least-privilege, rotated, or replaced when supported federation exists.

## Owner roster

| Scope | Accountable role | Responsibilities | Current named assignee |
| --- | --- | --- | --- |
| Publication framework, generation, CI, and release integrity | Publication Steward | Route coverage, generated correctness, previews, release evidence, and rollback | Unassigned |
| Source meaning and status | Repository section owner | Correctness, authority, supersession, and risk-based freshness | Derived from the repository section; named roster pending |
| Accessibility gate | Accessibility owner | WCAG evidence, exception approval, assistive-technology and disabled-user review | Unassigned |
| Security and privacy gate | Security/privacy owner | Dependency, artifact, CSP, preview, and incident review | Unassigned |
| Domain, DNS, and provider recovery | Platform operations owner | Least privilege, TLS, DNS, logs, monitoring, rollback, and account recovery | Unassigned |

Unassigned blocking roles prevent go-live even when automation passes.

## Implemented automated evidence

- Source validation proves one route for every eligible document, a gap-free 42-ADR sequence, 89 unique pages, nine templates, complete cross-phase mapping, resolved local targets and fragments, journey targets, and lifecycle successor requirements.
- The manifest records headings, outbound links, deterministic backlinks, status, and lifecycle fields.
- Astro type checking, static production build, Pagefind generation, and rendered route/fragment validation are blocking.
- Rendered inspection checks required pages, landmarks, heading presence, private-path and secret-like output, per-document HTML size, and aggregate search size.
- Security inspection checks common secret patterns, active Markdown, remote-hotlinked Markdown assets, lockfile identity, and analytics absence. CI additionally runs the package-manager vulnerability audit.
- CI uses locked installation, read-only repository permission, immutable artifact packaging, a digest, concurrency control, and bounded retention.

## Manual evidence protocol

Record browser/version, operating system, viewport or zoom, theme, input/assistive technology, route, result, reviewer, and date. Blocking coverage includes:

1. landing, canonical short/long/table/code documents, all generated views, and 404;
2. keyboard-only skip link, global and mobile navigation, search dialog, filters, details, links, focus return, and no traps;
3. VoiceOver with Safari and one second approved browser/screen-reader pairing;
4. light, dark, system, forced-colors where supported, and reduced motion;
5. 200% and 400% zoom plus 320 CSS-pixel reflow without two-dimensional page scrolling;
6. search identifiers, Portuguese terms, empty results, deep links, status context, and blocked-Pagefind recovery through indexes;
7. short, long, tabular, diagram-heavy, and code-heavy print previews with visible status and canonical identity; and
8. disabled-user review for navigation, search, and generated interactive views.

Automation does not satisfy the assistive-technology or disabled-user gates by itself. Findings use the repository issue workflow with impact, owner, workaround, target date, and closure evidence.

## Deployment, smoke, rollback, and recovery procedure

1. Build once in CI, validate, package, and record the commit and SHA-256 digest.
2. Deploy the exact archive to an isolated non-indexable preview using short-lived least-privilege identity.
3. Smoke-test `/`, `/journeys/`, `/decisions/`, `/coverage/`, a long canonical document, a heading deep link, search, assets, headers, robots, and `/404` with the real preview origin.
4. Approve the same artifact for production; do not rebuild dependencies during promotion.
5. Confirm TLS, canonical origin, sitemap, redirects, cache headers, no unintended telemetry, and monitoring from a second network.
6. On a blocking regression, reassign the production origin to the last approved digest, repeat smoke checks, and open an incident record.
7. Quarterly after launch, rehearse provider access recovery, artifact redeployment, DNS recovery, and rollback; record elapsed recovery and gaps.

The Vercel project, Git connection, Node version, build settings, and temporary hostname are configured. Hosted preview checks begin with the next `main` deployment. Exact-artifact promotion, rollback, and recovery cannot be accepted until the production mechanism and blocking owners are assigned.

## Incident and freshness process

Publication incidents are classified by authority/correctness, access, accessibility, security/privacy, route integrity, or availability. The relevant blocking owner and Publication Steward assess exposure, preserve evidence, choose rollback or correction, communicate status through the approved repository channel, verify recovery, and record prevention work. Never rewrite historical decisions to conceal an incident.

Source owners review high-consequence content on their governed cadence. Automation reports broken links, unsupported dependencies, expired exceptions, and release failures; it does not approve changes. Git timestamps remain provenance rather than freshness claims.

## Known limitations and open blocking evidence

- The temporary `nexora-blueprint.vercel.app` origin has not yet been verified against a native Git build containing the complete reviewed publication.
- Vercel Git integration, project settings, and protected deployment values are configured. Hosted route evidence, provider logs, custom DNS, and an external monitor are not yet accepted.
- Vercel's Node 24 build image supplied `24.15.0` on the first native build, below the approved repository minimum. The preview-only engine-enforcement exception blocks production acceptance until removed.
- Provider-specific preview, immutable promotion, smoke, rollback, outage fallback, and access-recovery rehearsals are pending.
- Named publication, accessibility, security/privacy, and platform-operations assignees are pending.
- Manual screen-reader, forced-color, zoom/reflow, print, constrained-network, search-failure, and disabled-user evidence is not yet signed off.
- No post-launch review date can be set before a launch date exists.
- Whole-Blueprint PDF, EPUB, offline application, guaranteed offline search, and bilingual mirror remain explicitly outside the approved initial boundary.

These items block Phase 7 completion and public launch; they are not silently waived.

## References

- [CI/CD and Deployment Architecture](36-ci-cd-and-deployment-architecture.md)
- [Hosting, Domain, Redirects, and Availability](37-hosting-domain-redirects-and-availability.md)
- [Security, Dependency, and Supply-Chain Controls](39-security-dependency-and-supply-chain-controls.md)
- [Performance Budgets and Resilience](40-performance-budgets-and-resilience.md)
- [Contribution, Ownership, Maintenance, and Freshness](41-contribution-ownership-maintenance-and-freshness.md)
- [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md)
