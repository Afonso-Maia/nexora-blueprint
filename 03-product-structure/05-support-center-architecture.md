# Support Center Architecture

**Status:** Approved

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

## Shared Support Case envelope

SUP-007 Support Case Detail uses one common customer-facing envelope extended by governed type-specific workflows.

### Case contract

Every persistent case records:

- Stable case reference and governed type
- Customer-visible issue summary
- Verified participants and their roles
- Associated order, item, product, PC Build, shipment, payment, or other governed objects
- Submission context and applicable policy references
- Timeline, messages, and evidence
- Current lifecycle state
- Current responsible party
- Next expected action and due expectation
- Linked operational processes and their authoritative owners
- Resolution summary and closure provenance

General support, return, refund, warranty, and repair are initial governed case types. A type controls applicable modules, evidence, routing, and valid transitions; it does not create a separate customer-facing detail template.

### Shared lifecycle

The primary case lifecycle is:

`Submitted → Active → Resolved → Closed`

- **Submitted:** durable creation is confirmed and initial routing is pending or underway.
- **Active:** investigation, communication, or operational coordination is in progress.
- **Resolved:** Support has provided or coordinated the case-level resolution and exposes the outcome.
- **Closed:** the case is complete under the governing closure rule and no active case action remains.

`Cancelled` is a governed alternate terminal state when cancellation is eligible. A resolved case may return to Active within the applicable policy. A closed or cancelled case requires a new linked case unless an explicit, auditable reopening rule permits otherwise.

Lifecycle transitions record actor, timestamp, reason, and relevant evidence. Type changes, merges, splits, links, reopening, cancellation, and closure preserve the original provenance.

### Responsibility dimension

Current responsibility is separate from lifecycle:

- Awaiting Nexora
- Awaiting customer
- Awaiting carrier, repair provider, manufacturer, or another governed participant
- No action currently required

The customer sees who is expected to act, what action is expected, and the material blocker or dependency. A responsibility change does not imply lifecycle progression.

`Escalated` and `Overdue` are governed flags, not lifecycle states. They can coexist with Submitted, Active, or Resolved and must identify the affected obligation.

### Type-specific workflows

Type-specific modules extend the shared envelope. Examples include:

- **General support:** diagnosis, guidance, and specialist handoff
- **Return:** item scope, authorization, logistics, inspection, and receipt
- **Refund:** approved amount or scope and linked payment execution
- **Warranty:** coverage, evidence, assessment, and remedy determination
- **Repair:** device intake, diagnosis, approval, repair progress, and return logistics

Specialized workflow state remains distinct from the shared case lifecycle. A return item can be in transit while its case is Active; a case can be Resolved while a separately authoritative refund is still processing only if the customer-facing resolution states that remaining dependency explicitly.

### Operational links and truth boundaries

Support coordinates and presents linked processes without absorbing their authority:

- Payments owns refund execution state.
- Delivery, Fulfillment, or the carrier integration owns shipment and logistics state.
- Inventory owns received-item disposition where applicable.
- Catalog owns product identity and governed facts.
- Compatibility owns deterministic compatibility facts.
- Repair operations or a governed provider owns repair execution facts.
- Legal or the designated policy owner owns policy meaning and approved versions.

No case label implies payment, delivery, item receipt, replacement, repair, or refund completion before its authoritative owner confirms it.

### Case-list and notification projections

SUP-006 My Support Cases groups and filters cases by lifecycle, type, responsibility, associated object, and recency without inventing parallel status. Notifications reference the same case and linked operational state.

Duplicate events from linked systems resolve into one understandable case timeline entry when they represent the same underlying change. Delayed or conflicting source data is identified rather than flattened into a false final state.

### Governance rules

1. Support owns the shared envelope, case type, case lifecycle, and customer-facing coordination.
2. Specialized domains own their process facts, eligibility, and outcomes.
3. Lifecycle, responsibility, escalation, overdue state, and linked-process state remain separate dimensions.
4. Case resolution records rationale, outcome, remaining dependencies, and available review or follow-up.
5. Closure requires the governing completion rule; inactivity alone does not silently close a case.
6. Customers retain access to eligible case history after resolution or closure under the governing retention and access policy.
7. Support cannot use a lifecycle transition to bypass another domain's authorization or evidence requirements.
8. AI may summarize the case but cannot change type, lifecycle, responsibility, eligibility, or linked operational state.

## Case-centered communication record

The SUP-007 timeline is the canonical customer-facing communication record for the case. Approved communication channels act as adapters to this record rather than maintaining competing customer histories.

### Timeline event types

The timeline distinguishes:

- Customer, representative, agent, and specialist messages
- Governed channel transcripts or interaction summaries
- Evidence submissions, validation, and review outcomes
- Case decisions and customer-visible rationale
- Lifecycle, responsibility, escalation, and due-expectation changes
- Linked operational updates
- System notices, delivery failures, and corrected events

Every event records its type, actor or source, timestamp, visibility, and provenance. Linked operational events retain their authoritative owner and source timestamp.

Material customer-visible communication is not silently rewritten. Corrections and redactions preserve an auditable relationship to the original while showing the customer the applicable current version when policy permits.

### Channel behavior

Messaging owns per-channel queuing, delivery, retry, and failure state. Support owns the case meaning, message association, and customer-facing conversation.

1. An outbound message is recorded separately from its delivery state.
2. Delivery success does not imply that the customer read or accepted the message.
3. Failed delivery is visible to authorized case participants and triggers a governed retry or alternate-channel path.
4. Replies received through an approved adapter join the correct case only after participant and case-reference validation.
5. A channel interaction that cannot be safely associated remains pending review and does not silently enter a case.
6. Phone or other non-text interactions use an attributed governed summary or transcript with applicable notice and access controls.

### Evidence objects

Evidence is a governed object rather than an unstructured attachment. It records:

- Uploader and participant role
- Submission and capture timestamps
- Evidence type, format, and version
- Related case, item, issue, and decision
- Access classification and permitted participants
- Validation, malware-scan, and review state
- Retention and deletion rule
- Redaction, replacement, or withdrawal history

Uploading evidence confirms receipt only. It does not prove a claim, establish eligibility, or approve a remedy. Review outcomes identify the responsible reviewer and material rationale.

Unsupported, unsafe, unreadable, incomplete, or excessive evidence receives an actionable state without exposing security-sensitive scanning detail. Replacing evidence creates a new version and does not silently overwrite material previously used in a decision.

### Participant model

Governed participant roles include:

- Customer
- Authorized representative
- Nexora Support agent
- Nexora specialist or supervisor
- Bounded external carrier, repair provider, manufacturer, or other approved provider

Each participant association records verified identity or organizational identity, role, case scope, permissions, start time, expiry or revocation condition, and provenance.

Participants receive the minimum case, object, message, and evidence scope required for their task. Association with one case does not grant access to unrelated orders, payments, Account data, cases, internal notes, or provider records.

An authorized representative does not become the owner of the customer Account or associated commerce objects. Adding, changing, or removing a representative requires governed assurance and preserves history.

### Internal notes

Internal notes are explicitly separate from the customer-visible timeline:

- They require a specific operational purpose and permission.
- They are visibly labeled as internal in Admin experiences.
- They cannot impersonate customer messages or authoritative source facts.
- They cannot conceal a customer-facing decision, requirement, or promised action that should be communicated.
- Their access, edits, and retention are auditable.

Information copied from an internal note into customer communication becomes a new attributed customer-visible event. Internal notes never become an informal bypass for evidence or approval requirements.

### AI use

AI may draft replies, summarize timelines, classify submitted context, or help locate evidence. Consequential messages, decisions, participant changes, and evidence outcomes require approval by an authorized governed actor.

AI-generated material is attributable in the operational record, cites its case sources where appropriate, and cannot:

- Commit a remedy or operational outcome
- Change case state or responsibility
- Fabricate missing communication or evidence
- Expand participant access
- Convert an internal note into customer-visible fact without approval

### Governance rules

1. Support owns case communication, timeline structure, and participant access.
2. Messaging owns delivery state and channel infrastructure.
3. Evidence access follows sensitivity, purpose, participant scope, and retention policy.
4. Failed delivery never counts as customer receipt or completed customer action.
5. Provider or representative access is bounded and revocable.
6. Customer-visible history, internal notes, and authoritative operational records remain distinct.
7. Export, legal hold, redaction, and deletion actions preserve the governing policy and audit requirements.
8. Degraded channel or evidence services preserve confirmed events and identify unconfirmed work without duplicating it.

## Obligation-based service tracking

Support tracks service expectations as explicit obligations rather than one generic case timer. A case may have several concurrent or sequential obligations with different owners, policies, and due expectations.

### Obligation contract

Every tracked obligation records:

- Obligation type and affected case scope
- Accountable owner
- Responsible participant or team
- Start time and due expectation
- Governing service policy and policy version
- Current state
- Governed pause reason when applicable
- Satisfaction evidence or cancellation reason
- Escalation route

Initial response, customer evidence review, Nexora follow-up, external-provider update, refund or replacement coordination, and resolution review are representative obligation types. New types follow the same contract.

Obligation state is:

- **Active:** time and work are progressing under the service policy.
- **Satisfied:** the defined obligation has been fulfilled with evidence.
- **Paused:** a governed dependency temporarily stops the applicable clock.
- **Breached:** the applicable due expectation passed without satisfaction or an eligible pause.
- **Cancelled:** the obligation no longer applies for a recorded reason.

These states do not replace case lifecycle, responsibility, or linked operational state.

### Customer expectations

Customers see the next meaningful action, responsible party, and an honest expected date or range supported by the governing policy. A material expectation change produces a customer-visible timeline event and explanation.

Internal operating targets are not presented as contractual guarantees unless Nexora has explicitly made that commitment. Missing or uncertain external estimates are shown as unknown or awaiting confirmation rather than converted into false precision.

### Pause governance

A pause requires:

- An eligible policy reason
- The obligation and clock affected
- Start time
- Responsible owner
- Customer action or external dependency, when applicable
- Resume, expiry, or review condition

Awaiting-customer and awaiting-external-party pauses cannot conceal work that remains Nexora's responsibility. Receiving the requested input resumes or re-evaluates the obligation; it does not automatically satisfy it.

### Escalation

Escalation is a governed flag and workflow attached to a case or obligation. It does not change lifecycle, responsibility, eligibility, or operational outcome by itself.

Escalation may be triggered by:

- A breached or at-risk obligation
- Customer vulnerability, safety, security, or material-impact criteria
- Repeated failed resolution
- Policy exception requiring higher authority
- Cross-domain or external-provider blockage
- Authorized manual review

Automated escalation may alert, prioritize, or route. Refunds, replacements, warranties, policy exceptions, and other consequential outcomes still require the authorized owning role.

Customers see material escalation effects and revised expectations without exposure of security-sensitive or internal personnel information.

### Ownership and handoff

Each case always has one accountable Support owner, even when another domain or external participant performs the current task.

A handoff records:

1. Current owner and proposed target
2. Transfer reason and requested scope
3. Current case summary, evidence, commitments, obligations, and blockers
4. Target acceptance or governed routing assignment
5. Effective timestamp and customer-visible effect

The case is not left unowned between request and acceptance. History, evidence, obligation clocks, breaches, and prior commitments remain intact. Transfer never resets service measurement or hides delay.

Changing the responsible participant for one obligation does not necessarily transfer overall case accountability. Transfers and reassignments are auditable and reversible only through another governed handoff.

### Governance rules

1. Support Operations owns service policies, obligation definitions, and escalation governance.
2. A specialized domain owns an obligation only after accepting it through the governed contract.
3. Nexora retains customer-facing case accountability when an external participant performs work unless policy explicitly defines another relationship.
4. One obligation's pause or satisfaction cannot pause or satisfy unrelated obligations.
5. Case resolution exposes active external or operational dependencies and cannot use closure to erase them.
6. Breached expectations remain in history after reassignment, escalation, resolution, or closure.
7. Manual due-date changes require permission, reason, policy basis, and audit history.
8. Degraded service-level calculation identifies uncertainty and does not mark an obligation satisfied or paused automatically.

## Bounded external work packages

Carriers, repair providers, manufacturers, and other approved external organizations participate through scoped work packages linked to a Support Case. They do not receive full-case access or operate as equivalent Nexora agents.

### Work-package contract

Every external work package records:

- Provider organization and verified organizational participant
- Assigned task and affected order, shipment, item, or product scope
- Minimum required customer, logistics, and evidence data
- Allowed actions, messages, and structured updates
- Start time, due expectation, expiry, and revocation conditions
- Governing service, contract, and data-sharing policy
- Nexora accountable owner
- Completion criteria and evidence
- Synchronization and reconciliation state

The package is purpose-limited. Completion, expiry, revocation, case closure, or provider-relationship termination removes access according to the governing policy without deleting required history.

### Permitted participation

A provider may report facts within its accepted scope, such as:

- Pickup scheduling and execution
- Shipment or delivery status
- Item receipt and chain-of-custody events
- Diagnostic findings
- Repair estimate or approval request
- Repair progress and completion
- Return-shipment details
- Manufacturer-owned reference and status

Providers cannot:

- Change customer identity, Account ownership, or authentication state
- View unrelated orders, payments, cases, evidence, or internal notes
- Change the Support Case type, lifecycle, or overall accountable owner
- Approve Nexora refunds, replacements, warranties, or policy exceptions unless a later permission decision explicitly grants a bounded authority
- Rewrite customer or Nexora communication
- Expand their own task, participant list, access, or retention

Exact external permissions remain subject to the later Roles and Permissions architecture.

### Timeline and communication

Validated provider updates enter the case timeline with provider, source, and source timestamp attribution. Nexora maps provider-specific states into customer-understandable language without replacing the original execution fact.

Direct customer-provider communication is available only through an approved channel and within the work-package scope. Applicable messages or governed interaction summaries become part of the appropriate case record. Providers cannot move communication to an unrecorded channel when that would break required provenance or customer protection.

External completion satisfies only the work package and its accepted obligations. It does not automatically resolve or close the Support Case.

### Manufacturer-only handoff

Nexora clearly distinguishes:

1. **Nexora-coordinated work:** the manufacturer or provider operates through a bounded work package while Nexora retains accountable case ownership.
2. **Manufacturer-owned process:** Nexora provides a transparent handoff to a separately owned process, records the external reference when available, and does not imply control over that process.

A manufacturer-owned handoff explains what context will transfer, who becomes responsible, which Nexora obligations remain, how the customer returns for help, and what status Nexora can or cannot observe.

### Synchronization and reconciliation

Provider integration state is separate from provider execution state.

- Confirmed updates retain their source timestamp and provenance.
- Delayed synchronization is visible and does not fabricate a current status.
- Duplicate events are reconciled without duplicating customer-visible progress.
- Conflicts remain identified until an authorized source or reviewer resolves them.
- Manual reconciliation requires permission, reason, supporting evidence, and an audit record.
- A manual correction does not silently overwrite the provider's original event.

Provider outage or access revocation preserves confirmed history and routes outstanding obligations to the Nexora accountable owner. The customer receives a revised honest expectation rather than an unsupported promise.

### Governance rules

1. Nexora retains one accountable Support owner for every coordinated case.
2. Provider identity, contract, purpose, and data-processing basis are verified before access.
3. Shared data is limited to the minimum necessary work-package scope.
4. Provider participants use individual or otherwise attributable identities; shared anonymous access is not sufficient.
5. Customer consent or notice is captured when required by the governing policy.
6. External work does not transfer source-domain authority unless a later explicit decision establishes that bounded delegation.
7. Access reviews, expiry, revocation, and provider offboarding are auditable.
8. Provider performance reporting uses the obligation model and does not alter customer-facing case history.

## Next-action-first mobile Support

Mobile preserves the approved Support architecture while prioritizing the customer's current task.

### Support Center hierarchy

SUP-001 presents applicable regions in this order:

1. Support-scoped search
2. Urgent or required action
3. Active case, order, or purchased-product continuation
4. Issue intents
5. General guidance and Contact and Case Start

This is a responsive presentation of the approved routing model, not a separate mobile taxonomy.

### Support Case Detail hierarchy

SUP-007 presents applicable regions in this order:

1. Case summary and current outcome or status
2. Responsible party, next action, and due expectation
3. Required customer action or evidence
4. Message or action composer
5. Type-specific operational module
6. Progressively disclosed timeline, references, and secondary history

The full timeline remains available. Long history cannot push the current obligation beneath general references or inactive events.

### Interaction and restoration rules

1. Returning from Case Detail restores eligible My Support Cases filters, position, and context.
2. Back navigation never resubmits a message, evidence item, case, or remedy.
3. Messages and evidence distinguish draft, pending, confirmed, failed, and retry states.
4. Leaving with unsent content follows a governed safe-draft policy or requires explicit discard confirmation.
5. A draft is not a customer-visible message, evidence submission, or open case.
6. Sensitive case content and draft data are not exposed in URLs or unsafe system previews.
7. Critical actions use descriptive labels and do not depend on icons, color, or gesture alone.
8. Focus restoration and assistive-technology reading order follow the visible task hierarchy.
9. Account, Order Detail, PC Builder, AI, and external destinations retain their own shells and safe return context.
10. Mobile compaction changes presentation priority but cannot change lifecycle, responsibility, eligibility, ownership, or service obligations.

Offline, loading, and cross-product degraded-state details remain governed by the later Error and Empty States architecture.

## Architecture validation

The Support Center Architecture passes its Phase 2B topic validation:

- **SUP-001 Support Center:** intent-and-context routing, Support search, guest access, and active-work continuation are defined.
- **SUP-002 Support Article:** structured content, applicability, versioning, policy references, localization, retirement, escalation, and AI boundaries are defined.
- **SUP-003 Returns and Refunds Hub:** deterministic eligibility precedes explicit creation of a persistent typed case.
- **SUP-004 Warranty and Repairs Hub:** product and coverage context remains source-owned while evidence and durable coordination use the shared case model.
- **SUP-005 Contact and Case Start:** minimum context, assurance, duplicate detection, safe drafts, and explicit submission are defined.
- **SUP-006 My Support Cases:** lifecycle, type, responsibility, association, recency, restoration, and degraded projection behavior are defined.
- **SUP-007 Support Case Detail:** shared envelope, typed modules, separate state dimensions, communication, evidence, participants, obligations, external work, and mobile hierarchy are defined.
- Support does not become a competing owner for orders, payments, delivery, products, compatibility, policies, or provider execution facts.
- Guests retain public and securely verified post-purchase paths without forced Account creation.
- AI remains explanatory and assistive; it cannot determine eligibility, approve remedies, alter cases, or expand access.
- External participation is bounded, attributable, expiring, and accountable to a Nexora case owner.
- Exact role permissions remain intentionally governed by the later Roles and Permissions architecture.
- Cross-product loading, empty, error, offline, and degraded-state presentation remains governed by the later state architecture.

No unresolved Support architecture alternative is recorded as approved.

## Next phase topic

Define the Administrative Dashboard Information Architecture.
