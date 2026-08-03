# Quality Risk Classification

**Status:** Approved

## Purpose

This document turns the approved seven-dimension [quality model](01-framing-quality-model-and-testing-portfolio.md) into a repeatable classification used to select evidence, review, environments, and release authority.

## Decision

Nexora uses **consequence-led quality risk tiers calibrated by exposure and change uncertainty**.

Risk is attached to an outcome, operation, data flow, or contract—not permanently to a page or repository package. One page may contain several risks with different tiers.

## Risk record

Each material risk records:

- Blueprint requirement and owning source
- User, operator, system, or data outcome
- Quality dimensions affected
- Failure mode and initiating conditions
- Consequence severity
- Exposure and likelihood
- Reversibility and recovery
- Authority, privacy, and security sensitivity
- Concurrency, consistency, and dependency uncertainty
- Accessibility criticality
- Detection and diagnosis difficulty
- Risk tier, owner, controls, required evidence, and residual risk

Unknown material information raises rather than lowers the provisional tier.

## Risk tiers

### Q0 — Safety or authority critical

Failure can cause unauthorized access or disclosure, data or financial corruption, duplicate or misdirected consequential work, inaccessible completion of a critical task, loss of required Audit evidence, or an unbounded recovery hazard.

Examples include:

- Payment, Order creation, refund, reservation, or promotion commitment invariants
- Source authorization and restricted-field disclosure
- Account recovery, workforce assurance, secrets, and payment-token handling
- Irreplaceable data migration, restore, replay, or reconciliation
- Critical Checkout, authentication, Support, or recovery barriers for disabled users

Required posture:

- Explicit invariant and negative evidence at the source boundary
- Deterministic adverse-condition coverage
- Real integration and applicable contract evidence
- Independent specialist review
- Critical composed journey or controlled operational proof where composition matters
- No open Blocker or High defect and no unmitigated exception

### Q1 — Business critical

Failure materially blocks, misleads, delays, or corrupts a principal customer or workforce outcome but has a bounded recovery path and does not meet Q0.

Examples include Search-to-Product continuity, Compatibility results, price or inventory presentation, PC Builder persistence, Order status, Support communication, and governed Admin publication.

Required posture:

- Invariant, boundary, recovery, accessibility, and representative composition evidence
- Relevant performance and observability evidence
- No open Blocker or High defect in supported use
- Exception only with named owner, compensating control, approval, and expiry

### Q2 — Standard

Failure causes significant friction, inconsistency, or localized loss of functionality with a viable alternative and bounded impact.

Required posture:

- Deterministic primary-layer evidence
- Applicable component, contract, accessibility, localization, and regression checks
- Representative integration when ownership or persistence crosses a boundary

### Q3 — Limited

Failure has low consequence, narrow exposure, simple detection, and straightforward reversible correction without misleading consequential state.

Required posture:

- Static and focused deterministic evidence
- Review and exploratory coverage proportionate to change
- Broader automation only when recurrence or shared usage justifies its cost

Q3 never exempts accessibility, security, privacy, or source-truth obligations.

## Risk calibration

The base consequence tier is raised when one or more apply:

- High traffic, repeated execution, or broad workforce scope
- Restricted or sensitive data
- Irreversible or externally committed effect
- At-least-once delivery, concurrency, clock, or provider ambiguity
- Low observability or difficult diagnosis
- New technology, provider, migration, rule language, or boundary
- History of defects or production incidents
- Critical assistive-technology dependence
- Shared component, template, contract, or source used by many consumers

It may be lowered only when approved controls demonstrably reduce consequence or exposure. Ease of writing a test is not a risk factor.

## Change-risk classes

Every change is also classified:

- **C0 — Foundational:** authority, transaction, security, accessibility foundation, shared schema, migration, platform, or cross-cutting contract
- **C1 — Material:** principal journey, shared component, domain rule, provider behavior, performance-sensitive path, or high-use state
- **C2 — Bounded:** localized compatible behavior with contained consumers
- **C3 — Routine:** documentation, non-semantic refactor, or narrow reversible correction with mechanical proof

Required evidence uses the higher demand created by outcome risk and change risk.

## Risk-to-evidence rules

1. Each Q0 and Q1 risk has a stable identifier and traceability to tests and release evidence.
2. Every consequential mutation covers success, rejection, duplicate, concurrency, timeout or ambiguity, retry safety, and reconciliation as applicable.
3. Every user-critical state covers keyboard, focus, announcement, zoom/reflow, content, responsive, and theme behavior as applicable.
4. External and asynchronous dependencies include failure, late, duplicate, reordered, malformed, and unavailable conditions.
5. Risk reduction can use prevention, detection, recovery, operational controls, or manual evidence; the record states which.
6. Coverage counts do not override a missing required proof.

## Reassessment triggers

Reclassify when:

- A Blueprint contract changes
- A new consumer, provider, market, payment method, role, or data class appears
- Usage, capacity, or threat evidence changes
- A defect or incident exposes an invalid assumption
- A test becomes flaky, quarantined, or removed
- An exception expires or a compensating control changes

## Rejected alternative

A probability-times-impact numeric score is not the governing model. It appears precise but encourages unsupported likelihood estimates and can average away accessibility, security, authority, and irreversible consequences. Quantitative measurements may inform calibration without replacing the four explicit tiers.

## References

- [Phase 5 Framing](01-framing-quality-model-and-testing-portfolio.md)
- [System States](../03-product-structure/08-error-empty-and-degraded-states.md)
- [Architectural Quality Gates](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md)
