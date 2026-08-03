# Hosting, Domain, Redirects, and Availability

**Status:** Approved

## Decision

Host the static-first publication on a managed edge-capable platform with atomic immutable deployments, custom-domain support, TLS, redirects, security headers, preview environments, logs, rollback, and exportable artifacts. Exact provider, public domain, and launch date remain controlled selections pending implementation evidence.

Prefer a dedicated documentation hostname or durable path owned by Nexora rather than a provider hostname. Canonical URLs are environment-aware; previews are non-indexable and visibly non-production. DNS and provider access use named ownership, least privilege, and recovery procedures.

Define availability and recovery targets only after traffic, portfolio needs, provider capability, and operational ownership are known. Static documents remain available when optional search, analytics, or client enhancements fail.

## Validation

Before selection, compare providers against accessibility, redirects, headers, regional performance, privacy, provenance, rollback, export, cost, support, and lock-in. Before launch, verify TLS, DNS, canonical URLs, indexing controls, 404s, redirects, cache behavior, outage fallback, and rollback.

## References

- [CI/CD and Deployment Architecture](36-ci-cd-and-deployment-architecture.md)
- [Link Integrity, URL Durability, and Redirects](32-link-integrity-url-durability-and-redirects.md)
