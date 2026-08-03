# PC Builder Delivery

**Status:** Approved

## Decision

Deliver I6 after I2 provides governed product facts, deterministic Compatibility, price, and availability, and after Cart exposes an atomic conversion boundary.

Sequence a server-owned guest Build; immutable internal revisions; component selection with explicit unknown Compatibility; dependency-aware recalculation; conflict-safe restoration; authenticated ownership and saved builds; immutable share snapshots; and atomic conversion of one revision to Cart.

The workspace may begin with a controlled component/category scope, but must preserve the complete engineering-workspace model and label unsupported facts rather than infer them.

## Exposure

Internal and preview stages use representative catalogs and adverse rule changes. Pilot limits categories and traffic while proving restoration, share safety, recalculation, and Cart conversion. Expansion follows ruleset and catalog evidence.

## Gates

Revision conflicts, concurrent sessions, changed/removed products, ruleset changes, price/inventory freshness, inaccessible interactions, share privacy, and conversion idempotency must pass.

## References

- [PC Builder Architecture](../06-engineering/21-pc-builder-persistence-and-recalculation.md)
- [PC Builder Testing](../07-testing/27-pc-builder-persistence-and-recalculation-testing.md)
