# Performance, Asset, and Resilience Budget Implementation

**Status:** Completed
**Date:** 2026-08-18

## Purpose

Record the controlled measurable budgets introduced for the initial static publication artifact. These thresholds implement the approved performance and asset decisions without becoming product-runtime budgets or altering Blueprint truth.

## Controlled budgets

| Measure | Blocking budget | Initial measured basis |
| --- | ---: | --- |
| Complete static artifact | 40 MiB | Current artifact plus bounded growth headroom |
| Largest document HTML | 450 KiB | Current worst credible page inventory document |
| P95 document HTML | 225 KiB | Current representative long-document distribution |
| Static search index | 2.5 MiB | Current complete local index plus bounded content growth |
| All digest-named framework assets | 128 KiB | Current CSS and JavaScript payload plus bounded framework growth |
| All CSS / individual CSS | 96 KiB / 64 KiB | Current generated theme, code, and print styles |
| All JavaScript / individual JavaScript | 32 KiB / 16 KiB | Current navigation, theme, contents, and code enhancement scripts |
| Fonts | 0 bytes | System-font publication baseline |
| Raster images | 0 bytes | Current text, HTML, and SVG baseline |

The zero-byte font and raster budgets deliberately require a reviewed threshold change before adding either asset class. They do not prohibit governed SVG assets or future justified media; they prevent silent introduction.

## Blocking validation

The production build now emits `.astro/performance-report.json` and fails when any budget is exceeded. Validation measures the complete artifact, HTML median/P95/maximum, search index, aggregate and largest CSS/JavaScript, fonts, and raster images. Every `_astro` asset must carry a digest-like filename so immutable caching cannot silently depend on mutable names.

CI packages this report with the source manifest, coverage report, static output, and staged Vercel Build Output in the digest-identified preview artifact. Release reviewers can therefore inspect the exact measurements associated with the candidate rather than relying on transient job output.

The same gate confirms that the landing page, generated coverage explorer, and current largest document retain static main content and headings. Canonical documents retain authority context without JavaScript. Search recovery and no-script routes remain enforced by rendered validation.

## Boundary and remaining evidence

Byte budgets are deterministic build evidence, not field performance. Constrained-network cold/warm-cache measurements, largest-content rendering, layout stability, interaction latency, script failure, font failure, missing-asset behavior, and rollback behavior remain blocking browser and operational evidence before launch.

## References

- [Performance Budgets and Resilience](40-performance-budgets-and-resilience.md)
- [Asset, Image, Diagram, and Media Governance](31-asset-image-diagram-and-media-governance.md)
- [Security, Dependency, and Supply-Chain Controls](39-security-dependency-and-supply-chain-controls.md)
- [Publication Readiness, Portfolio Journey, and Phase 7 Handoff](42-publication-readiness-portfolio-journey-and-handoff.md)
