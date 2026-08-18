# Status, Authority, and Generated Index Implementation

**Status:** Completed
**Date:** 2026-08-11

## Delivered outcome

The publication now derives controlled document status from authoritative Markdown and presents a text badge and repository authority statement beside every canonical document title. Generated views identify themselves as non-authoritative projections and link to their source ledgers.

Two generated discovery views are available:

- `/decisions/` indexes all sequential ADRs with canonical links, status, date, recorded references, and accessible client-side filtering.
- `/coverage/` connects all 89 canonical page IDs to their name, primary template, accountable owner, Design System emphasis, engineering profile, testing evidence profile, and primary delivery increment.

## Mechanical evidence

- 42 ADR files form one gap-free sequence and carry valid controlled statuses.
- 89 unique page IDs map to exactly nine primary templates.
- Every page has a primary delivery increment and matching engineering and testing template profiles.
- The generated views are built from source ledgers rather than manually duplicated data.
- Source validation, Astro type checking, static production build, Pagefind indexing, and browser verification pass.
- Narrow-screen verification keeps the coverage table locally scrollable without document-level horizontal overflow.

## Remaining boundary

This increment does not complete all Phase 7 readiness gates. Search-result-specific status decoration, generated backlinks, supersession presentation, full link-fragment validation, accessibility evidence automation, deployment selection, and launch operations remain later increments.

## References

- [Decision and ADR Navigation](08-decision-and-adr-navigation.md)
- [Page, Template, Capability, and Increment Navigation](09-page-template-capability-and-increment-navigation.md)
- [Status, Authority, and Lifecycle Presentation](15-status-authority-and-lifecycle-presentation.md)
- [Page Inventory and Template-Mapping Experience](20-page-inventory-and-template-mapping-experience.md)
