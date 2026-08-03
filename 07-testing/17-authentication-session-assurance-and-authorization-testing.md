# Authentication, Session, Assurance, and Authorization Testing

**Status:** Approved

## Decision

Identity and authorization use layered protocol, source-policy, negative-matrix, browser, and operational evidence. Managed identity is tested through adapters and approved provider modes; source authorization is always tested within Nexora.

## Authentication coverage

- Registration, sign-in, sign-out, verification, recovery, passkey, and approved fallback
- Generic responses preventing account enumeration
- Token/callback state, nonce, PKCE, audience, issuer, expiry, replay, and redirect validation
- Session creation, rotation, fixation defense, expiry, revocation, theft response, and device/context change
- Customer/workforce trust separation and account switching
- Rate limits, abuse controls, lock/recovery, provider outage, and clock skew
- Accessible interruption, errors, focus, password-manager/passkey, and mobile behavior

Raw identity secrets and recovery tokens never enter fixtures, logs, screenshots, or reports.

## Assurance

Tests cover risk-tiered step-up:

- action requires the approved assurance level;
- successful challenge is bound to subject, action, scope, and freshness;
- cancellation preserves safe context without executing;
- session expiry never auto-submits a mutation after reauthentication;
- stale or wrong-context assurance is rejected; and
- provider degradation produces truthful recovery.

## Authorization matrix

Each source command and restricted query covers:

- anonymous, guest, customer, workforce, delegated/provider, and system identities as applicable;
- absent/allowed capability;
- wrong subject or object association;
- wrong scope and restricted field;
- lifecycle, assurance, approval, segregation, and temporary-access conditions;
- stale policy projection and source-policy mismatch;
- route, BFF, direct-source, asynchronous, bulk, export, and replay paths; and
- non-disclosing error and telemetry behavior.

Property or decision-table generation is preferred for broad policy combinations. UI tests sample presentation; source tests exhaust enforcement.

## Operational evidence

Key/secret rotation, identity-provider outage, revocation propagation, emergency access, offboarding, access review, and Audit correlation receive periodic drills.

## Rejected alternative

Testing only successful login plus role-based UI visibility is rejected. It cannot establish protocol safety, session lifecycle, contextual assurance, or source-enforced scoped authorization.

## References

- [Identity Architecture](../06-engineering/12-identity-sessions-authentication-and-assurance.md)
- [Authorization](../06-engineering/13-authorization-and-policy-enforcement.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
