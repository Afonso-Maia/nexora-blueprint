# Filtering and Discovery

**Status:** Approved

## Decision

Provide generated filters only where a collection is large enough to justify them: documents, ADRs, pages, templates, and delivery mappings. Approved filter dimensions are phase, status, document type, owner or capability, surface, page ID, template, and increment when supported by authoritative data.

Filters use stable IDs rather than display labels, combine predictably, expose active constraints, support clear-all, preserve keyboard and screen-reader operation, and serialize safe state in the URL. Counts describe the current generated index, not product metrics.

Do not invent facets from prose, infer ownership, hide zero-result recovery, or create publication-only classifications that compete with an approved taxonomy.

## Validation

Validate deterministic results, URL restoration, back/forward behavior, focus after updates, result announcements, narrow-screen operation, no-results recovery, and agreement with source ledgers.

## References

- [Filtering Architecture](../02-information-architecture/06-filtering.md)
- [Page, Template, Capability, and Increment Navigation](09-page-template-capability-and-increment-navigation.md)
