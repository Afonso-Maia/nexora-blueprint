# Rendered Accessibility Conformance Gate

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record the whole-publication structural accessibility gate implemented under the approved WCAG 2.2 AA evidence architecture. This automated layer is necessary but does not replace browser, assistive-technology, disabled-user, contrast, zoom, or cognitive review.

## Blocking checks

Rendered validation now inspects every generated HTML page and requires:

- authoritative English source-language metadata;
- exactly one main landmark and one H1;
- no duplicate element IDs;
- an accessible name for every dialog, button, and link;
- an `alt` attribute for every image; and
- each SVG to be explicitly named or hidden, including decorative framework icons hidden by an ancestor.

These checks run inside the production build after route and fragment validation, so a violation prevents the immutable artifact from being packaged.

## Evidence

All 290 rendered pages passed at implementation time, alongside 285 authoritative source documents, 42 sequential ADRs, 89 pages, nine templates, and 1,187 resolved local links. Astro check reported zero errors, warnings, and hints.

## Remaining evidence

Manual keyboard navigation, focus visibility, 200% and 400% zoom, 320 CSS-pixel reflow, theme and forced-color parity, screen-reader operation, diagram comprehension, error recovery, and disabled-user review remain separate blocking evidence. Automated structural success is not represented as WCAG conformance by itself.

## References

- [Accessibility and Assistive-Technology Conformance](24-accessibility-and-assistive-technology-conformance.md)
- [Responsive Documentation Experience](23-responsive-documentation-experience.md)
- [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md)
