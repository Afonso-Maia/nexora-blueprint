# Administrative Dashboard Delivery

**Status:** Approved

## Decision

Deliver Admin as capability slices alongside the source operations they govern, not as a UI-first late phase or a second source of truth.

I0 establishes separate workforce identity, Admin app/BFF shell, capability navigation, scoped authorization, assurance, source gateways, Audit correlation, and Admin template reference compositions.

Thereafter each source increment adds its required queue/workspace pair, restricted fields, freshness, concurrency, preview/impact, reason, approvals where configured, bulk-job durability, export controls, operation outcomes, and runbooks. Cross-domain dashboards compose status but cannot bypass source commands.

## Exposure

Capability flags are granted by role, scope, environment, training, and operational readiness. Internal workforce pilot precedes production mutation. Read-only visibility does not imply command permission.

## Gates

Negative authorization, field restriction, assurance, segregation, stale baselines, bulk partial failure, export privacy, source effect, Audit integrity, accessibility, density, and recovery evidence block each capability.

## References

- [Admin Architecture](../06-engineering/23-administrative-dashboard-application-architecture.md)
- [Admin Workflow Testing](../07-testing/16-administrative-dashboard-workflow-testing.md)
