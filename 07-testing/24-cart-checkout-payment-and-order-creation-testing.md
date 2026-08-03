# Cart, Checkout, Payment, and Order-Creation Testing

**Status:** Approved

## Decision

Purchase testing is centered on the durable Checkout Operation and proves that one Operation creates at most one Order under retries, redirects, callbacks, crashes, provider ambiguity, and concurrent clients.

## Evidence matrix

- Guest/customer Cart persistence, merge, quantity conflict, stale facts, restoration, and explicit non-reservation
- One adaptive Checkout, step restoration, validation, address, delivery, consent, assurance, and accessible errors
- Exact reviewed Quote, promotions, inventory Reservation, Build provenance, and expiry/review changes
- Payment tokenization, method profiles, redirect/return, synchronous decline, asynchronous pending, timeout/unknown, late success, duplicate callback, void/refund compensation, and reconciliation
- Atomic Order commit with reservation/promotion consumption and immutable commercial evidence
- Idempotency key binding, changed-payload conflict, browser refresh/back/reconnect, multi-tab and repeated-submit protection
- Worker/database/provider failure at every durable workflow boundary
- Confirmed, failed, pending, and indeterminate outcomes with safe retry rules and source receipt

State-machine tests cover Operation transitions; real-database concurrency proves uniqueness and commit invariants; adapter suites prove provider behavior; a small deployed journey proves composition and accessibility.

No placeholder Order represents a synchronous decline. Provider timeout never equals decline, and UI success never substitutes for source confirmation.

## References

- [Purchase Architecture](../06-engineering/18-cart-checkout-payments-and-order-creation.md)
- [ADR-0024](../adrs/ADR-0024-durable-checkout-orchestration-and-provider-tokenized-payments.md)
