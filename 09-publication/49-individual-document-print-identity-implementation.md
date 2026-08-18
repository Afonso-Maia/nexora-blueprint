# Individual-Document Print Identity Implementation

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record the completed mechanical portion of the approved individual-document print contract. This implementation record does not claim whole-Blueprint export, a signed edition, or completion of representative print-preview review.

## Implementation

The shared canonical-document title component now emits a print-only identity block containing the document status where available, absolute canonical URL, authoritative repository source path where available, and an explicit warning that printed or saved copies may be stale. Screen presentation remains unchanged. Print styling exposes the identity while removing interactive site chrome, using theme-independent ink, expanding external links, preserving semantic tables and code, and applying bounded page-break controls.

The obsolete Pagefind metadata attribute was removed from status presentation as part of the same shared-component change.

## Mechanical evidence

Rendered validation iterates every authoritative manifest entry and blocks when the matching canonical route lacks the print identity, absolute canonical URL, or stale-copy warning. Node 24.19.0 source validation, Astro check, production build, rendered route and fragment inspection, and whitespace validation pass with 283 authoritative documents and 288 rendered pages at the time of this increment.

## Remaining manual evidence

The approved gate still requires print-preview inspection of representative short, long, tabular, diagram-heavy, and code-heavy documents. That review must confirm theme-independent ink, visible status and identity, readable expanded links, unclipped tables and code, and acceptable page breaks. Browser save-as-PDF remains a convenience rather than an authoritative signed edition.

## References

- [Print, Export, and Offline-Reading Boundaries](30-print-export-and-offline-reading-boundaries.md)
- [Responsive Documentation Experience](23-responsive-documentation-experience.md)
- [Publication Operations and Readiness Evidence](45-publication-operations-and-readiness-evidence.md)
