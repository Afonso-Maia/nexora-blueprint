# Build-Versus-Buy and Procurement Timing

**Status:** Approved

## Decision

Prefer managed, replaceable services for undifferentiated infrastructure; build and own Nexora's differentiated authority, policies, orchestration, Compatibility, and experience contracts.

Managed candidates include hosting, identity, PostgreSQL operations, Search infrastructure, queues, secrets/keys, telemetry backend, payment processing, notification delivery, media processing, and model access. Nexora owns adapters, authoritative data, transaction semantics, policy, Audit, reconciliation, and exits.

Evaluate total lifecycle cost, delivery lead time, capability fit, Brazil support/residency, security/privacy, accessibility, operational load, failure control, observability, sandbox quality, portability, data exit, and concentration risk.

## Timing

Procurement begins when a forecast dependency's lead-time range could reach the committed horizon. Proofs are bounded and cannot become production behavior without the selection gate. Contracts must cover support, incidents, sub-processors, data handling, quotas, change notice, export/deletion, and termination.

Expensive-to-reverse selections require an ADR and affected Blueprint updates.

## References

- [External Providers](23-external-provider-selection-and-onboarding.md)
- [Technology-Selection Governance](../06-engineering/35-adr-and-technology-selection-governance.md)
