# System-State Components

**Status:** Approved

## Purpose

This document defines the reusable visual and interaction components for loading, empty, zero-result, invalid, unavailable, denied, failure, partial, stale, conflict, offline, pending, indeterminate, completion, and route-level recovery.

## Decision

Nexora uses **shared state anatomy with host-owned semantics and operation-aware recovery**.

Visual reuse cannot collapse distinct truth into one generic error or empty component. The host page retains routine state, confirmed context, source ownership, and primary goal. Route-level recovery is used only when no meaningful host state remains.

## Shared state contract

Every state instance declares:

- State type
- Host and affected region
- Confirmed facts
- Unknown or unsafe facts
- Affected operation
- Scope
- Severity
- Primary recovery
- Alternate path
- Persistence
- Focus and announcement
- Observability reference when appropriate

## Presentation sizes

### Inline

For one field, row, item, action, or small region.

### Section

For one module, panel, result area, or form group while the rest of the page remains useful.

### Page-hosted

For the page’s primary work area while shell, identity, and safe context remain.

### Route-level

For SYS-001 through SYS-005 only when the host cannot remain meaningful.

Size follows affected scope, not severity alone.

## Loading

### Initial

- Preserves expected region geometry.
- Exposes a concise loading label where useful.
- Does not fabricate exact text, price, stock, Compatibility, status, rank, or permission.
- Avoids blocking unrelated confirmed regions.

### Incremental

- Keeps current content usable.
- Marks updating scope.
- Preserves focus and selection.
- Replaces content only after settled authoritative response.

### Background

- Uses subtle saving or refreshing status.
- Does not interrupt unrelated work.
- Surfaces failure if it changes truth or persistence.

## Progress

- Determinate progress uses a real measure.
- Indeterminate progress names the work without false percentage.
- Long-running accepted operations expose correlation, safe navigation, and later outcome.
- Cancellation appears only when the source can honor it safely.

## Empty

### First-use empty

Explains purpose and offers creation or discovery.

### User-cleared empty

Confirms that no items remain and offers the most relevant next action.

### Empty operational work

States that no permitted work currently matches the queue; it does not imply no work exists globally.

Empty state cannot hide source failure, loading, filtering, or permission.

## Zero results

Shows:

- Query and active criteria
- Result count of zero
- Likely removable constraints where determinable
- Spelling or related governed recovery
- Optional AI follow-up

It preserves the original query and remains distinct from empty inventory or failed Search.

## No eligible items

Names eligibility rule, affected scope, and permissible alternatives. It does not present an empty selector with no explanation.

## Validation and prerequisite

- Appears near the source.
- Multi-error work provides a summary.
- Names invalid, missing, or unresolved prerequisites.
- Preserves valid input.
- Blocks only the action whose safe conditions are unmet.

## Unavailable

Unavailable means a known object or capability cannot currently be used.

It includes:

- Object or capability
- Reason category
- Whether temporary or terminal is known
- Alternate action
- Retry only when meaningful

Unavailable is not Not Found.

## Access and assurance

### Authentication required

Preserves safe return context and offers Sign In or verification.

### Additional assurance required

Explains protected action without exposing risk internals.

### Access denied

Avoids disclosing restricted existence and routes to the nearest safe destination.

### Permission changed

Stops unsafe action, preserves eligible drafts, re-resolves visible data, and provides handoff or recovery.

## Recoverable failure

Failure presentation contains:

- Plain-language failure
- Affected action
- Preserved work
- Retry safety
- Alternate path
- Support or reference when necessary

Retry is not shown when it could duplicate a consequential operation.

## Partial failure

- Successful regions remain visible.
- Failed source or scope is identified.
- Aggregate totals and conclusions show partial status.
- Missing data never becomes zero, compatible, available, permitted, or complete.
- Recovery targets the affected source or region.

## Stale state

Stale presentation shows:

- Last confirmed value and time when safe
- What may have changed
- Affected actions
- Refresh or compare
- Whether continued read or edit is permitted

Stale data does not silently remain actionable.

## Conflict

Conflict compares:

- User draft
- Current authoritative value
- Changed fields
- Author or source when allowed
- Merge, replace, duplicate, discard, or retry options

High-risk conflict resolution requires review. Silent last-write-wins presentation is prohibited.

## Offline

### Host-owned offline

Shows confirmed cached context, freshness, unavailable actions, locally safe work, synchronization boundary, and reconnect behavior.

### Mutation policy

- Consequential actions do not auto-submit.
- Local drafts identify unsynced state.
- Reconnect revalidates before submission.
- Duplicate operations are prevented.

### Global offline

SYS-005 appears only when no useful host-owned offline state remains.

## Pending and indeterminate

### Pending

The operation is accepted and still processing. Show scope, acceptance, expected next state where known, and safe continuation.

### Indeterminate

The outcome is unknown. Preserve correlation, prevent duplicate action, explain reconciliation, and provide later verification.

Pending and indeterminate are not failure or completion.

## Completion

Completion requires authoritative confirmation.

It:

- Names the created or changed object.
- Shows remaining obligations.
- Provides next action and durable destination.
- Uses restrained positive presentation.
- Does not erase warnings, partial downstream work, or audit context.

## Route-level recovery

### SYS-001 Not Found

For absent or invalid public destinations. Offers Search, Home, or safe parent without exposing restricted existence.

### SYS-002 Access Denied

For a route that cannot safely present host context. Offers authentication, safe capability destination, or Support.

### SYS-003 Unexpected Error

For unrecoverable page failure. Provides safe retry, reference, Home or parent, and Support when relevant.

### SYS-004 Service Unavailable

For broad service inability. Names affected capability, known continuity, retry guidance, and status path if approved.

### SYS-005 Offline

For lost connectivity with no viable cached host state. Explains reconnect and safe destinations.

## Content

State language:

- Names user-relevant effect.
- Avoids blame and internal technical detail.
- Uses actionable verbs.
- Does not promise timing or success without source authority.
- Distinguishes temporary, unknown, and terminal.
- Includes a reference only when useful for Support or reconciliation.

## Accessibility

- State title and scope are programmatic.
- Meaning uses text and icon, not color alone.
- Focus moves only for blocking submission, new destination, or completed/failed task requiring attention.
- Live announcements are proportional and batched.
- Loading indicators have names and do not repeat endlessly.
- Recovery is keyboard and touch accessible.
- Partial content retains landmarks and headings.

## Responsive and density

- State remains inside its affected region.
- Illustrations collapse before action or explanation.
- Inline states do not become full-screen merely on narrow layouts.
- Admin compact states preserve object, scope, and operation.
- Sticky actions update their disabled or pending reason.

## Observability and privacy

Internal events may record:

- State type
- Host and operation
- Source category
- Correlation
- Retry
- Recovery selected

Messages never expose credentials, restricted existence, security reasoning, payment details, or private customer content.

## Governance

1. Host page owner chooses state semantics and recovery.
2. Design System owns shared anatomy and interaction.
3. Source domains define operation truth.
4. Generic “something went wrong” is allowed only when more detail would be unsafe or unavailable, with a useful recovery.
5. New state semantics require cross-domain review.

## Validation

Test every taxonomy state at inline, section, page-hosted, and applicable route level across all nine archetypes, themes, densities, responsive layouts, keyboard, assistive technology, zoom, offline, stale data, and consequential retry.

## Consequences

### Benefits

- Reuse does not erase truth.
- Users retain confirmed work and context.
- Retry and recovery match operation safety.
- Route-level errors remain narrow.

### Costs and risks

- Components need host-provided semantic data.
- State combinations increase test scope.
- Partial and indeterminate outcomes require source coordination.

## Next decision

Define content and Brazilian Portuguese localization behavior.
