# ADR-0015: Co-Deployed Experience BFFs and OpenAPI HTTP Contracts

- **Status:** Accepted
- **Date:** 2026-08-03

## Context

Nexora needs experience-specific composition for customer and workforce applications while preserving private source modules, server-first rendering, field minimization, typed failures, idempotency, concurrency, and future language independence.

Viable approaches included:

1. Customer and Admin BFFs co-deployed with their experience runtimes plus a private HTTP Core API
2. One universal BFF or GraphQL gateway
3. Direct browser access to domain APIs
4. Independently deployed BFF services from the beginning

## Decision

Use separate logical Customer and Admin BFFs, initially co-deployed with their Next.js runtimes.

Server Components call BFF use cases in-process. Client Components use narrow same-origin endpoints. Browsers do not call the Commerce Core directly.

Use a private HTTP/JSON Core API specified with OpenAPI 3.1.x. OpenAPI 3.2 adoption requires later toolchain and compatibility review.

Use RFC 9457 Problem Details, standard HTTP status and cache semantics, strong ETags and conditional requests, opaque cursor pagination, explicit idempotency, and durable operation resources.

BFFs own experience composition, not business records or authorization truth. Source modules enforce resource and field permissions.

No GraphQL gateway, universal BFF, or public developer API is introduced initially.

## Consequences

### Benefits

- Customer and Admin payload, identity, and field needs remain isolated.
- Server rendering avoids a BFF network self-call.
- OpenAPI provides language-neutral generation and compatibility validation.
- Standard failures and operation resources support safe recovery.
- The initial runtime count remains practical.

### Costs and risks

- Similar customer and Admin adapters may duplicate code.
- Co-deployment needs mechanical logical-boundary enforcement.
- OpenAPI generation and drift checks add tooling.
- Purpose-built composition requires deliberate contract evolution.

## Governance

- BFF persistence cannot become domain authority.
- Browser endpoints require a client-interaction need.
- Core operations declare owner, authorization, idempotency, concurrency, problem types, and observability.
- External public or partner APIs require separate approval.
- A material change to BFF topology, contract style, OpenAPI baseline, or external API posture requires a superseding ADR.

## References

- [API and Backend-for-Frontend Strategy](../06-engineering/09-api-and-bff-strategy.md)
- [OpenAPI Specification 3.1](https://spec.openapis.org/oas/v3.1.0)
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
- [System Context and Runtime Topology](../06-engineering/04-system-context-and-runtime-topology.md)
- [State Ownership and Restoration](../06-engineering/08-state-ownership-and-restoration.md)
- [ADR-0003: Scoped Capability-Based Access Control](ADR-0003-scoped-capability-based-access-control.md)
