# Roles and Permissions

**Status:** Approved in part — authorization model approved; detailed roles and policies pending

## Purpose

This document defines how Nexora grants attributable human and non-human subjects the minimum capabilities required to perform governed work.

It implements the capability boundary established by the approved [Administrative Dashboard IA](06-administrative-dashboard-ia.md) and applies across Admin, Support, external-provider, service, automation, and AI-assisted access.

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

- Workforce user
- External-provider user
- Service identity
- Automation identity
- AI-assisted delegated identity

Shared anonymous operational identities are not acceptable for consequential work.

The exact subject lifecycle, identity proofing, service ownership, and offboarding model remain pending.

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

- Subject lifecycle and identity classes
- Initial workforce role catalog
- Scope hierarchy and combination rules
- Permission evaluation and conflict precedence
- Delegation, temporary access, and just-in-time access workflow
- Approval thresholds and segregation-of-duties matrix
- Service, automation, external-provider, and AI identity lifecycle
- Break-glass and emergency access
- Access review, revocation, and offboarding
- Roles and Permissions validation

## Next decision

Define the subject and identity model, followed by initial roles, scope semantics, access lifecycle, segregation, and emergency controls.
