# ADR-0029: Separate Capability-Adaptive Admin Application

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora Admin spans many domains, sensitive fields, bulk operations, approvals, exports, and different workforce capabilities. It must remain one coherent operational environment without sharing customer trust or becoming a direct database console.

## Decision

Build Admin as a separate Next.js application, BFF, identity realm, session boundary, telemetry scope, and deployment.

Use one capability-adaptive shell and route registry. Compose purpose-built source-domain Admin contracts through server-first routes.

Use shared governed worklist, selection, Change Envelope, approval, Operation, export, settings, and audit-presentation tooling. Source domains own data, permissions, drafts, validation, approvals, execution, and outcomes.

Bulk work uses versioned Selection Snapshots and durable per-item source operations. Admin never accesses source databases or providers directly.

## Consequences

### Benefits

- Customer and workforce compromise paths are separated.
- One shell adapts without role-specific applications.
- High-risk workflow mechanics are consistent.
- Source ownership remains enforceable.

### Costs and risks

- Composition and permission-aware presentation require strong contracts.
- Shared tooling needs disciplined boundaries.
- Complex work requires explicit responsive limits.

## Governance

- UI visibility is not authorization.
- Generic CRUD and direct source storage access are prohibited.
- Shared tooling cannot own domain policy.
- A material change to Admin trust, source enforcement, or application topology requires a superseding ADR.

## References

- [Administrative Dashboard Application Architecture](../06-engineering/23-administrative-dashboard-application-architecture.md)
- [ADR-0010: Runtime Topology](ADR-0010-trust-segmented-runtime-topology.md)
- [ADR-0019: Source-Enforced Authorization](ADR-0019-source-enforced-hybrid-authorization.md)

