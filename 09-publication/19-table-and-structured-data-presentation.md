# Table and Structured-Data Presentation

**Status:** Approved

## Decision

Keep semantic HTML tables for genuinely tabular relationships. Provide captions, correct header scope, concise cells, and nearby definitions. On narrow screens, prefer controlled horizontal scrolling with visible affordance and preserved headers; use a generated card view only when it retains every field and relationship.

Large ledgers receive search or filters, sticky headers when they do not impair zoom, and stable row anchors for authoritative IDs. Do not truncate consequential values behind hover, collapse required columns without an equivalent, or convert tables into inaccessible screenshots.

Downloadable structured data may be generated from the same validated source, with schema and release identity. It is a convenience projection, not a new authority.

## Validation

Test keyboard scrolling, screen-reader header association, 400% zoom, mobile reflow, long Portuguese and technical values, theme contrast, print, row deep links, and agreement between table and alternate views.

## References

- [Page Inventory](../03-product-structure/01-page-inventory.md)
- [Accessibility Foundations](../04-design-system/10-accessibility-foundations.md)
