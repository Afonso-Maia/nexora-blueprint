# Order, Fulfillment, Account, and Notification Testing

**Status:** Approved

## Decision

Post-purchase testing preserves separate Order, payment, fulfillment, Case, Account-projection, notification-event, and message-delivery states while proving coherent customer continuity.

## Evidence

- Order and fulfillment-unit lifecycle transitions, partial shipment, delivery, cancellation, return, and source remedy eligibility
- Provider event authentication, ordering, duplication, impossible transition quarantine, late correction, and reconciliation
- Composite customer status retains contributing source versions and does not flatten uncertainty
- Account projection lag, rebuild, partial source loss, stale labeling, guest verified access, claim, conflict, and identity restrictions
- Notification class, consent/preference, template/version, channel selection, duplicate suppression, send outcome, delivery outcome, interaction, and fallback
- Failed notification never changes source outcome; successful message never proves fulfillment or refund
- Customer actions revalidate source permission, assurance, state, and eligibility
- Accessible timelines, next actions, mobile continuity, and degraded modules

Contract and module suites exhaust source states; projection/reconciliation tests inject gaps and reordering; journeys prove Order Detail and Account continuity.

## References

- [Post-Purchase Continuity](../06-engineering/19-order-fulfillment-account-and-notifications.md)
- [ADR-0025](../adrs/ADR-0025-federated-post-purchase-continuity.md)
