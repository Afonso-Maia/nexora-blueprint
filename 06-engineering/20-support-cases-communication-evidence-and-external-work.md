# Support Cases, Communication, Evidence, and External Work

**Status:** Approved

## Purpose

This document defines Support Case persistence, typed extensions, lifecycle, participants, messages, timeline, evidence, obligations, queues, remedies, provider work packages, external synchronization, retention, and degraded behavior.

It implements the approved intent-and-context Support architecture and one shared Support Case envelope. Support coordinates customer work but does not become the authority for Orders, payments, refunds, inventory, shipments, Catalog facts, Compatibility, identity, or Legal policy.

## Decision

Use:

- One relational Support Case envelope with versioned typed case extensions
- An append-only case timeline assembled from attributed Support and source events
- Separate customer-visible messages, internal notes, evidence, obligations, assignments, and provider work packages
- One accountable Nexora Support owner for every case
- Explicit responsibility, lifecycle, escalation, and obligation dimensions
- Direct-to-private-object-storage evidence upload through a quarantined scan pipeline
- Durable source-domain Remedy Requests rather than direct Support mutation
- Purpose-bound, expiring external work packages with individual provider identities
- Transactional outbox and inbox, idempotent provider synchronization, and reconciliation
- Rebuildable customer and Admin list projections

Do not create separate customer-facing case systems for returns, refunds, warranties, repairs, or general support. Do not treat email threads, chat-provider histories, spreadsheets, ticket-vendor records, or AI conversations as parallel case authority.

## Viable approaches considered

### Shared governed case core with typed extensions

All cases use one envelope, timeline, participant, obligation, and communication model. Type-specific records add return, refund, warranty, repair, or other workflow facts through registered schemas and modules.

This is approved because it preserves one customer experience and operational model while keeping specialized workflows typed and evolvable.

### Independent systems by remedy type

Returns, refunds, warranties, repairs, and general contact could each use their own service and customer detail page.

This can optimize each team independently but duplicates participants, messages, evidence, service clocks, access, and customer history. It conflicts with the approved shared Support Case.

### External ticketing platform as Support authority

A commercial ticketing product could own case identity, state, communication, and automation.

This may accelerate operations, but it would make a provider's workflow and identifiers authoritative and complicate Nexora's source ownership, typed remedies, customer experience, authorization, and exit path. An external tool may later act as a bounded workforce adapter or projection only if it passes the provider adoption gate.

## Ownership boundaries

### Support owns

- Support Article and issue routing
- Case identity, type, shared lifecycle, and closure
- Verified case participants and visibility
- Customer-visible case communication association
- Internal notes
- Evidence metadata and case association
- Current responsible party
- Assignment, queue, escalation, and accountable owner
- Support Obligations and service-clock evidence
- Remedy coordination
- External Work Package
- Case summary, resolution, and timeline projection

### Other owners retain

- Purchase owns Order and cancellation eligibility.
- Payments owns payment and refund execution.
- Fulfillment owns shipment, delivery, and return logistics.
- Inventory owns returned-stock disposition.
- Catalog owns Product facts.
- Compatibility owns deterministic evaluations.
- Identity owns verification and sessions.
- Roles and Permissions owns workforce and provider authority.
- Legal owns policy meaning.
- Messaging owns channel delivery state.
- Notifications owns in-app notification state.
- External providers own their accepted execution facts within a work package.

Support records references, requested work, accepted outcomes, and customer-facing coordination. It cannot mark a refund paid, item received, repair completed, or shipment delivered before the owner confirms it.

## Support Case aggregate

The Case envelope contains:

- Stable identifier and human-facing reference
- Governed Case Type and schema version
- Customer-visible issue summary
- Verified customer, guest, or representative association
- Associated source-object references
- Shared lifecycle
- Current responsibility
- Accountable Support owner
- Assignment and queue reference
- Escalation and overdue flags
- Current next action
- Active typed extension references
- Current resolution summary
- Revision
- Created, resolved, closed, and retention metadata

Large messages, evidence, timeline events, obligations, and provider packages are separate owned records. They do not make the Case aggregate unbounded.

## Case type

Initial governed types remain:

- General support
- Return
- Refund
- Warranty
- Repair

A Case Type declares:

- Stable identifier and version
- Customer and Admin labels
- Required and optional associated-object types
- Typed extension schemas
- Eligible lifecycle transitions
- Evidence requirements
- Obligation templates
- Routing dimensions
- Remedy operations
- Participant roles
- Resolution and closure rules
- Authorization and field policy
- Retention and Legal references

Type labels do not define behavior by convention. Runtime uses stable identifiers and schemas.

## Typed extensions

Use relational typed extension records for lifecycle-significant fields and bounded versioned JSON only for registered low-query metadata.

Examples:

- Return item scope, reason, inspection, and logistics references
- Refund request scope and linked Payment operation
- Warranty coverage evaluation and remedy determination
- Repair intake, diagnosis, estimate, approval, work status, and return logistics

Extensions expose public Support contracts and remain inside the Support schema. A type cannot use free-form key-value fields for data that controls routing, permission, eligibility, obligation, remedy, reporting, or lifecycle.

Adding a Case Type or breaking extension version requires migration, fixture, authorization, retention, Search, timeline, and UI impact review. It does not create a new canonical page.

## Case creation

Case creation follows:

`Triage draft → Source eligibility → Verification → Review → Explicit submit → Durable Case`

The draft is a short-lived Support-owned record with:

- Issue intent
- Safe source references
- Verified context status
- Customer-entered summary
- Proposed type
- Evidence upload references
- Duplicate candidates
- Expiry

A draft does not enter queues, start service obligations, appear as an open Case, or trigger a remedy.

Submission:

1. Reauthenticates or verifies the participant.
2. Rechecks source-object association and eligibility.
3. Validates type and required fields.
4. Evaluates likely duplicates.
5. Confirms persistent context with the customer.
6. Creates Case, participant, initial timeline, assignment request, obligations, and outbox events atomically.
7. Returns the durable Case reference.

The operation is idempotent. Technical failure cannot produce an unconfirmed customer promise.

## Duplicate handling

Duplicate detection uses bounded signals such as subject, source object, type, item scope, active lifecycle, and recent intent.

It returns candidates and reasons to the authorized workflow.

- High-confidence duplicate offers continuation.
- It does not silently merge or discard submission.
- A customer can explain a distinct issue when policy permits.
- Merging, linking, and splitting are explicit operations.
- Original references, messages, evidence, decisions, obligations, and audit remain traceable.
- A merged Case has a canonical successor and safe redirect.

AI similarity can rank candidates but cannot merge or expose another participant's Case.

## Lifecycle

Preserve:

`Submitted → Active → Resolved → Closed`

`Submitted or Active → Cancelled`

Reopening follows the approved governed exception.

Transitions require:

- Expected Case revision
- Actor and authority
- Type-specific eligibility
- Reason
- Required evidence
- Active obligation and linked-process disposition
- Customer-visible effect

Resolution records the Case-level outcome, rationale, remaining dependencies, review path, and source references.

A Case can be Resolved while a linked source operation remains pending only when the resolution explicitly names that dependency and the governing closure rule permits it. Closed requires no active Case action under the type policy.

Inactivity alone never closes a Case.

## Independent state dimensions

Keep separate:

- Case lifecycle
- Responsibility
- Assignment
- Escalation
- Overdue state
- Obligation state
- Message delivery
- Evidence review
- External Work Package state
- Linked Order, payment, refund, shipment, or repair state

The customer-facing summary is a deterministic projection, not a stored replacement for these dimensions.

## Participants

A Case Participant contains:

- Attributable subject or verified organization identity
- Participant role
- Case scope
- Field and evidence scope
- Allowed operations
- Start and expiry
- Verification or sponsorship evidence
- Revocation state
- Provenance

Roles can include customer, guest participant, authorized representative, Support agent, specialist, supervisor, and bounded external provider participant.

Customer and provider identities are never represented as workforce agents. An authorized representative does not own the Account or source objects.

Participant changes require assurance and authorization appropriate to disclosure risk. Revocation removes future access and active sessions or projections without erasing attributed history.

## Accountable ownership and assignment

Every Case has one accountable Nexora Support owner or governed owning queue.

Assignment contains:

- Assignee or queue
- Scope
- Accepted time
- Capacity or routing reason
- Start and end
- Handoff reference

Transfer uses request and acceptance:

1. Current owner proposes target and scope.
2. The handoff snapshot captures summary, commitments, evidence, obligations, blockers, and customer effect.
3. The target accepts or routing policy assigns.
4. Ownership changes atomically.
5. Obligations and history remain unchanged.

The Case is never unowned between steps. Reassignment does not reset breached clocks or commitments.

## Queues and worklists

Admin Support queues are permission-filtered projections over Cases and Obligations.

Routing inputs can include:

- Case Type and issue intent
- Product or Order class
- Language
- Required specialization
- Current responsibility
- Obligation risk
- Provider involvement
- Customer-impact and safety classification

Priority is deterministic and explainable. AI can propose classification and routing; governed rules validate it and an authorized actor can correct it with reason.

Saved views do not own Case assignment or priority. Bulk actions are limited to safe routing operations and return per-Case outcomes.

## Case timeline

The canonical customer-facing timeline is append-only.

Timeline entries can represent:

- Customer, representative, agent, specialist, and provider messages
- Channel summaries or transcripts
- Evidence receipt, validation, review, replacement, and withdrawal
- Case decisions and rationale
- Lifecycle, responsibility, assignment, escalation, and expectation change
- Support Obligation events
- Linked source updates
- Delivery failure and corrected events

Each entry contains:

- Stable identity
- Case and source reference
- Event type and schema version
- Actual actor or source
- Audience and field classification
- Business occurrence and recorded time
- Customer-safe typed payload
- Correction, supersession, or redaction reference
- Correlation and causation

Customer-visible material is not edited silently. Correction creates a linked entry; lawful redaction preserves integrity evidence and the applicable current representation.

## Source-event ingestion

Linked domains publish versioned semantic events. Support uses an inbox:

- Deduplicate source event identity.
- Validate schema, source, object association, visibility, and sequence.
- Map to a registered Case timeline event.
- Update typed extension or obligation only through a Support command.
- Store inbox, Support change, timeline entry, and outbox atomically.

Source events retain their owner and source timestamp. A late Refund event does not become a Support-authored refund.

Unknown event versions quarantine and alert rather than producing guessed customer text.

## Customer-visible messages

A Support Message contains:

- Stable identity
- Case
- Actual sender and participant role
- Audience
- Typed content format
- Created and submitted time
- Reply-to message where applicable
- Attachment Evidence references
- Delivery request references
- Correction or redaction history
- Moderation or safety state

Store canonical message content as sanitized structured plain text with limited governed formatting. Arbitrary HTML, active content, remote tracking pixels, and embedded credentials are prohibited.

Submitting a message appends it once and starts applicable obligations. Channel delivery occurs afterward and cannot roll back the Case message.

## Internal notes

Internal Note is a distinct type and table, never a boolean on a customer message.

- It has workforce-only authorization and purpose.
- Admin presentation identifies it persistently as internal.
- It cannot impersonate a customer or source domain.
- It cannot hide a decision, request, or promise that policy requires communicating.
- Copying content to the customer creates a new attributed Message.
- Creation, edit through correction, access, export, and retention are auditable.

Provider participants cannot access general internal notes. A package-specific Nexora instruction is a separate scoped work-package message.

## Inbound channel association

Email, chat, phone, or other channels adapt into the Case record.

Inbound written messages require:

- Channel provider authentication evidence
- Case-specific opaque reply reference
- Sender endpoint match or renewed participant verification
- Active participant and Case scope
- Anti-abuse and content validation

An order number, subject-line text, or guessed Case reference is insufficient.

Unmatched, ambiguous, spoofed, or revoked-sender content enters a restricted triage queue or is rejected. It never silently joins a Case.

Phone and live interactions create an attributed summary or governed transcript with notice, consent, retention, and correction behavior. Delivery-channel history is not the canonical Case history until validated and recorded.

## Outbound communication

Support commits the customer-visible Message before requesting Messaging delivery.

Messaging owns:

- Template rendition where a channel wrapper is needed
- Queue and attempt
- Provider reference
- Delivered, failed, bounced, or suppressed state
- Retry and reconciliation

Failed delivery creates a Case-visible operational event and eligible alternate-channel action. It does not mark the customer as having received or fulfilled a request.

## Evidence object

Evidence is a governed Support object with:

- Stable identifier and version
- Case, item, issue, and decision association
- Uploader and role
- Evidence type and declared format
- Private object-storage reference
- Size, media type, checksum, and capture metadata
- Submitted, scanned, validated, review, rejected, replaced, withdrawn, and quarantined states
- Field and participant access class
- Retention, Legal hold, and deletion policy
- Decision-use references

Binary data does not live in PostgreSQL. The database owns metadata and lifecycle; private object storage owns encrypted bytes.

## Evidence upload

Use a staged direct-upload flow:

1. Authenticate and authorize the participant and intended Evidence type.
2. Create a single-purpose upload operation with size, type, count, and expiry limits.
3. Issue a short-lived private object upload capability.
4. Upload into quarantine.
5. Verify completion, checksum, actual media type, and content bounds.
6. Scan for malware and unsafe content.
7. Generate safe derivatives through media processing when needed.
8. Mark received or rejected.
9. Let an authorized reviewer validate evidentiary meaning separately.

Upload success proves receipt only. Malware scan success does not prove a claim. Evidence review does not execute a remedy.

Client file names, extensions, media types, metadata, archives, images, PDFs, and office documents are untrusted.

## Evidence access

Downloads and previews:

- Reauthorize Case participation, purpose, field scope, and Evidence state
- Use short-lived object capabilities
- Prefer safe derivatives
- Apply content disposition and sandboxing
- Prevent public indexing and shared caching
- Record access when policy requires

AI access is separately authorized, minimized, attributable, and limited to approved evidence types. Evidence is never sent to a model provider by default.

## Evidence version and decision integrity

Replacement creates a new Evidence version. A decision records exact Evidence versions used.

Withdrawal or privacy deletion:

- Stops future ordinary use when eligible
- Preserves required decision integrity, Legal hold, or audit references
- Records the governing reason
- Does not silently rewrite past rationale

Redaction produces a derived version with provenance. Original access becomes more restricted; the derived file does not replace source bytes invisibly.

## Evidence retention

Retention derives from Case Type, Evidence type, policy version, decision use, legal obligation, participant, and hold state.

Expiry workers:

- Identify eligible objects
- Recheck holds and active obligations
- Delete or cryptographically render inaccessible according to storage capability
- Retain minimal tombstone and integrity evidence
- Confirm derived and provider-copy disposition
- Reconcile failures

Backups expire under their approved lifecycle and do not serve routine Evidence access.

## Support Obligations

An Obligation is a separate Support aggregate:

- Stable identifier
- Case and affected scope
- Obligation type and policy version
- Accountable owner
- Responsible participant or team
- Start and due expectation
- Business calendar and time zone
- State
- Pause periods and reasons
- Satisfaction or cancellation evidence
- Escalation route
- Revision

States remain Active, Satisfied, Paused, Breached, and Cancelled.

One Case can have several obligations. One pause or satisfaction cannot affect another implicitly.

## Service-clock calculation

Use a deterministic calendar service or library within Support backed by versioned:

- Business calendar
- Holidays and exceptional closures
- Operating windows
- Time zone
- Obligation policy
- Pause eligibility

The calculated due expectation stores its inputs and version. Changing future policy does not rewrite historical expectations silently.

A scheduler uses durable due commands. It:

- Claims due work idempotently
- Rechecks current Obligation state and revision
- Marks Breached or creates at-risk escalation once
- Records timeline and outbox events
- Reconciles missed schedules

System outage does not pause clocks automatically. Any pause requires its governed reason and evidence.

## Customer expectation

Expose:

- Next action
- Responsible party
- Honest expected date or range
- Current pause or external dependency
- Material change and reason

Internal targets are not promises unless the applicable policy defines them as such. Unknown external timing stays Unknown.

## Escalation

Escalation is a flag and workflow, not lifecycle or remedy authority.

Triggers can include:

- At-risk or Breached Obligation
- Safety, security, vulnerability, or material impact
- Repeated failed resolution
- Cross-domain or provider blockage
- Policy exception
- Authorized manual review

Automatic escalation may change queue, priority, notify, or request review. It cannot approve refund, replacement, warranty, repair, or policy exception.

## Remedy Request

When a Case requires an action owned elsewhere, Support creates a durable Remedy Request.

It contains:

- Case and source-object scope
- Requested operation
- Customer-visible rationale
- Supporting Evidence version references
- Applicable policy and eligibility result
- Requesting subject
- Required approval and assurance
- Idempotency key
- Target owner
- State and source operation reference

Lifecycle:

`Proposed → Validated → Approved when required → Submitted → Accepted | Rejected | Pending | Indeterminate → Confirmed`

Support does not write the target record. The target:

- Reauthorizes the command
- Rechecks current source state and eligibility
- Creates its own operation
- Returns stable outcome and reason
- Publishes progress

Case resolution cannot claim target completion before Confirmed source evidence.

## Remedy examples

- Payments executes Refund.
- Fulfillment creates Return Shipment or repair logistics.
- Inventory records return disposition.
- Purchase applies eligible cancellation or replacement Order coordination.
- Identity performs account-security operation.
- Catalog or Compatibility evaluates Product facts but does not accept a Support mutation of truth.

Replacing a product through a remedy creates an explicit source-owned commercial and fulfillment operation; it is not an edit to the original Order line.

## External Work Package

A Work Package contains:

- Stable identifier and Case
- Provider organization and individual participants
- Task type and purpose
- Exact Order, Shipment, item, Product, Evidence, and field scope
- Allowed reads, messages, structured updates, and commands
- Required input snapshot
- Provider and Nexora obligations
- Start, due, expiry, and revocation
- Governing contract, privacy, consent, and policy references
- Accountable Nexora owner
- Completion criteria
- External references
- Synchronization and reconciliation state

Package creation snapshots only the minimum necessary data. Providers do not receive general Case, Account, payment, internal-note, or unrelated Evidence access.

## Provider access patterns

Prefer, in order:

1. Provider API using a distinct workload identity and package-scoped contract
2. Protected provider portal using workforce federation and package-scoped authorization
3. Time-bounded verified human task flow when no integration exists

Emailed spreadsheets, shared accounts, reusable public links, and general Admin access are prohibited.

Every provider participant is attributable. Provider organization membership constrains eligibility but does not grant a Package automatically.

## Work Package lifecycle

`Draft → Offered → Accepted → Active → Completed | Rejected | Expired | Revoked`

Acceptance records the provider identity, exact scope, input revision, due expectation, and contract.

Completion:

- Validates required structured result and Evidence
- Satisfies only the Work Package
- Does not resolve the Case automatically
- Does not approve a Nexora remedy
- Triggers Nexora review and linked Obligation evaluation

Expiry or revocation removes future access and active credentials while preserving history.

## Provider updates

Provider updates use registered schemas such as:

- Pickup scheduled or completed
- Item received and chain-of-custody
- Diagnostic result
- Repair estimate
- Approval request
- Repair started or completed
- Return shipment
- Manufacturer reference and status

Free-form provider messages cannot substitute for required structured state.

Events pass through an inbox with authentication, schema validation, Package scope, sequence, deduplication, and state-transition checks. Invalid or conflicting updates quarantine for authorized review.

## Provider communication

Direct provider-customer communication is allowed only through an approved Package channel.

- Messages are scoped to the Package.
- Applicable communication is recorded in the Case timeline.
- Contact details are minimized or proxied where feasible.
- Provider cannot move required communication to an unrecorded channel.
- Customer-visible provider identity and responsibility are clear.

Nexora retains Case accountability for coordinated work. Manufacturer-owned handoff is represented separately with explicit limits on Nexora visibility and responsibility.

## Manufacturer-owned process

When a manufacturer exclusively owns the process:

- Support records a transparent external handoff, not a Nexora Work Package pretending to control it.
- The customer sees what data transfers, who is responsible, expected next step, and how to return.
- External reference and known state can be recorded.
- Nexora does not fabricate milestones it cannot observe.
- Remaining Nexora obligations stay active.

## Reconciliation

Reconcile:

- Case lifecycle against active Obligations and Remedy Requests
- Responsibility against current expected action
- Assignment against accountable owner
- Timeline against source inbox and Messages
- Message record against Messaging Delivery
- Evidence metadata against object storage and scan state
- Evidence decisions against retained versions
- Work Package against provider identity, expiry, updates, and obligations
- Remedy Request against target operation
- Customer and Admin projections against Case source

Projection repair never changes Case truth. Source correction uses an authorized command and linked timeline entry.

## Search and projections

Public Search indexes only eligible published Support Articles, never Cases.

Authenticated customer search can index a minimal Case continuation projection containing stable Case reference, safe summary, lifecycle, responsibility, updated time, and destination. Opening reauthorizes.

Admin operational Search and worklists use permission-filtered projections. Evidence content, internal notes, restricted source facts, and provider payloads do not enter general indexes.

My Support Cases and queues use cursor pagination and source-defined filters. Counts carry freshness and authorization scope.

## AI boundaries

AI can:

- Suggest intent and Case Type
- Detect likely duplicate candidates
- Draft replies
- Summarize authorized timelines
- Extract proposed structured fields from Evidence
- Suggest routing and missing context

AI output remains a proposal with provenance and confidence.

AI cannot:

- Create or merge a Case without explicit governed submission
- Change lifecycle, responsibility, assignment, participant, or Obligation
- Approve Evidence
- Commit a Remedy
- Grant provider access
- Mark external work complete
- Resolve or close a Case

Sensitive Evidence, internal notes, security details, and third-party data require separate authorization and provider-use policy before model access.

## Concurrency and idempotency

- Case commands use strong ETags.
- Message submission is idempotent.
- Timeline source events deduplicate by source identity.
- Evidence completion and scan callbacks are idempotent.
- Obligation scheduling and Breach transition are idempotent.
- Remedy Request and target command share stable correlation.
- Work Package offer, accept, update, complete, expire, and revoke are idempotent.
- Merge and split use durable operations.

Conflicts preserve drafts and show current state. A generic last-write-wins update is prohibited.

## Degraded behavior

- Support Center and published articles can remain available if Cases fail.
- Draft triage is preserved safely within expiry when Case creation fails.
- A message remains confirmed in the Case even if channel delivery fails.
- Evidence remains Quarantined or Processing; it is not shown as reviewed.
- Malware or derivative service failure does not make the original downloadable.
- Obligation calculation failure shows expectation unavailable and alerts; it does not pause or satisfy the clock.
- Source-domain outage makes Remedy eligibility or progress unavailable; Support does not infer it.
- Provider outage preserves last confirmed update with freshness and returns responsibility to the accountable Nexora owner for coordination.
- Projection failure does not display No Cases or an empty queue.
- AI failure does not block deterministic triage, message, evidence, or Case work.

## Security and privacy

- Case access requires verified participant association and current purpose.
- Guest sessions are narrow and expiring.
- Workforce and provider access use capability, queue, record, field, and Evidence scope.
- Internal notes remain separate from customer content mechanically.
- Provider participants cannot impersonate Nexora or customers.
- Evidence is encrypted, quarantined, scanned, access logged where required, and never public.
- Customer communication is sanitized and rate limited.
- Sensitive source facts are fetched through authorized contracts and not copied broadly.
- Exports are purpose-specific, field-filtered, watermarked where governed, expiring, and audited.
- Retention, correction, deletion, redaction, and Legal hold preserve source and decision integrity.

## Observability

Measure:

- Triage-to-case conversion and duplicate continuation
- Case creation success and idempotent replay
- Queue depth, unassigned age, ownership handoff, and conflicts
- Lifecycle and responsibility transition rates
- Obligation at-risk, pause, Breach, satisfaction, and scheduler lag
- Message submission, inbound association, delivery failure, and response time
- Evidence upload, scan, rejection, review, and retention backlog
- Remedy Request acceptance, rejection, pending, and source-confirmation lag
- Work Package offer, acceptance, expiry, completion, provider lag, and reconciliation
- Projection freshness
- AI proposal acceptance and correction without sensitive content

Traces correlate Case, participant, Message, Evidence, Obligation, Remedy Request, Work Package, source operation, and delivery while respecting field restrictions.

## Quality gates

Before release:

- Test every shared and type-specific lifecycle transition and forbidden transition.
- Prove lifecycle, responsibility, assignment, escalation, Obligation, Evidence, delivery, and linked-source state stay independent.
- Test authenticated, verified guest, representative, workforce, specialist, and provider participation.
- Test duplicate proposal, explicit continuation, merge, split, successor, and provenance.
- Verify inbound spoofing, ambiguous association, revoked sender, replay, and provider callback handling.
- Test Message correction, internal-note separation, channel failure, and customer-visible timeline order.
- Test direct Evidence upload, type confusion, oversized file, malware, archive, scan failure, replacement, redaction, withdrawal, Legal hold, and deletion.
- Test business-calendar boundaries, time zones, pause rules, missed scheduler, Breach, handoff, and escalation.
- Prove Support cannot directly mutate payment, refund, shipment, inventory, Order, Identity, Catalog, or Compatibility truth.
- Test Remedy idempotency, target rejection, timeout, late success, and reconciliation.
- Test Work Package least privilege, expiry, revocation, conflicting event, provider offboarding, and manufacturer-only handoff.
- Rebuild customer list, Admin queue, authenticated Search, and timeline projections.
- Test Brazilian Portuguese content, responsibility, dates, expectations, corrections, and provider language.
- Test keyboard, screen reader, zoom, focus, message composition, evidence upload, progress, timeline, mobile next action, and degraded recovery.

## Consequences

### Benefits

- One Case model supports every approved Support journey.
- Communication and Evidence remain attributable and decision-safe.
- Obligations express real concurrent service responsibilities.
- Source-owned remedies prevent Support from fabricating outcomes.
- External providers receive minimal, revocable work scope.
- Projections and provider integrations remain rebuildable and reconcilable.

### Costs and risks

- Typed extensions, obligations, and provider packages create a rich domain model.
- Evidence processing and retention require secure infrastructure.
- Inbound channel association has spoofing and privacy risk.
- Cross-domain remedy workflows can remain pending.
- Provider heterogeneity creates adapter and reconciliation work.

## References

- [Support Center Architecture](../03-product-structure/05-support-center-architecture.md)
- [Support and Authentication Patterns](../04-design-system/19-support-and-authentication-patterns.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [Authorization and Policy Enforcement](13-authorization-and-policy-enforcement.md)
- [Order, Fulfillment, Account, and Notification Continuity](19-order-fulfillment-account-and-notifications.md)
- [ADR-0026: Shared Typed Support Case and Bounded External Work](../adrs/ADR-0026-shared-typed-support-case-and-bounded-external-work.md)

