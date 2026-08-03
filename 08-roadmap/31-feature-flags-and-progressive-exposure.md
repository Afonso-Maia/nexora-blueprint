# Feature Flags and Progressive Exposure

**Status:** Approved

## Decision

Use typed, governed flags to decouple integration from exposure, operate kill switches, and bound migrations. Flags do not hold identity, permission, price, inventory, Compatibility, or lifecycle truth.

Each flag records key, type, owner, purpose, allowed contexts, safe default, creation, exposure stages, telemetry, halt condition, expiry, and removal increment. Consequential evaluation occurs at the source and records the flag revision; clients receive only safe evaluated values.

Exposure advances from staff/test identities to synthetic, limited pilot cohorts, beta cohorts, and GA based on artifact-bound evidence. Cohorts use privacy-safe stable assignment and explicit eligibility. Q0 effects are not experiments.

## Failure and retirement

Provider loss uses an explicit fail-safe default. A flag can stop new exposure but cannot conceal unsafe committed data or external effects; reconciliation and forward repair remain necessary.

Expired flags block release. The owning increment removes flag branches after stable exposure or abandonment and proves both prior paths no longer create configuration debt.

## References

- [Dependency and Configuration Management](../06-engineering/33-dependency-configuration-and-environment-management.md)
- [Build-Once Progressive Delivery](../adrs/ADR-0037-build-once-immutable-progressive-delivery.md)
