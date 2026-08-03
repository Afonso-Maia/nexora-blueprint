# Caching, Offline, and State-Restoration Testing

**Status:** Approved

## Decision

Cache and browser state tests prove they remain bounded projections and never become authority. Restoration follows the approved owner and precedence for URL, session, source, workspace, operation, local draft, and interaction state.

Coverage includes cache hit/miss, expiry, invalidation, lost invalidation, stampede, version mismatch, identity/scope separation, logout cleanup, multi-tab change, back/forward, refresh, deep link, process restart, reconnect, stale-while-refresh, and source correction.

Tests assert:

- private and consequential responses are not shared or publicly cached;
- price, inventory, permission, Compatibility, and eligibility freshness is explicit and revalidated at action;
- Search/cache loss does not trigger unbounded source queries;
- offline confirmed data shows scope/as-of time and blocks network-dependent effects;
- consequential mutations are not generically queued;
- safe local drafts remain visibly unsent and require reauthentication, refreshed baseline, review, and explicit submission;
- conflict never silently overwrites source state; and
- recovered sources revalidate summaries and actions.

## References

- [Caching and Restoration](../06-engineering/25-caching-offline-and-state-restoration.md)
- [ADR-0031](../adrs/ADR-0031-layered-non-authoritative-caching.md)
