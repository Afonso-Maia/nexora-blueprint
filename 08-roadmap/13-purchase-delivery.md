# Cart, Checkout, Payment, and Order-Creation Delivery

**Status:** Approved

## Decision

Deliver I3 as one safe-purchase vertical spine, expanding behind governed exposure controls.

1. Authoritative guest/customer Cart with recalculation, persistence, merge, and recovery.
2. Unified Checkout shell with delivery, identity, commercial validation, assurance, and accessible restoration.
3. Payment adapter against a controllable fake and provider sandbox using provider tokenization.
4. Durable orchestration with idempotency, reservation, payment ambiguity, compensation, and reconciliation.
5. Atomic at-most-one Order creation and explicit committed, rejected, or pending outcome.
6. Confirmation, receipt evidence, telemetry, runbooks, and safe production synthetics.

Initial exposure may restrict payment methods, delivery modes, products, cohorts, and volume when recorded as launch scope rather than architectural truth.

## Gates

No real payment exposure precedes provider, security, privacy, accessibility, operational, reconciliation, and incident readiness. Blind retry or rollback after external effect is prohibited; forward repair and reconciliation govern ambiguous outcomes.

## References

- [Purchase Architecture](../06-engineering/18-cart-checkout-payments-and-order-creation.md)
- [Purchase Testing](../07-testing/24-cart-checkout-payment-and-order-creation-testing.md)
