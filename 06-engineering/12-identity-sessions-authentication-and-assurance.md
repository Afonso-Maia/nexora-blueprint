# Identity, Sessions, Authentication, and Assurance

**Status:** Approved

## Purpose

This document defines how Nexora establishes identity, maintains customer and workforce sessions, raises authentication assurance, recovers access, represents guest and delegated actors, and authenticates workloads.

Authentication proves or strengthens an actor's identity. It does not grant access to a business resource. The approved [Roles and Permissions architecture](../03-product-structure/07-roles-and-permissions.md) and each source module remain responsible for authorization.

## Decision

Use a managed, standards-based identity provider behind Nexora-owned ports and policy, with:

- OpenID Connect federation and OAuth 2.0 Authorization Code with PKCE
- Opaque server-side BFF sessions in secure cookies
- No browser-held access or refresh tokens
- Passkeys through WebAuthn as the preferred customer method
- Phishing-resistant multi-factor authentication for workforce access
- Separate customer and workforce identity realms, clients, sessions, and ingress
- Structured assurance context and source-owned step-up requirements
- Short-lived, audience-bound workload identity
- Explicit revocation, recovery, account-linking, and degraded-mode behavior

Provider selection remains an implementation procurement decision. The selected provider must satisfy the contracts and exit requirements in this document.

## Viable approaches considered

### Managed identity behind Nexora adapters

A specialized provider operates credential verification, authenticator enrollment, federation, and high-risk identity primitives. Nexora owns the internal subject mapping, session boundary, assurance interpretation, recovery policy, authorization handoff, telemetry, and provider adapter.

This is approved because it gives the initial team mature security controls without making provider-specific identifiers or tokens part of domain contracts.

### Nexora-built credential and token service

Nexora could own credential storage, WebAuthn verification, federation, token issuance, abuse controls, recovery, and security operations.

This offers maximum control but creates a disproportionate security and operational burden. It is not approved for the initial architecture. A future change requires demonstrated provider limitations, specialist ownership, migration design, and a superseding ADR.

## Ownership boundaries

### Identity and Security own

- Internal subject identity and provider mappings
- Authentication methods and authenticator lifecycle
- Session issuance, rotation, expiry, and revocation
- Assurance evidence and challenge orchestration
- Account-linking proof
- Authentication recovery policy
- Workforce federation and emergency identity controls
- Workload identity policy
- Authentication security events

### Other owners retain

- Customer Account owns profile, preferences, addresses, saved continuity, and privacy-facing account workflows.
- Roles and Permissions owns capability, scope, delegation, and policy semantics.
- Each source domain evaluates authorization and required assurance for its resources and commands.
- Support can guide recovery but cannot bypass proof, grant a factor, impersonate a customer, or override assurance.
- Audit records identity activity but does not become identity, session, or authorization truth.
- AI may act only through explicit attributed delegation and cannot authenticate a customer or become identity truth.

An identity subject can exist without a complete Customer profile. Deleting, restricting, or restoring either record follows an explicit cross-owner workflow rather than a shared table.

## Subject model

Every authenticated actor resolves to an immutable Nexora subject identifier independent of email address, telephone number, provider, username, employee record, or Customer profile.

Subject classes are explicit:

- Customer
- Workforce
- Guest participant
- Workload
- Delegated automation
- Emergency operator

Provider identifiers are private Identity mappings. Domain modules receive the Nexora subject, actor class, validated assurance context, delegation context when present, and correlation metadata. They do not persist a provider access token as actor identity.

Email addresses and telephone numbers can change and are never durable keys. Verified contact ownership is recorded with verification time and method.

## Customer authentication

### Preferred method

Offer discoverable passkeys using interoperable WebAuthn behavior as the preferred sign-in and step-up method.

- Registration requires an already authenticated or recovery-verified ceremony.
- Credentials are scoped to the Nexora relying party.
- User verification is required for consequential step-up.
- Credential names, creation time, last use, and revocation are visible to the customer.
- Attestation is collected only when a documented security policy requires it; consumer device provenance is not a default access condition.

Nexora must preserve an accessible alternative when a browser, device, disability-related setup, or recovery circumstance prevents passkey use.

### Password fallback

Password authentication may be offered through the managed provider for reach and recovery resilience.

- Permit password managers, paste, and long passwords.
- Screen new and changed passwords against known-compromised values.
- Do not impose composition rules that reduce usability or arbitrary periodic rotation.
- Use modern salted, memory-hard password storage if Nexora ever handles verifiers.
- Apply rate limits, progressive abuse controls, and non-disclosing responses.
- A password alone does not satisfy a phishing-resistant step-up.

TOTP may serve as an enrolled fallback factor. SMS is not a preferred authenticator and cannot satisfy a phishing-resistant requirement. Any SMS fallback requires a documented threat model, abuse controls, disclosure, and recovery policy.

Federated social sign-in is optional and deferred. If introduced, it uses the same subject-linking proof and cannot make the social provider's profile authoritative for Nexora permissions or commerce data.

## Workforce authentication

Administrative access uses a separate workforce federation boundary.

- Prefer enterprise OpenID Connect federation; support SAML through an adapter only when an approved workforce provider requires it.
- Require phishing-resistant multi-factor authentication using a passkey or hardware-backed security key.
- Prohibit shared operator accounts.
- Keep workforce and customer credentials, clients, cookies, callback paths, session stores, and telemetry distinct.
- Changes in employment, role, or risk trigger session revocation through the governed lifecycle.
- Administrative elevation is time-bounded and re-evaluated at the source operation.

Emergency access uses named break-glass identities with independently protected credentials, narrow capability, explicit activation, immediate alerting, complete audit, and post-use review. It does not reuse ordinary operator sessions.

## BFF session architecture

The Customer and Admin BFFs terminate browser authentication and maintain separate server-side sessions.

The browser receives only a high-entropy opaque session identifier in a cookie with:

- `Secure`
- `HttpOnly`
- `Path=/`
- A host-only `__Host-` name
- An explicit `SameSite` policy appropriate to the experience flow

The session record stores the internal subject, actor class, authentication time, assurance evidence, expiry, rotation lineage, revocation state, and minimal security context. Sensitive provider tokens remain encrypted server-side and are retained only when an approved provider interaction requires them.

The session identifier rotates after sign-in, recovery, assurance elevation, privilege-affecting identity changes, and suspected fixation. Sign-out and security revocation invalidate the server record; cookie deletion alone is insufficient.

Idle and absolute expiry apply. Exact durations are versioned security configuration based on actor class and risk, not constants invented by a page or feature.

Browser storage must not contain access tokens, refresh tokens, reusable session secrets, password material, recovery secrets, or complete assurance evidence.

## Request protection

Every state-changing browser request requires:

- Same-site cookie protection
- Verified request origin
- An anti-CSRF token bound to the session
- A non-safe HTTP method
- Source-domain authorization
- Step-up when the operation requires it

Authentication callbacks validate issuer, audience, redirect URI, PKCE binding, state, nonce where applicable, signature, time bounds, and one-time use. Redirect destinations use an allowlist or signed local continuation; arbitrary external return URLs are prohibited.

Cookies from Customer Experience are never accepted by Admin Experience, and neither session cookie is forwarded into the Commerce Core.

## Service identity and subject propagation

The BFF calls the Commerce Core using its own short-lived workload identity. It also sends a short-lived, signed, audience-bound subject context containing only the claims needed for the target contract:

- Nexora subject identifier and actor class
- Authentication and assurance context
- Delegation identifier and bounds, if applicable
- Session or revocation version reference
- Issuer, audience, issued-at, expiry, and unique assertion identifier
- Correlation and causation identifiers

The Core validates both the calling workload and the subject context. A trusted BFF assertion does not authorize the command; the source module evaluates current capability, scope, resource, lifecycle, and assurance.

Workloads use platform workload identity, mutual TLS, or private-key signed credentials with short lifetimes and explicit audiences. Each runtime has a distinct identity. Static shared service credentials and unrestricted internal bearer tokens are prohibited.

## Assurance and step-up

Assurance is structured evidence, not one application-wide boolean or role.

The normalized context can include:

- Authentication time
- Authenticator methods
- User-verification result
- Phishing-resistance property
- Federation source
- Device or authenticator signals
- Risk decision and reason category
- Recovery or emergency context
- Delegation constraints

Each consequential source operation declares its required assurance policy. Identity determines whether existing evidence satisfies it and orchestrates the challenge when it does not. The source rechecks assurance at execution time and does not trust a hidden UI state.

Typical triggers include credential changes, new payment instruments, sensitive profile changes, privacy actions, workforce elevation, high-impact Admin changes, and abnormal-risk events. Exact policy values belong to Security governance and cannot be silently chosen by an interface.

A completed step-up is time-bounded, purpose-aware where needed, and invalidated by material session or risk changes.

## Guest access

Guest Checkout and guest post-purchase access remain supported.

- Checkout can create a guest participant linked to the Purchase record without creating a full account.
- Post-purchase access requires an expiring, single-purpose challenge sent to a verified order contact or an equivalent approved proof.
- A successful challenge creates a narrowly scoped guest session for the intended order, case, or action.
- Order numbers, email addresses, shipment references, and URL identifiers are not authentication secrets.
- Guest elevation to a Customer account requires current proof and an explicit ownership-linking workflow.

Guest responses avoid revealing whether an order or identity exists before proof succeeds.

## Account linking

Linking another provider or sign-in method requires:

- A current authenticated session
- Fresh proof of the existing identity when risk requires it
- Verified control of the new identity
- Collision and takeover checks
- Explicit customer confirmation
- Notification through an independent verified channel
- Revocable, auditable linkage

Automatic linking by matching email text is prohibited. Unlinking cannot remove the last viable access or recovery path without replacement and confirmation.

## Recovery

Recovery is a first-class security workflow, not a Support override.

- Responses resist identity enumeration.
- Recovery factors are independent of the lost factor where possible.
- Recovery links and codes are single-use, narrow-purpose, and short-lived.
- High-risk recovery can require delay, additional evidence, or specialist review.
- Successful recovery rotates credentials as needed, revokes affected sessions, clears trusted-device signals, and sends independent notifications.
- Recovery outcomes are explicit, observable, and auditable.

Knowledge-based security questions are prohibited. Support staff cannot view passwords, recovery secrets, passkey private keys, or one-time codes.

## Devices and session management

Remembered-device records are revocable risk signals, not durable authentication bypasses.

Customers can inspect and terminate recognizable active sessions and registered passkeys. Workforce security administrators can revoke sessions through governed capability and scope without acquiring the operator's identity.

Device names and locations are approximate presentation data. They must not imply certainty unavailable from the evidence.

Revocation events invalidate affected sessions, cached permission context, BFF projections, and active real-time channels. Critical revocation uses a direct check or bounded cache window rather than relying only on eventual event delivery.

## Delegated and AI actions

An AI or automation action carries:

- Human or workforce principal
- Delegated actor identity
- Explicit task and allowed capability
- Resource scope
- Issued-at and expiry
- Confirmation requirement
- Correlation and audit identifiers

Delegation is non-transferable and cannot silently widen through a downstream call. AI orchestration does not receive reusable customer session tokens and cannot satisfy human-presence or step-up requirements. Consequential operations still require the approved confirmation and source authorization.

## Degraded behavior

If the identity provider is unavailable:

- Existing server sessions may continue only within their validated expiry and revocation-risk window.
- Locally verifiable assertions may continue while trusted signing keys remain valid and cached.
- New sign-in, enrollment, recovery, account linking, and step-up fail closed with an explicit unavailable state.
- Operations requiring fresh assurance do not downgrade to a weaker method.
- Customer browsing, public discovery, and other unauthenticated paths continue where their own dependencies allow.
- Admin access never falls back to customer identity or an unprotected local password.

Unknown signing keys, invalid issuer or audience, stale mandatory assurance, and unverifiable revocation state for critical operations fail closed.

## Security, privacy, and observability

Record security events for:

- Authentication success and failure category
- Factor enrollment, use, and removal
- Session issue, rotation, expiry, and revocation
- Step-up request and outcome
- Recovery start and outcome
- Identity linkage changes
- Workforce federation and break-glass use
- Workload authentication failures
- Delegation creation and use

Logs use stable internal references, redaction, purpose limits, retention, and access controls. They exclude passwords, passkey private material, raw session identifiers, authorization codes, access and refresh tokens, one-time codes, and unnecessary identity-provider payloads.

Metrics and alerts cover abuse, credential stuffing, callback failures, provider latency, session-store health, revocation lag, step-up abandonment, recovery anomalies, and workforce-authentication posture without exposing customer secrets.

## Accessibility and content

Authentication and recovery implement the approved [Accessibility Foundation](../04-design-system/10-accessibility-foundations.md) and authentication patterns.

- Do not make memory, transcription, device switching, precise timing, or a single biometric modality the only path.
- Permit password managers and platform authenticators.
- Provide persistent labels, clear factor names, status, recovery choices, and error recovery.
- Preserve entered non-secret identifiers when safe after errors.
- Announce challenge progress and expiry accessibly without relying on countdown animation alone.
- Avoid disclosing account existence in Brazilian Portuguese error content.
- Treat passkeys, security keys, codes, and recovery terms consistently across Customer, Support, and Admin experiences.

## Provider adoption gate

A managed provider is eligible only if it demonstrates:

- Standards-conformant OIDC, PKCE, WebAuthn/passkey, and workforce federation
- Separate customer and workforce configuration
- Exportable subject, credential metadata, and audit evidence sufficient for migration
- Key rotation, regional and availability behavior, rate limits, and incident interfaces
- Accessible hosted or embeddable ceremonies that meet Nexora requirements
- Secure recovery and abuse controls
- Contractual privacy, retention, deletion, and data-location behavior
- Test tenants, deterministic automation interfaces, and local-development substitutes
- No requirement for provider tokens inside domain contracts

The adapter maps provider events and claims into Nexora contracts. Provider-specific claims do not cross the Identity boundary.

## Quality gates

Before release:

- Threat-model sign-in, linking, recovery, session, step-up, guest, Admin, and delegation flows.
- Verify fixation, CSRF, callback injection, replay, token leakage, enumeration, account linking, revocation, and confused-deputy controls.
- Contract-test provider adapters, signing-key rotation, audience checks, time skew, and degraded behavior.
- Test keyboard, screen reader, zoom, reduced-motion, cognitive accessibility, password-manager, and cross-device recovery paths.
- Prove Customer and Admin cookie, client, subject, and session separation.
- Prove source services reject missing, expired, wrong-audience, insufficient-assurance, and unauthorized contexts.
- Exercise session-store loss, IdP outage, revocation delay, emergency access, and recovery alerts.
- Confirm telemetry contains no prohibited secrets.

## Consequences

### Benefits

- Mature identity primitives without building a security product.
- Browser token exposure is sharply reduced.
- Customer and workforce compromise paths are separated.
- Assurance can match operation risk without making every session equally burdensome.
- Provider replacement remains possible through Nexora-owned identity and session contracts.

### Costs and risks

- The session store and BFF become critical authentication infrastructure.
- Managed-provider outages affect new authentication and step-up.
- Separate identity realms and subject propagation require disciplined configuration.
- Passkey recovery and cross-device accessibility need careful product work.
- Revocation across caches and real-time channels requires bounded propagation and reconciliation.

## References

- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Support and Authentication Patterns](../04-design-system/19-support-and-authentication-patterns.md)
- [System Context and Runtime Topology](04-system-context-and-runtime-topology.md)
- [API and Backend-for-Frontend Strategy](09-api-and-bff-strategy.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [ADR-0018: Managed Identity and Server-Side Sessions](../adrs/ADR-0018-managed-identity-and-server-side-sessions.md)
- [NIST SP 800-63B-4](https://csrc.nist.gov/pubs/sp/800/63/b/4/final)
- [Web Authentication Level 3](https://www.w3.org/TR/webauthn-3/)
- [RFC 9700: OAuth 2.0 Security Best Current Practice](https://www.rfc-editor.org/rfc/rfc9700.html)
