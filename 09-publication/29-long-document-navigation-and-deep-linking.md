# Long-Document Navigation and Deep Linking

**Status:** Approved

## Decision

Generate stable heading anchors from explicit IDs when present and deterministic normalized headings otherwise. A route exposes title, status, breadcrumbs, local table of contents for substantial documents, current-section indication, copy-link controls, and return-to-top only when useful.

The local table of contents includes meaningful second- and third-level headings, remains keyboard accessible, and never obscures content at zoom. Browser history, focus, and scroll restoration follow native expectations.

Changing a heading with inbound references requires a preserved alias. Search and generated indexes link directly to the matching section while retaining document context.

## Validation

Check duplicate headings, fragment resolution, copied URLs, back/forward restoration, fixed-header offsets, focus after navigation, reduced motion, print anchors, and links from external encoded URLs.

## References

- [Cross-Reference and Related-Content Strategy](12-cross-reference-and-related-content-strategy.md)
- [Link Integrity, URL Durability, and Redirects](32-link-integrity-url-durability-and-redirects.md)
