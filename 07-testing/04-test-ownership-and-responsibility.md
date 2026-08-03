# Test Ownership and Responsibility

**Status:** Approved

## Purpose

This document assigns accountability for quality risks, evidence, test infrastructure, failure diagnosis, specialist approval, and release decisions.

## Decision

Nexora uses **embedded quality ownership with independent specialist authority and platform enablement**.

Quality is not handed to a downstream QA team. The team that owns an approved behavior owns its primary evidence and diagnosis. Independent review is required where consequence, regulation, accessibility, security, privacy, or operational risk warrants it.

## Responsibility model

| Concern | Accountable owner | Required partners |
| --- | --- | --- |
| Domain invariant and lifecycle | Source-domain owner | Product, Quality Engineering |
| Public module port and database | Source-domain owner | Data/platform |
| API/BFF composition | Experience and contract owner | Source consumers |
| Event schema and producer behavior | Producer owner | Registered consumers |
| Consumer idempotency and outcomes | Consumer/source owner | Producer and platform |
| Provider conformance | Adapter owner | Source domain, Security, Operations |
| Design System contract | Design System owner | Accessibility, content, consuming domains |
| Customer journey | Customer Experience owner | Participating source domains |
| Admin workflow | Admin Experience owner | Source domain, Security, workforce operations |
| Accessibility | Feature owner | Accessibility authority |
| Security and privacy | Feature/source owner | Security and Privacy authorities |
| Performance and resilience | Runtime/source owner | Platform and Operations |
| Shared test tooling and runners | Platform Quality owner | All consumers |
| Release evidence dossier | Release owner | All evidence owners and blocking authorities |

Accountability remains named even when implementation or execution is delegated.

## Author responsibilities

The author of a change:

- identifies affected requirements and risks;
- updates the primary evidence at the correct layer;
- avoids redundant tests without a distinct purpose;
- provides stable fixtures and diagnostic assertions;
- investigates failures caused by the change;
- updates traceability and documentation; and
- does not weaken, skip, re-record, or reclassify evidence solely to pass a gate.

## Domain and experience ownership

Source-domain owners own business invariants, source authorization, state transitions, public ports, schemas, persistence, outbox/inbox behavior, and reconciliation.

Experience owners own rendering, BFF composition, user-agent behavior, host-owned system states, and a small cross-domain journey suite. They cannot duplicate source rules as presentation truth.

## Specialist authorities

Accessibility, Security, Privacy, Legal, Data, and Operations retain decision rights established by the Blueprint.

For Q0 and applicable Q1 risks:

- the implementer cannot be the sole approver;
- evidence includes independent review or execution appropriate to the discipline;
- disagreement is recorded and escalated to Blueprint governance; and
- schedule pressure does not convert a rejected risk into acceptance.

Specialist teams supply standards, threat or test methods, shared tooling, consultation, and independent evidence. They do not absorb feature ownership.

## Platform Quality responsibilities

Platform Quality owns:

- common test contracts and project conventions;
- deterministic clock, identity, queue, network, and provider controls;
- test runners, isolation mechanisms, evidence publishing, and CI integration;
- environment provisioning and reset capabilities;
- flake telemetry and quarantine enforcement;
- architecture, schema, dependency, and supply-chain gates; and
- enablement that keeps domain teams autonomous.

It cannot become a universal test-authoring bottleneck.

## Failure ownership

Every failing test has:

- an owning product or platform area;
- the failed requirement or invariant;
- captured artifact, environment, seed, operation, correlation, and diagnostic context;
- an initial classifier responsible for routing; and
- an escalation path when ownership is ambiguous.

The test owner fixes a defective test. The behavior owner fixes a product defect. Shared-environment owners fix infrastructure faults. Classification does not permit deleting inconvenient evidence.

## Release authority

The release owner assembles evidence but does not override blocking authorities.

- Domain owners attest applicable source invariants.
- Security and Privacy approve assigned critical risks.
- Accessibility has blocking authority over supported critical behavior.
- Platform and Operations attest deployment, capacity, resilience, and diagnostic readiness.
- Product acceptance confirms alignment with approved intent.

Conditional eligibility follows [Release Confidence](03-ready-done-and-release-confidence.md).

## Small-team application

Initially, roles may be held by the same person, but responsibilities remain explicit. Required independence can use another qualified engineer, external specialist, structured peer review, or recorded acceptance authority. Headcount limitations do not erase Q0 review.

## Rejected alternative

A centralized QA ownership model is rejected. It creates a late handoff, separates tests from source knowledge, weakens diagnosis, and cannot scale across all Nexora domains. Central expertise remains valuable as enablement and independent authority.

## References

- [Design System Component Quality](../04-design-system/24-component-lifecycle-and-quality.md)
- [Architectural Quality Gates](../06-engineering/32-testing-interfaces-and-architectural-quality-gates.md)
- [Quality Risk Classification](02-quality-risk-classification.md)
