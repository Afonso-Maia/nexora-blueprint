# Link Integrity, URL Durability, and Redirects

**Status:** Approved

## Decision

Treat canonical routes and heading fragments as public contracts after publication. Generate them from the source-to-route manifest, preserve repository-relative links, and validate the rendered equivalents.

Route changes require an explicit alias or direct permanent redirect, inbound-reference analysis, canonical metadata, and loop/chain prevention. External links are checked on a bounded schedule with retry and allowlisted exceptions because transient remote failure must not make every source edit impossible.

Broken internal routes or fragments block merge and publication. External failures produce owned review items; security-sensitive or removed destinations may be disabled immediately with visible explanation.

Custom not-found behavior offers search, phase navigation, and reporting without guessing a destination. Unknown paths do not silently redirect to the home page.

## Validation

Check source and rendered links, encoded paths, case sensitivity, fragments, aliases, canonical URLs, redirect loops and chains, sitemap entries, old release links, and representative external failures.

## References

- [Phase 7 Framing and Publication Architecture](01-framing-and-publication-architecture.md)
- [Long-Document Navigation and Deep Linking](29-long-document-navigation-and-deep-linking.md)
