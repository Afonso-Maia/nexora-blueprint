# Account and Post-Purchase Architecture

**Status:** Approved

## Purpose

This document defines how authenticated customers manage identity, preferences, persistent commerce context, orders, and post-purchase continuity without duplicating the ownership or interfaces of Comparison, PC Builder, AI, and Support.

It builds on the approved [Page Inventory](01-page-inventory.md), [relationships and ownership](02-page-relationships-and-ownership.md), and [Information Hierarchy](03-information-hierarchy.md).

## Decision

Nexora uses a **federated continuity account**.

Account is the trusted home for customer identity, preferences, order access, and meaningful continuation. It summarizes and links source-owned objects across the ecosystem but does not absorb their workspaces or create parallel copies.

## Account-owned pages

Account owns the page experience for:

- ACC-001 Account Dashboard
- ACC-002 Orders
- ACC-003 Order Detail
- ACC-004 Wishlist
- ACC-005 Addresses
- ACC-006 Payment Methods
- ACC-007 Notifications
- ACC-008 Account Settings

The Customer domain owns these experiences. Referenced order, payment, delivery, Support, build, product, and notification-event data retains its authoritative owner as defined in the ownership ledger.

## Federated capabilities

Account provides prominent continuation links to:

- EVA-002 Comparison Workspace
- PCB-003 Saved Builds and PCB-002 Engineering Workspace
- SUP-006 My Support Cases and SUP-007 Support Case Detail
- AIS-001 AI Assistant Conversation

These capabilities retain their approved owning domain, shell, archetype, access checks, and lifecycle. Account links to them without embedding duplicate Account-owned versions.

AI conversation history remains inside the Assistant Conversation template. Comparison remains a global utility rather than permanent Account navigation.

## Account navigation

The conceptual Account navigation is:

1. **Overview**
2. **Orders**
3. **Wishlist**
4. **PC Builds**
5. **Support Cases**
6. **Preferences**
   - Addresses
   - Payment Methods
   - Notifications
   - Account Settings

`Preferences` is a navigation group, not a page.

PC Builds and Support Cases are cross-surface links. Their placement in Account navigation communicates continuity and does not transfer ownership.

## Governance rules

1. Account Dashboard summarizes source-owned objects without copying their authority.
2. Cross-surface navigation preserves identity and minimum meaningful context.
3. Every target independently rechecks authentication, authorization, object ownership, and current state.
4. Current orders, active cases, and resumable builds outrank general settings.
5. Account navigation reflects customer tasks rather than internal service boundaries.
6. Compare remains globally accessible and does not become a duplicate Account page.
7. AI history remains in the dedicated Assistant.
8. Historical order facts are immutable from preference-management pages.
9. Customer profile changes cannot alter historical order, invoice, case, or consent records silently.
10. Mobile preserves the same conceptual groups and high-priority continuation paths.

## Shell transitions

Cross-surface links make the destination clear before or at transition. The target uses its approved shell:

- Account pages use the Storefront Account shell.
- Comparison uses the Decision Workspace.
- PC Builder uses the Engineering Workspace.
- Support cases use the Support shell.
- AI conversations use the AI Workspace.

Returning to Account restores relevant navigation and safe continuation context without carrying sensitive workspace data in URLs.

## Account Dashboard prioritization

Account Dashboard is a **state-driven continuation hub**. It does not use a fixed collection of equally weighted modules.

Applicable modules follow this priority:

1. Account or security action required
2. Order, payment, delivery, return, warranty, or Support exception
3. Active orders and shipments
4. Active Support cases
5. Resumable Cart, Comparison, or PC Build
6. Wishlist and recently viewed continuity
7. Relevant recommendations
8. Preferences and general management

Within the same tier, governed urgency and recency determine order.

### Priority governance

- Priority is deterministic and explainable, not AI-controlled.
- Source domains own status, urgency, eligibility, and resolution facts.
- Dashboard summarizes an item; the target page owns its action.
- Marketing and recommendations cannot outrank active customer obligations or resumable owned work.
- Critical items remain until resolved, expired, or superseded.
- Dismissal is available only for genuinely optional items.
- Empty modules are omitted or reduced to useful first-use guidance.
- Duplicate events from several sources resolve into one clear continuation when they represent the same underlying object.
- A stale or unavailable source is identified rather than silently presented as current.

### Fallback behavior

If personalization or aggregation is unavailable, Dashboard prioritizes:

1. Known account or security requirements
2. Available active-order and case summaries
3. Stable navigation to Orders, Wishlist, PC Builds, Support Cases, and Preferences

It does not fill missing owned state with additional merchandising.

### Responsive behavior

Mobile preserves the same priority order. Critical status and primary continuation remain ahead of recommendations and Preferences. Lower-priority modules may collapse, but their priority cannot be raised merely because they fit a compact presentation.

## Composite order-state model

Order Detail coordinates several independently authoritative state dimensions rather than flattening an order into one status.

### Order lifecycle

Owned by Purchase:

- Placed
- Processing
- Fulfilled
- Cancelled
- Closed

### Payment state

Owned by Payments:

- Pending
- Authorized
- Paid
- Failed
- Partially refunded
- Refunded

### Fulfillment state

Owned by Delivery or Fulfillment for each shipment or delivery group:

- Preparing
- Shipped
- Delivered
- Exception
- Returned

### Case state

Returns, refunds, warranties, repairs, and general Support remain linked typed cases owned by Support. A case does not overwrite the order, payment, or fulfillment state.

### Customer-facing summary

Order Detail derives a concise summary from the authoritative dimensions. Examples include:

- Payment required
- Preparing 2 items
- Partially shipped
- Delivery exception
- Delivered — return in progress

The summary is deterministic and explainable. It never becomes a new source of truth.

The most urgent actionable condition leads. Users can inspect the underlying dimensions, partial states, timestamps, and historical events. A later summary does not erase earlier events.

### Action eligibility

Cancel, track, invoice, return, warranty, and Contact Support actions are evaluated against the current authoritative dimensions.

Every action declares:

- Eligible object or item scope
- Current eligibility
- Responsible domain
- Consequence
- Required assurance
- Pending or conflicting operation
- Reason when unavailable

Eligibility is rechecked at action start and commitment. A stale button or prior notification cannot grant eligibility.

### Governance rules

1. Purchase owns order lifecycle.
2. Payments owns payment state.
3. Delivery or Fulfillment owns shipment state.
4. Support owns case state.
5. Customer owns the Order Detail experience but not these records.
6. Partial shipment, cancellation, refund, return, and exception states remain explicit.
7. Dashboard, Notifications, and Support reference the same authoritative dimensions.
8. No customer-facing label implies a completed payment, delivery, refund, or remedy before its owner confirms it.

## Verified guest-order access and claim

Guest customers can complete post-purchase tasks without being forced to create an Account. Guest-order access uses a secure, expiring context established through verification of a governed contact factor associated with the order.

An order number alone is never sufficient. Before verification, Nexora does not disclose whether an order exists or expose order, customer, payment, delivery, or Support data.

### Guest access

A verified guest may receive the minimum scope needed to:

- View the applicable order and fulfillment status
- Track eligible shipments
- Access invoices or other eligible order documents
- Start or resume eligible return, warranty, or Support tasks
- Contact Support with the verified order context

The access context is short-lived, single-purpose where practical, and restricted to the verified order and requested task. Sensitive actions may require stronger or renewed verification.

### Permanent Account claim

Attaching a guest order permanently to an Account requires:

1. Authentication or Account creation
2. Verification of control over a governed order contact factor
3. Explicit customer confirmation of the claim
4. Duplicate, conflict, and existing-attachment checks
5. A recorded, idempotent outcome

Successful claiming makes the same order available in Orders and eligible Dashboard summaries. It does not create a duplicate order or parallel history.

### Conflict and integrity rules

1. Matching an Account email address, phone number, or profile attribute never claims an order automatically.
2. If the order is already attached to another Account, the flow returns a secure conflict outcome and does not reveal that Account or reassign the order.
3. Support agents cannot bypass proof of control or silently transfer an order between Accounts.
4. A claim changes access association only. It never changes historical customer, invoice, delivery, payment, tax, or consent facts.
5. Declining Account creation or permanent attachment does not remove verified guest access to eligible post-purchase tasks.
6. Claim requests and outcomes are auditable without exposing verification secrets.
7. Repeated successful requests resolve to the existing attachment; repeated conflicting requests cannot create additional associations.
8. Every destination independently rechecks current authorization and action eligibility.

## Risk-tiered preference assurance

Account management uses assurance proportional to the consequence of the requested action. Every mutable preference or identity action declares a governed assurance tier; interface placement alone never determines its protection.

### Tier 1 — Routine

A valid authenticated session is sufficient for low-risk, readily reversible changes such as:

- Notification-channel and topic preferences
- Non-sensitive personalization preferences
- Interface preferences

### Tier 2 — Sensitive

Recent authentication or targeted verification is required for changes that can redirect customer communication, fulfillment, or future commerce behavior, including:

- Adding or editing saved addresses
- Changing personal or governed contact information
- Selecting a default payment method
- Other changes with comparable fraud or privacy impact

### Tier 3 — Critical

Step-up authentication, explicit confirmation, and an audit record are required for high-impact identity, financial, privacy, or lifecycle actions, including:

- Adding or removing payment instruments
- Changing credentials or authentication factors
- Requesting a privacy export
- Initiating Account closure

Recovery safeguards, customer notification, cooling periods, or delayed execution apply where the later lifecycle or regulatory decision requires them.

### Assurance governance

1. Authentication owns session recency, verification methods, and step-up assurance.
2. Customer owns the preference-management experience and communicates why additional assurance is required.
3. Payments owns payment-instrument validation, tokenization, storage, and payment-specific controls.
4. Purchase owns checkout-specific address and contact snapshots.
5. Current preferences do not rewrite historical orders, invoices, deliveries, Support cases, or consent records.
6. A source domain may require a higher tier because of current risk, account restriction, or action context; no consumer may lower the governed minimum.
7. Assurance is rechecked when the change is committed, not inferred from an earlier page visit.
8. Failed or abandoned verification preserves the current value and provides a safe recovery path.
9. Sensitive values and verification evidence are not exposed in URLs, analytics, or general-purpose logs.
10. Tier assignments are governed policy and must be reviewed when a capability's consequences change.

## Capability-based restriction and recovery

Account restrictions apply to governed capabilities rather than operating as one undifferentiated lock. Each request evaluates the customer's current restriction state, the requested capability, and the assurance required for that action.

### Restriction states

| State | New commerce and payment changes | Existing orders and documents | Support and remedies | Account changes and recovery |
| --- | --- | --- | --- | --- |
| Normal | Available when otherwise eligible | Available | Available | Available at the governed assurance tier |
| Verification required | Safe browsing and unaffected actions continue; sensitive actions require verification | Available with appropriate verification | Available | Sensitive changes pause until verification succeeds |
| Commerce restricted | Purchasing, financing, and payment changes pause | Tracking, invoices, delivery status, and eligible order actions remain available | Returns, warranties, and Support remain available when safely possible | Unaffected settings remain available; recovery path is prominent |
| Security restricted | Unavailable | Minimum protected access through secure recovery or verified task-specific paths | Minimum protected access for unresolved obligations | Secure recovery is primary; other mutations pause |
| Closure pending | New commerce and new financial commitments stop | Access continues for outstanding and retained obligations | Existing remedies and cases continue | Closure status, cancellation where eligible, and required controls remain |
| Closed | Unavailable | Retained records use a separate verified access path when required | Unresolved or retained obligations use verified non-Account channels | Authentication ends; reopening is not implied |

Restrictions can coexist. The effective result is the most protective rule for the requested capability, not necessarily the most restrictive label for the entire Account.

### Restriction contract

Every restriction records:

- A stable reason category without unnecessary security-sensitive detail
- Affected capabilities
- Authoritative owner
- Start time and source
- Recovery or review path
- Expiry, review, or resolution condition
- Customer-notification requirements
- Auditable changes and administrative actions

The Account experience explains what is affected, what remains available, and the next safe action. When detailed disclosure would create security or fraud risk, Nexora may limit the explanation but still provides actionable recovery guidance.

### Recovery and continuity rules

1. Identity or Security owns identity restrictions and recovery assurance.
2. Risk or Payments owns commerce and payment restrictions within its governed scope.
3. Customer owns the Account-facing explanation, capability routing, and continuity experience.
4. Purchase, Delivery, and Support preserve access to existing obligations whenever the governing risk permits it.
5. A restriction cannot erase, rewrite, or conceal the existence of historical records the customer remains entitled to access.
6. Recovery uses the risk-tiered assurance model and may require a stronger tier than the interrupted action.
7. Successful recovery re-evaluates current restrictions; it does not blindly restore every prior capability.
8. Failed or abandoned recovery preserves the restriction and offers a safe retry or Support route without disclosing verification secrets.
9. Administrative overrides require explicit permission, a reason, bounded scope, and an audit record.
10. No administrative override bypasses required proof of identity or transfers ownership of customer objects.
11. Support may coordinate recovery but does not become the authority for Identity, Risk, Payments, Purchase, or Delivery records.
12. All destinations independently enforce the current effective restriction; Dashboard visibility alone never grants access.

## Unified notification center

ACC-007 Notifications is a governed customer-facing projection of events owned by authoritative source domains. It provides one coherent history and preference experience without becoming the source of order, payment, delivery, Support, security, or marketing facts.

### Notification classes

| Class | Examples | Preference behavior |
| --- | --- | --- |
| Security | Sign-in, credential, recovery, restriction, and high-risk Account events | Required notices cannot be disabled; channel may be constrained by security policy |
| Transactional | Payment, order, shipment, return, refund, warranty, and Support-case updates | Required service notices cannot be disabled; optional supplemental channels may be configurable |
| Continuity | Saved Cart, Comparison, PC Build, or Wishlist reminders | Optional by topic and channel |
| Advisory | Compatibility, product-service, safety, or Account-action guidance | Required only when governed obligation or material risk applies; otherwise configurable |
| Marketing | Deals, launches, collections, and recommendations | Optional and controlled by distinct marketing consent |

The source event's class is governed. Delivery systems and presentation surfaces cannot reclassify a required service notice as marketing or use a service class to bypass marketing consent.

### Event, delivery, and interaction state

The model separates:

- **Source event state:** the authoritative fact and its current validity
- **Delivery state:** queued, delivered, failed, or otherwise governed by the Messaging domain per channel
- **Interaction state:** unread, read, dismissed, or actioned in the customer experience

These states do not overwrite one another. Reading or dismissing a notification does not resolve its source event, and delivery success does not imply that the customer read or acted on it.

Notifications link to the authoritative destination. That destination rechecks identity, authorization, restriction state, source status, and current action eligibility. A notification never grants access or preserves an expired action.

### Preferences and channels

1. Customer owns the unified preference experience.
2. Source domains declare the event class, urgency, destination, validity, and whether notice is required.
3. Messaging owns channel delivery, retry behavior, and delivery status.
4. Customers may configure eligible topics, channels, and frequencies for optional classes.
5. Required security, service, legal, or operational communications remain available under governed channel rules.
6. Marketing consent is independent of service communication and is recorded with its own provenance and history.
7. Preference changes affect future eligible delivery and do not rewrite historical consent or delivery evidence.
8. Channel unavailability triggers an honest fallback or failure state; it never silently changes consent.

### Retention and lifecycle

Retention is class- and purpose-based:

- Security and audit evidence follows the governing security and audit policy.
- Commerce, payment, delivery, remedy, and Support events follow their source-record obligations.
- Optional continuity and marketing reminders use shorter governed expiry periods.
- In-app presentation may expire before the authoritative source record.

Dismissal removes an eligible item from the active presentation but is not record deletion. Expired, superseded, or retracted actions remain understandable when retention requires history, but cannot be executed. Duplicate channel deliveries and source updates resolve to one customer-understandable event thread where they represent the same underlying fact.

### Degraded behavior

If aggregation is delayed or a source is unavailable, Notifications identifies stale or incomplete status. It does not invent a current state, mark an action complete, or replace missing operational notices with marketing content. Authoritative destination pages remain the final reference.

## Governed privacy-request lifecycle

Privacy export, correction, restriction, consent withdrawal, and Account closure are durable request objects. ACC-008 Account Settings initiates and tracks them without introducing a separate canonical page.

Simple preference or consent changes may complete immediately when policy permits. They still produce the required provenance and history. Requests that require verification, coordination, review, or asynchronous fulfillment use the governed lifecycle.

### Request contract

Every privacy request records:

- Request type and requested scope
- Identity-assurance requirement and verification state
- Submitted and effective timestamps
- Current status and customer-visible next step
- Responsible policy owner
- Participating source domains
- Dependencies, exclusions, or blocked obligations
- Outcome and completion evidence
- Governing retention-policy reference

Exact legal periods, disclosures, and jurisdiction-specific fulfillment rules are policy inputs. The architecture does not invent or hard-code them.

### Lifecycle

The primary lifecycle is:

`Draft → Verification required → Submitted → In review or processing → Completed, Partially completed, Rejected, or Cancelled`

- **Draft:** scope is being selected and no request has been committed.
- **Verification required:** the request cannot be submitted or advanced until its governed assurance succeeds.
- **Submitted:** the request is durable, timestamped, and awaiting processing.
- **In review or processing:** policy and source domains are evaluating or executing applicable actions.
- **Completed:** the approved scope has been fulfilled.
- **Partially completed:** fulfilled and retained or excluded scope is explained separately.
- **Rejected:** the governed reason and available review or Support path are presented.
- **Cancelled:** cancellation provenance and any already-effective consequences remain recorded.

Status is deterministic and auditable. Support conversations and Notifications may reference the request but do not become its authoritative status.

### Export delivery

Privacy exports are generated from the approved scope and delivered through a time-limited, access-controlled mechanism. Export access requires the governed assurance level and is independent from an ordinary authenticated browsing session when policy requires stronger protection.

The package identifies its generation time and scope. It is a point-in-time export, not a parallel live Account. Expiry removes delivery access without implying deletion of the authoritative records or request evidence.

### Account closure

Initiating closure requires Tier 3 assurance and explicit confirmation. The Account enters the approved **Closure pending** restriction state while Nexora evaluates and completes the request.

Closure does not:

- Cancel, erase, or abandon open orders, payments, deliveries, refunds, returns, warranties, disputes, or Support obligations
- Rewrite historical order, invoice, tax, delivery, consent, or audit records
- Imply immediate deletion of records governed by another valid purpose or retention policy
- Transfer ownership of customer objects

New commerce and financial commitments stop during Closure pending. Required access to outstanding obligations continues through the safest eligible Account or verified task-specific path.

Authentication ends only when closure is eligible to complete. Retained records remain purpose-limited and governed by policy. Required post-closure records or unresolved obligations use a separate verified access route; the closed Account is not silently reopened.

### Ownership and governance

1. Privacy or Governance owns request policy, scope rules, status determination, and completion evidence.
2. Identity owns verification, authentication state, and closure of login capability.
3. Customer owns initiation, explanation, status presentation, and safe continuation.
4. Source domains execute approved export, correction, restriction, retention, or deletion actions for their records.
5. A source domain reports its outcome without independently declaring the whole request complete.
6. Legal retention policy governs retained scope; retention must have a recorded purpose and policy reference.
7. Support may explain, collect context, or escalate but cannot silently change scope, status, or outcome.
8. Administrative action requires explicit permission, stated reason, bounded scope, and auditability.
9. Customers receive an understandable outcome for completed, partial, rejected, and cancelled requests.
10. Failure in one source is exposed as pending, partial, or failed work rather than hidden behind a completed status.

## Mobile navigation and cross-surface continuity

On mobile, Account uses a task-prioritized hub with contextual subnavigation.

- Account Dashboard remains the Account entry point.
- A compact Account switcher exposes Orders, Wishlist, PC Builds, Support Cases, and Preferences.
- Detail pages preserve a clear parent relationship, such as `Orders → Order Detail`.
- Applicable high-priority status and continuation actions appear before general Account navigation.
- Account navigation does not duplicate the global Storefront navigation.

Cross-surface links open the destination's approved mobile shell. PC Builder, Support, Comparison, and AI retain their own navigation, ownership, and interaction model rather than appearing to be Account-owned tabs.

### Continuation and restoration rules

1. Returning from another surface restores the relevant Account destination and safe context when available.
2. Filter, scroll, and source-object context may be restored; sensitive data and committed actions are never replayed.
3. The owning surface preserves unsaved work or requests explicit confirmation before discarding it.
4. Sensitive state is held in protected application context and is not exposed in URLs.
5. Deep links independently recheck authentication, authorization, restriction state, object ownership, and current eligibility.
6. Expired or invalid context falls back to the nearest safe parent with a clear explanation and recovery action.
7. Browser and system back behavior remains predictable and does not cross an authentication boundary with exposed content.
8. Focus moves to the destination heading or restored control as appropriate; labels communicate the current hierarchy and surface transition.
9. Mobile compaction may collapse secondary controls but cannot reorder critical obligations beneath recommendations or general preferences.

## Architecture validation

The Account and post-purchase architecture passes its Phase 2B topic validation:

- All eight Account-owned inventory entries have a defined role.
- Federated destinations retain the owners and shells defined in the page ownership ledger.
- Dashboard priority, order state, and Notifications derive from authoritative source state without creating competing records.
- Guest post-purchase access does not require Account creation, and permanent claiming requires verified explicit consent.
- Preference changes use consequence-based assurance and cannot rewrite historical commerce records.
- Restrictions preserve existing obligations and remedies wherever safely possible.
- Privacy requests and closure have durable, auditable lifecycles.
- Mobile navigation preserves task priority, surface ownership, safe context, and accessible recovery.
- Loading, empty, error, offline, and degraded-state presentation remains governed by the later cross-product state architecture.

No unresolved Account architecture alternative is recorded as approved. Detailed legal periods, channel policies, risk thresholds, and interaction copy remain governed implementation or policy inputs within these constraints.

## Next phase topic

Define the Support Center Architecture.
