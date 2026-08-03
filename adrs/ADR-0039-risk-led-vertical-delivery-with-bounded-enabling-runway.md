# ADR-0039: Risk-Led Vertical Delivery with Bounded Enabling Runway

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora combines consequential commerce, multiple authoritative domains, external providers, asynchronous operations, a customer and workforce ecosystem, WCAG 2.2 AA, pt-BR-first behavior, and risk-based release evidence. A small initial organization must produce usable outcomes without postponing authority, security, accessibility, recovery, or operational safety.

A broad horizontal build could standardize technical layers before feature assembly, but would delay integrated evidence and make provider, composition, and operational risks visible only after substantial investment. An ungoverned feature-first approach would create the opposite failure: attractive interfaces without authoritative behavior or release confidence.

## Decision

Organize Phase 6 around risk-led vertical increments with bounded enabling runway.

A completed increment crosses every boundary necessary for a coherent outcome, including authoritative source behavior, operations, accessibility, localization, security, observability, recovery, and risk-calibrated evidence. Non-authoritative demonstrations are technical spikes, not completed increments.

Admit runway only for named near-horizon increments, shared contracts with demonstrated near-term consumers, disproportionate Q0/Q1 risk, or time-sensitive provider and specialist dependencies. Every runway item has an owner, consumer or risk, exit evidence, and review or expiry point.

Use committed, forecast, and directional planning horizons. Commitment is conditional on recorded scope, dependency, capacity, provider, and evidence assumptions and does not convert forecast dates into unconditional promises.

## Alternative

### Layer-complete horizontal buildout

Complete broad platform, Design System, data, service, and testing layers before assembling integrated journeys.

This remains viable for particular admitted runway work but is rejected as the governing model because it spreads small-team capacity across unfinished foundations, delays usable outcomes, and postpones proof at Nexora's highest-risk boundaries.

## Consequences

- Integrated customer, workforce, and operational evidence appears earlier.
- Architecture runway is explicit and tied to bounded demand.
- Accessibility, security, source authority, and operational readiness cannot be deferred behind interface delivery.
- Teams must perform disciplined dependency analysis and may refactor shared foundations as proven use expands.
- Horizon movement and runway admission require continuing roadmap governance.
- Material changes to the delivery model require a superseding ADR.

## References

- [Phase 6 Framing and Delivery-Planning Model](../08-roadmap/01-framing-and-delivery-planning-model.md)
- [Phase 4 Validation and Implementation Handoff](../06-engineering/37-phase-4-validation-and-implementation-handoff.md)
- [Phase 5 Validation and Delivery-Roadmap Handoff](../07-testing/45-phase-5-validation-and-delivery-roadmap-handoff.md)
- [ADR-0037](ADR-0037-build-once-immutable-progressive-delivery.md)
- [ADR-0038](ADR-0038-risk-based-layered-quality-evidence.md)
