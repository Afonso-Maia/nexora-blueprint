# CI/CD Quality-Gate Integration

**Status:** Approved

## Decision

CI/CD applies progressive, risk-aware gates to the same build-once immutable artifacts promoted between environments. Fast deterministic evidence runs earliest; broader evidence runs when its faithful environment and decision point exist.

## Gate sequence

1. Pre-commit/local: formatting, types, focused unit/component, generated drift
2. Change CI: static/security/supply chain, affected unit/component/module, architecture, contracts
3. Integration: real database/migrations, events, adapters/fakes, accessibility, localization
4. Release candidate: full compatibility, selected journeys, visual, provider sandbox, performance/security/resilience evidence
5. Pre-production promotion: dossier completeness, approvals, migration/deployment compatibility, runbooks and rollback/repair
6. Progressive production: health, synthetics, telemetry, reconciliation, halt criteria
7. Scheduled/periodic: full matrices, endurance, restore, chaos, penetration, AT, provider drift, dependency reevaluation

Affected selection is based on dependency, contract-consumer, page/template, risk, and ownership graphs. Q0/Q1 transitive evidence and periodic full validation cannot be omitted by a narrow source diff.

Failed blocking gates stop promotion. Exceptions are policy-as-code records with authority, risk, scope, compensating control, expiry, and visible dossier entry. CI outage preserves production and uses only the approved equivalent-evidence emergency path.

Flaky retry cannot turn a failure green. Cached results bind exact inputs, toolchain, environment class, and evidence policy.

## References

- [CI/CD Architecture](../06-engineering/34-ci-cd-and-deployment-architecture.md)
- [Defect and Flake Policy](38-defect-triage-quarantine-and-flaky-test-policy.md)
