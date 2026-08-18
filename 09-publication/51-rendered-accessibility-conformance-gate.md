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

Manual keyboard navigation, focus visibility, explicit 200% and 400% browser zoom, forced-color parity, screen-reader operation, diagram comprehension, and disabled-user review remain separate blocking evidence. Automated structural success is not represented as WCAG conformance by itself.

## Hosted browser evidence

Vercel deployment `dpl_1Hh4mAwnvQp6gPvbhzTmQpmWX7CG`, correlated with commit `f68f475a59bba31d152ad33bde31b6154b6db165`, reached READY on the temporary canonical alias. A representative long readiness document passed at 320 CSS pixels with one main landmark and H1, zero document overflow, and available mobile menu and search controls. The mobile menu opened, Escape closed it and returned focus to the Menu button. Native theme selection changed the document between light and dark with zero overflow in each. A real unknown route rendered the `Page not found` H1, four named recovery links, zero narrow-screen overflow, and no console errors.

The browser driver did not produce a reliable body-level Tab sequence or synthetic Enter activation for the custom menu element. Those results are not counted as keyboard evidence; full keyboard sequence, visible-focus, forced-color, screen-reader, and disabled-user checks remain open.

## References

- [Accessibility and Assistive-Technology Conformance](24-accessibility-and-assistive-technology-conformance.md)
- [Responsive Documentation Experience](23-responsive-documentation-experience.md)
- [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md)
