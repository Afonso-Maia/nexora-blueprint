# Identity, Authorization, Security, Privacy, and Audit Foundation

**Status:** Approved

## Decision

Deliver the minimum trustworthy control plane in I0 before any private data or consequential command, then deepen controls with each increment.

I0 includes managed-identity selection gates, opaque server sessions, customer/workforce separation, shared authorization-policy kernel, deny-by-default source enforcement, assurance hooks, managed secret references, data classification, privacy-safe telemetry, threat modeling, and append-only Audit correlation.

I3 adds payment and Checkout threat controls, step-up assurance, idempotent effect authorization, and reconciliation. I4 adds guest claim, privacy workflows, account restrictions, and notification preferences. I5 adds evidence classification and provider packages. I8 adds scoped workforce fields, approvals, bulk/export controls, segregation, and enhanced Audit review.

## Gates

- Experience permission awareness never substitutes for source enforcement.
- No production personal data exists before retention, access, deletion/export, incident, and logging controls are ready.
- High-risk changes require independent Security or Privacy evidence.
- Exact providers, retention values, and workforce assignments remain controlled selections.

## References

- [Identity Architecture](../06-engineering/12-identity-sessions-authentication-and-assurance.md)
- [Security, Privacy, Secrets, and Audit](../06-engineering/27-security-privacy-secrets-and-audit.md)
