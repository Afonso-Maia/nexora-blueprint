# ADR-0018: Managed Identity and Server-Side Sessions

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora needs accessible customer authentication, strongly protected workforce access, guest continuity, explicit assurance, reliable revocation, and secure workload propagation. The initial team should not invent credential infrastructure, but domain authorization and identity portability cannot be delegated to a vendor.

Viable approaches included:

1. Managed standards-based identity behind Nexora-owned adapters and opaque BFF sessions
2. A Nexora-built credential, federation, and token service
3. Provider tokens held by the browser and forwarded directly to domain APIs

## Decision

Use a managed identity provider behind Nexora-owned identity, session, assurance, recovery, and provider-adapter contracts.

Use OpenID Connect and OAuth 2.0 Authorization Code with PKCE for federation. Prefer WebAuthn passkeys for customers and require phishing-resistant multi-factor authentication for workforce access.

Customer and Admin Experiences use separate identity realms, clients, ingress, cookies, session stores, and telemetry.

Terminate browser authentication at each BFF. Store an opaque session identifier in a `Secure`, `HttpOnly`, host-only cookie and keep provider credentials server-side. Browser access tokens, refresh tokens, and reusable authentication secrets are prohibited.

BFF-to-Core calls use distinct short-lived workload identity plus a short-lived, signed, audience-bound subject and assurance context. Source modules still enforce capability, scope, resource, lifecycle, and required assurance.

Guest, recovery, account-linking, emergency, and delegated-AI flows use narrow, expiring, auditable proof. They do not weaken source authorization or make Support, AI, provider claims, or identifier knowledge an authentication authority.

## Consequences

### Benefits

- Specialized security capability serves a small initial team.
- Browser token theft and cross-experience session confusion are reduced.
- Workforce and customer compromise paths remain separate.
- Nexora retains stable subject, session, assurance, and authorization boundaries.
- Source services receive attributable actors without trusting a browser token.

### Costs and risks

- Managed identity and the server-side session store are critical dependencies.
- Provider integration, signing-key rotation, revocation, and exit paths require active ownership.
- Passkey adoption needs accessible fallback and recovery.
- Structured assurance and separate realms add policy and test complexity.

## Governance

- Identity provider selection must pass the adoption gate.
- Provider identifiers and tokens remain inside Identity adapters.
- Roles and Permissions and source-domain authorization cannot move into provider configuration.
- Exact session and assurance durations are versioned Security policy.
- New authentication methods require threat, accessibility, recovery, and migration review.
- A material change to browser token custody, realm separation, subject propagation, credential ownership, or source authorization requires a superseding ADR.

## References

- [Identity, Sessions, Authentication, and Assurance](../06-engineering/12-identity-sessions-authentication-and-assurance.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [ADR-0003: Scoped Capability-Based Access Control](ADR-0003-scoped-capability-based-access-control.md)
- [ADR-0010: Trust-Segmented Runtime Topology](ADR-0010-trust-segmented-runtime-topology.md)
- [ADR-0015: BFF and HTTP Contracts](ADR-0015-bff-and-http-contracts.md)
- [NIST SP 800-63B-4](https://csrc.nist.gov/pubs/sp/800/63/b/4/final)
- [Web Authentication Level 3](https://www.w3.org/TR/webauthn-3/)
- [RFC 9700: OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html)

