# Order, Fulfillment, Account, and Notification Continuity

**Status:** Approved

## Decision

Deliver I4 from authoritative Order continuity outward rather than building Account as a new aggregate authority.

Sequence Order detail and status; fulfillment units and tracking; guest access and secure claim; authenticated Order history; federated Account dashboard; addresses, payment references, preferences, and settings through their source owners; notification intent; provider delivery state; and reconciliation.

Account projections carry source versions, partial-failure semantics, and safe continuations. Notifications never become lifecycle authority. Order state remains available when optional delivery providers fail.

## Exposure

Launch order lookup and detail before the full Account surface when safe identity and non-disclosure controls exist. Add Account capabilities by source readiness. Provider channels expand independently behind preferences and delivery evidence.

## Gates

Guest claim, assurance, authorization, privacy, partial composition, duplication, ordering, stale projection, delivery failure, accessibility, and recovery evidence block exposure.

## References

- [Post-Purchase Architecture](../06-engineering/19-order-fulfillment-account-and-notifications.md)
- [Post-Purchase Testing](../07-testing/25-order-fulfillment-account-and-notification-testing.md)
