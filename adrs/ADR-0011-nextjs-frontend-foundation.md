# ADR-0011: TypeScript, React, and Next.js Frontend Foundation

- **Status:** Accepted
- **Date:** 2026-08-02

## Context

Nexora needs one accessible frontend foundation for public discovery, commerce transactions, authenticated continuity, PC Builder, AI, Support, and dense workforce operations.

Three viable approaches were evaluated:

1. TypeScript, React, and Next.js App Router with server-first composition
2. TypeScript and React Router Framework Mode
3. Client-rendered React single-page applications

React Router Framework Mode provides capable routing, data loading, actions, code splitting, SSR, and static rendering. Its current React Server Component integration remains unstable and uses experimental bundler support. A client-rendered SPA is viable for dense applications but is less suitable as the common default for public product and content experiences.

## Decision

Use TypeScript, React, and Next.js App Router for both Customer Experience and Administrative Experience applications.

The applications remain separate artifacts and route trees. They share the governed Design System and narrowly owned technical packages, not sessions, state, authorization assumptions, or unrestricted feature code.

Server Components are the default. Client Components are explicit, low interactive boundaries justified by browser state, event handling, focus and interaction coordination, or browser APIs.

Server Functions may adapt approved application contracts but do not become domain services, transaction owners, or authorization shortcuts.

Stable releases are pinned exactly. Experimental, canary, release-candidate, and unstable APIs require time-bounded exception approval. Major upgrades receive coordinated compatibility, migration, accessibility, rendering, performance, and deployment review.

## Consequences

### Benefits

- One language and component model serve customer and Admin experiences.
- Server-first composition controls browser JavaScript and server-only dependencies.
- App Router supplies integrated layouts, routes, streaming, metadata, and state boundaries.
- Shared Design System and accessibility infrastructure remain coherent.
- Separate application artifacts preserve customer and workforce trust boundaries.

### Costs and risks

- Server and Client Component boundaries need mechanical enforcement and team fluency.
- Framework caching and mutation mechanisms could obscure source semantics without governance.
- React and Next.js upgrades require coordinated validation.
- Framework conventions must not become domain or product architecture.

## Governance

- A Client Component requires a documented browser or interaction need.
- Route files remain composition adapters rather than domain implementations.
- Server-only dependencies cannot enter browser bundles.
- Customer and Admin feature modules do not cross application boundaries.
- Types do not replace runtime boundary validation.
- A material change to the language, component model, framework, or server-first posture requires a superseding ADR.

## References

- [Frontend Architecture](../06-engineering/05-frontend-architecture.md)
- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro)
- [Repository and Application Organization](../06-engineering/03-repository-and-application-organization.md)
- [System Context and Runtime Topology](../06-engineering/04-system-context-and-runtime-topology.md)
- [Accessibility Foundations](../04-design-system/10-accessibility-foundations.md)
