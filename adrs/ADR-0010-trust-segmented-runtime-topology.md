# ADR-0010: Trust-Segmented Runtime Topology

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora must serve public customer journeys, high-assurance workforce operations, authoritative commerce transactions, durable background work, Search, and optional AI. These workloads have distinct trust, scaling, resource, provider, and degradation profiles.

Three viable shapes were evaluated:

1. One universal runtime
2. A runtime per named domain
3. A small set of trust- and workload-aligned runtime roles around the modular authoritative core

One universal runtime minimizes deployment count but allows optional or resource-intensive work to impair critical commerce and combines customer and workforce risk. A service per domain creates premature distributed consistency and operating cost.

## Decision

Adopt six primary executable roles:

1. Customer Experience Runtime
2. Administrative Experience Runtime
3. Authoritative Commerce Core Runtime
4. Authoritative Core Worker Runtime
5. Search Runtime
6. AI Orchestration Runtime

Customer and Admin use separate ingress, identity context, sessions, caches, telemetry context, and experience runtimes.

Authoritative domain modules co-deploy in the Commerce Core. Durable background work runs in a separate worker process while retaining source-module ownership and enforcement.

Search and AI are independently deployable and degradable from the beginning. Their failure cannot block deterministic critical paths. Media, notifications, provider adapters, and specialized workflows remain deferred extraction candidates.

All runtime calls require governed contracts, workload identity, least privilege, timeouts, observability, and explicit failure behavior. Private network location does not confer authority.

## Consequences

### Benefits

- Customer, workforce, commerce, background, Search, and AI risks are isolated proportionately.
- Critical transactions do not carry long-running work or model-provider latency.
- Search and AI can scale and degrade independently.
- The topology remains smaller than a service-per-domain architecture.
- Authoritative modules retain local transaction options.

### Costs and risks

- Multiple executable roles require contract and deployment discipline.
- Search and AI add network boundaries and derived-state freshness concerns.
- Local development must compose representative roles without weakening contracts.
- Some releases may remain coordinated until contract compatibility matures.

## Governance

- New runtime roles must satisfy the approved independent-deployment threshold.
- Deployment independence does not create source authority.
- Customer and workforce session contexts are not interchangeable.
- Asynchronous work revalidates schema, identity, authorization, applicability, and idempotency.
- A material change to runtime roles, trust segmentation, or co-deployment requires a superseding ADR.

## References

- [System Context and Runtime Topology](../06-engineering/04-system-context-and-runtime-topology.md)
- [System Shape and Deployment Boundary](../06-engineering/01-system-shape-and-deployment-boundary.md)
- [Repository and Application Organization](../06-engineering/03-repository-and-application-organization.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Scalability Guidelines](../03-product-structure/09-scalability-guidelines.md)
