# Search Analytics and Publication Privacy

**Status:** Approved

## Decision

Launch without behavioral analytics or third-party search-query collection. Use local build-generated search and privacy-preserving operational measurements from hosting logs only when needed for reliability and security.

Analytics may be introduced later only for a named reader decision that cannot be answered adequately through voluntary feedback, usability research, aggregate build/search diagnostics, or privacy-minimized server measurements. Selection requires purpose, lawful basis, data inventory, consent behavior, retention, access, regional processing, deletion, vendor exit, and public disclosure.

Never collect document-reading profiles, cross-site identifiers, fingerprinting signals, source text entered into forms, or full IP addresses for portfolio optimization. Search queries remain on-device by default. Do-not-track and consent choices cannot reduce access to documentation.

## Validation

Inspect network requests, cookies, local storage, headers, logs, source maps, previews, and search behavior. Privacy review blocks any new telemetry endpoint or dependency until its controlled selection is approved.

## References

- [Search Architecture](10-search-architecture.md)
- [Security and Privacy Architecture](../06-engineering/27-security-privacy-secrets-and-audit.md)
