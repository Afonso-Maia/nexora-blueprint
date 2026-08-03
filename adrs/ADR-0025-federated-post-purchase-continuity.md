# ADR-0025: Federated Post-Purchase Continuity

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora must present coherent Order, payment, delivery, cancellation, return, Support, Account, and notification continuity while preserving specialist source ownership. Partial fulfillment and remote carrier or messaging events make a single flattened status unreliable.

Viable approaches included:

1. Federated source composition with bounded rebuildable Account and Notification projections
2. An Account-owned consolidated post-purchase record
3. One cross-domain Order aggregate containing payments, shipments, cases, and messages

## Decision

Keep Purchase authoritative for Order identity and lifecycle; Payments for payment state; Inventory for allocation; Fulfillment for fulfillment units, shipments, tracking, and delivery outcomes; Support for persistent remedy cases; Notifications for in-app records; and Messaging for channel delivery.

Customer Account composes these sources and maintains only rebuildable obligation-first continuity projections. Composite customer status is deterministic, versioned, explainable, and never written back as source state.

Fulfillment uses typed units and shipments, provider adapters, authenticated inbox events, explicit promise history, and reconciliation.

Cross-domain cancellation uses a durable Purchase-owned operation with idempotent source commands, partial outcomes, compensation, and reconciliation.

Source semantic events create Notifications and Message Deliveries after source commit. Delivered, read, and source-resolved remain distinct. Deep links never grant access.

## Consequences

### Benefits

- Source ownership and customer continuity coexist.
- Partial and exceptional states remain truthful.
- Account projections are rebuildable and cannot authorize source actions.
- Carrier and messaging uncertainty is explicit and reconcilable.
- Notification delivery cannot falsely signal source completion.

### Costs and risks

- Order Detail and Dashboard need multi-source composition.
- Projection lag and provider event disorder require reconciliation.
- Cancellation has several compensating steps.
- Template, preference, and notification-class governance cross teams.

## Governance

- Account, Notifications, Search, and analytics cannot become post-purchase lifecycle authorities.
- Customer-facing status must retain contributing source versions.
- Fulfillment provider events do not overwrite impossible state without verification.
- Required and marketing message classes cannot be reclassified to bypass consent.
- A material change to Order, Fulfillment, Account, Notification, or Messaging ownership or composite-status authority requires a superseding ADR.

## References

- [Order, Fulfillment, Account, and Notification Continuity](../06-engineering/19-order-fulfillment-account-and-notifications.md)
- [Account and Post-Purchase Architecture](../03-product-structure/04-account-architecture.md)
- [ADR-0016: Domain Modules](ADR-0016-domain-modules.md)
- [ADR-0024: Durable Checkout Orchestration](ADR-0024-durable-checkout-orchestration-and-provider-tokenized-payments.md)

