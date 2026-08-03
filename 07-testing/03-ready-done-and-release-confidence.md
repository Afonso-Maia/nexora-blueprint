# Ready, Done, and Release Confidence

**Status:** Approved

## Purpose

This document defines the evidence required before implementation begins, before a change is considered complete, and before an artifact is eligible for progressive production exposure.

## Decision

Nexora uses **risk-calibrated evidence contracts** for Definition of Ready, Definition of Done, and Release Confidence.

Completion is an evidence state, not a meeting outcome, test count, coverage percentage, or elapsed soak period.

## Definition of Ready

A material change is ready when:

1. the approved Blueprint requirement and owner are identified;
2. affected page IDs, templates, domains, contracts, data, roles, states, and providers are known;
3. outcome and change risk are classified;
4. acceptance examples include success, rejection, recovery, and degraded behavior as applicable;
5. source truth, transaction, authorization, accessibility, privacy, localization, performance, telemetry, and migration effects are explicit;
6. test seams, deterministic controls, fixtures, and environment needs are feasible;
7. unresolved product or architecture conflicts have returned to governance; and
8. controlled implementation values are recorded as such rather than invented by tests.

Exploratory technical work may precede readiness, but it cannot silently become production behavior.

## Definition of Done

A change is done when:

- Approved behavior and prohibited behavior are implemented and reviewed.
- Applicable static, unit/property, component, integration, contract, journey, and specialized evidence passes.
- Tests assert public outcomes and meaningful invariants.
- Required data classification, negative authorization, accessibility, localization, theme, responsive, failure, telemetry, and performance evidence exists.
- Migrations, events, APIs, caches, flags, queues, providers, and operations retain compatible recovery where affected.
- Documentation, contract artifacts, runbooks, and traceability are updated.
- New tests have an owner, stable data, diagnostic output, and justified execution layer.
- No silent retry, unexplained flake, expired quarantine, or unowned exception masks failure.
- Known residual risk is classified and explicitly accepted by the proper authority.

Passing tests cannot make a change done when required evidence is absent.

## Release confidence model

A release candidate receives confidence from an evidence dossier containing:

- Immutable artifact, source, configuration schema, migration, contract, ruleset, and Design System identities
- Included changes and affected-risk analysis
- Applicable gate results and evidence timestamps
- Critical-journey and specialist manual evidence
- Security, privacy, accessibility, performance, resilience, and operational findings
- Environment and test-data provenance
- Open defects, quarantines, exceptions, residual risks, owners, and expiries
- Deployment compatibility, rollback or forward-repair posture, and last known-good artifact
- Progressive exposure, synthetic checks, telemetry, halt conditions, and reconciliation readiness

Confidence is **Eligible**, **Conditionally eligible**, or **Not eligible**.

### Eligible

All required evidence is current and passing; no prohibited defect or exception exists; operational controls and progressive-delivery conditions are ready.

### Conditionally eligible

Only an explicitly permitted, bounded, reversible residual risk remains with authority approval, compensating control, monitoring, owner, expiry, and removal plan. Q0 gaps cannot be conditionally eligible.

### Not eligible

Any required evidence is missing, stale, failing, untraceable, or masked; a Blocker or High defect affects supported use; a required authority rejects release; or safe deployment and recovery conditions are absent.

## Evidence freshness

Evidence must correspond to the promoted artifact and compatible environment state.

- Static, deterministic, contract, migration, and automated suites run against the artifact’s exact source or build inputs.
- Environment-dependent evidence records environment, configuration class, provider mode, data revision, and time.
- Manual evidence records scope, tester, method, build, environment, and findings.
- Prior evidence may be reused only when impact analysis proves the relevant artifact, dependency, configuration, contract, and risk unchanged.

Calendar recency alone neither validates nor invalidates evidence.

## Gate application

Affected-test selection accelerates feedback but never omits:

- changed shared-contract consumers;
- dependency-boundary and compatibility gates;
- Q0/Q1 transitive risks;
- required release-candidate and periodic full-suite evidence; or
- manual and operational evidence assigned by policy.

Emergency delivery follows the approved equivalent-evidence path and retains retrospective completion obligations. It is not a bypass.

## Acceptance boundary

Product acceptance confirms approved intent and consequential outcomes. Quality authorities confirm their assigned evidence. Delivery leadership decides exposure only among eligible candidates and cannot redefine a failed quality contract.

## Rejected alternative

A single pass-rate or coverage threshold is rejected as the release-confidence model. It cannot express missing risk classes, stale environments, quarantined failures, manual accessibility evidence, provider ambiguity, migration safety, or operational readiness.

## References

- [Quality Risk Classification](02-quality-risk-classification.md)
- [CI/CD and Deployment Architecture](../06-engineering/34-ci-cd-and-deployment-architecture.md)
- [Phase 4 Handoff](../06-engineering/37-phase-4-validation-and-implementation-handoff.md)
