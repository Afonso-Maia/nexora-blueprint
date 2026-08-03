# Phase 5 Framing, Quality Model, and Testing Portfolio

**Status:** Approved

## Purpose

This document establishes the mission, scope, quality model, risk basis, and evidence portfolio for Phase 5 — Testing Strategy and Quality Validation.

Phase 5 elaborates the testable seams and blocking gates approved in [Testing Interfaces and Architectural Quality Gates](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md). It does not redefine product behavior, source authority, Design System contracts, engineering boundaries, or legal and operational policy.

## Decision

Nexora uses **risk-based layered evidence aligned with source ownership and transaction boundaries**.

Lower-cost deterministic evidence proves most behavior at the narrowest authoritative seam. Broader deployed evidence proves composition, infrastructure, user-agent behavior, and operational conditions that cannot be established credibly in isolation.

The portfolio combines:

- Static and architectural conformance
- Unit and property-based tests
- Semantic component and Design System tests
- Module integration through public ports
- API, event, and provider-adapter contracts
- A deliberately small critical customer and workforce journey suite
- Security, accessibility, localization, resilience, performance, recovery, and observability evidence
- Manual, exploratory, usability, acceptance, assistive-technology, and safe production validation where human judgment or deployed conditions are material

Journey tests prove composition but never replace source-domain, contract, or module evidence.

## Mission

Phase 5 defines how teams demonstrate that Nexora:

1. produces correct and truthful outcomes;
2. preserves authority, integrity, privacy, and consequential-operation safety;
3. remains accessible and usable for Brazilian users;
4. behaves explicitly under concurrency, eventual consistency, ambiguity, and partial failure;
5. satisfies performance, resilience, diagnostics, and release contracts; and
6. can change without an unnecessarily slow, brittle, or duplicative test estate.

Testing provides evidence against approved requirements and risks. It does not create new product truth.

## Quality model

Nexora evaluates seven quality dimensions.

### Functional correctness

Approved outcomes, invariants, calculations, lifecycle transitions, rejection behavior, persistence, restoration, and recovery are correct.

### Authority and integrity

Source ownership, authorization, transaction boundaries, consistency, idempotency, compensation, and reconciliation remain intact.

### Human usability and inclusion

Semantic accessibility, assistive technology, responsive continuity, input methods, themes, density, Brazilian Portuguese, comprehensibility, and recovery support the approved user goal.

### Security and privacy

Confidentiality, non-disclosure, abuse resistance, data minimization, purpose limitation, secrets, Audit integrity, and supply-chain controls satisfy approved boundaries.

### Resilience and continuity

Degraded operation, partial failure, provider ambiguity, asynchronous recovery, restoration, and disaster procedures preserve truthful safe behavior.

### Performance and capacity

Experience and service budgets, throughput, saturation, endurance, load shedding, and capacity assumptions protect critical paths.

### Operability and change safety

Telemetry, diagnostics, migrations, compatibility, progressive delivery, repair, rollback where safe, test maintainability, and evidence retention support controlled change.

No single score substitutes for these dimensions. Release confidence requires applicable evidence across them.

## Risk classification

Every capability, operation, change, and defect is classified using:

- Consequence severity
- Likelihood and exposure
- Authority and data sensitivity
- Reversibility
- Concurrency and consistency complexity
- External-dependency uncertainty
- Affected-user breadth
- Accessibility criticality
- Detectability and diagnostic difficulty

Risk classification determines required evidence depth, independence, environment realism, review, and release authority. It does not reduce quality to code-coverage percentages.

Exact tier definitions, decision rights, and evidence requirements are defined in the later Phase 5 quality-risk decision.

## Evidence selection rule

Use the lowest-cost deterministic evidence capable of proving the risk, then add broader evidence only when composition or deployed conditions are themselves material.

| Evidence layer | Primary proof |
| --- | --- |
| Static | Types, schemas, dependency direction, forbidden access, secrets, licenses, and policy structure |
| Unit and property | Pure invariants, calculations, policies, serialization, rule spaces, and boundary conditions |
| Component | Semantics, interaction, states, themes, density, responsive behavior, and localization |
| Module integration | Public port, real PostgreSQL-compatible storage, authorization, outbox, consistency, and migrations |
| Contract | OpenAPI, events, callbacks, provider behavior, compatibility, and version transitions |
| Journey | Critical outcomes and recovery across deployed customer and workforce runtimes |
| Specialized validation | Security, privacy, accessibility, resilience, recovery, performance, capacity, and diagnostics |
| Production evidence | Bounded synthetic monitoring, progressive exposure, telemetry, and reconciliation without unsafe experimentation |

Evidence asserts externally meaningful outcomes and invariants rather than private implementation.

## Portfolio controls

1. A behavior is proven primarily at one accountable layer; duplication requires a distinct risk or composition purpose.
2. Consequential operations require rejection, ambiguity, duplication, retry, and reconciliation evidence in addition to success.
3. Eventual consistency is tested with explicit source, projection, watermark, delay, and recovery expectations.
4. Accessibility combines automation with manual keyboard, zoom, reflow, forced-color, reduced-motion, and assistive-technology evidence.
5. Critical journey coverage remains deliberately small, stable, observable, and representative.
6. Snapshot tests are restricted to reviewed stable structured or visual contracts and cannot conceal semantic assertions.
7. Time, identity, randomness, queues, flags, external calls, and failure injection use explicit controllable ports where approved.
8. Test data is deterministic, synthetic, classified, and representative of Brazilian commerce behavior.
9. Production code cannot depend on test-only behavior.
10. Flaky tests cannot be silently retried into success.

## Criticality order

Testing protects these outcomes before optional experience enhancement:

1. Identity, authorization, privacy, secrets, and restricted-data non-disclosure
2. Checkout, payment, Order creation, commercial commitment, and duplicate prevention
3. Current Orders, fulfillment, Support obligations, recovery, and consequential Admin work
4. Catalog, Search, Compatibility, Pricing, Inventory, PC Builder, and Account continuity
5. Accessibility, localization, responsive semantics, and system-state truth across every applicable layer
6. Optional AI, recommendations, media enhancement, analytics, and other degradable capabilities

This order guides risk and failure handling; it does not permit lower-ranked capabilities to bypass their approved gates.

## Ownership alignment

- Authors own evidence affected by their changes.
- Source-domain owners own invariant, policy, module, data, and source-contract suites.
- Design System owners own shared component and reference-composition conformance.
- Experience owners own BFF composition and critical customer or workforce journeys.
- Adapter owners own provider conformance and reconciliation evidence.
- Platform owners own shared runners, environments, architecture enforcement, and CI integration.
- Security, Privacy, Accessibility, and operational authorities retain blocking review where the Blueprint assigns it.

Detailed responsibility, independence, escalation, and exception rules are defined later in Phase 5.

## Rejected portfolio

An extensive journey-first acceptance portfolio is not adopted.

It provides useful customer-facing demonstration but is a poor primary proof for Nexora because:

- domain and authorization failures become harder to localize;
- duplicate delivery, races, clock boundaries, ambiguous provider outcomes, and crash points are difficult to exercise deterministically;
- deployed timing and shared environments increase flake and execution time;
- exhaustive accessibility and restricted-field combinations remain impractical;
- maintenance cost grows with every composed dependency; and
- broad happy-path coverage can conceal missing source invariants.

Browser-driven and deployed acceptance tests remain part of the approved layered portfolio at the composition boundary.

## Phase boundary

### Phase 5 owns

- Quality and risk classification
- Evidence requirements and test taxonomy
- Coverage, ownership, maintenance, defect, flake, quarantine, and exception policy
- Test data and environment requirements
- Browser, device, viewport, input, network, and assistive-technology coverage
- CI/CD gate semantics and release-confidence evidence
- Manual, exploratory, usability, acceptance, synthetic, and safe production-validation boundaries
- Traceability to all 89 canonical pages and nine templates
- Phase 5 validation and handoff

### Delivery Roadmap owns

- Staffing and team allocation
- Implementation slices, milestones, dependencies, and dates
- Provider procurement timing
- Environment-provisioning sequence
- Automation backlog sequencing
- Release trains, launch waves, rollout order, and launch calendar
- Operational staffing and resourcing required to satisfy approved gates

Phase 5 defines what evidence is required for release. It does not decide when, by whom, or in which implementation wave the release is delivered.

## Governance

1. Blueprint requirements and risks are the source for tests and evidence.
2. A test cannot silently redefine an approved outcome to make it pass.
3. Missing testability is an architectural issue returned to the owning contract.
4. Conflicting requirements return to Blueprint governance.
5. Exceptions are explicit, owned, risk-approved, expiring, and visible in release evidence.
6. Material changes to the evidence portfolio or its authority alignment require ADR review.

## Consequences

### Benefits

- Fast deterministic evidence carries most routine confidence.
- Failures identify an accountable owner and seam.
- Consequential and asynchronous behavior can be exercised under controlled adverse conditions.
- Deployed journeys remain valuable without dominating cost and flake.
- The strategy scales from a small team without requiring a separate duplicate test estate.

### Costs and risks

- Several focused harness types require shared conventions.
- Representative fixtures, provider fakes, and failure controls require continuing ownership.
- Risk classification requires judgment and periodic recalibration.
- An undersized journey suite could miss composition defects unless traceability and production evidence remain strong.

## References

- [Product Principles](../00-overview/product-principles.md)
- [Phase 2B Validation](../03-product-structure/10-phase-2b-validation.md)
- [Component Lifecycle and Quality](../04-design-system/24-component-lifecycle-and-quality.md)
- [Phase 3 Validation](../04-design-system/27-phase-3-validation.md)
- [Testing Interfaces and Architectural Quality Gates](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md)
- [Phase 4 Validation and Implementation Handoff](../06-engineering/37-phase-4-validation-and-implementation-handoff.md)
- [ADR-0038](../adrs/ADR-0038-risk-based-layered-quality-evidence.md)
