# Phase 7 Framing and Publication Architecture

**Status:** Approved

## Purpose

Define the authority boundary, publication architecture, technology direction, route and metadata model, validation obligations, and completion criteria for Phase 7.

## Decision

Publish the Blueprint through a **repository-native generated documentation site**. Existing repository Markdown remains the sole authoritative content layer. The publication system reads those files directly and adds only governed metadata, generated indexes, navigation, presentation components, publication configuration, and validation required for an accessible documentation experience.

Use Astro Starlight as the approved publication foundation. This selects the framework family and documentation model, not an exact Astro or Starlight version, hosting provider, domain, analytics service, search implementation, or publication date.

Phase 7 may add non-authoritative orientation material when it is clearly identified, derived where practical, and linked to the authoritative source documents. It may not create a parallel curated copy of approved Blueprint truth.

## Mission

Make the complete Blueprint understandable, discoverable, traceable, and credible to product, design, engineering, quality, operations, and portfolio audiences while preserving its approved authority and maintenance model.

## Principles

1. Preserve one authoritative source for every decision.
2. Make authority, status, ownership, provenance, and supersession visible.
3. Generate repeated indexes and coverage views from stable source data.
4. Optimize for long-form reading without hiding technical detail.
5. Treat accessibility, responsive behavior, themes, links, and search as publication contracts.
6. Prefer durable web standards and restrained components over decorative infrastructure.
7. Keep controlled implementation selections separate from approved publication strategy.
8. Fail the publication workflow when authority, coverage, or reference integrity cannot be proven.

## Viable approaches considered

### Repository-native generated documentation site

Generate the published experience directly from the authoritative Markdown. Add governed metadata and publication components without duplicating approved prose.

This approach provides strong traceability, mechanically provable coverage, lower small-team maintenance cost, and low divergence risk. Editorial flexibility is bounded by the need to preserve source identity and meaning.

### Curated publication layer

Keep the Blueprint as internal authority while maintaining a second content layer optimized for narrative and portfolio presentation.

This approach offers greater editorial freedom but requires synchronization, creates additional review paths, weakens direct ADR and decision traceability, and makes omissions or stale summaries more likely as the Blueprint grows.

The curated publication layer is rejected as the governing architecture. Its useful qualities are retained through non-authoritative orientation pages and generated views that point to authoritative sources.

## Authority model

The following remain authoritative:

- repository Markdown and its Git history;
- approved document statuses and phase boundaries;
- canonical page IDs, archetypes, templates, mappings, and ownership;
- ADR identities, statuses, decisions, and supersession relationships;
- Product, Design System, engineering, testing, and delivery contracts; and
- recorded controlled-value boundaries.

The following remain non-authoritative projections:

- navigation labels and navigation trees;
- search indexes and search-result excerpts;
- cards, callouts, tabs, accordions, graphs, and visual summaries;
- generated inventories, filters, backlinks, and related-content lists;
- landing-page narratives and portfolio orientation; and
- build, coverage, accessibility, link, and search reports.

A projection must be reproducible from authoritative content or clearly labelled as orientation. It cannot introduce an unrecorded decision.

## Source-to-route model

Every publishable source file receives one deterministic canonical route derived from its repository path. The publication mapping removes only a configured content-root prefix and the `.md` suffix, with `README.md` resolving to its containing section route.

Examples:

| Source | Canonical route |
| --- | --- |
| `00-overview/vision.md` | `/00-overview/vision/` |
| `03-product-structure/README.md` | `/03-product-structure/` |
| `adrs/ADR-0040-repository-native-blueprint-publication.md` | `/adrs/ADR-0040-repository-native-blueprint-publication/` |

A generated manifest records source path, canonical route, stable identity where present, aliases, headings, status, and outbound references. Published links may be mechanically rewritten from relative Markdown references, but source links remain valid in repository reading.

Route changes require an alias or redirect and a link-impact check. Heading anchors require the same durability discipline: changing a published heading with inbound references requires an explicit compatible anchor or redirect mechanism.

## Metadata and frontmatter

Governed frontmatter may be added to completed documents when it describes publication metadata without changing approved meaning. The initial allowable schema is:

- stable document ID where one is required;
- display title only when the source heading cannot supply it;
- phase or section;
- document type;
- approved source status;
- accountable owner;
- navigation order;
- route aliases;
- search inclusion or exclusion with a recorded reason; and
- lifecycle or supersession references already supported by authoritative content.

Metadata must be schema-validated. A status or owner in frontmatter cannot contradict the document body or source governance. Derived values should be generated rather than repeated manually.

## Generated navigation and indexes

Global navigation, section indexes, ADR lists, decision views, page and template coverage, related content, and status views are generated from repository structure, validated metadata, and stable identifiers.

Generated outputs must:

1. include every eligible source exactly once in the applicable coverage view;
2. fail on duplicate identities, routes, or conflicting metadata;
3. preserve the distinction between authoritative source and generated projection;
4. link to canonical source-backed routes; and
5. avoid hand-maintained copies of inventories that already have authoritative ledgers.

Editorial configuration may group or order entries, but it cannot silently exclude an authoritative document. Deliberate exclusion requires a recorded reason and coverage evidence.

## Experience obligations

The publication experience must provide:

- responsive reflow and usable long-document navigation;
- full keyboard navigation and visible focus;
- semantic landmarks, headings, tables, code, and status presentation;
- WCAG 2.2 AA conformance with manual assistive-technology evidence;
- equivalent meaning and operability in light and dark themes;
- stable deep links and recoverable route failures;
- search that exposes scope, status, and source context;
- readable diagrams and tables with accessible alternatives;
- restrained Nexora brand adaptation that does not obscure authority; and
- privacy-conscious behavior with no unapproved tracking dependency.

Product-facing Brazilian Portuguese semantics remain preserved. The documentation-site language model, translation scope, and locale navigation require a later explicit decision.

## Validation model

Validation covers both source and rendered publication:

### Source validation

- Markdown formatting and heading structure;
- relative link and anchor integrity;
- metadata schema and body consistency;
- duplicate ID, route, alias, and title detection;
- ADR and decision-index integrity;
- exact coverage of authoritative documents;
- all 89 canonical page IDs and nine templates; and
- prohibited authoritative duplication.

### Rendered validation

- successful production build and route-manifest agreement;
- internal and external link behavior;
- keyboard order, focus, landmarks, and skip navigation;
- automated and manual WCAG 2.2 AA evidence;
- representative screen-reader and zoom/reflow review;
- light and dark semantic and contrast parity;
- responsive navigation, tables, diagrams, and code;
- search completeness, status context, and unavailable-search recovery;
- stable deep links, aliases, redirects, and not-found behavior; and
- approved performance and asset budgets once selected.

Automation supports but does not replace manual accessibility and reading-quality review.

## Controlled implementation selections

The following remain controlled until separately approved or recorded through the appropriate implementation-selection process:

- exact Astro, Starlight, Node.js, package-manager, plugin, and integration versions;
- dependency pinning and update cadence;
- hosting and deployment provider;
- deployment domain, base path, and public launch date;
- search engine or service;
- analytics or telemetry provider, if any;
- consent, retention, sampling, and query-data limits;
- performance, availability, recovery, and asset thresholds; and
- operational ownership and support schedules.

No controlled selection may weaken source authority, WCAG 2.2 AA, privacy, route durability, theme parity, or required coverage.

## Valid publication increment

A Phase 7 publication increment is valid only when it:

1. delivers a coherent reader outcome from authoritative repository content;
2. introduces no manually duplicated product truth;
3. provides stable routes and mechanically validated references;
4. generates navigation or indexes for any growing content set;
5. preserves status, ownership, provenance, and supersession;
6. meets applicable responsive, keyboard, assistive-technology, theme, and WCAG 2.2 AA gates;
7. defines recovery for introduced publication capabilities;
8. passes source, build, rendered, search, and coverage validation;
9. has an accountable owner and maintenance rule; and
10. can be previewed, reviewed, deployed, and rolled back as one bounded change.

A styled mockup, partial content copy, or fixture-only index may be labelled as a prototype. It is not a completed publication increment.

## Governance

Publication decisions follow the Blueprint decision workflow. Cross-cutting or expensive-to-reverse choices receive ADRs. Controlled selections do not become approved strategy merely because a tool is installed or a preview is deployed.

Changes to completed Phase 1–6 documents are limited to publication metadata, mechanically safe references, or governance-approved conflict corrections. A genuine conflict returns to the owning Blueprint authority.

Material changes to the source-of-truth model, framework family, route identity, metadata authority, or generated-index architecture require a superseding ADR.

## Consequences

### Benefits

- Source and published truth cannot drift through routine editorial work.
- New documents can enter navigation, search, and coverage mechanically.
- ADR, page, template, and decision traceability remains direct.
- A small team maintains one content model.
- Portfolio presentation can improve without weakening authority.

### Costs and risks

- Existing documents may require governed metadata and rendering corrections.
- Repository-shaped routes may be less editorially elegant than a separately curated hierarchy.
- Framework customization must remain constrained to avoid fragile presentation code.
- Generated indexes require strict schemas and validation tooling.
- Long technical documents still require deliberate reading and visualization design.

## References

- [Product Roadmap](../00-overview/roadmap.md)
- [Contributing](../CONTRIBUTING.md)
- [Phase 2B Validation](../03-product-structure/10-phase-2b-validation.md)
- [Page-to-System Mapping](../04-design-system/26-page-to-system-mapping.md)
- [Phase 3 Validation](../04-design-system/27-phase-3-validation.md)
- [Page and Template Engineering Mapping](../06-engineering/36-page-and-template-engineering-mapping.md)
- [Phase 4 Validation and Implementation Handoff](../06-engineering/37-phase-4-validation-and-implementation-handoff.md)
- [Page and Template Testing Mapping](../07-testing/44-page-and-template-testing-mapping.md)
- [Phase 5 Validation and Delivery-Roadmap Handoff](../07-testing/45-phase-5-validation-and-delivery-roadmap-handoff.md)
- [Documentation, Training, and Workforce Enablement](../08-roadmap/40-documentation-training-and-workforce-enablement.md)
- [Delivery-Increment Mapping](../08-roadmap/42-increment-to-page-and-template-mapping.md)
- [Phase 6 Validation and Implementation Handoff](../08-roadmap/43-phase-6-validation-and-implementation-handoff.md)
- [ADR-0040](../adrs/ADR-0040-repository-native-blueprint-publication.md)
