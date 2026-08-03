# ADR-0024: Durable Checkout Orchestration and Provider-Tokenized Payments

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora requires one adaptive Checkout, exact reviewed totals, guest and customer continuity, provider-bound payment credentials, duplicate protection, synchronous and asynchronous payment methods, and truthful recovery when remote payment and local Order creation cannot share a transaction.

Viable approaches included:

1. A durable Purchase-owned Checkout Operation with provider-tokenized payments, local atomic Order creation, compensation, and reconciliation
2. A synchronous request chain treating provider timeout as failure
3. Creating every Order before attempting payment

## Decision

Use server-authoritative Carts and one Purchase-owned Checkout Session with versioned module dependencies and reviewed transaction state.

Place Order creates one durable Checkout Operation bound to the exact reviewed Commercial Snapshot and idempotency key.

Use provider-hosted or provider-tokenized payment collection. Payments owns provider-neutral Intents and Attempts and integrates through versioned adapters. Nexora must not receive raw payment credentials where provider tokenization can prevent it.

For immediate-authorization methods, obtain a commitment-ready authorization before Order creation. Then use the approved local transaction to create one Order, claim Promotions, consume Inventory Reservations, retain commercial and consent evidence, link payment state, and record outbox events. If local commitment fails, void the authorization through durable compensation.

For approved asynchronous methods, create a truthful Pending-payment Order only when the method profile defines durable provider instructions, Inventory and Promotion hold behavior, expiry, cancellation, and reconciliation.

Provider calls never participate in the local database transaction. Timeouts produce Pending, Unknown, or Indeterminate states and are reconciled before retry.

## Consequences

### Benefits

- Browser and provider interruption cannot create duplicate Orders or payments.
- Synchronous declines remain in Checkout without placeholder Orders.
- Asynchronous methods retain truthful pending-payment semantics.
- Tokenization reduces payment-data exposure.
- Exact reviewed state is preserved at commitment.

### Costs and risks

- Durable workflow, compensation, and reconciliation require substantial implementation.
- Authorization can precede a failed local commit and require void.
- Payment methods need distinct execution profiles.
- Provider UI and redirects require strict accessibility validation.

## Governance

- One Checkout Operation creates at most one Order.
- Provider timeout or missing webhook never maps directly to decline.
- Payment, Order, Reservation, and Promotion states remain separate and reconcilable.
- Raw payment credentials are prohibited from Nexora systems where tokenization is available.
- A payment method cannot launch without its execution, expiry, inventory, promotion, Legal, accessibility, and reconciliation profile.
- A material change to Order timing, provider token custody, Checkout coordination, payment uncertainty, or compensation strategy requires a superseding ADR.

## References

- [Cart, Checkout, Payments, and Order Creation](../06-engineering/18-cart-checkout-payments-and-order-creation.md)
- [Cart and Checkout Patterns](../04-design-system/17-cart-and-checkout-patterns.md)
- [ADR-0015: BFF and HTTP Contracts](ADR-0015-bff-and-http-contracts.md)
- [ADR-0023: Commercial Quotes and Inventory Reservations](ADR-0023-versioned-commercial-quotes-and-inventory-reservations.md)

