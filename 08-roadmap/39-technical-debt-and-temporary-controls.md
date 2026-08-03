# Technical Debt and Temporary-Control Management

**Status:** Approved

## Decision

Treat debt and temporary controls as risk-priced delivery obligations, not invisible backlog.

Each record names the compromised contract or maintainability cost, cause, affected scope, Q/C risk, containment, observability, owner, creation decision, expiry, removal increment, effort range, dependencies, and verification.

Temporary controls are allowed only when the residual risk is policy-permitted, bounded, reversible, monitored, accepted by the proper authority, and incapable of concealing a Q0 gap. They cannot redefine source truth, permission, accessibility, security, privacy, or release evidence.

## Capacity and escalation

Committed planning reserves capacity according to risk and accumulating interest. Expiry blocks release or horizon promotion unless the same authority explicitly renews with new evidence. Repeated renewal escalates to architecture or Blueprint governance.

Removal proves the workaround and flag/configuration branches are gone, affected evidence passes, documentation is updated, and operational monitoring confirms stability.

## References

- [Technology-Selection Governance](../06-engineering/35-adr-and-technology-selection-governance.md)
- [Defect and Exception Policy](../07-testing/38-defect-triage-quarantine-and-flaky-test-policy.md)
