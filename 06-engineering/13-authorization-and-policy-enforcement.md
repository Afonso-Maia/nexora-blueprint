# Authorization and Policy Enforcement

**Status:** Approved

## Purpose

This document translates the approved [scoped capability-based access model](../03-product-structure/07-roles-and-permissions.md) into enforceable runtime contracts.

It defines policy ownership, evaluation placement, request and resource context, field filtering, caching, asynchronous enforcement, revocation, degraded behavior, evidence, and quality gates. It does not redefine capabilities, roles, scopes, precedence, segregation, or governance policy values.

## Decision

Use a **source-enforced hybrid authorization architecture**:

- Roles and Permissions owns versioned roles, grants, denials, delegations, scope definitions, policy metadata, and effective-access administration.
- A shared, deterministic authorization kernel implements the approved evaluation semantics.
- Each authoritative source module invokes that kernel with current source-owned resource and lifecycle facts before disclosure or commitment.
- The modular core evaluates in process through public module contracts, without a remote authorization network hop.
- Independently deployed capabilities consume signed, versioned policy projections and use direct authoritative checks for critical freshness.
- Presentation systems receive permission-aware views and action descriptors but never become enforcement authorities.
- Consequential actions fail closed when required identity, policy, scope, resource, assurance, or segregation context is missing, stale beyond policy, or unavailable.

The initial architecture does not introduce a universal external policy-decision service or a general-purpose policy language. Those remain viable later only if measured distribution and governance needs justify their complexity.

## Viable approaches considered

### Source-enforced shared kernel

The authorization authority owns policy data and compilation. Source modules add their current resource facts and evaluate a common deterministic kernel at the protected read or command boundary.

This is approved because it:

- Preserves source ownership of resource and lifecycle truth
- Avoids a network dependency on every core operation
- Makes policy behavior consistent and testable
- Supports the initial modular-monolith topology
- Allows independent runtimes to consume governed projections without pretending they are current source truth

### Central remote policy-decision service

Every protected operation could send subject, action, resource, and context to an independently deployed policy-decision point.

This can centralize policy runtime and support a highly distributed estate, but initially it adds latency, availability coupling, context replication, cache invalidation, and a temptation to copy source facts into the policy service. It is not approved as the default. A later adoption requires measured multi-runtime demand, clear fact-fetching boundaries, safe failure behavior, and a superseding ADR.

## Enforcement model

Authorization evaluates the approved expression:

`Subject + capability + resource scope + field scope + conditions + assurance`

The deterministic precedence remains:

`Lifecycle or security restriction → explicit denial → segregation or risk constraint → complete allow grant → default deny`

One complete grant must independently satisfy the requested capability, resource, fields, conditions, assurance, limits, and time. Evaluation cannot combine a capability from one grant with scope or assurance from another.

Roles are assignment conveniences. Runtime contracts evaluate resolved grants and mandatory constraints, not role names, UI routes, job titles, or organizational seniority.

## Ownership

### Roles and Permissions owns

- Capability and scope-type registries
- Versioned role definitions
- Role assignments and complete grants
- Explicit denials
- Delegations and temporary access
- Segregation and general authorization-policy definitions
- Grant expiry and review state
- Policy compilation and validation
- Effective-access explanation
- Policy and assignment change events

### Source modules own

- Resource identity and current lifecycle
- Resource relationships and authoritative hierarchy placement
- Source-specific operation and field classification
- Source-specific conditions, thresholds, and invariants
- Final authorization enforcement
- Safe response shaping
- Disposition of pending work after revocation
- The authoritative business outcome

### Identity and Security own

- Authenticated subject and actor class
- Current assurance evidence
- Identity and session restrictions
- Security risk signals and mandatory restrictions
- Workload identity

### Consumers

Customer and Admin BFFs, Search, AI, reports, exports, notifications, workers, and provider adapters consume bounded authorization contracts. They may reduce or suppress access but cannot widen it.

Audit stores decision evidence and activity. It cannot grant access or replace current policy.

## Typed policy model

Authorization policy is versioned typed data with validated operators, not executable arbitrary code.

A complete grant contains:

- Grant identifier and version
- Subject or eligible subject set
- Capability identifier
- Resource type and typed resource scope
- Readable and writable field sets
- Applicable conditions and limits
- Required assurance
- Start, expiry, and review state
- Delegation and sponsorship provenance
- Policy source and approval evidence

Mandatory constraints contain equivalent typed applicability, effect, version, reason category, lifecycle, and review metadata.

Policy identifiers are stable. Human labels are localized presentation. Unknown capability, scope, operator, field set, or policy versions fail validation and cannot activate.

Policy schemas are maintained as code-owned contracts. Policy instances are governed data. Changes pass schema validation, reference validation, effective-access simulation, segregation analysis, approval, activation, and audit.

## Authorization request contract

Every protected boundary constructs an explicit request containing:

- Authenticated subject and actor class
- Actual actor and represented subject for delegated access
- Workload caller identity
- Requested capability
- Resource type and stable resource identifier or creation scope
- Requested field set
- Current source-owned resource facts
- Current assurance context
- Operation risk, amount, quantity, or batch facts where applicable
- Current time and environment
- Correlation, causation, operation, and idempotency identifiers
- Required freshness class

The client cannot submit trusted role, capability, scope, field, approval, or risk values. A BFF may request an operation, but the Core resolves trusted context from authenticated assertions, policy authority, and source data.

Resource context is minimized to facts used by registered policy. The authorization kernel cannot issue hidden database queries or call arbitrary services.

## Decision contract

The kernel returns a structured decision:

- `allow` or `deny`
- Stable internal decision category
- Policy and grant versions evaluated
- Scope and hierarchy versions
- Assurance requirement and satisfaction result
- Applicable mandatory-constraint result
- Permitted read and write field sets
- Expiry and maximum cache boundary
- Obligations the source must perform
- Redacted explanation reference
- Decision identifier for correlation

Obligations may require audit evidence, independent approval, reason capture, extra redaction, notification, watermarking, source recheck, or a lower batch limit. An obligation is enforceable behavior, not advisory UI copy.

Public errors use the approved non-disclosing response semantics. Internal traces can distinguish unauthenticated, insufficient assurance, lifecycle restriction, explicit denial, segregation failure, condition failure, and no complete grant without exposing protected resource existence.

## Enforcement points

### Protected reads

The source authorizes before loading or returning protected data where practical. It then applies row, resource, and field restrictions before the representation crosses the source boundary.

Post-query filtering is permitted only when:

- The initial query cannot disclose data through timing, counts, ordering, or pagination
- The candidate set is bounded
- Restricted records never enter logs, caches, analytics, or consumer memory
- The source owner approves and tests the pattern

Database row-level security can provide defense in depth for selected source-owned tables. It does not replace application policy, module contracts, or field and operation evaluation.

### Commands

Commands re-evaluate authorization at commitment using current:

- Subject and assurance
- Grants, denials, and restrictions
- Resource state and hierarchy
- Segregation and approval state
- Amount, batch, provider, and other operation conditions

Page access, a previous preview, a disabled control, or an earlier allow decision does not authorize commitment.

### Creation

Before a resource exists, the owner authorizes against the intended resource type, parent scope, proposed sensitive attributes, and creation capability. After creation, the resulting resource is governed by its actual authoritative placement.

### Field access

The source defines registered field sets for each representation and command.

- Restricted response fields are omitted or explicitly redacted according to the presentation contract.
- Empty, false, and zero are not substitutes for redaction.
- Write authorization uses the changed-field set, not merely endpoint access.
- Derived fields inherit restrictions from their inputs and inference policy.
- Unknown response fields fail secure in serializers and contract tests.

Mass assignment from client payloads is prohibited. Command schemas allow only declared fields and source code applies only authorized changes.

### Discovery

Discover and Read remain distinct.

Navigation, search results, suggestions, recents, related links, counts, worklists, and typeahead are filtered to the caller's Discover scope. A permitted direct Read does not automatically make a resource discoverable.

Opening a result always reauthorizes against the source.

### Exports and reports

Export is a separate capability with resource, field, volume, purpose, expiry, and delivery constraints.

The source authorizes the export request. A worker rechecks or consumes a narrow execution grant before materialization. Delivery reauthorizes the recipient and uses a short-lived transfer capability.

Files are encrypted, classified, retained, and revoked according to policy. A report, aggregate, or small cohort cannot reveal data the actor could not read from the source.

## Permission-aware presentation

BFFs obtain source-filtered data and bounded action descriptors such as:

- Visible action identifier
- Enabled, disabled, or hidden presentation state
- Stable reason category
- Step-up or approval requirement
- Applicable limit

Descriptors improve progressive disclosure and accessible recovery. They are hints for the current representation, not reusable authorization tokens.

Admin navigation is built from Discover capability projections. Routes still enforce access. Deep links return non-disclosing denied, unavailable, or successor states according to the approved page behavior.

Customer interfaces apply the same principle for account objects, guest resources, representatives, and shared continuity.

## Policy distribution and compilation

Roles and Permissions publishes immutable, signed policy bundles and change events.

A bundle contains:

- Schema and compiler version
- Monotonic policy revision
- Roles, complete grants, denials, delegations, and mandatory constraints needed by the consumer
- Scope and hierarchy references
- Activation and expiry metadata
- Integrity signature

The shared compiler validates and normalizes policy into deterministic evaluation structures. The compiler and kernel have versioned compatibility and conformance fixtures.

Within the modular core, source modules access the current authorization authority through in-process public contracts and can use transactionally consistent policy reads where required.

Independent runtimes receive least-data projections scoped to their purpose. They do not receive unrestricted customer or workforce grant inventories.

## Freshness and caching

Authorization caching is risk-classed.

### Current decision required

Consequential mutations, sensitive disclosures, exports, access administration, approval, execution, and break-glass actions use current policy and source context. They do not rely on a stale allow decision.

### Bounded projection permitted

Navigation, non-sensitive discovery, and other explicitly classified presentation may use a short-lived version-bound projection.

Every cached entry is bound to:

- Subject and actor class
- Delegation context
- Capability and resource or scope
- Requested field set
- Grant and policy revisions
- Scope and hierarchy versions
- Assurance and session versions
- Relevant resource version
- Earliest underlying expiry

Change events evict affected entries. Safety expiry bounds missed invalidation. A cached deny may be retained longer only if it does not block required recovery or create misleading permanence.

A cache can never extend access past grant, delegation, approval, assurance, session, policy, or resource-condition expiry.

## Revocation

Revocation is an explicit distributed operation with a durable identifier.

Roles and Permissions records the authoritative revocation, increments the applicable revision, and publishes invalidation. Consumers:

- Reject new affected decisions
- Evict session and authorization projections
- Remove navigation, search, recents, worklists, and saved views
- Reauthorize open resources and real-time channels
- Stop or safely disposition pending exports and scheduled work
- Prevent queued commands from executing under superseded authority
- Confirm propagation or enter reconciliation

High-risk revocation uses direct current checks and bounded maximum propagation time. Failure to confirm propagation is observable and escalated.

Historical work remains attributed to the policy and grants that applied when it executed.

## Asynchronous and long-running work

A queue message is never an authorization grant.

For delayed work, the source chooses one approved model:

### Reauthorize at execution

The worker resolves current subject, policy, resource, assurance-equivalent requirement, and conditions immediately before execution. Use this when continuing authority is required.

### Narrow execution grant

The source creates a signed, single-purpose, audience-bound, resource-bound, expiring execution grant after authorization and any required approval. Use this when policy intentionally authorizes completion despite later session absence.

The grant names the exact operation, constraints, authorization and approval evidence, policy version, revocation behavior, and maximum lifetime. It cannot authorize adjacent work or survive a source-defined invalidating change.

Retrying, rescheduling, replaying, or moving a message does not widen or renew authority.

## Search, AI, and derived systems

### Search

Protected indexes store authorization-filterable scope attributes only when the source owner approves their derivation and freshness contract.

Search applies the caller's Discover projection before returning protected hits or counts. Direct source authorization remains mandatory when opening a result. A stale Search projection may hide a newly granted resource, but it must not reveal a revoked one beyond the approved propagation bound.

### AI

AI retrieval receives source-authorized, field-filtered context for the attributable subject and task. Prompts, embeddings, vector stores, tool results, summaries, citations, traces, and model output follow the same resource and field restrictions.

AI cannot infer permission from conversational context, route visibility, an earlier tool result, or model instructions. Each tool call reauthorizes. Delegated execution follows the identity and source-operation rules.

### Analytics and notifications

Analytics receives minimized governed data and cannot answer as a current authorization source. Notifications authorize content at generation and protect destination and link access; a notification does not preserve access after revocation.

## Segregation, approval, and delegation

The kernel evaluates effective duties across all active complete grants and applicable delegations, not role labels.

- Request, author, review, approve, and execute identities remain distinct where policy requires.
- A senior role does not override segregation.
- Delegation can only narrow the delegator's eligible authority and cannot transfer non-delegable capabilities.
- An approval is bound to operation, reviewed facts, policy version, approver independence, and expiry.
- Material change invalidates or renews approval according to source policy.
- Break-glass is a separate bounded grant with visible mode, monitoring, expiry, and retrospective review; it does not disable source enforcement or Audit.

## Customer ownership rules

Customer access is policy-backed rather than inferred from identifier possession or contact matching.

The source resolves ownership or association for:

- Account-owned resources
- Guest order and case access
- Shared household or representative access if later enabled
- Claimed guest purchases
- Support-assisted workflows

Changing an email address, merging profile data, or knowing an order reference does not transfer ownership. Cross-customer access uses explicit verified representation or sharing policy.

## Degraded behavior

Consequential or sensitive operations deny when required policy, subject lifecycle, assurance, resource facts, hierarchy, segregation, or revocation state cannot be established.

Bounded read-only continuity is allowed only when all are true:

- The source policy classifies the data as eligible
- A previously authorized, field-filtered representation exists
- Its policy and data expiry have not passed
- No known revocation or restriction applies
- The interface identifies freshness and limitations

The system never broadens scope, removes field restrictions, skips approval, lowers assurance, or treats unavailable policy as an allow.

Public discovery and anonymous commerce paths continue where no protected capability is required.

## Audit and privacy

Material decision evidence includes:

- Actual and represented subject
- Workload caller
- Requested capability, resource, and field set
- Grant, policy, hierarchy, assurance, and resource versions
- Applicable restriction, denial, segregation, condition, and approval results
- Final stable category and enforced obligations
- Operation, correlation, and causation identifiers
- Decision and execution timestamps

Evidence is sufficient to explain a decision without storing raw secrets or duplicating unrestricted protected records. Routine repeated read decisions may use policy-approved aggregation, but sensitive disclosures, mutations, exports, grants, denials, emergency use, and administrative changes retain individual evidence.

Authorization explanations shown to users are localized and non-disclosing. Internal policy expressions, hidden resource existence, other subjects' access, and sensitive risk signals are not exposed.

## Policy lifecycle

Policy changes use:

`Draft → Validate → Simulate → Independently review → Approve → Activate → Observe → Retire`

Simulation evaluates representative and adversarial fixtures plus affected active assignments, pending approvals, scheduled work, Search projections, exports, and segregation conflicts.

Activation is atomic by policy revision. Partial bundle activation is prohibited. Rollback means activating a new reviewed revision or an approved emergency predecessor; historical evidence is immutable.

Exact roles, thresholds, review intervals, cache durations, emergency packs, and risk rules remain governed configuration within the approved Blueprint.

## Quality gates

Before release:

- Conformance-test the shared kernel against the approved precedence and complete-grant rules.
- Generate allow, deny, boundary, expiry, conflicting-grant, and unknown-version fixtures for every capability.
- Prove each protected Core read and command has an enforcement point.
- Prove field restrictions across APIs, Search, exports, reports, logs, AI, notifications, caches, and errors.
- Test TOCTOU behavior by changing resource state, hierarchy, approval, assurance, and grants between preview and commitment.
- Test revocation propagation, missed events, stale bundles, session changes, queued work, and real-time connections.
- Verify Customer, guest, workforce, provider, service, automation, delegation, and break-glass subjects.
- Mutation-test default deny so removing an allow cannot produce access.
- Verify UI permission adaptation without treating it as enforcement.
- Ensure traces are explainable, non-disclosing, correlated, and free of prohibited data.

Architecture tests reject:

- Protected handlers without registered capability metadata
- Client-supplied trusted authorization context
- Direct role-name checks in source business code
- Cross-module reads of authorization storage
- Unversioned policy fixtures
- Generic administrator bypasses
- Worker execution based only on a queued actor identifier

## Consequences

### Benefits

- Policy semantics stay consistent while resource truth remains with its owner.
- Core authorization avoids a mandatory remote hop.
- Deny, field, segregation, and assurance behavior applies to every consumer.
- Independent capabilities can scale without becoming permission authorities.
- Decisions remain explainable, versioned, and testable.

### Costs and risks

- Every source module must construct correct current resource context.
- Shared kernel compatibility and policy projection require strong governance.
- Field-level enforcement expands serializer, Search, export, and AI testing.
- Revocation and hierarchy changes need bounded distributed propagation.
- Later service extraction may require a dedicated decision runtime for some paths.

## References

- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Administrative Dashboard Patterns](../04-design-system/21-administrative-dashboard-patterns.md)
- [Domain Modules and Transaction Boundaries](10-domain-modules-and-transaction-boundaries.md)
- [Identity, Sessions, Authentication, and Assurance](12-identity-sessions-authentication-and-assurance.md)
- [API and Backend-for-Frontend Strategy](09-api-and-bff-strategy.md)
- [ADR-0003: Scoped Capability-Based Access Control](../adrs/ADR-0003-scoped-capability-based-access-control.md)
- [ADR-0019: Source-Enforced Hybrid Authorization](../adrs/ADR-0019-source-enforced-hybrid-authorization.md)

