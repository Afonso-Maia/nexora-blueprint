# External-Provider Selection and Onboarding

**Status:** Approved

## Decision

Select replaceable managed providers for commodity capabilities while keeping domain authority and provider-neutral adapters inside Nexora.

Start long-lead evaluations in I0 for hosting/cloud, identity, payment, Search, queue, secrets/keys, telemetry, notification, media, and model orchestration. A provider is selected only when its consuming increment approaches forecast with approved evaluation evidence.

Evaluation covers capability, Brazil availability/residency, security/privacy, accessibility, sandbox fidelity, observability, quotas, failure semantics, data export/deletion, contractual constraints, cost ranges, support, portability, and exit.

## Onboarding gates

1. requirements and risks;
2. shortlist and paper assessment;
3. bounded adapter proof against fake/sandbox;
4. Security, Privacy, Accessibility, Legal/Procurement review as applicable;
5. contract and production-account readiness;
6. live-mode conformance, runbook, contacts, quotas, kill switch, reconciliation, and exit record.

No provider becomes source truth merely through selection. Exact selections remain in the provider register and use ADRs when cross-cutting or expensive to reverse.

## References

- [Technology-Selection Governance](../06-engineering/35-adr-and-technology-selection-governance.md)
- [Provider Adapter Conformance](../07-testing/14-external-provider-adapter-conformance.md)
