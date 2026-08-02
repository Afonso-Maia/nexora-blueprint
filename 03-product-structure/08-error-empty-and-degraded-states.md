# Error, Empty, Loading, Offline, and Degraded States

**Status:** Approved

## Purpose

This document defines cross-product state semantics and recovery requirements for customer, Support, authentication, legal, PC Builder, AI, purchase, and Administrative Dashboard experiences.

It implements the approved host-owned-state boundary in the [Page Inventory](01-page-inventory.md) and the operation-aware continuity established by the [Account](04-account-architecture.md), [Support](05-support-center-architecture.md), [Administrative Dashboard](06-administrative-dashboard-ia.md), and [Roles and Permissions](07-roles-and-permissions.md) architectures.

## Decision

Nexora uses **host-owned, operation-aware states with explicit truth and recovery semantics**.

Loading, empty, validation, ineligibility, conflict, partial failure, offline, and degraded conditions remain inside the page or embedded unit whenever the user's goal and meaningful context can remain available.

The five approved System and Utility destinations are outer recovery boundaries used only when the requested destination cannot remain meaningful:

- SYS-001 Not Found
- SYS-002 Access Denied
- SYS-003 Unexpected Error
- SYS-004 Service Unavailable
- SYS-005 Offline

## State contract

Every meaningful state declares:

- Host page, region, or operation
- User goal that remains active
- State class
- Authoritative owner
- Confirmed, stale, pending, failed, or indeterminate truth
- Scope affected
- Data or operation timestamp
- Preserved context
- Primary recovery action
- Secondary safe destination
- Retry safety and idempotency
- Accessibility announcement behavior
- Observability and correlation requirement
- Sensitive-data and non-disclosure requirements

Generic visual components may implement the contract, but visual reuse cannot flatten distinct semantics into one “something went wrong” state.

## State taxonomy

### Initial and loading

- Initial page or region loading
- Incremental loading
- Background refresh
- Pagination or continuation loading
- Validation or calculation in progress
- Submission pending
- Asynchronous operation pending

### Empty and zero-result

- First-use empty
- User-cleared empty
- No results for an active query or filter
- No eligible items
- No assigned work
- Completed or archived history only
- Empty because a source is unavailable

The last condition is degraded, not a genuine empty state.

### Input and eligibility

- Field validation
- Cross-field validation
- Resource validation
- Ineligible action
- Verification or assurance required
- Approval required
- Missing evidence or prerequisite

### Failure and conflict

- Recoverable request failure
- Persistent dependency failure
- Partial failure
- Concurrent modification
- Stale baseline
- Duplicate or already-completed operation
- Failed asynchronous operation
- Indeterminate execution

### Access and existence

- Authentication required
- Wrong or expired identity context
- Insufficient permission
- Restricted field or action
- Missing, retired, moved, or protected resource

### Connectivity and degradation

- Intermittent connectivity
- Offline with useful cached context
- Offline without viable destination
- Stale confirmed data
- Partial source degradation
- Broad service degradation
- Planned maintenance

## Truth and operation outcomes

Nexora distinguishes:

- **Not submitted:** no durable operation is known to exist.
- **Pending:** durable work exists and is not final.
- **Confirmed:** the authoritative owner confirms the applicable result.
- **Failed:** the authoritative owner confirms failure and eligible recovery.
- **Indeterminate:** execution may have occurred but cannot yet be confirmed.
- **Superseded:** a later governed operation or state replaced the requested work.

Timeout does not equal failure. A retry is unavailable while an operation remains indeterminate unless the owner provides an idempotent reconciliation-safe retry.

Presentation never reports payment, order, publication, refund, case, message, evidence, permission, export, or configuration success solely because a client request was sent.

## Loading behavior

### Initial loading

Initial loading preserves the page's semantic structure. Skeletons or progress indicators approximate stable regions without fabricating values, rankings, prices, stock, eligibility, messages, or status.

- Search and collection loading preserves query and filter controls where usable.
- Detail loading preserves identity context only when identity is confirmed.
- Transaction loading prevents duplicate commitment.
- Workspace loading preserves known draft and operation references.
- Admin loading never reveals restricted field shapes through placeholders.

### Incremental and background loading

Incremental loading identifies which region is incomplete. Already confirmed content remains usable unless the missing dependency makes its action unsafe.

Background refresh:

- Preserves current confirmed data with an as-of time.
- Does not unexpectedly reorder focused or selected content.
- Announces material changes without excessive interruption.
- Revalidates actions affected by refreshed state.

### Long-running work

Long-running validation, export, publication, payment, Support, privacy, bulk, and orchestration work becomes a durable operation with:

- Stable reference
- Current state
- Owner
- Submitted scope
- Start and last-update time
- Safe leave-and-return behavior
- Notification or queue continuation where applicable
- Cancellation eligibility
- Reconciliation path

Progress animation alone is insufficient.

## Empty and zero-result behavior

### First-use empty

A first-use state explains the capability, relevant prerequisites, and one primary creation or discovery action. It does not invent sample customer, financial, operational, or personal data that could be mistaken for real content.

### User-cleared empty

An intentionally emptied Cart, Wishlist, Comparison, draft collection, or selection confirms the resulting state and offers a relevant continuation without treating it as an error.

### No results

No-results states preserve the active query, filters, intent, compatibility effects, and result scope.

They provide applicable recovery in this order:

1. Explain the active constraints
2. Clear or modify the narrowest high-impact constraint
3. Suggest query repair or adjacent governed scope
4. Preserve access to Categories or relevant navigation
5. Offer optional AI assistance

AI is never the only recovery path and cannot silently clear filters or compatibility constraints.

### No eligible items

No eligibility is different from no data. The state identifies the evaluated scope, authoritative owner, material reason, policy reference where applicable, and review or alternate path.

Unknown eligibility due to unavailable data is shown as unavailable or indeterminate, not ineligible.

### Empty operational work

No assigned Admin or Support work is a valid state. It provides eligible navigation, followed queues, or setup guidance without fabricating urgency, changing scope, or filling the space with vanity metrics.

## Validation, prerequisite, and ineligibility

Validation appears as close as practical to the affected field, object, section, or action while also providing an accessible summary for multi-error submissions.

Every blocking validation identifies:

- What requires attention
- Where it applies
- Why it matters
- How to correct or review it
- Whether prior input remains preserved

Client validation improves feedback but never replaces authoritative server validation.

Ineligibility states distinguish:

- Policy ineligibility
- Resource-state incompatibility
- Missing prerequisite
- Missing or insufficient evidence
- Assurance required
- Approval required
- Permission denied
- Dependency unavailable

The interface does not mislabel one as another.

## Recoverable failures

A recoverable failure remains in the host experience and preserves safe context.

The state provides:

- A concise description of what failed
- What remains confirmed
- Whether anything was submitted
- Scope affected
- Safe retry when available
- Alternative or Support path
- Correlation reference when useful

Retries preserve idempotency. Repeated clicking, page refresh, browser back, reconnection, or restored session cannot duplicate a purchase, payment, refund, message, evidence item, case, publication, access grant, export, or bulk operation.

## Partial failure and degradation

Partial degradation preserves unaffected regions and labels unavailable or stale dependencies independently.

Rules:

1. Missing data is never shown as zero, empty, eligible, successful, or current.
2. Confirmed stale data includes source and as-of time where useful.
3. Actions depending on unavailable current state are blocked.
4. Read-only unaffected tasks remain available.
5. Aggregate summaries disclose partial source coverage.
6. Marketing, recommendations, or AI output never fills missing operational truth.
7. Recovered sources revalidate affected actions and summaries.

Examples:

- Product Detail may show confirmed product content while current inventory is unavailable, but Add to Cart blocks or clearly reflects unknown availability.
- Account Dashboard may show available orders while Support aggregation is delayed.
- Support Case may preserve communication while provider status is stale.
- Admin Workspace may preserve a draft while required validation or audit durability is unavailable.

## Conflict and stale-state behavior

Concurrent changes and stale baselines use explicit comparison and resolution.

- Silent last-write-wins is prohibited for governed resources.
- Non-conflicting draft changes may rebase with visible comparison.
- Conflicting changes require user review.
- Stale approval or eligibility invalidates according to policy.
- Deleted, merged, retired, moved, or superseded resources provide the nearest safe successor or parent when disclosure permits.
- A prior notification, search result, saved view, or browser history entry never preserves old authority.

## Authentication and permission interruption

Authentication interruption preserves a validated return destination and safe non-sensitive context. After authentication, the target rechecks permission, object association, restriction, assurance, and state.

Permission failures follow non-disclosure policy:

- Show a disabled control only when the user may know the action exists and a valid recovery path is available.
- Otherwise omit the control or use SYS-002 at a route boundary.
- Never reveal protected object identity, counts, fields, denial policy, or another subject.

Session expiry never submits a draft or mutation automatically after reauthentication.

## Offline behavior

### Host-owned offline state

If useful confirmed context remains, the host page stays visible with:

- Offline indication
- Cached-data timestamp and scope
- Disabled network-dependent actions
- Locally safe draft status
- Reconnect and retry behavior

### Mutation policy

Consequential mutations are not queued for later execution by default.

Locally prepared input may become a draft after reconnect only when:

- Storage is explicitly safe for its sensitivity
- The user understands it is unsent
- Authentication and permission are re-established
- Baseline and validation are refreshed
- The user explicitly reviews and submits

Cart quantity or other low-risk offline behavior requires a separately governed conflict and synchronization policy before use.

### Global offline route

SYS-005 is used only when no meaningful cached destination can remain visible. It offers reconnection, safe cached destinations where approved, and return to the prior goal after connectivity recovers.

## Route-level recovery destinations

### SYS-001 Not Found

Used for unknown, malformed, removed, or retired routes when no authorized successor can be resolved.

It provides Search, Home, Categories, Support, or a governed successor. It does not reveal whether a protected resource exists.

### SYS-002 Access Denied

Used when a valid route cannot safely render any meaningful permitted content.

It may offer Sign In, Security Challenge, approved account switching, access-request or Support paths, and a safe fallback. Reason detail follows non-disclosure policy.

### SYS-003 Unexpected Error

Used for an unrecoverable destination failure.

It declares whether retry is safe, preserves a non-sensitive correlation reference, and links to the nearest stable destination. Unsafe retry is not presented.

### SYS-004 Service Unavailable

Used for planned maintenance or broad failure where host-level degradation is insufficient.

It identifies affected scope, known unaffected paths, authoritative status, and recovery progress. It never invents a restoration estimate.

### SYS-005 Offline

Used only when connectivity is absent and no viable host-owned offline state remains.

All route-level system pages are excluded from indexing and customer search, preserve the appropriate shell boundary, and avoid exposing sensitive origin context.

## Accessibility

1. Loading state and progress use programmatic semantics without excessive announcements.
2. Focus remains stable during background refresh and moves predictably after submission or route recovery.
3. Error summaries link to affected fields or regions.
4. Errors do not rely on color, icon, animation, or position alone.
5. Retry and recovery controls have descriptive labels.
6. Dynamic status messages announce material change with appropriate urgency.
7. Skeletons and hidden restricted content do not create misleading assistive-technology output.
8. Offline, stale, partial, and indeterminate states are distinguishable in text.

## Content and tone

State content is calm, precise, and action-oriented.

- State what happened or what is known.
- State what remains safe or preserved.
- State what the user can do next.
- Avoid blame, false certainty, internal jargon, and invented timelines.
- Do not expose security-sensitive diagnostics.
- Do not imply that contacting Support guarantees an unavailable remedy.

## Observability and privacy

Applicable state events record:

- Host and state class
- Owning domain
- Affected scope
- Source and client timestamps
- Correlation and operation references
- Retry or recovery choice
- Confirmed outcome

Logs, analytics, and support references do not include credentials, verification secrets, payment details, private messages, evidence, protected fields, or unnecessary customer data.

Observability failure does not block routine read recovery. It blocks consequential actions only when governing policy requires confirmed audit or monitoring durability.

## Archetype requirements

| Archetype | Required state emphasis |
| --- | --- |
| Hub | Partial modules, no active work, stale aggregation, safe destination continuity |
| Results/List | Loading, no results, no eligible records, partial index, stale count, selection invalidation |
| Detail | Missing/retired object, partial source data, unavailable action, stale status |
| Workspace | Draft recovery, validation, conflict, partial dependency, pending and indeterminate operation |
| Transaction | Field validation, eligibility, payment or execution decline, duplicate prevention, confirmed receipt |
| Content/Document | Missing translation, superseded version, partial media, authoritative retrieval failure |
| Recovery | Clear state reason, safe primary recovery, non-disclosure, no dead end |
| Admin Queue | No assigned work, stale priority, partial count, selection and bulk failure |
| Admin Resource Workspace | Field restrictions, baseline conflict, approval invalidation, audit degradation, operation reconciliation |

## Architecture validation

The state architecture passes its Phase 2B topic validation:

- All routine states remain host-owned when the user's goal can remain meaningful.
- The five route-level system destinations retain their approved narrow purposes.
- Empty, no-result, no-eligibility, unavailable, permission-denied, and degraded states are not conflated.
- Loading never fabricates product, price, stock, ranking, status, or permission truth.
- Pending, failed, and indeterminate mutations have distinct retry semantics.
- Offline behavior does not queue consequential work by default.
- Partial failure preserves useful confirmed context and blocks dependent unsafe actions.
- Search, AI, recommendations, and marketing cannot conceal constraints or replace missing operational truth.
- Customer, Support, PC Builder, purchase, authentication, legal, and Admin experiences share one semantic contract.
- State content and interaction meet accessibility, privacy, non-disclosure, audit, and idempotency requirements.
- Every page archetype has explicit state obligations sufficient for wireframing.

No unresolved state-architecture alternative is recorded as approved.

## Next phase topic

Define Scalability Guidelines.
