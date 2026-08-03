# Visual Regression and Theme Validation

**Status:** Approved

## Decision

Nexora uses risk-selected visual regression backed by semantic, token, and layout assertions. It does not capture every component-state-viewport permutation as an unreviewable screenshot estate.

## Baselines

Baselines identify:

- artifact and Design System version;
- browser rendering class;
- viewport, density, zoom, theme, locale, font state, and motion preference;
- fixture and system state; and
- approved reviewer and change rationale.

Fonts, animations, clocks, random content, media, and data are controlled. Masks are allowed only for intentionally variable non-semantic regions and are reviewed.

## Required visual coverage

- Shared primitives and components at contract-defining states
- Nine reference template compositions
- Light and dark parity
- Comfortable and compact density where supported
- Constrained, compact, standard, wide, and data-wide layouts as applicable
- Portuguese content extremes, missing media, focus, validation, loading, stale, degraded, and permission states
- High-risk third-party and generated-content boundaries

Risk-based pairwise selection reduces combinations while preserving critical and historically defective interactions.

## Assertions

Visual comparison is paired with machine assertions for:

- semantic token use and prohibited raw values;
- contrast and non-color state distinction;
- overflow, overlap, clipping, obscured focus, and target size;
- responsive source order and visibility;
- theme completeness and forced-color behavior; and
- image aspect, factual labels, and fallback content.

Pixel differences are evidence to review, not automatic product defects. Thresholds cannot hide local high-contrast or focus changes.

## Baseline governance

Baseline updates require an attributable diff, affected-consumer review, and confirmation that semantic assertions still pass. Bulk acceptance without classification is prohibited.

## Rejected alternative

Exhaustive pixel snapshots are rejected because they create high maintenance cost and low review attention. Manual visual review alone is also insufficient for shared regression detection.

## References

- [Precision Gold Color and Themes](../04-design-system/04-precision-gold-color-and-themes.md)
- [Page Templates](../04-design-system/25-page-templates.md)
- [Component Testing](08-component-and-design-system-testing.md)
