# Support and Authentication Patterns

**Status:** Approved

## Purpose

This document defines Support routing, articles, self-service, case start, case lists, case detail, communication, evidence, obligations, and focused authentication, verification, and recovery patterns.

## Decision

Nexora uses **intent-and-context Support patterns** and **focused minimal-shell authentication patterns**.

Support begins with editable issue intent and relevant customer context, then escalates from governed content to deterministic self-service and typed cases. Authentication exposes one identity goal at a time with safe recovery and validated return context.

## Support entry

Support Center hierarchy:

1. Search
2. Current obligation or active case
3. Issue-intent selection
4. Relevant self-service
5. Governed articles
6. Contact or case continuation

Context Summary shows recognized product, order, build, or issue and allows correction before it shapes routing.

## Issue intent

Intent cards use customer language such as:

- Delivery
- Return or refund
- Warranty or repair
- Product setup or troubleshooting
- Order or payment question
- Account access
- PC build or Compatibility
- Other governed case family

Intent does not create a case. It configures visible routing and required context.

## Support article

Required presentation:

- Title and purpose
- Applicability
- Version, review, or freshness
- Structured steps
- Warnings and prerequisites
- Expected outcome
- Related policy
- Feedback
- Escalation

Stale references, missing localization, retired content, and partial media are explicit. AI may summarize published content in a labelled region but cannot become the authoritative article.

## Self-service task

Self-service exposes:

- Goal
- Eligibility
- Required inputs
- Deterministic checks
- Current result
- Safe next action
- Persistent-case threshold

Failure does not create duplicate cases or conceal that escalation is unavailable.

## Case start

Case Start collects:

- Type and issue
- Linked order, item, product, or build
- Customer and guest access context
- Structured answers
- Evidence
- Preferred communication
- Consent or policy acknowledgement
- Review before creation

Case creation occurs only after authoritative acceptance. Duplicate detection offers existing cases without exposing another person’s data.

## Case list

Case Row shows:

- Case reference and type
- Subject
- Current lifecycle state
- Current responsible party
- Next action
- Obligation due or expected timing
- Last meaningful update

Internal queue or provider details remain hidden unless customer-relevant.

## Support Case Detail

Hierarchy:

1. Case identity and current state
2. Current obligation and responsible party
3. Primary customer action
4. Communication composer
5. Evidence
6. Timeline
7. Linked order, product, policy, and work
8. Escalation or closure

The current obligation appears before long history on every viewport.

## Communication

Message Composer:

- Names recipient scope and channel.
- Distinguishes customer-visible message from internal note.
- Preserves drafts.
- Supports attachments with progress and scan state.
- Shows accepted, delivered when known, failed, and retry.
- Does not imply agent response time from message acceptance.

AI drafting is optional, visibly generated, editable, and never sends automatically.

## Evidence

Evidence Item shows:

- File identity
- Uploader and time
- Purpose
- Processing or scan state
- Visibility
- Removal or retention rule
- Accessible description

Provider access is limited to the bounded work package.

## Obligation card

Obligation Card contains:

- Responsible party
- Required action
- Start and due context
- Pause reason when governed
- Escalation state
- Completion evidence

Timers and due dates never replace the textual obligation.

## External work

Provider Work Summary visible to customers includes only relevant progress and Nexora accountability. Manufacturer-only handoff names the change and continuing customer path.

## Support degraded states

- Article unavailable preserves search and escalation.
- Self-service unavailable offers eligible case start.
- Case creation unavailable preserves the reviewed draft.
- Messaging failure preserves unsent content.
- Provider delay remains a case obligation, not a dead-end external link.
- Partial timeline failure keeps current state and action.

## Authentication shell

Required regions:

- Nexora identity
- Current identity goal
- Form
- Safe alternate path
- Recovery
- Support and legal references
- Validated return destination context

Merchandising, recommendations, and Cart pressure are prohibited.

## Sign in

Sign In supports approved methods supplied by Security and Identity.

It:

- Uses non-disclosing errors.
- Allows password managers and paste.
- Offers Account Recovery.
- Preserves validated return context.
- Exposes provider unavailable and session conflict safely.

## Create account

Account creation:

- Requests only necessary data.
- Separates required terms from optional communication consent.
- Explains password or provider requirements.
- Handles existing identity without disclosure.
- Returns to the originating eligible task.

## Account recovery

Recovery:

- Begins with a non-disclosing identifier step.
- Confirms that instructions are provided safely regardless of identity existence.
- Supports resend with abuse controls.
- Exposes expired, invalid, completed, and replaced attempts.
- Offers Support without weakening assurance.

## Credential reset

- Names credential goal and remaining validity.
- Shows requirements before submission.
- Prevents reuse disclosure beyond approved Security content.
- Confirms completion without exposing account data.
- Routes to safe sign-in or restored context.

## Verification

Verification pattern supports code, link, or other approved methods:

- Names protected action.
- Shows destination safely masked.
- Supports paste and autofill.
- Provides resend, expiry, method change, and recovery.
- Avoids cognitive tests as the only path.

## Security challenge

Challenge:

- Explains why additional assurance is needed in user-safe terms.
- Preserves the protected task.
- Offers approved alternatives.
- Handles provider unavailable.
- Does not expose internal risk scoring.

## Reauthentication

Reauthentication appears at the affected high-risk action, preserves non-sensitive draft context, and returns to the exact validated destination.

## Session interruption

Session warning:

- Names expiry timing or condition.
- Offers extension when permitted.
- Preserves eligible work.
- Routes to Sign In with safe return.
- Does not submit pending consequential work automatically.

## Responsive and accessibility

- Support puts current obligation before history.
- Authentication remains single-column within the form measure.
- On-screen keyboard does not hide verification or recovery.
- Focus moves to errors and completion appropriately.
- Non-disclosing responses remain actionable.
- Timelines, messages, and evidence have structured reading order.
- Provider controls meet the same accessible interaction contract.

## Governance

1. Support owns case presentation and communication patterns.
2. Identity and Security own methods, assurance, abuse controls, and session policy.
3. Design System owns shared field, state, focus, and recovery behavior.
4. Support cannot weaken authentication assurance.
5. Authentication cannot create or own Support cases.

## Validation

Test guest and customer Support, every case family, article/self-service degradation, evidence failure, provider work, sign-in, creation, recovery, reset, verification, challenge, session expiry, non-disclosure, Portuguese content, themes, responsive layouts, keyboard, assistive technology, and slow or failed providers.

## Consequences

### Benefits

- Support escalates without premature cases.
- Case obligations remain clear.
- Authentication stays focused and safe.
- Recovery preserves task continuity without leaking identity.

### Costs and risks

- Provider integrations need strict state and accessibility review.
- Case types produce governed module variation.
- Non-disclosure language requires careful usability testing.

## Next decision

Define PC Builder Engineering Workspace patterns.
