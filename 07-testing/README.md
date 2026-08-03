# Phase 5 — Testing Strategy and Quality Validation

**Status:** In progress

Phase 5 defines the risk-based testing strategy, quality model, evidence portfolio, environments, responsibilities, coverage, and release validation needed to demonstrate that Nexora satisfies its approved product, Design System, engineering, security, accessibility, resilience, and operational contracts.

It consumes rather than redefines the approved Blueprint. Staffing, implementation sequencing, milestones, launch waves, and delivery scheduling remain in the later [Delivery Roadmap](../08-roadmap/README.md).

## Approved decisions

1. [Framing, Quality Model, and Testing Portfolio](01-framing-quality-model-and-testing-portfolio.md) — approved; risk-based layered evidence aligned with authority and transaction boundaries
2. [Quality Risk Classification](02-quality-risk-classification.md) — approved; four consequence-led tiers with change-risk calibration
3. [Ready, Done, and Release Confidence](03-ready-done-and-release-confidence.md) — approved; explicit entry, completion, and release-evidence contracts
4. [Test Ownership and Responsibility](04-test-ownership-and-responsibility.md) — approved; embedded quality ownership with independent specialist authority
5. [Test Levels and Types](05-test-levels-and-types.md) — approved; outcome-oriented taxonomy with one primary proof layer
6. [Static Analysis and Architectural Conformance](06-static-analysis-and-architectural-conformance.md) — approved; blocking generated-contract, dependency, policy, and supply-chain checks
7. [Unit and Property-Based Testing](07-unit-and-property-based-testing.md) — approved; deterministic invariant testing with selective generative and mutation evidence
8. [Component and Design System Testing](08-component-and-design-system-testing.md) — approved; semantic contract matrices in isolation and reference compositions
9. [Visual Regression and Theme Validation](09-visual-regression-and-theme-validation.md) — approved; risk-selected perceptual evidence with token and semantic assertions
10. [API and BFF Contract Testing](10-api-and-bff-contract-testing.md) — approved; specification, consumer compatibility, authorization, and semantic problem conformance
11. [Event and Asynchronous Contract Testing](11-event-and-asynchronous-contract-testing.md) — approved; producer/consumer compatibility plus delivery-semantics evidence
12. [Domain-Module Integration Testing](12-domain-module-integration-testing.md) — approved; public-port evidence against real owned infrastructure
13. [Database, Consistency, and Migration Testing](13-database-consistency-and-migration-testing.md) — approved; production-engine migrations, concurrency, restore, and integrity proof
14. [External-Provider Adapter Conformance](14-external-provider-adapter-conformance.md) — approved; shared behavioral suites across fakes, sandboxes, and controlled live checks
15. [End-to-End Customer Journey Testing](15-end-to-end-customer-journey-testing.md) — approved; small risk-selected deployed journeys with authoritative outcome checks
16. [Administrative Dashboard Workflow Testing](16-administrative-dashboard-workflow-testing.md) — approved; capability, source-effect, bulk, approval, export, and Audit validation
17. [Authentication, Session, Assurance, and Authorization Testing](17-authentication-session-assurance-and-authorization-testing.md) — approved; layered identity and deny-by-default permission matrices
18. [Security and Privacy Validation](18-security-and-privacy-validation.md) — approved; threat-led continuous controls with independent critical-risk evidence
19. [Accessibility and Assistive-Technology Validation](19-accessibility-and-assistive-technology-validation.md) — approved; automation plus risk-based manual AT and disabled-user journey evidence
20. [Localization and Brazilian Commerce Validation](20-localization-and-brazilian-commerce-validation.md) — approved; typed pt-BR content and structured Brazilian value conformance
21. [Search Relevance and Index Validation](21-search-relevance-and-index-validation.md) — approved; versioned Brazilian judgment sets, invariants, and projection checks
22. [Deterministic Compatibility Validation](22-deterministic-compatibility-validation.md) — approved; immutable ruleset, fact, explanation, conflict, and impact evidence
23. [Pricing, Promotion, Inventory, and Availability Testing](23-pricing-promotion-inventory-and-availability-testing.md) — approved; exact commercial and concurrency invariants
24. [Cart, Checkout, Payment, and Order-Creation Testing](24-cart-checkout-payment-and-order-creation-testing.md) — approved; durable orchestration and at-most-one-Order proof
25. [Order, Fulfillment, Account, and Notification Testing](25-order-fulfillment-account-and-notification-testing.md) — approved; source-versioned federated continuity
26. [Support Case and External-Work Testing](26-support-case-and-external-work-testing.md) — approved; typed cases, evidence, obligations, remedies, and provider reconciliation
27. [PC Builder Persistence and Recalculation Testing](27-pc-builder-persistence-and-recalculation-testing.md) — approved; durable revisions, conflict, dependency recalculation, and conversion
28. [AI Grounding, Provenance, Safety, and Optionality Testing](28-ai-grounding-provenance-safety-and-optionality-testing.md) — approved; versioned evaluation with deterministic-path equivalence

## Architectural inputs

Phase 5 consumes:

- The approved [Product Structure Architecture](../03-product-structure/README.md), including all 89 canonical pages, nine archetypes, source ownership, permissions, and host-owned system states
- The approved [Design System and Experience Specification](../04-design-system/README.md), including WCAG 2.2 AA, light and dark parity, component quality, nine templates, and complete page mapping
- The approved [Engineering Architecture and Implementation Planning](../06-engineering/README.md), including testable seams, blocking architectural gates, authoritative boundaries, contracts, resilience, security, performance, observability, and CI/CD
- [ADR-0038](../adrs/ADR-0038-risk-based-layered-quality-evidence.md), which establishes the Phase 5 evidence strategy

Phase 5 cannot silently change canonical pages, ownership, source truth, lifecycle authority, taxonomy, Compatibility facts, permissions, operation outcomes, Design System semantics, accessibility requirements, security boundaries, or engineering transaction and deployment boundaries. A genuine conflict returns to Blueprint governance.
