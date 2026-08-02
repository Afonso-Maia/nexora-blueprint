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

## Initial workforce role catalog

Nexora begins with stable job-family roles for ordinary work and separately assigned independent-duty roles for consequential approval or supervision.

The catalog defines role purpose and boundaries. Concrete capabilities, scopes, fields, thresholds, incompatibilities, and approval rules are governed separately and do not derive from the role name alone.

### Operational roles

| Role | Primary purpose | Boundary |
| --- | --- | --- |
| Operations Coordinator | Triage permitted cross-domain exceptions, obligations, and handoffs | Does not inherit mutation rights in every contributing domain |
| Catalog Editor | Maintain permitted product and brand content and relationships | Cannot approve publication solely through this role |
| Taxonomy and Attribute Steward | Govern permitted categories, hierarchy, and attribute definitions | Top-level taxonomy changes remain subject to approved ADR governance and independent approval |
| Compatibility Rule Author | Draft, test, and submit deterministic compatibility rules | Cannot activate or approve authored rules solely through this role |
| Inventory Operator | Perform permitted inventory review and governed adjustments | Cannot redefine product, pricing, or financial records |
| Pricing Author | Draft and validate permitted prices and pricing rules | Cannot approve or activate authored pricing solely through this role |
| Order Operations Agent | Inspect and coordinate eligible order operations | Cannot infer payment, refund, delivery, or Support authority from order access |
| Customer Care Agent | Access eligible customer context and coordinate bounded Account or order assistance | Cannot rewrite historical commerce facts or administer roles |
| Support Agent | Work assigned Support queues and cases | Cannot execute linked financial or fulfillment remedies solely through this role |
| Merchandising Editor | Draft permitted collections and promotions | Cannot publish authored merchandising solely through this role |
| Content Editor | Draft and revise permitted governed content | Cannot publish authored content solely through this role |
| Search Governance Analyst | Inspect and propose governed search configuration and evaluation changes | Cannot alter Catalog truth or bypass approval for material ranking changes |
| Review Moderator | Review and moderate permitted customer reviews under policy | Cannot alter product facts or fabricate customer content |
| Reporting Analyst | Explore and export permitted governed reports | Does not inherit source-record mutation or unrestricted sensitive-data access |
| Audit Reviewer | Inspect permitted correlated audit history | Cannot alter audit events or administer the audited access through this role |
| Access Administrator | Prepare and maintain eligible subjects, roles, assignments, and scopes | Cannot approve their own access changes or bypass segregation policy |
| Platform Settings Operator | Draft and operate permitted platform settings | Does not inherit general Admin or source-domain authority |

### Independent-duty roles

| Role | Primary purpose | Boundary |
| --- | --- | --- |
| Catalog Publisher | Approve or publish eligible catalog and taxonomy changes | Does not automatically include authoring; cannot self-approve where prohibited |
| Compatibility Rule Approver | Independently review and activate eligible compatibility rules | Cannot approve personally authored rules where prohibited |
| Pricing Approver | Approve eligible pricing changes within assigned thresholds | Does not automatically include price authoring or execution |
| Commerce Remedy Approver | Approve eligible refunds, replacements, credits, or similar remedies within scope | Does not create source eligibility or execute every approved operation |
| Content Publisher | Approve or publish eligible content, collections, and promotions | Does not automatically include authorship; material policy content retains its designated owner |
| Support Supervisor | Review escalations, case exceptions, obligations, and eligible Support decisions | Does not inherit Payments, Delivery, Access, or policy-owner authority |
| Access Approver | Independently approve eligible access and role assignments | Cannot approve their own request or role design where prohibited |
| Platform Settings Approver | Independently approve eligible high-risk settings changes | Does not automatically execute or author the approved change |

An independent-duty role may be assigned without its related author role. Approval capability never implies request, edit, publish, execute, or administer unless those capabilities are explicitly and compatibly assigned.

### Role composition rules

1. Every assignment includes concrete scope and a review or expiry policy.
2. Role names are not page entitlements; the capability contract determines eligible page regions and actions.
3. Similar jobs use the same role template with different scopes rather than cloned role definitions.
4. A person may hold compatible operational and duty roles, but effective-access segregation is evaluated for each operation.
5. High-risk and independent-duty assignments require stronger approval and review than ordinary narrow access.
6. Reporting and audit roles remain field- and sensitivity-scoped.
7. Access Administrator and Access Approver remain separate duties.
8. Platform Settings authority does not imply general Admin authority.
9. No permanent all-powerful Super Admin role is approved for ordinary work.
10. Emergency capability elevation, if approved, uses the later break-glass model and never becomes an ordinary role assignment.

### Catalog governance

The initial catalog is versioned and intentionally minimal. A new role requires:

- Durable job purpose not served by an existing scoped role
- Accountable owner
- Capability and scope analysis
- Field and sensitive-data analysis
- Risk and segregation analysis
- Assignment, review, and expiry policy
- Migration and deprecation behavior

Temporary projects and unusual tasks use scoped delegation or just-in-time access rather than permanent role proliferation.

## Typed scope semantics

Scopes are governed typed dimensions. Every assignment produces one or more complete grants in which capability, resource scope, field scope, conditions, assurance, and limits remain bound together.

### Scope types

Initial scope types include:

| Scope type | Examples | Authoritative owner |
| --- | --- | --- |
| Organization or provider | Nexora workforce organization, approved repair provider | Workforce or provider directory |
| Capability domain | Catalog, Compatibility, Pricing, Support, Access | Owning product domain and Roles and Permissions |
| Resource hierarchy or set | Category branch, brand set, explicit product set | Owning source domain |
| Queue, assignment, case, or work package | Support queue, assigned case, external repair task | Support or owning workflow domain |
| Field set | Customer contact fields, pricing cost fields, audit-sensitive fields | Owning source domain and data policy |
| Region or operational territory | Governed geographic or operational scope | Owning operational domain |
| Threshold | Refund amount, discount limit, item count, batch size | Owning policy domain |
| Time window | Temporary assignment, shift, campaign, task period | Roles and Permissions or owning workflow |

Scope types use stable governed identifiers and versioned semantics. Free-form labels, UI folders, saved views, search filters, or navigation groups are not authorization scopes.

### Complete non-composable grants

Each grant is evaluated as a complete unit. Components from different grants cannot be recombined to create authority that no grant provides independently.

For example:

- Grant A: `Edit products` in Category A
- Grant B: `Approve products` in Category B

The subject can edit Category A and approve Category B. The grants do not permit approving Category A or editing Category B.

Likewise, a broad Read grant cannot lend its resource scope to a narrow Export grant, and a high financial threshold on one capability cannot expand another capability's threshold.

### Multiple grants

Effective allow access is the union of independently valid complete grants.

For an action to proceed, at least one grant must independently satisfy:

- Subject and lifecycle eligibility
- Required capability
- Resource scope
- Field scope
- Conditions
- Assurance
- Threshold and time bounds

Explicit denial, lifecycle restriction, risk policy, and segregation constraints then apply to the proposed action. Their conflict precedence is defined by the next decision.

### Hierarchy inheritance

Scope inheritance is explicit per scope type:

- A category scope includes descendant categories only if the governed category-scope definition says so.
- A provider-organization scope includes provider users only through current verified membership and eligible work packages.
- A team scope includes assignments, queues, or resources only through its defined relationship.
- A regional scope includes resources only through the owning domain's governed regional mapping.

Parent access does not automatically include every related or descendant object. Related-object links, aggregates, reports, object ownership, and organizational reporting lines do not create inheritance unless the scope definition explicitly declares it.

Hierarchy version and source timestamp participate in consequential evaluation. A moved resource is evaluated against current authoritative placement at commitment.

### Explicit resource and relationship scope

An explicit resource scope grants only the named eligible objects and declared relationships.

Assignment-based access is conditional:

- Assignment must be current and attributable.
- The assignment type declares which capabilities and fields it can constrain.
- Losing assignment ends that path to access.
- Assignment does not grant broader queue, customer, order, or related-resource access.

A Support case assignment, for example, can grant scoped case work without granting general access to the customer's full order history or every linked payment field.

### Field and derived-data scope

Field restrictions apply to:

- Source values
- Derived and calculated values
- Aggregates and counts
- Search indexes, suggestions, and snippets
- Saved views and previews
- Reports and exports
- Audit projections
- Logs and telemetry
- AI context, summaries, and outputs

A derived value that would reveal a protected field or small protected population is restricted according to policy. Redaction does not convert the value to empty, zero, or false.

### Threshold and time scope

Thresholds and time bounds belong to the specific complete grant that authorizes the action.

- Several smaller thresholds do not add together.
- Repeated actions cannot intentionally split a governed amount or batch to evade a threshold.
- Time expiry is evaluated at commitment and, where policy requires, at execution.
- A scheduled action does not retain an expired grant unless its approved execution policy explicitly establishes durable delegated authority.

### Scope change and degradation

Changes to a hierarchy, provider relationship, assignment, region, field policy, or threshold definition trigger access impact analysis for affected active assignments, approvals, drafts, exports, and scheduled work.

When required scope data is stale, conflicting, or unavailable:

- Consequential access denies safely or blocks pending confirmation.
- Existing read access may show permitted confirmed data with freshness where policy allows.
- The system does not fall back to a broader parent or global scope.
- Recovery identifies the owning scope source without disclosing protected objects.

### Governance rules

1. Authoritative source domains own scope identifiers, hierarchy, and resource relationships.
2. Roles and Permissions owns assignment of concrete scopes and evaluation composition.
3. Every grant retains its capability, resource, field, condition, assurance, threshold, and time boundaries.
4. Grants combine only as a union of independently sufficient grants.
5. Scope components cannot fuse across assignments.
6. Inheritance must be explicitly defined and testable per scope type.
7. Scope moves and hierarchy changes are auditable and trigger access impact analysis.
8. AI, search, exports, reports, and aggregates cannot bypass field or resource scope.

## Deterministic permission evaluation

Authorization uses deny-overrides evaluation with no hidden role priority or recency rule.

### Evaluation sequence

For every governed request:

1. Establish the attributable subject, authenticated session, and current assurance.
2. Verify subject lifecycle and applicable global security or identity restrictions.
3. Resolve current resource, field, relationship, hierarchy, and policy context.
4. Evaluate independently sufficient complete allow grants.
5. Apply matching explicit scoped denials.
6. Apply segregation-of-duties, risk, and other mandatory policy constraints.
7. Recheck resource state and execution-time contextual conditions.
8. Permit only when at least one complete grant survives every applicable constraint.
9. Deny by default otherwise.

The precedence is:

`Lifecycle or security restriction → explicit denial → segregation or risk constraint → complete allow grant → default deny`

Authentication failure, insufficient assurance, missing approval, incompatible resource state, explicit denial, and absence of an allow grant remain distinct decision categories even when the customer-facing response cannot disclose the distinction.

### Allow behavior

An allow is valid only when one complete grant independently satisfies the requested capability, resource, fields, conditions, assurance, threshold, and time.

- Two allow grants may each authorize separate actions.
- Components do not fuse across grants.
- Role order and assignment recency have no effect.
- A prior allow does not survive lifecycle, scope, policy, or resource-state change.
- Approval is a condition or separate capability, not a new broad allow.

### Explicit denial

An explicit denial overrides a matching allow only within its governed scope.

For example:

- Allow: approve pricing up to R$50,000 in Region South.
- Deny: approve pricing for Campaign X during an incident.

Other eligible Region South approvals remain available; Campaign X is blocked.

Explicit denial is used for a specific governed prohibition, incident, legal restriction, toxic combination, or bounded exception. It is not a substitute for removing obsolete grants or completing offboarding.

A denial declares:

- Policy owner and version
- Capability, resource, field, and subject scope
- Conditions
- Start and expiry or review
- Reason category
- Recovery or exception path
- Audit requirements

### Segregation and risk constraints

Segregation and risk constraints evaluate the proposed operation after complete grants are found.

They may deny or require additional approval, assurance, narrower scope, or a different actor. A role assignment cannot override these constraints merely because it was granted later or by a senior user.

The constraint evaluates effective assignments, delegation, authorship, approvals, prior actions, and relevant relationships according to policy.

### Default deny and degraded policy

Access denies by default when:

- No complete allow grant matches.
- Required subject, scope, field, hierarchy, resource, or condition data is missing.
- A required policy or segregation decision is unavailable.
- Required assurance or approval is absent.
- Applicable policy versions conflict without a governed resolution.

Read-only degraded behavior may use previously confirmed permitted data only when disclosure policy explicitly allows it. Consequential actions do not fall back to cached broader access.

### Decision trace

Every material authorization decision can produce an auditable trace containing:

- Subject and session reference
- Requested capability and target
- Evaluated grant and policy versions
- Scope and hierarchy versions
- Applicable lifecycle, denial, segregation, risk, assurance, and condition result
- Final stable decision category
- Evaluation and source timestamps
- Correlation reference

The trace does not copy unnecessary protected values. Workforce and customer explanations reveal only the reason detail and recovery path they are permitted to know.

### Cache and invalidation

Cached authorization decisions are bounded by:

- Subject lifecycle and session
- Role and grant versions
- Delegation and assignment state
- Scope and hierarchy versions
- Explicit denial and risk policy versions
- Resource state and relevant conditions
- Assurance age
- Expiry time

Material change invalidates or shortens the decision. A cache hit cannot extend access beyond any underlying expiry or preserve an action after revocation.

### Policy change and simulation

Before a material role, scope, denial, segregation, or precedence change is activated, governance requires:

- Proposed policy version
- Effective-access impact analysis
- Newly allowed and newly denied subject/resource populations
- Incompatible-duty analysis
- Critical workflow and non-disclosure tests
- Rollout and recovery plan
- Required approval

Simulation is advisory until authoritative evaluation confirms the activated policy. It cannot grant access or guarantee the exact future resource population.

### Governance rules

1. Deny by default.
2. Lifecycle and security restrictions override assignment grants.
3. Explicit denials are scoped, versioned, expiring or reviewed, and auditable.
4. Segregation and risk constraints cannot be bypassed by role priority or grant recency.
5. At least one complete independently sufficient allow grant is required.
6. Missing required policy context denies consequential access safely.
7. Decisions use stable categories while explanations remain non-disclosing.
8. Material policy changes require simulation, testing, approval, rollout, and recovery planning.

## Example authorization outcomes

- A Catalog Editor can edit permitted product content for assigned categories but cannot approve publication.
- A Support Agent can read and work cases in an assigned queue but cannot execute a refund merely because it is linked to the case.
- A Commerce Remedy Approver can approve a refund inside a governed amount threshold but cannot request and approve the same operation when segregation policy prohibits it.
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

Nexora uses an action-specific segregation matrix. Approval and independence depend on operation risk and scope rather than organizational seniority alone.

### Threshold bands

| Band | Approval model |
| --- | --- |
| Routine | An authorized operator may execute without independent approval |
| Significant | Independent review or approval applies when the source-domain policy requires it |
| High | At least one independent approver; requestor or author cannot be the sole approver or executor where prohibited |
| Critical | Multiple independent controls, strongest assurance, bounded execution, monitoring, and explicit recovery or compensation planning |

Threshold inputs may include financial amount, margin impact, customer count, product or inventory scope, publication reach, data sensitivity, reversibility, policy exception, access privilege, batch size, and incident context.

Exact monetary, volume, reach, and sensitivity values are governed policy data rather than fixed architecture constants.

### Initial segregation matrix

| Operation | Duties kept separate |
| --- | --- |
| Access assignment | Request or preparation ↔ approval |
| Role or authorization policy change | Design ↔ approval or activation |
| Product or taxonomy publication | Authoring ↔ approval or publication where risk requires |
| Compatibility activation | Rule authoring or testing ↔ approval or activation |
| Pricing activation | Authoring ↔ approval; execution remains separate where governed |
| Refund, replacement, or credit | Request or case handling ↔ financial approval; execution remains source-owned |
| Content or promotion publication | Authoring ↔ publication where risk requires |
| Platform settings | Preparation ↔ approval or activation |
| Audit governance | Audit administration ↔ independent audit review |
| Financial reconciliation | Original adjustment ↔ independent reconciliation where required |

Segregation evaluates effective roles, complete grants, delegations, JIT access, authorship, approvals, prior actions, and relevant relationships. Switching roles, sessions, or devices does not make the same subject independent.

### Approval contract

Every required approval records:

- Proposed operation and exact scope
- Risk and threshold band
- Requestor and author
- Eligible approver and independence result
- Baseline, validation, evidence, and consequence preview
- Decision, rationale, and conditions
- Policy and role versions
- Expiry or invalidation condition
- Audit correlation

Approval is limited to the reviewed scope. Material change, expiry, policy change, resource-state conflict, or loss of approver independence invalidates or requires renewal of approval.

Approval does not grant execution authority or guarantee successful execution.

### Evasion and conflict rules

1. Splitting transactions, batches, campaigns, assignments, or time windows to avoid a threshold is prohibited.
2. Related operations may aggregate for threshold and independence evaluation according to source-domain policy.
3. A management relationship does not by itself establish domain authority or independence.
4. Seniority cannot override a missing eligible approver.
5. Temporary or delegated access cannot bypass an incompatible duty.
6. Automation cannot request, approve, and execute its own expanded authority.
7. Missing segregation context blocks the governed action safely.
8. Emergency exceptions use the separate break-glass process and never rewrite the ordinary matrix.

### Ownership

- Source domains own consequence inputs, eligibility, and operation-specific thresholds.
- Governance owns the matrix, independence rules, aggregation policy, and exception boundaries.
- Roles and Permissions evaluates effective access and duty conflicts.
- Admin Platform presents the required approval and independence state.
- Audit preserves request, review, approval, execution, and reconciliation as separate attributed events.

## Governed time-bound access

Temporary delegation and just-in-time access use a durable lifecycle:

`Request → Validate → Approve → Activate → Use → Expire or Revoke → Review`

They create complete time-bound grants evaluated by the same typed-scope and deny-overrides model as ordinary assignments.

### Temporary-grant contract

Every temporary grant records:

- Requesting and receiving subjects
- Delegating or sponsoring subject
- Requested capability and complete concrete scope
- Purpose and work reference
- Start and maximum duration
- Assurance and approval
- Risk class
- Non-delegable constraints
- Monitoring requirements
- Expiry and revocation conditions
- Actual use
- Review outcome

A temporary grant never consists of an unscoped role name or copied session. It identifies the minimum capabilities, resources, fields, conditions, thresholds, and time needed for the task.

### Lifecycle

- **Request:** the recipient, sponsor, or governed workflow states the task, scope, duration, and reason.
- **Validate:** policy checks subject eligibility, sponsor authority, delegability, scope, risk, incompatible duties, existing access, and maximum duration.
- **Approve:** an eligible independent approver or pre-approved policy authorizes the exact request.
- **Activate:** the grant becomes usable at its start time after current assurance and conditions succeed.
- **Use:** actions remain attributable to the receiving subject and temporary-grant reference.
- **Expire or Revoke:** authority ends automatically or through an authorized early termination.
- **Review:** governance evaluates use, exceptions, incidents, renewal patterns, and unused access.

Material scope, capability, duration, subject, sponsor, risk, or purpose change requires a new validation and approval. Extension is a new reviewed decision, not silent renewal.

### Delegation

Delegation allows an eligible subject to delegate a permitted subset of their authority.

- The recipient acts under their own identity.
- The recipient's action is attributed to the recipient and delegation record.
- The delegator remains accountable for making an appropriate delegation but does not become the actor for the recipient's work.
- Delegation cannot exceed or outlive the delegator's eligible complete grant.
- Revocation or loss of the delegator's underlying authority re-evaluates or ends the delegation.
- Delegated scope does not fuse with another grant.

Chained delegation is prohibited unless an explicit policy defines the chain, maximum depth, scopes, expiry, approvals, and attribution. No chained delegation is approved by default.

### Just-in-time access

Just-in-time access grants a narrowly requested capability for a limited task and duration.

- Low-risk, pre-approved request patterns may activate automatically after policy validation.
- Significant, high, or critical access requires the applicable independent approval and assurance.
- Activation may occur only when needed rather than for the entire approved window.
- Inactivity can shorten or end the usable period where policy requires.
- Repeated requests are analyzed for permanent-role mismatch or access-pattern abuse.

JIT access supplements the stable role catalog without becoming an alternative permanent role system.

### Non-delegable duties

Policy may mark capabilities as non-delegable, including eligible:

- Access approval
- Audit administration or protected audit review
- Critical platform settings
- Segregation override
- Break-glass approval
- Role or policy ownership
- High-risk financial or privacy authority

Non-delegable status applies even when the delegator possesses the capability. Temporary access cannot be used to bypass requestor/approver, author/publisher, or administrator/reviewer separation.

### Expiry and revocation

Expiry or revocation invalidates the temporary grant and propagates to:

- Active sessions and authorization caches
- Navigation, search, recents, and shared links
- Open workspaces and selections
- Draft continuation rights
- Approval eligibility
- Export generation and recoverable delivery artifacts
- Scheduled and queued actions
- Delegations derived from the grant

Historical attribution remains.

Source domains decide whether already accepted asynchronous operations continue, pause, reconcile, or compensate. Pending and scheduled work rechecks current authority at execution unless its approved policy created a durable separately attributable execution grant.

### Emergency boundary

Break-glass access is not a JIT shortcut. Emergency access requires its own later-approved triggers, capability boundaries, monitoring, notification, expiry, and review.

An urgent request that cannot satisfy ordinary JIT policy remains denied unless the approved break-glass process is invoked.

### Governance rules

1. Temporary grants use complete non-composable scopes.
2. Delegation never becomes impersonation.
3. Delegators cannot grant more authority, duration, or delegability than they possess.
4. JIT auto-approval is limited to explicitly pre-approved low-risk patterns.
5. High-risk grants require independent approval and proportional assurance.
6. Extensions and material changes require new review.
7. Expiry and revocation automatically terminate future authority.
8. Requested duration, actual use, renewal, unused access, and downstream disposition are auditable and reviewable.

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

- Break-glass and emergency access
- Access review, revocation, and offboarding
- Roles and Permissions validation

## Next decision

Define continuous access review, revocation, and offboarding, followed by break-glass emergency access and topic validation.
