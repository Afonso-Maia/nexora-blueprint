# Global Navigation and Section Hierarchy

**Status:** Approved

## Decision

Provide a persistent hierarchy of Home, Blueprint phases, Decisions, Indexes, and About/Contributing. The desktop sidebar shows the active section and document; small screens use an equivalent dismissible navigation panel with focus containment and restoration.

Each source route provides breadcrumbs, local table of contents where useful, source status, and previous/next links only within a meaningful ordered collection. Navigation labels may be shortened for scanning but retain accessible names and cannot obscure phase or authority.

Limit routine navigation to three visible levels. Deeper source structure remains available through in-page headings and generated indexes. Do not reproduce the customer Website or Administrative Dashboard navigation; the publication is a documentation experience.

## Validation

Test keyboard order, focus return, current-page semantics, landmarks, 200% and 400% zoom, narrow reflow, long labels, no-JavaScript source access where supported, and parity between desktop and mobile destinations.

## References

- [Documentation Information Architecture](04-documentation-information-architecture.md)
- [Navigation](../02-information-architecture/03-navigation.md)
