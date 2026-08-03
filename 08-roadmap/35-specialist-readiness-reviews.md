# Security, Privacy, Accessibility, Performance, and Resilience Readiness Reviews

**Status:** Approved

## Decision

Use continuous specialist participation plus formal risk-calibrated exposure reviews. A late omnibus certification is rejected.

| Review | Required focus |
| --- | --- |
| Security | threat model, identity/authorization, secrets, supply chain, abuse, providers, incident controls |
| Privacy | data map/classification, purpose, minimization, consent/policy inputs, retention/deletion/export, telemetry |
| Accessibility | WCAG 2.2 AA, keyboard/focus, AT, zoom/reflow, themes, content, third parties |
| Performance/capacity | budgets, workload model, headroom, overload, provider limits, client experience |
| Resilience/recovery | failure semantics, retries, idempotency, reconciliation, backups/restores, regional posture |

Reviews occur during framing for Q0/Q1 work, before provider/architecture lock-in, at candidate readiness, and before pilot/beta/GA as risk requires. Evidence is tied to the artifact, environment, configuration, providers, data, and exposure scope.

## Authority

Assigned qualified authorities accept, conditionally accept where policy allows, or block their domain. Delivery cannot overrule a blocking contract. Findings have severity, owner, containment, due gate, and closure evidence.

## References

- [Specialist Capacity](27-specialist-capacity.md)
- [Release Confidence](../07-testing/03-ready-done-and-release-confidence.md)
