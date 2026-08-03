# Pricing, Promotions, Inventory, and Availability Delivery

**Status:** Approved

## Decision

Deliver commercial facts in I2 as separate authoritative capabilities composed at experience boundaries.

Sequence exact money and currency types; price revisions and quotes; promotion eligibility and conflict policy; inventory movement ledger; availability projections; freshness metadata; reservation contracts; and reconciliation.

Product evaluation may display price and availability only with source version and freshness semantics. Cart recalculates authoritatively. Checkout binds a versioned commercial snapshot and inventory reservation; stale presentation never becomes transaction truth.

Admin price, promotion, and inventory operations ship as source-owned capability slices with restricted fields, preview/impact, reason, concurrency control, approval where configured, and Audit.

## Gates

Boundary, concurrency, clock, rounding, duplicate, oversell, stale-read, reservation expiry, compensation, projection-rebuild, and reconciliation evidence are required before I3. Exact policy values remain controlled business inputs.

## References

- [Commercial Facts Architecture](../06-engineering/17-pricing-promotions-inventory-and-availability.md)
- [Commercial Facts Testing](../07-testing/23-pricing-promotion-inventory-and-availability-testing.md)
