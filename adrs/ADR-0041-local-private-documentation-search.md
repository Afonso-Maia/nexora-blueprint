# ADR-0041: Local Private Documentation Search

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

The published Blueprint must make hundreds of long-form documents, stable IDs, ADRs, mappings, and Portuguese technical terms discoverable. A hosted search service can offer operational tooling and advanced ranking but introduces query disclosure, provider dependency, consent and retention decisions, and another failure boundary.

The content is static, versioned, moderate in size, and suitable for build-time indexing.

## Decision

Use a build-generated local search index as the default publication search architecture. Prefer the supported Astro Starlight local-search integration or a mechanically equivalent static implementation.

Index authoritative rendered content plus validated status, phase, type, heading, and stable-identifier metadata. Rank exact ADR numbers, page IDs, template IDs, titles, and headings above body text. Process queries on-device and retain no individual query history.

A hosted search provider requires a later superseding or amending decision supported by relevance, scale, accessibility, privacy, retention, resilience, cost, and provider-exit evidence.

## Alternative

### Hosted documentation search

Send indexed content and reader queries to a managed service. This may improve tuning and analytics but is rejected for launch because current scale does not justify its privacy, dependency, and governance cost.

## Consequences

- Search works without transmitting reader queries.
- The index can be built and tested with the same immutable publication artifact.
- Ranking and index-size constraints remain the publication team’s responsibility.
- Large future growth may require partitioning or a reviewed hosted alternative.
- Navigation and generated indexes remain the recovery path when search is unavailable.

## References

- [Search Architecture](../09-publication/10-search-architecture.md)
- [Search Analytics and Publication Privacy](../09-publication/38-search-analytics-and-publication-privacy.md)
