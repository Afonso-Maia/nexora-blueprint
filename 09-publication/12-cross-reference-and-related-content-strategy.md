# Cross-Reference and Related-Content Strategy

**Status:** Approved

## Decision

Preserve explicit Markdown references as the primary semantic graph. Generate backlinks from resolved local links and add related-content links only from declared identifiers, phase handoffs, supersession records, and approved mapping ledgers.

Every related item identifies its relationship, such as “implements,” “validates,” “maps,” “depends on,” “supersedes,” or “hands off to.” Generic similarity recommendations and opaque behavioral personalization are prohibited.

Relative source links remain readable in Git. The build resolves them through the route manifest, checks heading fragments, and records inbound references before a route or heading changes.

## Validation

Broken targets, ambiguous routes, missing fragments, circular supersession, and unlabeled generated relationships block publication. Backlink generation must be deterministic and exclude generated chrome.

## References

- [Phase 7 Framing and Publication Architecture](01-framing-and-publication-architecture.md)
- [Page Relationships and Domain Ownership](../03-product-structure/02-page-relationships-and-ownership.md)
