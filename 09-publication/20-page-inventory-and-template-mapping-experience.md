# Page Inventory and Template-Mapping Experience

**Status:** Approved

## Decision

Present the 89-page inventory through a generated index and detail projection keyed by canonical page ID. Each projection exposes the authoritative page definition link, surface, archetype/template, owner, relationships, Design System mapping, engineering profile, testing evidence profile, and primary delivery increment.

Provide a complementary nine-template view with approved counts and page membership. The source mapping tables remain authoritative; the publication parser produces a normalized build artifact and coverage report rather than a manually maintained duplicate.

Readers may filter, sort, and share views. Default ordering follows approved inventory order, with stable-ID ordering as an alternative. Publication descriptions cannot summarize behavior beyond source-backed fields.

## Validation

Require exactly 89 unique page IDs, nine templates, one primary template and increment per page, all expected cross-phase mappings, no orphan references, and source-linked evidence for every displayed field.

## References

- [Phase 2B Validation](../03-product-structure/10-phase-2b-validation.md)
- [Page-to-System Mapping](../04-design-system/26-page-to-system-mapping.md)
- [Delivery-Increment Mapping](../08-roadmap/42-increment-to-page-and-template-mapping.md)
