# Content Taxonomy and Stable Identifiers

**Status:** Approved

## Decision

Use a small publication taxonomy derived from existing authority: phase, document type, status, owner, capability, page ID, template, ADR ID, and delivery increment. Controlled vocabularies are versioned and schema-validated.

Repository paths identify source files; explicit domain IDs identify ADRs, canonical pages, templates, journeys, and other approved ledgers. Publication-generated IDs use a reserved namespace and cannot resemble authoritative domain identities.

Display labels may evolve without changing stable values. Aliases support renamed labels and routes, but one canonical identifier remains primary. Do not infer taxonomy from keywords or create tags without a defined reader job and owner.

## Validation

Reject duplicate IDs, unknown values, case-only collisions, unresolved aliases, and taxonomy terms without owners. Coverage reports distinguish authoritative, derived, and publication-only identities.

## References

- [Taxonomy](../02-information-architecture/04-taxonomy.md)
- [Page Inventory](../03-product-structure/01-page-inventory.md)
