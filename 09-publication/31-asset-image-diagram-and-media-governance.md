# Asset, Image, Diagram, and Media Governance

**Status:** Approved

## Decision

Store publication assets in governed repository locations with source ownership, descriptive names, provenance, licensing status, purpose, and replacement lifecycle. Prefer SVG for diagrams and icons, modern responsive raster formats for imagery, and text or HTML for information that does not require an image.

Every meaningful asset has contextual alternative text or an adjacent equivalent; decorative assets use empty alternatives. Captions identify what the reader should learn and link to authoritative sources where the visual is generated.

Remote hotlinking, unreviewed third-party embeds, autoplay media, decorative video backgrounds, and screenshots used as primary technical evidence are prohibited. Large media requires an explicit reader benefit and performance review.

## Validation

Check missing files, unused assets, dimensions, compression, responsive variants, theme behavior, licensing metadata, alternative text, captions, reduced motion, print, cache identity, and broken external dependencies.

## References

- [Assets](../assets/README.md)
- [Iconography and Imagery](../04-design-system/08-iconography-and-imagery.md)
