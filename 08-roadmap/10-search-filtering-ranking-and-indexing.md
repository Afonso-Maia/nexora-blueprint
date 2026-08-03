# Search, Filtering, Ranking, and Indexing Delivery

**Status:** Approved

## Decision

Deliver lexical-first Search as the first customer-facing projection in I1.

Sequence: source-versioned indexing and rebuilds; Brazilian Portuguese analysis; exact and known-item retrieval; governed facets and filters; pagination and URL state; ranking policy; autocomplete; no-result recovery; projection reconciliation; and operational relevance dashboards.

Initial release uses curated judgment sets covering known-item, category, synonym, typo, attribute, brand, and no-result cases. Semantic retrieval remains disabled until it adds measured value, preserves explanations and governed filters, and passes its approved evidence gates.

Search results compose source-owned price and availability evidence with explicit freshness. Indexes never become commercial or catalog authority.

## Gates

I1 exit requires accessibility, keyboard and assistive-technology behavior, pt-BR relevance, performance budgets, stale/index-loss degradation, rebuild, reconciliation, and safe rollback evidence. Search Admin controls ship only with scoped authority, versioning, preview, impact, and Audit.

## References

- [Search Architecture](../06-engineering/15-search-indexing-ranking-filtering-and-query.md)
- [Search Relevance Validation](../07-testing/21-search-relevance-and-index-validation.md)
