# ADR-0038: Risk-Based Layered Quality Evidence

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora must prove complex commerce, accessibility, security, asynchronous, resilience, and operational contracts with a small initial engineering organization. A portfolio centered on extensive deployed browser journeys would provide useful composition evidence but would be slow, failure-prone, expensive to diagnose, and insufficient for exhaustive authority, concurrency, ambiguity, and assistive-technology behavior.

Phase 4 already establishes testable public seams, authority-aligned layers, real database integration, contract compatibility, provider conformance, a small critical-journey set, and blocking quality gates.

## Decision

Adopt risk-based layered evidence aligned with source ownership and transaction boundaries.

Use the lowest-cost deterministic evidence capable of proving a risk. Add broader deployed evidence only when composition, infrastructure, user-agent behavior, or production conditions are material to the claim.

The portfolio includes static, unit/property, component, module-integration, contract, critical-journey, specialized non-functional, and safe production evidence. Journey tests prove composition and remain deliberately small; they do not replace source-domain, module, or contract suites.

Risk classification determines required evidence depth, realism, review, and release authority. Code-coverage percentages and a single aggregate quality score cannot substitute for risk and requirement evidence.

## Alternatives

### Journey-first acceptance portfolio

Center the strategy on extensive browser-driven and deployed-environment acceptance coverage, supported by narrower isolated tests.

This was rejected as the governing portfolio because it increases execution time, environment coupling, flake, diagnostic ambiguity, and maintenance cost while providing weak control over duplicate delivery, races, indeterminate provider outcomes, crash recovery, authorization matrices, and exhaustive accessibility states.

Journey-first techniques remain valid for the bounded composition evidence assigned to them.

## Consequences

- Tests align with accountable source and transaction owners.
- Deterministic isolated evidence provides fast diagnosis and broad adverse-condition coverage.
- A small deployed suite and production diagnostics still prove composition.
- Teams must maintain several focused harness types, representative fixtures, faithful provider fakes, and explicit testability ports.
- Risk classification and evidence sufficiency require governance rather than mechanical coverage targets.
- Material changes to the portfolio direction or authority alignment require a superseding ADR.

## References

- [Phase 5 Framing, Quality Model, and Testing Portfolio](../07-testing/01-framing-quality-model-and-testing-portfolio.md)
- [Testing Interfaces and Architectural Quality Gates](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md)
- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)
