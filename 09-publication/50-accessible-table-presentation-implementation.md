# Accessible Table Presentation Implementation

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record the derived table-accessibility increment required by the approved publication presentation and WCAG evidence architecture. It changes generated rendering only and does not edit or reinterpret authoritative table values.

## Implementation

A repository-owned rehype transformation gives every Markdown table a caption derived from its nearest section heading and assigns explicit `scope="col"` to header-row cells. Captions are visually hidden during screen reading to avoid repeating the adjacent heading, remain available to assistive technology, and become visible in print. The generated coverage explorer supplies its own descriptive caption and retains explicit row and column scopes.

## Mechanical evidence

Rendered validation inspects every table on every generated page and blocks a missing or empty caption and any header cell without an allowed explicit scope. At implementation time, all 113 rendered tables pass. Source validation, Astro check, production build, rendered route/fragment validation, and whitespace validation also pass.

## Remaining evidence

Manual screen-reader header-association, keyboard scrolling, 400% zoom, long-value reflow, theme contrast, and representative print-preview checks remain required. Those human/browser checks are not inferred from semantic markup alone.

## Hosted browser evidence

Vercel deployment `dpl_veoUV3Z39fWHhiSQWDYxQg4ziV1a`, correlated with commit `25cf46c4f0e75afeaae891aeb5863705fa1dce89`, reached READY on the temporary canonical alias. At 390 CSS pixels, the coverage table exposed its descriptive caption as the table's accessible name, column and row header roles, and a labelled `tabindex="0"` scroll region. The table remained locally scrollable while the document had zero horizontal overflow, and the fresh browser session emitted no console errors.

## References

- [Table and Structured-Data Presentation](19-table-and-structured-data-presentation.md)
- [Accessibility and Assistive-Technology Conformance](24-accessibility-and-assistive-technology-conformance.md)
- [Print, Export, and Offline-Reading Boundaries](30-print-export-and-offline-reading-boundaries.md)
