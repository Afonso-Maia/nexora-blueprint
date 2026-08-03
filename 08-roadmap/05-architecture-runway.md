# Architecture Runway

**Status:** Approved

## Decision

Operate a pull-based runway. Foundations are delivered at the latest responsible point before their consumers, except when Q0/Q1 risk, procurement lead time, migration safety, or scarce specialist access requires earlier work.

I0 establishes only the minimum paved road: repository boundaries, contract generation, Design System primitives, local/test/preview capability profiles, PostgreSQL module conventions, identity/session integration, authorization kernel, Audit contract, telemetry baseline, synthetic-data seams, and immutable artifact production.

Later runway is attached to named increments:

- Catalog ingestion and Search projection for I1;
- Compatibility and commercial fact contracts for I2;
- workflow, payment adapter, idempotency, and reconciliation for I3;
- provider delivery and federated projections for I4;
- evidence and external-work controls for I5;
- durable revision infrastructure for I6;
- governed tool and evaluation infrastructure for I7; and
- source gateways, approvals, bulk work, and export controls for I8.

## Admission and exit

Every runway item declares consumer, risk, owner, dependency, smallest useful scope, exit evidence, and expiry/review. A foundation without a near-horizon consumer or material transitive risk is not admitted.

Runway completion requires a consuming reference slice; package creation or infrastructure deployment alone is insufficient.

## References

- [Engineering Implementation Starting Boundaries](../06-engineering/37-phase-4-validation-and-implementation-handoff.md)
- [Delivery Increments](04-delivery-increments-and-vertical-slices.md)
