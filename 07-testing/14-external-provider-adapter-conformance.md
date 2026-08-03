# External-Provider Adapter Conformance

**Status:** Approved

## Decision

Every external adapter implements a source-owned, provider-neutral conformance suite. The same semantic cases run against the local fake/simulator, provider sandbox, and controlled live validation where contractually and safely possible.

## Adapter profile

Each provider records:

- capability and source owner;
- API, webhook, SDK, and schema versions;
- authentication, secrets, network, and data classes;
- timeout, rate limit, idempotency, status query, callback trust, and reconciliation;
- sandbox differences and unsupported simulations;
- accessibility and localization responsibilities for embedded UI;
- retention, residency, export, deletion, and exit behavior; and
- degraded mode, circuit, fallback, and provider-switch constraints.

## Required conformance cases

- Success and explicit business rejection
- Validation and authentication failure
- Timeout before send, after send, and unknown remote outcome
- Rate limiting and retry guidance
- Duplicate request and callback
- Late, reordered, malformed, forged, and replayed callback
- Partial response and schema drift
- Provider outage and circuit-open behavior
- Status query and reconciliation
- Credential rotation and revoked access
- Redaction, trace, metrics, and Audit correlation

Payment, identity, messaging, fulfillment, media, AI, and other providers add domain-specific cases without changing source authority.

## Fidelity

The local fake is deterministic, fault-controllable, fast, and contract-tested against observed sandbox behavior. It does not copy provider production code or pretend to cover undocumented production behavior.

Sandbox checks run on contract change, provider release, credential/configuration change, and a governed schedule. Controlled live checks are non-destructive or use approved provider test modes and bounded accounts.

## Unknown outcomes

Consequential timeout never maps directly to failure or triggers another provider. The suite proves status query or reconciliation before mutation retry and stable provider idempotency identity.

## Rejected alternative

Sandbox-only testing is rejected because it is slow, sometimes incomplete, and poor at deterministic fault placement. Fake-only testing is rejected because provider drift and environmental differences require external conformance evidence.

## References

- [Runtime Topology](../06-engineering/04-system-context-and-runtime-topology.md)
- [Events and Workflows](../06-engineering/24-events-queues-workflows-idempotency-and-reconciliation.md)
- [Security and Privacy](../06-engineering/27-security-privacy-secrets-and-audit.md)
