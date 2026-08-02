# Roles and Permissions

**Status:** Approved in part — authorization model approved; detailed roles and policies pending

## Purpose

This document defines how Nexora grants attributable human and non-human subjects the minimum capabilities required to perform governed work.

It implements the capability boundary established by the approved [Administrative Dashboard IA](06-administrative-dashboard-ia.md) and applies across customer, guest, Admin, Support, external-provider, service, automation, and AI-assisted access.

## Decision

Nexora uses **scoped capability-based role-based access control**.

Roles are governed bundles that simplify assignment. Capabilities are the enforcement unit. Every assignment is further constrained by resource and field scope, contextual conditions, assurance, and segregation-of-duties policy.

Authorization evaluates:

`Subject + capability + resource scope + field scope + conditions + assurance`

The cross-cutting rationale is recorded in [ADR-0003](../adrs/ADR-0003-scoped-capability-based-access-control.md).

## Core principles

1. Access is denied by default.
2. Every action is attributable to a verified human or non-human subject.
3. Roles simplify administration but do not replace capability enforcement.
4. Discovery, field visibility, mutation, approval, execution, export, and administration are distinct.
5. Scope limits where and to which records a capability applies.
6. Conditions limit when and under which circumstances it applies.
7. Assurance is rechecked when required by action risk.
8. Segregation constraints may deny an action even when its component capabilities are individually granted.
9. UI adaptation is not an authorization boundary.
10. Temporary, delegated, and external access expires and remains auditable.

## Authorization dimensions

### Subject

A subject is an attributable actor evaluated for access. Initial subject classes include:

- Customer Account
- Securely verified guest participant
- Workforce user
- External-provider user
- Authorized customer representative
- Service identity
- Automation identity
- Delegated AI execution identity, if later permitted

Shared anonymous operational identities are not acceptable for consequential work.

The exact subject lifecycle, identity proofing, service ownership, and offboarding workflow remain pending.

### Capability

The foundational capability verbs are:

- Discover
- Read
- Create
- Edit
- Transition
- Approve
- Execute
- Export
- Administer

Capabilities apply to a governed resource or operation. Possessing one verb never implies another. In particular:

- Read does not imply Discover outside an authorized direct context.
- Edit does not imply Transition.
- Approve does not imply Execute.
- Execute does not imply Approve.
- Export does not follow automatically from Read.
- Administer does not silently bypass source-domain rules.

Domains may define narrower capability names under these verbs. New capabilities declare their resource, field, scope, conditions, assurance, risk, denial behavior, and audit requirements.

### Resource scope

Scope may constrain access by governed dimensions such as:

- Product domain, category, brand, or collection
- Queue, team, or assignment
- Customer, case, order, or explicit resource
- Organizational or provider boundary
- Region or operational territory
- Amount, quantity, or batch threshold
- Content, policy, report, or configuration family
- Time window or temporary task

Scope uses stable governed identifiers. Free-form labels do not become authorization boundaries.

Broader scope is not inferred from navigation access, related-object links, search results, or possession of a narrower assignment.

### Field scope

Field access is evaluated separately for reading and writing.

- Restricted fields are omitted or safely redacted.
- A redacted field is not represented as empty or absent in the authoritative record.
- Derived values, counts, search snippets, exports, logs, and AI summaries follow the same restrictions.
- Write access to one field does not grant access to adjacent sensitive values.
- Before-and-after history follows the applicable field and audit policy.

### Conditions

Applicable conditions may include:

- Current assignment or accepted ownership
- Resource lifecycle or operational state
- Recent or step-up authentication
- Independent approval
- Action risk class
- Amount or scope threshold
- Time-bound delegation
- Valid provider work package
- Required evidence or reason
- Current incident, restriction, or policy state

Conditions are evaluated at commitment. Earlier page access, validation, preview, notification, or approval cannot preserve an expired condition unless its policy explicitly establishes a governed snapshot.

### Assurance

Assurance requirements are proportional to risk and may be raised by current context. A consumer cannot lower the source policy's minimum.

Authentication establishes identity and assurance. Authorization decides whether that assured subject may perform the capability within scope and conditions.

## Distinct attributable subject model

Nexora represents human and non-human subject classes explicitly. A subject, identity proof, session, credential, role assignment, delegation, and object association are separate records.

### Common subject contract

Every subject records:

- Stable internal identifier
- Subject class
- Authoritative identity source
- Current lifecycle and restriction state
- Eligible authentication or credential policy
- Eligible role, capability, and scope types
- Review, expiry, and offboarding policy
- Audit attribution
- Accountable owner or sponsor when the subject is not a customer acting for itself

Deactivation, authentication restriction, authorization revocation, object reassignment, and record retention are separate operations. None is inferred automatically from another.

### Human subjects

#### Customer Account

A Customer Account represents an authenticated customer identity and owns only the customer capabilities and objects established by product policy. Purchase history or shared contact information does not automatically merge identities or grant access to another Account's objects.

#### Securely verified guest participant

A verified guest participant is a short-lived, purpose-bound subject established for an eligible order, case, or other specific task.

- Verification grants only the approved object and task scope.
- It does not create a Customer Account or permanent role assignment.
- It expires and may require renewed assurance for sensitive actions.
- Permanent guest-order claiming follows the approved explicit claim architecture.

#### Workforce user

A workforce user is an individually attributable Nexora operator. Organizational membership alone does not grant a capability. Workforce roles, scopes, duties, assurance, and lifecycle determine effective access.

Shared team accounts are prohibited for consequential work.

#### External-provider user

An external-provider user is an individually attributable member of a verified provider organization. Provider membership constrains eligible roles and scopes but does not grant access by itself.

Access is limited to an approved contract, work package, purpose, duration, and data scope. One provider case or task cannot reveal unrelated customer, order, case, or Nexora-internal information.

#### Authorized customer representative

An authorized representative acts for a customer only within an explicit verified representation scope.

Representation does not transfer ownership of the Customer Account, order, payment, case, or other customer object. Scope, duration, assurance, revocation, and provenance remain visible and auditable.

### Non-human subjects

#### Service identity

A service identity represents a bounded technical service-to-service actor. It has an accountable Nexora owner, approved purpose, explicit environment and resource scope, credential lifecycle, and monitoring policy.

Its technical ability to reach a system does not define its business authority.

#### Automation identity

An automation identity represents a governed job or workflow that may initiate or execute explicitly approved operations.

It records its trigger, delegated capabilities, scope, limits, accountable owner, review policy, and kill or revocation path. It cannot use a workforce user's shared credentials or inherit the full authority of its owner.

#### Delegated AI execution identity

Ordinary AI drafting, explanation, search assistance, and summarization remain attributed to the human or service subject using the capability. They do not create independent authority.

If a later policy permits autonomous consequential execution, that execution requires a distinct delegated AI identity with:

- Specific task and purpose
- Explicit capability and resource scope
- Start and expiry
- Risk and action limits
- Accountable owner
- Approval and monitoring requirements
- Immediate revocation path

No such execution authority is approved by this subject-model decision.

### Identity, session, and credential separation

- **Subject:** the attributable actor evaluated for authorization.
- **Identity proof:** evidence used by Authentication to establish the subject.
- **Session:** a time-bounded authenticated context with current assurance.
- **Credential:** a protected means used to establish a human or non-human session.
- **Role assignment:** authorization capabilities and scope granted to the subject.
- **Delegation:** a bounded authority relationship between attributable subjects.

Revoking a credential does not erase the subject or its history. Ending a session does not revoke every assignment. Granting a role does not create authentication proof. These operations coordinate through explicit lifecycle rules.

### Delegated sessions and anti-impersonation

“View as customer,” provider-assisted access, or similar assisted workflows use an explicit delegated session.

Every delegated session identifies:

- Acting subject
- Represented subject or object scope
- Delegation basis and purpose
- Permitted capabilities
- Assurance
- Start and expiry
- Visible indication to the actor
- Audit correlation

The acting subject never becomes indistinguishable from the represented customer or provider. Messages, decisions, data access, and mutations retain the actual actor and delegation provenance.

Passwords, authentication factors, recovery secrets, and active customer sessions are never requested or reused for workforce impersonation.

### Ownership boundaries

1. Authentication owns identity proofing, credentials, factors, and sessions.
2. Roles and Permissions owns assignments, scope, conditions, and delegation.
3. Customer, workforce, provider, and service directories own their subject metadata and source lifecycle signals.
4. Source domains own customer objects and their association rules.
5. Audit preserves the actual subject, delegated context, applicable role, and policy version.
6. Suspending identity blocks new eligible sessions according to policy but does not erase historical attribution.
7. No subject inherits authority merely through organizational membership, contact matching, related-object navigation, sponsorship, or technical connectivity.

## Source-driven subject lifecycle

Subject lifecycle is driven by authoritative identity sources and explicit governed transitions. A source lifecycle signal can restrict or end eligibility, but it does not directly grant a business capability.

### Common lifecycle

The common lifecycle is:

`Pending → Active → Restricted or Suspended → Deactivated → Archived`

- **Pending:** an identity or sponsorship record exists, but operational access is not active.
- **Active:** the subject is eligible for current approved assignments and sessions.
- **Restricted:** selected authentication, authorization, data, or action capabilities are limited under a governed reason and recovery path.
- **Suspended:** new operational access is blocked while the subject or source condition is reviewed.
- **Deactivated:** eligible sessions, credentials, delegations, temporary access, and new execution authority are revoked.
- **Archived:** the subject is retained only for governed history, audit, or record obligations.

Restricted and Suspended are alternate controlled states, not required sequential steps. A return to Active requires the authoritative source condition, identity assurance, assignments, and access policy to be re-evaluated.

Lifecycle state, Account restriction, permission assignment, credential state, and session state remain separate. Their effects are coordinated through explicit policy.

### Joiner

Before workforce or provider access becomes Active, the joiner flow verifies:

- Authoritative identity and subject class
- Sponsor or accountable owner
- Required employment, contract, or provider relationship
- Required training, acknowledgement, or policy conditions
- Approved role and concrete scope
- Start time and review or expiry
- Authentication and assurance readiness
- Incompatible duty and existing-subject checks

Pre-provisioning may prepare an assignment before the start time, but it cannot produce an eligible operational session early.

### Mover

A mover event includes team, duty, geography, provider, ownership, or other material responsibility change.

Mover processing:

1. Computes proposed new effective access.
2. Identifies old access that must end, continue temporarily, or receive reapproval.
3. Tests incompatible duties and scope combinations.
4. Sets coordinated effective times.
5. Re-evaluates delegations, approvals, drafts, queues, exports, and scheduled work.
6. Records the before-and-after access decision.

New access is not simply added to old access. Any temporary overlap requires an explicit purpose, approval, expiry, and segregation check.

### Leaver

An authoritative leaver signal triggers revocation-first processing:

- Block new sessions.
- Terminate or restrict active sessions according to risk.
- Revoke or disable eligible credentials.
- End role assignments, delegations, temporary access, and provider work-package access.
- Revoke export delivery and other recoverable access artifacts.
- Remove the subject from future approvals, assignments, and routing.
- Identify owned drafts, queues, obligations, scheduled work, and in-flight operations for governed disposition.
- Preserve historical attribution and audit evidence.

Deactivation does not delete subject history, rewrite actions, transfer customer or operational objects automatically, or imply that every pending operation should be cancelled.

### Customer and guest lifecycle

Customer Account restriction, closure pending, and closure follow the approved [Account Architecture](04-account-architecture.md). Roles and Permissions evaluates the resulting subject and capability state without creating a competing Account lifecycle.

A securely verified guest subject expires with its approved object, task, assurance, or time boundary. Expiry ends access but does not delete the order, case, evidence, communication, or audit record.

An authorized representative expires or revokes independently from the represented customer's Account.

### Provider lifecycle

External-provider eligibility depends on both the provider organization and the individual provider user.

- Organization suspension blocks new provider work and re-evaluates active access.
- Individual departure revokes that user's sessions, credentials, delegations, and work packages.
- Contract or purpose expiry removes eligible provider scope.
- Active customer obligations transfer to a designated Nexora accountable owner or another explicitly approved provider participant.
- Confirmed provider events and historical attribution remain.

Provider offboarding cannot silently close a Support case, satisfy an obligation, or erase a work package.

### Service and automation lifecycle

Every service and automation identity has an accountable owner, approved purpose, review date, credential policy, and immediate disable path.

Lifecycle re-evaluation is triggered by:

- Owner departure or loss of eligible ownership
- Purpose or system retirement
- Credential compromise or failed rotation
- Expired approval or review
- Material scope or behavior change
- Policy breach or abnormal use

An orphaned, expired, or unreviewed non-human identity is suspended from new execution until ownership and access are explicitly re-established. Replacing credentials does not automatically restore revoked business authority.

Delegated AI execution, if later approved, follows the automation lifecycle plus its shorter task and delegation expiry.

### Pending and scheduled work

Deactivation, suspension, or role removal evaluates each pending artifact according to its owning policy:

- Drafts may become read-only, transfer through a governed handoff, or become inaccessible.
- Approval requests lose an ineligible approver and return to routing.
- Scheduled actions recheck the requestor, approver, executor, and policy conditions at execution.
- Asynchronous operations already accepted continue, pause, reconcile, or compensate according to their source-domain contract.
- Exports and time-limited artifacts revoke where technically and legally eligible.

Pending work is neither blindly cancelled nor allowed to execute solely because it was created earlier.

### Lifecycle synchronization and exceptions

Lifecycle signals record source, source time, ingestion time, subject, transition, and correlation.

If high-risk lifecycle synchronization is delayed, invalid, or unavailable, affected new access and consequential execution fail safely according to policy. The system does not silently treat an unknown employment, provider, owner, or credential state as Active.

Manual exceptions require:

- Eligible authority
- Specific subject, capability, and scope
- Reason and evidence
- Start and expiry
- Assurance and approval
- Monitoring and review
- Audit record

A manual exception cannot alter the authoritative directory record or become permanent through repeated renewal without review.

### Governance rules

1. Authoritative directories own source identity and relationship signals.
2. Authentication owns session and credential termination.
3. Roles and Permissions owns assignment, delegation, effective-access, and segregation response.
4. Source domains own safe disposition of drafts, operations, approvals, exports, and owned resources.
5. Deactivation and archive preserve historical attribution.
6. Mover processing removes or revalidates old access rather than accumulating it.
7. Provider and non-human identities require active accountable ownership.
8. Lifecycle transitions, exceptions, failures, and material dispositions are auditable.

## Role model

A role is a versioned governed bundle containing:

- Role purpose and owner
- Included capabilities
- Permitted scope types
- Field restrictions
- Applicable conditions
- Incompatible roles or duties
- Assignment and approval policy
- Review and expiry policy

Role names communicate operational purpose rather than grant unrestricted ownership of a page.

Assignments bind:

- Subject
- Role version
- Concrete scope
- Start time
- Expiry or review date
- Assigning authority
- Reason and request reference
- Delegation source where applicable

Changing a role definition does not silently obscure its historical meaning. Active assignments follow an explicit migration, reapproval, or version policy.

## Example authorization outcomes

- A Catalog Editor can edit permitted product content for assigned categories but cannot approve publication.
- A Support Agent can read and work cases in an assigned queue but cannot execute a refund merely because it is linked to the case.
- A Finance Approver can approve a refund inside a governed amount threshold but cannot request and approve the same operation when segregation policy prohibits it.
- An external repair provider can update only its assigned, unexpired work packages and cannot inspect the full customer case.
- An AI assistant can draft permitted content under an attributable user but cannot submit, approve, publish, or expand its delegated scope.

These examples illustrate the model and are not final role definitions.

## Enforcement and presentation

Source services enforce capability, resource scope, field scope, conditions, assurance, and segregation requirements.

Admin Platform and other consumers adapt navigation, search, workspaces, fields, controls, and recovery according to the permission decision. They follow the approved presentation states:

- Full eligible access
- Read-only access
- Field-restricted access
- Action-restricted access
- Approval-required action
- Safely unavailable

Every consequential request is re-evaluated at execution. Cached permission results, hidden controls, signed-in state, or a prior successful action cannot grant authority.

Denial follows non-disclosure policy. Explanations distinguish recoverable assurance, approval, assignment, state, and permission conditions only when the subject may know that information.

## Segregation of duties

Segregation policy can constrain:

- Request and approval
- Approval and execution
- Resource creation and publication
- Role design and role assignment
- Access request and access grant
- Financial adjustment and reconciliation
- Audit administration and audit review

A segregation constraint is evaluated across effective assignments and delegated access, not only the role currently selected in the interface.

Exact incompatible duties, thresholds, exception paths, and emergency controls remain pending.

## Temporary and delegated access

Temporary or delegated access records:

- Delegating and receiving subjects
- Capabilities and concrete scope
- Purpose
- Start and expiry
- Approval and assurance
- Revocation condition
- Accountable owner

Delegation cannot exceed the delegator's eligible authority or bypass a non-delegable capability. Expiry and revocation apply to active sessions, open workspaces, drafts, selections, exports, scheduled work, and pending operations according to their owning policy.

Historical attribution remains after access ends.

## Non-human and AI access

Services, automations, and AI-assisted tools use distinct attributable identities with:

- Accountable human or team owner
- Explicit capability and scope
- Approved purpose
- Credential and assurance policy
- Start, review, expiry, and revocation
- Rate, environment, or execution constraints where governed
- Audit and monitoring requirements

An integration's technical credential does not define the business authority delegated to a tool.

AI operates within the attributable user's and task's intersection of permission. It cannot:

- Discover hidden objects or fields
- Broaden resource or field scope
- Lower risk, assurance, approval, or segregation requirements
- Approve its own proposal or expanded access
- Execute a consequential action unless a later explicit policy grants a narrowly governed automation capability
- Retain authority after task, assignment, or delegation expiry

## Audit and review

Assignments, definition changes, access requests, grants, denials where governed, delegation, use of high-risk capabilities, expiry, revocation, and offboarding are auditable.

Review distinguishes:

- Role design
- Effective subject access
- Dormant or unused access
- Temporary and overdue access
- Incompatible duty combinations
- Orphaned service or provider identities
- Scope drift

Audit evidence records the applicable role and policy version. It does not rely only on the current role definition.

## Provisional dependencies

The following remain pending:

- Initial workforce role catalog
- Scope hierarchy and combination rules
- Permission evaluation and conflict precedence
- Delegation, temporary access, and just-in-time access workflow
- Approval thresholds and segregation-of-duties matrix
- Break-glass and emergency access
- Access review, revocation, and offboarding
- Roles and Permissions validation

## Next decision

Define the initial workforce role catalog, followed by scope semantics, permission precedence, delegation, segregation, access review, and emergency controls.
