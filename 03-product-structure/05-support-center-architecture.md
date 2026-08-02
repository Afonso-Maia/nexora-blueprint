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

## Structured Support Article model

SUP-002 Support Article is a governed, task-oriented content template. It supports both procedural guidance and concise FAQ answers without creating a separate FAQ page type.

### Required content contract

Every article declares:

- Customer intent and intended outcome
- Applicable products, categories, order states, case types, or other governed scope
- Audience and access level
- Prerequisites and required assurance
- Ordered guidance or concise answer
- Expected result and how the customer can recognize it
- Known exceptions, limitations, and stop conditions
- Authoritative product, policy, or operational references
- Escalation or recovery path when unresolved
- Content owner and required reviewers
- Version, publication state, review date, and localization status

Optional media, troubleshooting branches, structured data, and contextual actions may extend the template. They cannot replace the required outcome, applicability, references, or escalation information.

### Lifecycle

The primary lifecycle is:

`Draft → Review → Published → Revised or Retired`

- **Draft:** editable and excluded from customer discovery.
- **Review:** awaiting required content, product, operational, accessibility, localization, or policy approval.
- **Published:** eligible for its governed audiences, entry points, and search indexes.
- **Revised:** a new governed version replaces or supplements the prior version with traceable change history.
- **Retired:** removed from active search and recommendations; inbound references use a governed replacement, redirect, or retirement explanation.

Only published and applicable versions enter public Support search. Restricted variants require explicit access governance and cannot leak titles, excerpts, applicability, or existence through public results.

### Applicability and references

Applicability uses governed Catalog, Purchase, Support, Compatibility, and policy identifiers rather than free-form tags where an authoritative identifier exists.

1. Catalog owns product facts and identifiers.
2. Purchase and other operational domains own state and eligibility facts.
3. Legal or the designated policy owner owns policy meaning, effective versions, and approval.
4. Support owns the customer guidance, content lifecycle, and escalation language.
5. Discovery indexes only eligible published content and preserves the separated Support result group.
6. Localization inherits the same intent, applicability, references, and governance; it is not an independent policy version.
7. Material source changes flag dependent articles for review but do not silently rewrite published guidance.
8. An article with unresolved material conflict is corrected, restricted, or retired rather than left discoverable as current.

### Actions and escalation

Articles may launch a contextual self-service check or carry safe context into another destination. The owning domain re-evaluates current identity, authorization, state, and eligibility before presenting or committing an action.

Escalation preserves the article, issue intent, relevant object reference, and completed troubleshooting steps where safe. The customer can inspect or remove this context, and no article interaction creates a persistent Support case without explicit submission.

### AI use

AI may summarize, translate within governed localization controls, or explain published Support content. It must preserve:

- Source article and authoritative references
- Applicability and version
- Limitations and stop conditions
- Deterministic eligibility boundaries
- Escalation path

AI does not cite drafts or retired guidance as current, invent missing steps, or turn an explanatory summary into an approved operational decision.

## Deterministic self-service gateway

Support routes each task through the least persistent safe resolution. Exploring guidance or eligibility does not create an operational record unless a durable process is required and the customer explicitly submits it.

### Resolution levels

1. **Guidance only:** an article, concise answer, or troubleshooting path explains the task; no Support case is created.
2. **Source-owned direct action:** an authoritative destination completes tracking, invoice access, an eligible preference change, or another bounded action; no Support case is created.
3. **Eligibility check:** the owning domain evaluates return, refund, warranty, repair, cancellation, or other remedy eligibility; checking alone creates no case.
4. **Persistent remedy:** explicit submission creates a typed Support Case when evidence, logistics, communication, review, or operational follow-up must persist.
5. **Human escalation:** a case is created or an existing case is continued when self-service cannot safely resolve the issue, policy requires review, or the customer requests governed assistance.

The gateway may move directly to the appropriate level when the incoming context already establishes the task. It does not force customers through irrelevant guidance before an urgent or clearly persistent issue.

### Eligibility contract

Every self-service eligibility result identifies:

- Evaluated object and item scope
- Authoritative decision owner
- Inputs and current source-state timestamp
- Eligible or ineligible outcome
- Material reason and applicable policy reference
- Available action, alternative, or review path
- Assurance required to commit the next action

Eligibility is rechecked at commitment. A prior article, notification, AI response, saved draft, or earlier check cannot preserve an expired right or grant an unavailable remedy.

Unknown, stale, partial, or unavailable source data produces an honest indeterminate or unavailable result. Support does not translate missing evidence into approval or denial.

### Case-creation threshold

Before creating a case, SUP-005 Contact and Case Start shows:

- Case type and customer-visible issue summary
- Associated order, item, product, build, or other governed object
- Context and evidence that will become persistent
- Expected next step and responsible party
- Available communication or service channel
- Applicable identity assurance and consent

The customer can correct or remove optional context and must explicitly submit. Temporary draft context may be preserved under a governed expiry policy, but it is not shown as an open case and does not enter operational queues.

### Duplicate and escalation behavior

Potential duplicates are evaluated using governed customer, object, case-type, and active-state signals.

- A likely duplicate offers safe continuation of the existing case.
- The customer can explain why a separate case is needed when permitted.
- Cases are never silently merged solely because they share an order, product, or topic.
- Merge, link, or split operations require governed authority and preserve provenance.
- Escalation carries completed troubleshooting and verified context when safe, reducing repetition without transferring unsupported conclusions.

### Failure and recovery

Failed eligibility, case-creation, attachment, or channel services preserve only safely collected draft context and identify what did not complete. The customer receives retry, alternate channel, or Contact and Case Start recovery appropriate to the failure.

A technical failure does not create a case unless durable creation is confirmed. Nexora does not promise a refund, repair, return, response time, or other outcome merely because a customer attempted submission.

### Governance rules

1. Source domains own facts, eligibility, and direct actions.
2. Support owns triage, escalation, and persistent Support cases.
3. AI may collect context and explain a result but cannot determine or override eligibility.
4. Case creation requires applicable authentication or secure verification and explicit submission.
5. Sensitive actions apply the approved risk-tiered assurance model.
6. Customer-facing ineligibility includes an understandable reason and available review path when policy permits disclosure.
7. Self-service completion and case resolution are distinct outcomes; one is not recorded as the other.
8. Analytics and draft storage do not become shadow case systems.

## Provisional dependencies

The following remain pending:

- Support Case taxonomy and lifecycle
- Case communication, evidence, and participant model
- Service level, escalation, and ownership-transfer behavior
- External carrier, repair-provider, and manufacturer participation
- Mobile Support navigation details

## Next decision

Define the Support Case taxonomy and lifecycle, followed by communication, evidence, service levels, escalation, and external participation.
