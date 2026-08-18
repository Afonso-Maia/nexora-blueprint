# Representative Print Validation Evidence

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record representative browser-print evidence for the approved individual-document boundary. This is print validation, not a whole-Blueprint PDF product or an authoritative signed edition.

## Environment and sample

Google Chrome 149.0.7827.198 generated Letter-sized PDFs from the local production build. Inspection used Poppler text extraction and rendered PNG pages at 110 DPI. The sample covered:

| Content profile | Canonical document | Printed pages |
| --- | --- | ---: |
| Short | Product Vision | 1 |
| Long governance | Publication Readiness, Portfolio Journey, and Phase 7 Handoff | 2 |
| Tabular and worst-size HTML | Page Inventory | 59 |
| Diagram-heavy | System Context and Runtime Topology | 15 |
| Technical/code policy | Code, Schema, and Technical-Content Rendering | 2 |

## Results

Every sample retained its title, approved status, authoritative repository path, canonical URL, repository source identity, and stale-copy warning. Output used a light, theme-independent ink treatment; headings, prose, lists, links, table rules, and text diagrams remained legible. Text extraction confirmed status, canonical identity, and source identity in all five PDFs.

Rendered first, continuation, middle, diagram, and final pages showed no clipped text, overlap, black replacement glyphs, truncated table cells, or unreadable links. The 59-page inventory is long because it preserves all 89 detailed canonical entries; its content continued in reading order and completed with governance, protected boundaries, population method, and completion sections.

## Finding and correction

Initial inspection found a table section heading orphaned at the bottom of one page and a generated text-diagram caption separated from its diagram. Print CSS now keeps Starlight heading wrappers with following content and keeps each `.text-diagram` group together. Regenerated PDFs placed both heading/table and heading/caption/diagram relationships on the same pages.

Rendered validation requires those two generated CSS controls, preventing the pagination correction from disappearing silently.

## Boundary and remaining evidence

The individual-document print requirement is satisfied for the representative content profiles. Browser save-as-PDF remains a convenience copy with an explicit stale-copy warning. Whole-Blueprint PDF, EPUB, installable offline reading, and guaranteed offline search remain outside the approved initial boundary.

Assistive-technology review of saved PDFs is not claimed; the accessibility gate concerns the canonical HTML publication and still requires its separate manual evidence.

## References

- [Print, Export, and Offline-Reading Boundaries](30-print-export-and-offline-reading-boundaries.md)
- [Individual-Document Print Identity Implementation](49-individual-document-print-identity-implementation.md)
- [Accessible Table Presentation Implementation](50-accessible-table-presentation-implementation.md)
- [Accessible Text-Diagram Implementation](52-accessible-text-diagram-implementation.md)
