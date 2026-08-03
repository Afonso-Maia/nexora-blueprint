# PC Builder Persistence and Recalculation Testing

**Status:** Approved

## Decision

PC Builder evidence treats the server Build and immutable Revisions as durable authority, Compatibility as rule authority, and Catalog/Pricing/Inventory as fact authorities.

## Evidence

- Guest/customer creation, ownership, access, expiry, claim, save, resume, and identity transition
- Guided and Expert initialization over one composition model
- Add/remove/replace, revision/ETag conflict, non-conflicting rebase, conflicting comparison, and no silent last-write-wins
- Dependency-aware recalculation after part, Catalog fact, ruleset, price, inventory, or availability change
- Incremental result equivalence to full recalculation and explicit stale/unknown state
- Candidate suggestions remain optional and cannot override hard Compatibility
- Immutable private Share snapshot, access, expiry/revocation policy, and no live authority
- Cart conversion atomicity, exact Build revision provenance, source revalidation, partial failure, idempotency, and retry
- Browser loss, offline draft boundary, reconnect review, multi-tab, worker failure, and restoration
- Keyboard, screen reader, mobile/desktop workspace continuity, focus, and announcements

State-machine and property tests cover revisions and dependency graphs; module tests prove persistence/concurrency; journey tests prove leave/return and Cart conversion.

## References

- [PC Builder Engineering](../06-engineering/21-pc-builder-persistence-and-recalculation.md)
- [ADR-0027](../adrs/ADR-0027-durable-server-build-and-immutable-share-snapshots.md)
