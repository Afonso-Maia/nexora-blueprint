# ADR-0040: Repository-Native Blueprint Publication

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

The Nexora Product Blueprint contains 231 Markdown documents, 89 canonical pages, nine page templates, and ADR-0001 through ADR-0039. Markdown and Git history are the approved source of truth, with extensive relative cross-references and established status semantics.

Publication needs stronger navigation, search, accessibility, responsive reading, diagrams, and portfolio orientation. A separate curated content layer could optimize narrative flow, but would create synchronization, traceability, omission, and divergence risk for a small team.

The approved roadmap already identifies Astro Starlight as the intended documentation-site direction, while exact versions, providers, domains, analytics, search implementation, and publication timing remain unselected.

## Decision

Publish the Blueprint through a repository-native generated documentation site founded on Astro Starlight.

Consume the existing Markdown directly as the sole authoritative content layer. Permit governed frontmatter that describes publication metadata without changing approved meaning. Generate routes, navigation, indexes, coverage views, and related-content projections from repository structure, validated metadata, and stable identities.

Use a deterministic source-to-route manifest and mechanically preserve relative references, headings, aliases, and redirects. Treat all publication components, search indexes, visual summaries, landing-page orientation, and generated views as non-authoritative projections that link to source-backed routes.

Validate source and rendered output for coverage, reference integrity, status consistency, accessibility, theme parity, responsive behavior, search, and deep-link durability. A publication increment is complete only when it delivers a coherent reader outcome and passes the applicable integrated validation.

Keep exact framework and dependency versions, hosting, domain, analytics, search provider, launch date, performance thresholds, availability objectives, retention, and operational schedules as controlled implementation selections.

## Alternative

### Curated publication layer

Maintain a second publication content tree optimized for narrative and portfolio presentation while keeping the existing Blueprint as internal authority.

This is rejected as the governing architecture because it duplicates content operations, makes completeness harder to prove, and permits public explanations to drift from approved decisions. Clearly labelled orientation content and generated summaries remain allowed when they point to authoritative sources and introduce no new product truth.

## Consequences

- Repository Markdown and Git history remain the single source of truth.
- Publication coverage and traceability can be mechanically proven.
- Small-team maintenance cost and routine divergence risk are reduced.
- Route, metadata, and index generation require strict schemas and build-time validation.
- Editorial presentation must work within source-backed constraints.
- Framework customization and presentation components cannot acquire decision authority.
- Material changes to the content-authority or route model require a superseding ADR.

## References

- [Product Roadmap](../00-overview/roadmap.md)
- [Phase 7 Framing and Publication Architecture](../09-publication/01-framing-and-publication-architecture.md)
- [Phase 7 Index](../09-publication/README.md)
- [Documentation, Training, and Workforce Enablement](../08-roadmap/40-documentation-training-and-workforce-enablement.md)
- [Phase 6 Validation and Implementation Handoff](../08-roadmap/43-phase-6-validation-and-implementation-handoff.md)
