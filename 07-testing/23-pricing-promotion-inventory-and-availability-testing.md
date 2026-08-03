# Pricing, Promotion, Inventory, and Availability Testing

**Status:** Approved

## Decision

Commercial validation proves each source separately and the approved owner-led commitment invariant together. Display projections never authorize purchase.

## Evidence

- Exact money arithmetic, rounding points, currencies, installment display, and total conservation
- Price-list/version selection, effective intervals, overlap and clock boundaries
- Deterministic promotion qualification, precedence, stacking, limits, exhaustion, allocation, cancellation, and explanation
- Inventory movement ledger conservation, reservation eligibility, expiry, release, consume, correction, and concurrency
- Availability projection freshness, unknown/unavailable distinction, and source revalidation
- Immutable Quote, Promotion outcome, Reservation, and commercial snapshot evidence
- Concurrent customers, last unit, changed price, expired promotion, partial inventory, retry, and worker outage
- Reconciliation among Pricing, Marketing, Purchase, Inventory, Orders, and projections

Generative/model tests cover arithmetic and lifecycle spaces; real-database tests cover locking, uniqueness, transactions, and races; journey tests sample customer review and changed-condition recovery.

Every displayed commercial claim traces to source revision and as-of semantics. Missing data cannot become zero, free, eligible, or available.

## References

- [Commercial Facts](../06-engineering/17-pricing-promotions-inventory-and-availability.md)
- [ADR-0023](../adrs/ADR-0023-versioned-commercial-quotes-and-inventory-reservations.md)
