# Support Center Architecture

**Status:** Approved in part — entry and routing model approved; detailed behavior pending

## Purpose

This document defines how customers find help, resolve issues, initiate governed remedies, and continue persistent Support cases without making Support a competing source for commerce, product, policy, or eligibility facts.

It builds on the approved [Page Inventory](01-page-inventory.md), [relationships and ownership](02-page-relationships-and-ownership.md), [Information Hierarchy](03-information-hierarchy.md), and [Account and Post-Purchase Architecture](04-account-architecture.md).

## Decision

Nexora uses **intent-and-context Support routing**.

SUP-001 Support Center combines Support-scoped search, recognizable issue intents, contextual continuation, and direct access to persistent cases. It routes customers to the narrowest authoritative resolution path without forcing them to translate a concrete problem into an internal documentation category.

Self-service remains the preferred fast path when it can safely complete the task. Case creation is available when self-service cannot resolve the issue, a persistent operational process is required, or the customer explicitly needs governed assistance.

## Support Center hierarchy

The Support Center presents applicable regions in this order:

1. Support-scoped search
2. Urgent or required customer actions
3. Contextual continuation for active orders, purchased products, and open cases
4. Issue intents
5. Common governed guidance
6. Contact or case-start escalation

Empty contextual regions are omitted or replaced with useful guest guidance. General article promotion never outranks an active case, delivery exception, missing evidence request, or other required action.

## Issue intents

Initial routing supports customer-understandable intents such as:

- Order, payment, or invoice help
- Delivery or tracking
- Return or refund
- Warranty or repair
- Product setup or use
- Compatibility or PC Build help
- Account access or security
- Other contact and case start

Intent labels are routing concepts, not a competing case taxonomy or product taxonomy. Selecting an intent narrows relevant articles, policies, contextual objects, and actions while keeping the selected scope visible and changeable.

## Context contract

Support may receive context from:

- Universal Search
- Product Detail
- Order Detail
- Account Dashboard or Notifications
- PC Builder
- A Support Article or policy-and-task hub
- An existing Support case

Received context can include a safe object reference, issue intent, prior query, or source destination. It may prioritize and preselect relevant paths but cannot:

- Hide other eligible Support paths
- Establish identity or object ownership
- Grant remedy, refund, return, warranty, repair, or cancellation eligibility
- Override the current authoritative state
- Expose sensitive data in a URL
- Submit a case or irreversible action without customer confirmation

The customer can inspect, replace, or remove preselected context. Each destination independently verifies identity, authorization, object association, current state, and action eligibility.

## Search behavior

Support search is a visible scope of Universal Search and remains available throughout the Support shell.

It searches governed:

- Support Articles and FAQs
- Returns and warranty guidance
- Relevant policies
- Public product-support content
- Eligible authenticated case and order continuations when personal search is available

Public and personal results remain clearly separated. Products may be referenced where they help identify or resolve an issue, but Support search does not become a second commercial product-ranking system.

Zero results provide query repair, issue-intent routes, relevant contextual objects, and Contact and Case Start. AI assistance may be offered as an optional explanatory path, not as the only recovery.

## Guest and customer continuity

Guests can search public content, inspect public guidance, and begin non-sensitive triage. Order-linked, case-linked, or otherwise sensitive tasks require the approved authentication or secure verification path.

Account creation is not required merely to:

- Access public Support content
- Verify an eligible guest order
- Start or resume an eligible guest-order Support task
- Access a securely verified case when policy permits

Authenticated customers may see active orders, purchased products, and open cases as continuation modules. These modules summarize source-owned objects and link to their authoritative destinations without copying ownership.

## Ownership boundaries

1. Support owns issue routing, Support content, triage, and Support cases.
2. Discovery owns Universal Search behavior and separated result-group governance.
3. Purchase owns order lifecycle and order-action eligibility.
4. Payments owns payment and refund execution state.
5. Delivery or Fulfillment owns shipment and delivery state.
6. Catalog owns product facts and governed attributes.
7. Compatibility owns deterministic compatibility facts.
8. Legal or the designated policy owner owns policy meaning and approved versions.
9. Customer owns Account context and the customer-facing continuity experience.
10. AI may explain, summarize, and suggest paths but cannot approve remedies or replace deterministic facts.

Support guidance references authoritative facts and policies. If guidance conflicts with its source, the responsible owners resolve the inconsistency rather than allowing Support to maintain a parallel rule.

## Degraded behavior

If a contributing source is unavailable, Support identifies which status or action cannot be confirmed. It may continue with unaffected guidance, preserve safely collected draft context, and offer an appropriate retry or contact path.

Support does not infer eligibility, mark a case resolved, promise a refund or repair outcome, or substitute AI-generated guidance for unavailable authoritative data.

## Provisional dependencies

The following remain pending:

- Support Article and content-governance model
- Self-service eligibility and escalation boundaries
- Support Case taxonomy and lifecycle
- Case communication, evidence, and participant model
- Service level, escalation, and ownership-transfer behavior
- External carrier, repair-provider, and manufacturer participation
- Mobile Support navigation details

## Next decision

Define the Support Article and content-governance model, followed by self-service boundaries and the persistent Support Case architecture.
