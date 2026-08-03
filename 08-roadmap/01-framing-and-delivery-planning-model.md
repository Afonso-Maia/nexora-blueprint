# Phase 6 Framing and Delivery-Planning Model

**Status:** Approved

## Purpose

This decision establishes how Nexora turns the approved Blueprint into a dependency-aware delivery roadmap without treating dates as unconditional commitments or allowing sequencing to redefine product, architecture, or quality authority.

## Decision

Nexora uses **risk-led vertical increments with bounded enabling runway**.

Each increment crosses the experience, BFF, authoritative source domain, data, operational, and quality-evidence boundaries required for one coherent outcome. Architecture runway is pulled forward only for bounded near-horizon increments, shared contracts already proven necessary, Q0/Q1 risk reduction, or time-sensitive provider and specialist dependencies.

Layer-complete horizontal buildout is not the governing model. Horizontal foundations remain valid when they meet the runway admission rules, but completion of a technical layer is not itself a delivery outcome.

## Delivery principles

1. Sequence integrated outcomes, not isolated layer-completion percentages.
2. Retire authority, security, accessibility, provider, recovery, and operational risks early.
3. Build only the shared runway justified by named increments or material transitive risk.
4. Preserve build-once immutable promotion and progressive exposure from the first releasable slice.
5. Apply pt-BR, WCAG 2.2 AA, responsive semantics, security, privacy, observability, and risk-calibrated evidence from the beginning.
6. Keep dates conditional on visible scope, dependency, capacity, provider, and evidence assumptions.
7. Return conflicts with approved truth to Blueprint governance rather than resolving them through schedule changes.

## Planning horizons

### Committed horizon

The next one or two evidence-ready increments. Each has credible scope, owners, capacity, dependencies, entry conditions, exit evidence, and controlled assumptions. Commitment applies to the outcome and evidence under recorded assumptions; it is not an unconditional date promise.

Entry requires the approved Definition of Ready, resolved blocking dependencies, assigned ownership, adequate specialist capacity, and no invented controlled value.

### Forecast horizon

Subsequent dependency-shaped increments. Their sequence and delivery ranges are forecasts. Staffing, provider, technical, and learning assumptions remain explicit and are reviewed at decision gates.

### Directional horizon

Later capabilities and launch waves. This horizon preserves dependency intent and complete Blueprint coverage without creating false precision. Directional work becomes forecast only after its material dependencies and decision gates are understood.

## Valid vertical increment

An increment is valid only when it:

1. delivers a coherent customer, workforce, or operational outcome;
2. identifies every affected canonical page and template;
3. reaches the authoritative source domain rather than ending at a mocked interface;
4. preserves ownership, permission, lifecycle, transaction, and operation-outcome boundaries;
5. covers applicable success, rejection, degraded, recovery, and ambiguous outcomes;
6. satisfies applicable accessibility, pt-BR, privacy, security, theme, and responsive contracts;
7. includes necessary telemetry, Audit, reconciliation, runbook, and operational controls;
8. is deployable as an immutable artifact through an approved environment path;
9. carries risk-calibrated evidence appropriate to its intended exposure;
10. can be safely limited, halted, or removed without corrupting authoritative truth; and
11. retires a named risk, dependency, or learning objective.

A fixture-backed or non-authoritative demonstration may be an explicitly labelled technical spike. It is not a completed vertical increment and does not establish release eligibility.

## Enabling-runway admission

Runway work is admitted when at least one condition holds:

- the next committed or forecast increment requires it;
- two or more near-horizon increments need the same stable contract;
- postponement creates disproportionate Q0/Q1 authority, security, privacy, accessibility, migration, resilience, or recovery risk; or
- provider procurement, sandbox access, compliance review, or scarce specialist capacity must begin before the consuming increment.

Every runway item names its consuming increment or risk, accountable owner, exit evidence, and review or expiry point. Shared abstractions normally follow proven use unless an approved contract already requires them.

## Controlled values

Phase 6 may select or constrain a controlled value when it materially changes feasibility, dependency order, procurement lead time, capacity, or readiness and the approved selection governance is followed. Examples include:

- provider evaluation windows and decision deadlines;
- environment-provisioning order and capability profiles;
- initial team and specialist-capacity assumptions;
- release cadence and progressive-exposure stages;
- procurement lead-time and representative launch-volume ranges; and
- readiness-review, drill, training, evidence-retention, and support-coverage assumptions needed for planning.

Exact tool versions, final providers and regions, quotas, retention periods, service objectives, recovery targets, provider limits, browser/device/assistive-technology versions, legal and commerce policy, and final workforce assignments remain in governed implementation or procurement registers unless their absence blocks responsible sequencing.

When a deferred value blocks sequencing, Phase 6 schedules an owned decision gate. It does not guess the value or silently approve it.

## Guardrails

### Against excessive platform-first work

- Every runway item identifies the bounded outcome or Q0/Q1 risk it enables.
- Runway has explicit completion evidence and a review or expiry point.
- Milestones are integrated outcomes and evidence states, not percentages of technical layers.
- A broad foundation without a near-horizon consumer returns to roadmap review.

### Against UI-first work

- Completion requires authoritative persistence or an explicitly approved source read model.
- Consequential actions include source-enforced authorization, idempotency, Audit, failure semantics, reconciliation, and recovery.
- Accessibility, localization, security, privacy, telemetry, and applicable quality gates are part of Done.
- Mock-provider and fake-data demonstrations remain labelled preview evidence and cannot imply release eligibility.

## Alternative considered

### Layer-complete horizontal buildout

Complete broad platform, Design System, data, service, and testing layers before assembling customer and workforce journeys.

This can establish uniform foundations before feature assembly, but it delays integrated authority and provider evidence, spreads a small team across unfinished layers, hides composition risk, and postpones usable outcomes and operational learning. Nexora therefore retains horizontal work only through the bounded runway rules rather than adopting it as the governing delivery model.

## Governance

- Movement between horizons is an explicit roadmap decision supported by current evidence.
- Scope, dependency, assumption, and confidence changes remain visible in controlled registers.
- A failed Blueprint or quality gate changes sequence, exposure, or scope; it is not weakened to protect a milestone.
- Material change to this planning model or its authority alignment requires ADR review.

## Consequences

### Benefits

- Integrated learning and consequential-risk evidence arrive earlier.
- Small-team capacity concentrates on bounded usable outcomes.
- Provider, authorization, accessibility, recovery, and operational uncertainty surface before broad investment.
- Architecture runway remains deliberate without becoming a long horizontal program.

### Costs and risks

- Increment boundaries require disciplined dependency and authority analysis.
- Some shared foundations will evolve after their first consumers and require governed refactoring.
- Horizon confidence and runway admission require recurring judgment rather than a static feature calendar.
- Poorly bounded slices could recreate UI-first delivery unless the completion criteria remain enforced.

## References

- [Phase 6 Index](README.md)
- [Product Roadmap](../00-overview/roadmap.md)
- [Phase 4 Validation and Implementation Handoff](../06-engineering/37-phase-4-validation-and-implementation-handoff.md)
- [Ready, Done, and Release Confidence](../07-testing/03-ready-done-and-release-confidence.md)
- [Phase 5 Validation and Delivery-Roadmap Handoff](../07-testing/45-phase-5-validation-and-delivery-roadmap-handoff.md)
- [ADR-0039](../adrs/ADR-0039-risk-led-vertical-delivery-with-bounded-enabling-runway.md)
