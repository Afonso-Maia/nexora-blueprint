# Release-Train and Integration Strategy

**Status:** Approved

## Decision

Use continuous trunk integration with a regular releasable-candidate cadence, not long-lived release branches or synchronized feature trains.

Short-lived branches merge through risk-aware checks. Main remains releasable. Build-once artifacts are produced continuously; a release candidate is cut by evidence and intended exposure, not by rebuilding.

A small initial organization uses a default weekly candidate review when active delivery warrants it, with cadence calibrated in the controlled register. Capabilities can skip a train without blocking unrelated eligible units. Database and contract changes remain backward/forward compatible through expand/migrate/switch/contract.

Feature flags decouple code integration from exposure. Stabilization happens on trunk through fixes or exposure controls. Emergency delivery uses the same source, artifacts, evidence semantics, and retrospective obligations.

## Gate

No calendar train forces an ineligible change into production. Independently deployable units coordinate through contract, migration, queue, and consumer compatibility evidence rather than lockstep release.

## References

- [CI/CD Architecture](../06-engineering/34-ci-cd-and-deployment-architecture.md)
- [Feature Flags](31-feature-flags-and-progressive-exposure.md)
