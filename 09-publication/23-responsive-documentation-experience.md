# Responsive Documentation Experience

**Status:** Approved

## Decision

Use content-led responsive behavior rather than device-specific page variants. Reading measure remains comfortable while navigation, local table of contents, utility actions, tables, diagrams, and code adapt without removing information.

At narrow widths, global navigation becomes an explicit modal panel, local contents becomes a labelled disclosure, and secondary rails move into document flow. Touch targets meet the approved accessibility baseline. No horizontal page scrolling is permitted; bounded tables, diagrams, and code may scroll within labelled regions.

Layouts support portrait and landscape, text expansion, browser zoom, dynamic viewport changes, and pointer, keyboard, touch, and assistive technology. Breakpoints are controlled implementation values chosen from content failure points.

## Validation

Test representative short and long documents at 320 CSS pixels, 200% and 400% zoom, landscape, large text, reduced motion, touch, keyboard, and supported browser capabilities.

## References

- [Layout, Spacing, Sizing, and Density](../04-design-system/06-layout-spacing-sizing-and-density.md)
- [Browser and Viewport Coverage](../07-testing/34-browser-device-viewport-input-and-network-coverage.md)
