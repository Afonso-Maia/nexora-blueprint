# Test Levels and Types

**Status:** Approved

## Purpose

This document defines a shared taxonomy for evidence without coupling Nexora to a testing tool or encouraging duplicate suites.

## Decision

Nexora classifies evidence by **proof boundary**, **quality purpose**, and **execution context**.

A “test type” does not prescribe a repository folder, job, tool, or team. Each behavior has one primary proof layer and may have additional evidence only for a distinct risk.

## Proof levels

### Static

Evaluates source, generated artifacts, configuration, schemas, dependencies, and policies without executing product behavior.

### Unit

Executes one pure or isolated decision boundary with controlled collaborators and no production infrastructure.

### Component

Executes one rendered Design System or product component through public properties, semantic roles, user interactions, and observable effects.

### Module integration

Executes a domain or platform module through its public port with real owned infrastructure, especially PostgreSQL-compatible storage and production migrations.

### Contract

Proves compatibility and conformance between independently changing producers, consumers, adapters, or published artifacts.

### Journey

Executes a critical user or workforce outcome across deployed application and service boundaries.

### System and operational

Evaluates the deployed system’s performance, resilience, recovery, observability, security posture, synthetic behavior, or production safeguards.

## Quality-purpose types

Applicable purposes include:

- Functional and regression
- Property, model, and invariant
- Architecture and dependency conformance
- Accessibility and assistive technology
- Visual, theme, responsive, and density
- Localization and Brazilian formatting
- Authorization, security, privacy, and abuse
- Migration, consistency, backup, and restore
- Contract, compatibility, and adapter conformance
- Idempotency, asynchronous delivery, and reconciliation
- Failure injection, degradation, resilience, and disaster recovery
- Performance, load, stress, endurance, and capacity
- Observability and operational diagnostics
- Exploratory, usability, and product acceptance
- Synthetic and progressive production validation

These purposes can occur at several proof levels.

## Execution contexts

Evidence records whether it runs:

- On a developer workstation
- In hermetic CI
- With ephemeral real infrastructure
- In an isolated shared integration environment
- Against a provider sandbox
- In a production-like staging environment
- During progressive production exposure
- As a bounded production synthetic or operational drill
- Through structured manual review

The context must be only as broad as the proof requires.

## Test doubles

Use:

- **Stub:** controlled response for a narrow collaborator
- **Fake:** working simplified implementation preserving a declared contract
- **Simulator:** controlled behavioral model for timing, faults, or protocol states
- **Spy:** observation of a public interaction
- **Mock:** expectation-driven collaborator used sparingly at a stable port

Do not mock private implementation, duplicate source rules in a fake, or call an in-memory database equivalent to PostgreSQL integration.

Fidelity claims are versioned and tested by the adapter owner.

## Primary-layer rule

Choose the narrowest layer that contains the risk:

- Pure rule → unit/property
- Semantic interaction → component
- SQL, transaction, migration, outbox, or source authorization → module integration
- Producer/consumer compatibility → contract
- Cross-runtime navigation and composition → journey
- Capacity, failover, telemetry, or deployed policy → system/operational

Adding the same assertion to every layer is prohibited unless each assertion proves a different failure mode.

## Test shape

Tests use:

- clear preconditions and authoritative baseline;
- one meaningful action or controlled sequence;
- observable outcome and invariant assertions;
- explicit negative or recovery behavior where material;
- deterministic identity, time, randomness, and data;
- actionable diagnostics; and
- cleanup or isolation that does not depend on test order.

Tests do not rely on arbitrary sleeps, shared mutable order, hidden retries, pixel coordinates where semantics exist, or unbounded polling.

## Coverage language

Nexora distinguishes:

- **Requirement coverage:** approved behavior has evidence
- **Risk coverage:** identified failure modes and controls have evidence
- **State coverage:** material lifecycle and system states have evidence
- **Contract coverage:** supported producer/consumer transitions have evidence
- **Configuration coverage:** supported variants and combinations have evidence
- **Code coverage:** diagnostic indication of executed implementation

Code coverage can reveal gaps but cannot establish quality or release confidence alone.

## Rejected alternative

A classic unit/integration/end-to-end pyramid used without authority or risk semantics is insufficient. It obscures contracts, components, asynchronous behavior, operational evidence, and manual accessibility work. The layered portfolio retains its cost discipline while using Nexora’s actual proof boundaries.

## References

- [Phase 5 Framing](01-framing-quality-model-and-testing-portfolio.md)
- [Quality Risk Classification](02-quality-risk-classification.md)
- [Testing Interfaces](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md)
