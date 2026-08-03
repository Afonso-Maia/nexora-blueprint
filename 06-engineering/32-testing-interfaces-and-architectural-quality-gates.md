# Testing Interfaces and Architectural Quality Gates

**Status:** Approved

## Decision

Phase 4 defines testable seams and blocking architectural gates; the later Testing phase defines the full QA strategy, coverage program, environments, and release test plans.

Tests follow the authority boundary: pure domain decisions are tested without infrastructure, module contracts are tested at their public ports, adapters are verified against provider sandboxes or faithful fakes, and a small set of end-to-end journeys proves composition. Production code does not depend on test-only behavior.

## Test interfaces

- Domain modules expose public commands, queries, events, policies, and deterministic clocks/identity ports.
- OpenAPI contracts generate schema fixtures and compatibility checks.
- Events carry versioned schemas with producer and consumer contract tests.
- Provider adapters have conformance suites covering success, timeout, retry, duplicate, decline, and ambiguous outcomes.
- Database tests use real PostgreSQL-compatible instances and production migrations.
- Search tests use representative Portuguese queries, governed facets, ranking judgments, and index-version fixtures.
- Compatibility uses immutable ruleset fixtures and explanation snapshots.
- UI primitives and components expose semantic roles and states, not test-only selectors; stable identifiers are limited to composite flows.
- Time, randomness, queues, flags, and external calls are controllable through explicit ports.

## Test layers

| Layer | Primary proof |
| --- | --- |
| Static | Types, schemas, lint, dependency boundaries, forbidden imports |
| Unit/property | Domain invariants, policy, calculations, serialization, accessibility helpers |
| Component | Semantics, interaction, responsive state, themes, localization |
| Module integration | Public port plus real database, outbox, migrations, authorization |
| Contract | OpenAPI/event compatibility and provider-adapter conformance |
| Journey | Critical customer and workforce outcomes across deployed runtimes |
| Resilience/performance | Failure injection, retry/idempotency, restoration, budgets and capacity |

Tests assert outcomes and invariants rather than private implementation. Snapshot tests are restricted to stable structured output and reviewed changes.

## Blocking quality gates

Every change must pass the applicable:

1. formatting, lint, type, secret, license, and vulnerability checks;
2. architecture boundary and dependency-direction checks;
3. unit and affected module-integration suites;
4. contract backward-compatibility checks;
5. migration expand/contract and rollback-safety checks;
6. Design System visual, theme, responsive, and semantic checks;
7. automated accessibility plus required manual/assistive-technology evidence;
8. bundle and service performance budgets;
9. security policy and authorization negative tests;
10. idempotency, duplicate-delivery, partial-failure, and reconciliation tests for consequential work;
11. localization key, interpolation, formatting, and content-overflow checks;
12. trace propagation, required telemetry, and redaction checks.

Flaky tests cannot be silently retried into success. Quarantine requires an owner, linked issue, risk assessment, expiry, and replacement protection.

## Critical journey contract

The minimum architectural journey set covers Search to Product, Comparison, PC Builder to Cart, Cart to authoritative Order outcome, authentication continuation, Order and Account continuity, Support Case creation and update, AI absence/degradation, and permission-filtered Admin work. Each journey includes at least one rejection or recovery path.

Journey coverage proves composition but does not replace source-module tests.

## Test data

Factories produce deterministic, classified, synthetic data. Production personal or payment data is prohibited outside explicitly governed diagnostic workflows. Reference datasets include catalog attributes, Compatibility unknowns/conflicts, price and inventory races, Brazilian addresses and formatting, permissions, lifecycle transitions, and accessibility content extremes.

## Ownership

The author owns affected tests. Domain owners own invariant and contract suites; Design System owners own component conformance; platform owns shared runners and architecture gates. A gate exception is recorded, risk-approved, time-bound, and visible in the handoff.

## Consequences

- The architecture provides seams for fast evidence and realistic integration proof.
- Quality checks align with source and transaction ownership.
- Later Testing work can add depth without changing architecture boundaries.
- Maintaining representative data, provider fakes, and non-flaky journeys is ongoing product work.

## References

- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [API and BFF Strategy](09-api-and-bff-strategy.md)
- [Accessibility Engineering](28-accessibility-engineering.md)
- [Performance Budgets](30-performance-budgets-and-capacity-assumptions.md)
- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)
