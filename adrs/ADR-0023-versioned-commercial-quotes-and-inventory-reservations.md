# ADR-0023: Versioned Commercial Quotes and Inventory Reservations

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora must keep Pricing, Marketing promotions, Purchase eligibility, and Inventory truth separate while presenting one coherent Cart and Checkout. Display projections can be stale; concurrent customers can contend for stock; promotions can expire or exhaust; and order retries must not duplicate reservations, discounts, or commitment.

Viable approaches included:

1. Immutable expiring Price Quotes, Purchase-owned Promotion Applications, bounded Inventory Reservations, and a versioned Checkout Commercial Snapshot
2. Live reads and recalculation without durable quotes or reservations
3. Reserving inventory when an item enters Cart

## Decision

Pricing issues immutable, purpose-bound, expiring Price Quotes from versioned assignments, schedules, and rules.

Marketing owns Promotion Definitions, Pricing owns monetary effects, Purchase owns Cart and Checkout eligibility, application, combination, redemption holds, and claims, and Inventory owns availability.

Inventory uses an immutable movement ledger, derived Stock Positions, explicit available-to-promise policy, and idempotent expiring Reservations. Normal Cart does not reserve stock; eligible Checkout does.

Purchase composes source outputs into a versioned Commercial Snapshot. Place Order binds to the exact reviewed Snapshot and revalidates Quote, Promotion, Reservation, Compatibility, fulfillment, consent, and Checkout state.

Register a narrow local transaction that creates one Order, claims Promotion Redemption Holds, consumes Reservations into allocations, stores the immutable commercial snapshot, and records outbox events atomically.

Displayed and Search projections are not purchase guarantees. Missing source data never becomes a free price, discount, available stock, or successful reservation.

## Consequences

### Benefits

- Customers commit to the exact reviewed commercial state.
- Domain authority remains explicit.
- Bounded reservations reduce oversell without Cart hoarding.
- Immutable evidence supports idempotency, explanation, and reconciliation.
- Changed and unknown outcomes remain visible and recoverable.

### Costs and risks

- Quote, promotion, reservation, and snapshot expiry require coordination.
- Checkout can require review after a commercial change.
- Reservation workers and reconciliation become critical.
- The local transaction needs narrow cross-module database access.

## Governance

- Price and inventory projections cannot authorize commitment.
- Pricing calculation uses exact arithmetic and deterministic precedence.
- Promotion activation requires coordinated Marketing, Pricing, Purchase, Inventory, and Legal components as applicable.
- Reservation transitions and inventory corrections are append-only and idempotent.
- Cart reservation remains prohibited unless a separately approved scarcity policy requires it.
- A material change to commercial authority, Quote binding, Reservation timing, inventory accounting, or atomic order invariant requires a superseding ADR.

## References

- [Pricing, Promotions, Inventory, and Availability](../06-engineering/17-pricing-promotions-inventory-and-availability.md)
- [Cart and Checkout Patterns](../04-design-system/17-cart-and-checkout-patterns.md)
- [ADR-0016: Domain Modules](ADR-0016-domain-modules.md)
- [ADR-0017: PostgreSQL Modular Data Authority](ADR-0017-postgresql-data-authority.md)

