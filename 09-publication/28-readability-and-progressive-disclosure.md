# Readability and Progressive Disclosure

**Status:** Approved

## Decision

Preserve complete source documents while improving scanning through summaries, semantic headings, local contents, definition links, callouts, and carefully bounded disclosures. Consequential decisions, risks, controlled values, accessibility requirements, and status cannot be collapsed by default.

Use disclosures for secondary examples, repetitive evidence, or optional implementation detail only when the closed control describes what is hidden and remains operable without precise pointer input. Avoid nested accordions and card grids that fragment long-form reading.

Orientation summaries identify themselves as non-authoritative and link to the full source. Reading width and spacing adapt by content type; technical tables and code may use wider bounded regions.

## Validation

Test comprehension, heading navigation, search-to-context arrival, print expansion, copied deep links, screen-reader state announcements, scripting failure, and whether hidden content remains discoverable.

## References

- [Design Philosophy](../00-overview/design-philosophy.md)
- [Information Hierarchy](../03-product-structure/03-information-hierarchy.md)
