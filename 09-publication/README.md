# Phase 7 — Blueprint Publication and Documentation Experience

**Status:** In progress

Phase 7 transforms the approved Nexora Product Blueprint into a polished, accessible, maintainable documentation experience without changing approved product truth. Repository Markdown remains authoritative; the publication system supplies navigation, discovery, presentation, validation, and portfolio orientation.

## Approved decisions

1. [Framing and Publication Architecture](01-framing-and-publication-architecture.md) — approved; repository-native generated publication founded on Astro Starlight, deterministic routes, governed metadata, generated discovery, non-authoritative presentation, and integrated validation
2. [Publication Governance and Decision Rights](02-publication-governance-and-decision-rights.md) — approved; federated source authority with one Publication Steward and controlled exceptions
3. [Audiences and Reading Modes](03-audiences-and-reading-modes.md) — approved; orient, follow, and reference modes without audience-specific truth copies
4. [Documentation Information Architecture](04-documentation-information-architecture.md) — approved; source-aligned phases with generated decisions, indexes, mappings, and journeys
5. [Global Navigation and Section Hierarchy](05-global-navigation-and-section-hierarchy.md) — approved; shallow accessible navigation with equivalent mobile behavior
6. [Landing Page and Blueprint Orientation](06-landing-page-and-blueprint-orientation.md) — approved; restrained source-linked orientation without invented portfolio claims
7. [Phase Navigation and Guided Journeys](07-phase-navigation-and-guided-journeys.md) — approved; generated phase routes and optional manifest-driven reading journeys
8. [Decision and ADR Navigation](08-decision-and-adr-navigation.md) — approved; status-visible indexes, chronology, subjects, and supersession
9. [Page, Template, Capability, and Increment Navigation](09-page-template-capability-and-increment-navigation.md) — approved; mechanically connected coverage explorer
10. [Search Architecture](10-search-architecture.md) — approved; build-generated local search with identifier-first ranking and private queries
11. [Filtering and Discovery](11-filtering-and-discovery.md) — approved; governed source-backed facets and shareable accessible state
12. [Cross-Reference and Related-Content Strategy](12-cross-reference-and-related-content-strategy.md) — approved; explicit links, deterministic backlinks, and labelled relationships
13. [Content Taxonomy and Stable Identifiers](13-content-taxonomy-and-stable-identifiers.md) — approved; small controlled taxonomy with reserved publication identities
14. [Frontmatter and Metadata Schema](14-frontmatter-and-metadata-schema.md) — approved; incremental schema-driven metadata with derivation preferred
15. [Status, Authority, and Lifecycle Presentation](15-status-authority-and-lifecycle-presentation.md) — approved; text-visible status, source authority, and controlled-value treatment
16. [Supersession, Archival, and Historical Continuity](16-supersession-archival-and-historical-continuity.md) — approved; durable routes and visible historical context
17. [Changelog and Decision-History Presentation](17-changelog-and-decision-history-presentation.md) — approved; complementary milestone, ADR, and supporting Git provenance
18. [Diagram and Visualization Strategy](18-diagram-and-visualization-strategy.md) — approved; source-controlled accessible diagrams only where materially useful
19. [Table and Structured-Data Presentation](19-table-and-structured-data-presentation.md) — approved; semantic responsive tables and source-derived alternate views
20. [Page Inventory and Template-Mapping Experience](20-page-inventory-and-template-mapping-experience.md) — approved; generated 89-page and nine-template explorer with exact coverage
21. [Delivery Roadmap and Dependency Presentation](21-delivery-roadmap-and-dependency-presentation.md) — approved; outcome-led increments and accessible dependency views without invented dates
22. [Code, Schema, and Technical-Content Rendering](22-code-schema-and-technical-content-rendering.md) — approved; semantic resilient technical rendering and canonical-source links
23. [Responsive Documentation Experience](23-responsive-documentation-experience.md) — approved; content-led reflow with no information loss
24. [Accessibility and Assistive-Technology Conformance](24-accessibility-and-assistive-technology-conformance.md) — approved; blocking WCAG 2.2 AA layered evidence
25. [Publication-Language Strategy](25-publication-language-strategy.md) — approved; authoritative English source with preserved pt-BR product semantics and no partial mirror
26. [Theme, Typography, Color, and Brand Adaptation](26-theme-typography-color-and-brand-adaptation.md) — approved; restrained readable documentation-specific Nexora adaptation
27. [Light and Dark Theme Parity](27-light-and-dark-theme-parity.md) — approved; equivalent content and behavior across system, light, and dark modes
28. [Readability and Progressive Disclosure](28-readability-and-progressive-disclosure.md) — approved; complete long-form sources with bounded non-consequential disclosure
29. [Long-Document Navigation and Deep Linking](29-long-document-navigation-and-deep-linking.md) — approved; stable anchors, local contents, and native history behavior
30. [Print, Export, and Offline-Reading Boundaries](30-print-export-and-offline-reading-boundaries.md) — approved; document printing with broader export and offline products deferred
31. [Asset, Image, Diagram, and Media Governance](31-asset-image-diagram-and-media-governance.md) — approved; repository-governed accessible optimized assets
32. [Link Integrity, URL Durability, and Redirects](32-link-integrity-url-durability-and-redirects.md) — approved; canonical route contracts and blocking internal-link validation
33. [Markdown, MDX, and Component Governance](33-markdown-mdx-and-component-governance.md) — approved; Markdown-first authoring with a small allowlisted component layer
34. [Content Linting and Editorial Quality](34-content-linting-and-editorial-quality.md) — approved; layered mechanical, source-owner, and publication review
35. [Build and Preview Workflow](35-build-and-preview-workflow.md) — approved; one deterministic source-to-preview workflow
36. [CI/CD and Deployment Architecture](36-ci-cd-and-deployment-architecture.md) — approved; build-once immutable artifacts, short-lived identity, promotion, and rollback
37. [Hosting, Domain, Redirects, and Availability](37-hosting-domain-redirects-and-availability.md) — approved; provider-portable managed static hosting with exact selections controlled
38. [Search Analytics and Publication Privacy](38-search-analytics-and-publication-privacy.md) — approved; no behavioral analytics or third-party query collection at launch
39. [Security, Dependency, and Supply-Chain Controls](39-security-dependency-and-supply-chain-controls.md) — approved; pinned dependencies, isolated trust boundaries, CSP, provenance, and artifact inspection
40. [Performance Budgets and Resilience](40-performance-budgets-and-resilience.md) — approved; static resilient baseline with measured pre-launch budgets
41. [Contribution, Ownership, Maintenance, and Freshness](41-contribution-ownership-maintenance-and-freshness.md) — approved; source-first contribution, federated ownership, and risk-based freshness
42. [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md) — approved; evidence-led launch and completion gate

## Implementation records

- [Initial Publication Implementation Selections](43-initial-implementation-selections.md) — pinned Node.js, pnpm, Astro, Starlight, local search, dependency-update policy, and first-increment boundary
- [Status, Authority, and Generated Index Implementation](44-status-and-generated-index-implementation.md) — completed status/authority presentation and source-derived ADR and 89-page coverage views
- [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md) — in-progress controlled-value register, hosting comparison, owner roster, automated evidence, and launch/recovery procedures
- [Link, History, Journey, and Resilience Implementation](46-link-history-journey-and-resilience-implementation.md) — completed source-link graph, backlinks, lifecycle gate, guided journeys, history, 404, rendered validation, and resilient presentation increment
- [Vercel Hosting Selection and Deployment Preparation](47-vercel-hosting-selection-and-deployment-preparation.md) — approved Vercel selection, temporary provider hostname, native hosted-preview path, immutable-production gate, and remaining account-level evidence
- [CSP-Safe Local Search Implementation](48-csp-safe-local-search-implementation.md) — completed static search successor, CSP hardening, mechanical coverage gate, and hosted responsive interaction evidence
- [Individual-Document Print Identity Implementation](49-individual-document-print-identity-implementation.md) — completed canonical URL, status, source identity, stale-copy warning, and rendered coverage gate for authoritative documents
- [Accessible Table Presentation Implementation](50-accessible-table-presentation-implementation.md) — completed source-derived captions, explicit header scopes, print-visible captions, and rendered table validation
- [Rendered Accessibility Conformance Gate](51-rendered-accessibility-conformance-gate.md) — completed whole-site structural checks for language, landmarks, headings, IDs, names, dialogs, images, and SVG treatment
- [Accessible Text-Diagram Implementation](52-accessible-text-diagram-implementation.md) — completed derived labels, semantic groups, print-visible captions, and whole-site rendered validation for text diagrams
- [Performance, Asset, and Resilience Budget Implementation](53-performance-asset-and-resilience-budget-implementation.md) — completed controlled artifact, HTML, search, CSS, JavaScript, font, raster, digest-identity, and static-baseline gates
- [Contribution, Ownership, and Maintenance Implementation](54-contribution-ownership-and-maintenance-implementation.md) — completed single-maintainer routing, safe public incident intake, risk-based freshness intake, and mechanical preservation checks
- [Representative Print Validation Evidence](55-representative-print-validation-evidence.md) — completed short, long, tabular, diagram, and technical browser-print inspection with pagination corrections and rendered guards
- [Scheduled Availability Monitoring Implementation](56-scheduled-availability-monitoring-implementation.md) — completed six-hour secretless hosted smoke checks, retained diagnostics, and mechanical workflow controls
- [Provider Observability and Local Recovery Rehearsal](57-provider-observability-and-local-recovery-rehearsal.md) — completed live provider inspection, corruption detection, exact-tree restoration, and packaged recovery evidence

## Phase boundary

Phase 7 may improve access to approved content through publication information architecture, navigation, search, generated indexes, diagrams, presentation components, accessibility, responsive behavior, build and deployment controls, and maintenance governance.

It does not implement the Nexora commerce product or redefine canonical pages, templates, ownership, permissions, lifecycle semantics, Design System contracts, engineering boundaries, testing gates, delivery increments, or controlled legal, provider, staffing, capacity, retention, and launch values. A conflict returns to Blueprint governance.

## Architectural inputs

- [Product Roadmap](../00-overview/roadmap.md)
- [Phase 2B Validation](../03-product-structure/10-phase-2b-validation.md)
- [Phase 3 Validation](../04-design-system/27-phase-3-validation.md)
- [Phase 4 Validation and Implementation Handoff](../06-engineering/37-phase-4-validation-and-implementation-handoff.md)
- [Phase 5 Validation and Delivery-Roadmap Handoff](../07-testing/45-phase-5-validation-and-delivery-roadmap-handoff.md)
- [Phase 6 Validation and Implementation Handoff](../08-roadmap/43-phase-6-validation-and-implementation-handoff.md)
- [Documentation, Training, and Workforce Enablement](../08-roadmap/40-documentation-training-and-workforce-enablement.md)
- [ADR-0040](../adrs/ADR-0040-repository-native-blueprint-publication.md)
- [ADR-0041](../adrs/ADR-0041-local-private-documentation-search.md)
- [ADR-0042](../adrs/ADR-0042-authoritative-source-language-publication.md)
