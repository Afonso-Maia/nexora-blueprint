# PC Builder Persistence and Recalculation

**Status:** Approved

## Purpose

This document defines PC Build identity, ownership, slots, selections, initialization, persistence, guest continuity, concurrency, recalculation, budget, performance, sharing, duplication, archival, Build-to-Cart conversion, purchase snapshots, and upgrade lineage.

It implements one persistent non-linear Engineering Workspace. PC Builder owns Build composition and derived workspace state; Catalog, Compatibility, Pricing, Inventory, Purchase, and AI retain their approved authorities.

## Decision

Use:

- A server-authoritative durable PC Build for both guests and customers
- A typed versioned Build Schema containing slots and constraints
- One current Build aggregate plus immutable internal Build Revision records
- Strong ETags and field-aware conflict detection
- Candidate-change evaluation before a source-invalid selection is confirmed
- A dependency-aware recalculation coordinator
- Compatibility as the deterministic constraint authority
- PC Builder-owned versioned Budget and Performance projections
- Source-versioned price and availability projections
- Immutable revocable Build Share snapshots
- Idempotent claim, duplicate, archive, conversion, and upgrade operations
- Atomic grouped Build-to-Cart composition through Purchase

Guided and Expert are initialization profiles only. They create the same Build model and do not produce separate workspace types or step-based workflows.

Real-time multi-user collaboration, ownership transfer, public discoverability, editable shared Builds, and a customer-facing version-history product are not approved.

## Viable approaches considered

### Server-authoritative Build with derived projections

Every guest or customer gets a durable Build object. Source selections are saved independently from derived price, stock, performance, and AI state, while Compatibility is evaluated through its authoritative contract.

This is approved because it provides restoration, cross-device customer continuity, conflict control, share snapshots, and purchase provenance without treating browser storage as the primary source.

### Browser-first guest Build promoted on sign-in

Guest Builds could exist only in local storage until a customer authenticates.

This reduces server records but makes loss, multi-tab conflict, expiry, share, conversion, and device continuity fragile. Bounded local recovery remains useful, but not as the authoritative Build.

### Event-sourced Build

Every Build action could be an event and current state reconstructed from history.

This provides complete replay but adds event-schema and projection complexity without a demonstrated need. Nexora uses a normal aggregate plus immutable revision and operation evidence.

## Ownership boundaries

### PC Builder owns

- Build identity and lifecycle
- Owner class and association
- Build Schema selection
- Slot and selection composition
- User constraints, purpose, goals, and target budget
- Initialization provenance
- Guest claim
- Duplicate, archive, share, revoke, and upgrade lineage
- Build Revision and concurrency
- Warning acknowledgement association
- Budget projection and target comparison
- Performance estimate model and projection
- Recalculation coordination and freshness
- Build-to-Cart intent and conversion history

### Other owners retain

- Catalog owns Product, Variant, category, attribute, and publication facts.
- Compatibility owns deterministic rules, outcomes, findings, and evidence.
- Pricing owns Price Quotes and price projections.
- Inventory owns availability and Reservations.
- Search owns component discovery and filters.
- Purchase owns Cart composition, Checkout, and Orders.
- Customer owns Account navigation and continuity projection.
- AI owns conversation and model execution, not Build state.
- Support owns Case association.

PC Builder stores source identifiers, revisions, and derived results. It does not copy mutable source authority.

## Build aggregate

A PC Build contains:

- Stable opaque identifier
- Owner class and owner association
- Name
- Build Schema identifier and version
- Purpose and user-visible goals
- Target budget and currency
- Current slot selections
- User-entered environment and existing-component facts
- Warning acknowledgements
- Current confirmed Build Revision
- Current recalculation state
- Lifecycle
- Share and conversion references
- Parent lineage
- Created, updated, archived, and expiry metadata

The aggregate remains bounded. Recalculation runs, price histories, AI messages, share snapshots, and conversion operations are separate records.

## Owner classes

Supported owner classes are:

- Guest session
- Customer Account

A guest owner is a scoped PC Builder subject association established by the Customer Experience session. The Build identifier alone grants nothing.

A Build has one owner. Sharing does not create joint ownership. An Order or Support Case reference does not transfer ownership.

## Build lifecycle

The persistence lifecycle is:

`Active ↔ Archived → Deleted when eligible`

Create, save, resume, duplicate, share, purchase, and upgrade are operations or relationships, not overloaded lifecycle labels.

- **Active** — editable by its owner and eligible for current recalculation.
- **Archived** — retained, read-only by default, omitted from active lists, and eligible to restore.
- **Deleted** — unavailable for ordinary use after retention, active shares, Orders, Cases, and Legal constraints are resolved.

Purchase does not consume or freeze the Build. The Order records the exact converted Build Revision. The owner may continue editing the source Build afterward.

## Build Schema

A Build Schema is a PC Builder-owned versioned structural definition.

It declares:

- Build type
- Slot types
- Required and optional slots
- Slot cardinality
- Eligible Catalog category and Product-type constraints
- Relationship graph construction
- User-context fields
- Budget component inclusion
- Performance model applicability
- Completion and conversion requirements
- Display and localization metadata
- Migration and retirement behavior

The initial PC configuration uses slots for the component families required by the approved Builder. Exact launched slots remain governed PC Builder data.

Adding a Product category does not create a slot automatically. A schema version is immutable after activation.

## Slot

A Slot instance contains:

- Stable slot identity within the Build
- Slot type
- Required or optional status
- Cardinality
- Selected Product and Variant references
- Quantity
- Selection provenance
- Selection revision
- Confirmed Catalog fact revision
- Current derived-state references
- Empty, selected, unavailable, stale, locked, or pending state

Slot identity does not derive from array position or translated label.

A multi-component slot retains stable member identities so reorder, replacement, quantity, and conflict are deterministic.

## Build facts and constraints

Distinguish:

- **Source selection** — Product, Variant, quantity, and slot chosen by the user.
- **User constraint** — purpose, target budget, preferences, existing component, physical environment, or other declared input.
- **Catalog fact** — authoritative Product or Variant fact.
- **Compatibility result** — authoritative deterministic evaluation.
- **Price projection** — current Pricing result.
- **Availability projection** — current Inventory result.
- **Performance estimate** — PC Builder-owned versioned estimate.
- **AI suggestion** — optional proposal.

No derived result silently mutates a source selection.

## Initialization

Guided and Expert initialization produce a typed Build Creation command.

### Guided

Can collect:

- Intended use
- Target budget
- Experience preference
- Required peripherals or exclusions
- Existing components
- Explainable suggested initial constraints

### Expert

Can create:

- Empty schema
- Explicit initial components
- Technical constraints
- Existing-component context

Both paths:

1. Validate the same Build Schema.
2. Show all proposed selections and constraints.
3. Require explicit creation.
4. Create one durable Build and initial Revision.
5. Enter the same Engineering Workspace.

AI handoff produces inspectable suggestions only. Hidden conversation inference does not become Build state.

## Persistence model

Use current relational aggregate tables for efficient writes and immutable Build Revision records for conflict, share, conversion, support, and audit evidence.

A Build Revision contains:

- Build identifier
- Monotonic revision
- Schema version
- Normalized selections and constraints
- Changed fields and operation
- Actor
- Parent revision
- Created time
- Content digest

It does not copy price, stock, Compatibility, or performance as source truth. Those results reference the Build Revision separately.

Internal revision retention follows policy. Exposing a full customer version-history interface is not approved by storing these records.

## Save semantics

Each authoritative mutation is an explicit save. There is no hidden distinction between a mutable unsaved server draft and a saved Build.

The client can maintain temporary interaction state while selecting or editing. Committing sends:

- Expected Build ETag
- Base Revision
- Changed slot or constraint patch
- Operation idempotency key
- Candidate source references

The server validates, evaluates required constraints, commits one new Revision, and returns current derived-state status.

UI labels such as Saving, Saved, Unsaved local interaction, Conflicted, and Read-only map to this boundary.

## Candidate selection

Component selection uses a two-stage contract:

1. **Evaluate candidate** — build a candidate configuration from the expected Revision and selected Variant, then obtain Catalog eligibility and Compatibility findings.
2. **Commit candidate** — recheck the expected Revision and evaluation binding, then write the selection.

If the candidate introduces a non-overridable hard incompatibility under the active selection policy, it is rejected with findings and the prior Build remains.

If Compatibility is unavailable or critical facts are Unknown:

- The prior confirmed selection remains.
- The candidate can remain in bounded client or server interaction draft state.
- It is not represented as a confirmed compatible Build.
- The customer can retry or choose another component.

An existing confirmed selection that later becomes incompatible is retained and marked with a current blocker. Nexora never removes or substitutes it silently.

## Incomplete Builds

Required slots can be empty while a Build is in progress. Compatibility distinguishes non-applicable, incomplete, and Unknown relationships.

Completion is a PC Builder projection based on:

- Required slots
- Current Catalog eligibility
- Current Compatibility
- Required price and availability for the requested operation
- Required user inputs

An incomplete Build remains savable and shareable if share policy permits. It cannot convert to Cart until conversion requirements pass.

## Concurrency

Use strong ETags and Revision comparison.

If the expected Revision is stale:

- The server returns current Revision metadata and fields changed since the base when available.
- The client preserves local interaction.
- Disjoint changes may be offered for explicit reapply or can be safely auto-rebased only when the operation contract proves no semantic dependency.
- Same-slot, schema, quantity, constraint, acknowledgement, archive, claim, or source-invalidating conflicts require customer resolution.

Last-write-wins is prohibited.

The conflict view compares stable slot and constraint identities, not serialized document text.

## Multi-tab and session restoration

Build changes publish owner-scoped invalidation containing Build identifier and Revision.

Other tabs:

- Mark local interaction stale.
- Refetch the authoritative Build.
- Preserve uncommitted local selection context.
- Do not overwrite automatically.

Restoration precedence is:

1. Current server Build and Revision
2. Eligible bounded local interaction draft based on a known Revision
3. Explicit reapply, duplicate, or discard

A browser backup is encrypted or minimized according to platform capability, short-lived, owner-bound, and never the sole durable source.

## Guest persistence

Guest Build creation writes to the server immediately and uses the guest session association.

The interface explains:

- Device and session limitations
- Expiry
- Sign-in benefit
- Share and conversion availability
- Claim behavior

A bounded local recovery draft may preserve the latest uncommitted interaction, but it cannot authorize access or override a newer server Build.

Guest session expiry does not make the Build public. Recovery follows approved verification or the customer starts a new Build.

## Guest claim

Claiming a guest Build into a Customer Account is a PC Builder-owned idempotent operation:

1. Authenticate the Customer.
2. Verify current guest ownership.
3. Recheck Build lifecycle and claim eligibility.
4. Show exact Build identity and current Revision.
5. Require explicit confirmation.
6. Atomically replace the guest owner association with the Customer.
7. Invalidate guest access and projections.
8. Record claim evidence.

Matching email or browser data does not claim a Build.

If the customer already has similar Builds, Claim does not merge them. The new Build remains distinct; duplicate-management is an explicit later user action.

## Build recalculation

Recalculation is a PC Builder-owned operation bound to:

- Build Revision
- Build Schema version
- Source fact and model versions
- Recalculation purpose

It coordinates:

- Catalog facts and current eligibility
- Compatibility evaluation
- Pricing projections
- Inventory availability
- Budget projection
- Performance estimate

AI is not part of required recalculation.

## Recalculation graph

The coordinator maintains registered dependencies.

Examples:

- Component change affects Compatibility graph, price, availability, budget, performance, and completion.
- Quantity change affects Compatibility cardinality, price, availability, budget, and possibly performance.
- Target-budget change affects Budget only.
- Use-case change affects Performance and optional recommendations, not Compatibility unless a registered physical context changes.
- Catalog fact change affects Compatibility and Performance dependencies that consume that fact.
- Rule activation affects Compatibility and completion.
- Price change affects Budget but not Compatibility.
- Inventory change affects availability and conversion, not compatibility.

Dependencies are explicit code-owned contracts. AI does not infer them at runtime.

## Recalculation execution

After a Build Revision commits:

1. Create or coalesce a Recalculation Operation.
2. Determine changed dependency keys.
3. Invoke Compatibility synchronously when required for selection confirmation; otherwise consume or request current evaluation.
4. Query or refresh price and availability projections.
5. Run affected Budget and Performance models.
6. Compare the Operation's Build Revision with current.
7. Commit only results still applicable to that Revision.
8. Publish owner-scoped invalidation.

Superseded operations stop or discard results. They do not overwrite a newer Build.

Independent results settle separately. Overall recalculation can be Complete, Partial, Pending, Failed, or Superseded.

## Recalculation presentation

While recalculating:

- Preserve prior confirmed result visibly as stale.
- Mark affected slots and panels.
- Keep unaffected work interactive.
- Do not announce every intermediate event.
- Batch an accessible settled summary.
- Move focus only after an explicit action requires correction.

A Build Revision is saved independently from optional price, availability, Performance, or AI results. A hard selection check remains governed by Candidate selection.

## Compatibility projection

Store:

- Build Revision
- Compatibility Evaluation identifier
- Rule-set digest
- Catalog fact digest
- Overall outcome
- Finding references
- Coverage and freshness
- Evaluated time

PC Builder renders Compatibility explanations but does not edit them.

Warning acknowledgement binds to exact finding, Rule Version, fact revisions, Build Revision, actor, and purpose. A material change invalidates it according to Compatibility policy.

Hard incompatibility blocks conversion and any selection policy that declares it non-committable.

## Budget model

Budget is a PC Builder-owned projection, not Pricing authority.

It contains:

- Target amount and currency
- Included selected components
- Current Price Quote or projection references
- Included and excluded cost classes
- Current total
- Remaining or exceeded amount
- Missing, changed, stale, and unavailable price items
- Calculated time and version

Use exact money arithmetic. Unknown price makes the relevant total Partial or Unknown; it is never zero.

Budget conflict informs the user and can block conversion only if the customer or a governed policy made the target a hard constraint. It is not a Compatibility hard block.

Delivery, optional additions, promotion, financing, tax classification, and other Checkout-dependent costs remain excluded unless the panel explicitly has their authoritative inputs and labels the scope.

## Performance model

Performance is a PC Builder-owned estimate with:

- Stable model and version
- Supported Build Schema and use cases
- Required Catalog facts
- Calculation or benchmark-source provenance
- Output metric and unit
- Confidence or range
- Missing and unsupported input behavior
- Validation corpus
- Effective and retirement state

The initial implementation uses deterministic versioned estimators or curated benchmark models, not generative AI.

Every output is labeled Estimated and names the use-case context. Unsupported or missing inputs yield Partial, Unknown, or Not available rather than an invented score.

Model activation requires domain review, test fixtures, bias and misleading-claim review, performance, explanation, and rollback.

The architecture does not approve specific benchmark claims or scoring formulas.

## Performance recalculation

The dependency index selects only models affected by changed components or use case.

Results bind to:

- Build Revision
- Model version
- Catalog fact revisions
- Use-case and configuration inputs

Comparing Builds requires the same compatible model and context or a visible non-comparable state.

AI may explain an estimate but cannot change the value, confidence, model, or missing-input status.

## Source-change propagation

PC Builder consumes source events for Builds referencing affected:

- Product or Variant
- Catalog fact or Attribute Definition
- Compatibility Rule Set
- Price projection
- Availability projection
- Performance model

The source-reference index identifies affected Builds. High-volume changes enqueue coalesced recalculation by Build and newest source revision.

Inactive or archived Builds can defer eager recalculation and refresh on open. Active Checkout conversion obtains current source truth directly.

Reconciliation compares Build references and derived-state versions against current source revisions.

## Saved Builds

The Saved Builds query is PC Builder-owned, customer-authorized, cursor-paginated, and filterable by governed lifecycle and recency.

Each summary includes:

- Build identity and name
- Updated time
- Selected-component summary
- Completion
- Current known Compatibility summary
- Budget summary
- Stale or unavailable indicators
- Share and purchase continuity where eligible

Account links to this query but does not copy Build authority. Search can index a minimal owner-only continuation projection.

## Duplicate

Duplicate creates a new owned Build from one eligible source Revision.

It:

- Requires current read access to the source or Share.
- Creates a new Build identity.
- Copies only governed selections, constraints, and user-visible name basis.
- Records parent Build and Revision.
- Excludes ownership, shares, Carts, Orders, private history, AI conversation, and unsupported acknowledgements.
- Revalidates current schema and sources.
- Returns migration or unavailable-component corrections.

The source Build remains unchanged.

## Build Share

Use an immutable snapshot share.

A Build Share contains:

- Stable opaque Share identifier
- Source Build and exact Revision
- Owner
- Snapshot of share-eligible selections, constraints, and name
- Catalog, Compatibility, Budget, and Performance references current at snapshot time
- Visibility and field policy
- Created and expiry time
- Revocation state
- Abuse and access metadata

It excludes:

- Owner identity beyond approved attribution
- Private Build history
- Account data
- AI conversation
- Cart, Checkout, Order, or Support data
- Internal diagnostics

The snapshot does not change when the owner edits the Build. This makes shared meaning stable and prevents a recipient from seeing later private work.

## Shared Build presentation

The Shared Build page is read-only.

It distinguishes:

- Snapshot selections and evaluation at share time
- Current Catalog availability
- Current price and inventory projections
- Current Compatibility re-evaluation where offered
- Changed, retired, stale, or unavailable components

Historical share facts do not guarantee current purchase eligibility.

Recipients can duplicate the snapshot into a new guest or customer Build. They cannot edit the source, comment, collaborate, or transfer ownership.

## Share access

Share identifiers use high-entropy random values and are not sequential. They are bearer discovery references, but sensitive owner data is excluded and server-side revocation and expiry apply.

- Rate limit and abuse monitor access.
- Do not index public search.
- Use no-store or bounded private caching according to content.
- Do not expose Share tokens in analytics, referrers, logs, or third-party requests.
- An owner can inspect and revoke active Shares.
- Revocation returns a non-disclosing unavailable state.

If stronger audience restriction is later introduced, it requires verified recipient policy and does not change the canonical page.

## Cart conversion

Build-to-Cart uses one durable PC Builder Conversion Operation and one Purchase command.

PC Builder:

1. Freezes the source Build Revision.
2. Rechecks ownership and conversion eligibility.
3. Obtains current Catalog facts.
4. Obtains current Compatibility evaluation.
5. Obtains current price and availability for preview.
6. Shows exact included components, quantities, warnings, and corrections.
7. Requires explicit confirmation.
8. Sends a versioned Build Conversion contract to Purchase.

Purchase:

1. Reauthorizes Cart ownership.
2. Revalidates Product/Variant eligibility, quantity, Compatibility, price, and inventory.
3. Applies the complete grouped Build composition atomically.
4. Returns Cart revision and per-component source references.

Hard incompatibility blocks conversion. Warning acknowledgement follows current rule policy. Missing or unavailable components produce a correction and no partial group.

Retry returns the original Cart mutation. It cannot duplicate the Build group.

## Conversion evidence

The record contains:

- Build and Revision
- Conversion Operation
- Cart and resulting revision
- Component and quantity snapshot
- Compatibility Evaluation and acknowledgement
- Source versions
- Outcome and corrections
- Actor and time

The Build remains intact. Removing or editing the Cart group does not edit it.

## Order continuity

At Order creation, Purchase snapshots the converted Build Revision and group.

Order Detail can show:

- Purchased component snapshot
- Source Build reference when still accessible
- Compatibility evidence at purchase
- Upgrade action

Later Build edits do not change the Order. Deleting the Build does not remove the purchased snapshot.

## Upgrade lineage

Upgrade later duplicates an eligible owned Build Revision or purchased Build snapshot into a new Build.

It records:

- Parent Build or Order snapshot
- Parent Revision
- Upgrade purpose
- Current Build Schema
- Carried selections
- Migration and unavailable-component results

It never mutates the purchased Order or original Build.

Compatibility, Catalog, price, inventory, Budget, and Performance re-evaluate against current versions. A previously compatible Build may become Unknown or Incompatible and remains transparently marked.

## Archive and delete

Archive is idempotent and preserves shares according to owner choice and policy.

Delete eligibility considers:

- Active Share
- Cart conversion evidence
- Order and Support references
- Retention
- Legal hold
- Abuse or security investigation

Deletion revokes ordinary access and shares and removes eligible personal metadata. Required Order and Support snapshots remain with their owners.

## AI Copilot integration

AI receives a minimized, authorized Build Context:

- Build and Revision
- User-visible selections and constraints
- Current source-safe Compatibility, Budget, Performance, price, and availability summaries
- Explicit task

AI can propose:

- Candidate Products
- Visible filter changes
- Budget alternatives
- Trade-off explanations
- Questions or missing constraints

Applying a proposal requires explicit user selection through the same candidate and save contract.

AI cannot:

- Mutate the Build
- Add hidden constraints
- Acknowledge warnings
- Override Compatibility
- Invent price, stock, or performance
- Share or convert
- Access private history outside the task

AI unavailability does not affect Build persistence or deterministic recalculation.

## Offline behavior

- The last authorized Build projection can remain visible with freshness.
- Uncommitted interaction draft can remain local within bounded policy.
- Authoritative slot, constraint, share, claim, archive, and conversion mutations are not queued generically offline.
- On reconnect, refetch current Revision before offering reapply.
- Price, inventory, Compatibility, and performance shown offline are stale and cannot authorize conversion.

## Degraded behavior

### Catalog unavailable

Preserve saved selections and names from the last confirmed safe projection. New selection and source-dependent conversion block. Do not treat missing Products as removed.

### Compatibility unavailable

Preserve the last confirmed evaluation as stale. Candidate selection requiring a hard check and conversion block. Existing Build remains editable in unaffected fields.

### Pricing unavailable

Build saves; Budget becomes Partial or Unknown. Conversion preview and Cart can recover according to current Pricing policy.

### Inventory unavailable

Build saves; availability becomes Unknown. It does not appear out of stock or available.

### Performance unavailable

Build saves; Performance panel degrades independently.

### Recalculation failure

Identify affected panels, keep Build Revision, retain prior results as stale, allow retry, and prevent stale results from authorizing conversion.

### Share unavailable

Source Build remains usable. Failed creation does not produce a Share link.

## Security and privacy

- Every Build read and mutation verifies owner or Share scope.
- Guest access is session-bound and expiring.
- Share snapshots exclude private context.
- Stable Product identifiers are not sensitive, but Build composition can reveal preferences and receives privacy controls.
- URLs contain only opaque Build or Share references, not components or constraints.
- Build names and user constraints are untrusted content.
- Source snippets, AI context, and Search requests are minimized.
- Support access uses explicit Case association and snapshot policy.
- Admin has no generic Build impersonation or unrestricted exploration.
- Exports and diagnostics are purpose-bound and audited.

## Observability

Measure:

- Build creation, save, resume, archive, claim, duplicate, share, revoke, and conversion
- Guest expiry and claim success or conflict
- ETag conflict by slot and operation
- Candidate evaluation latency and rejection
- Recalculation latency, coalescing, supersession, partial result, and failure
- Compatibility, price, inventory, Budget, and Performance revision skew
- Source-change affected-Build backlog
- Share access, expiry, revocation, and abuse
- Conversion correction and duplicate-prevention rates
- Upgrade migration results
- AI proposal acceptance and correction without making AI authoritative

Trace Build, Revision, Recalculation, source results, Share, Conversion, Cart, and Order with correlation while excluding Share tokens and private free text.

## Quality gates

Before release:

- Test Guided and Expert creation into the same Build Schema.
- Test every slot cardinality, required/optional state, selection, quantity, remove, replace, and incomplete state.
- Prove hard-incompatible candidate policy and preservation of existing selections after rule changes.
- Prove full and dependency-selected recalculation produce equivalent affected results.
- Race-test save, multi-tab, archive, claim, duplicate, share, revoke, and conversion.
- Test guest session loss, local recovery draft, explicit claim, and no email-based auto-claim.
- Verify Budget exact arithmetic and Unknown price behavior.
- Verify Performance version, confidence, unsupported input, and non-comparable behavior.
- Test immutable Share snapshot, current-fact distinction, revocation, expiry, token leakage, and duplication.
- Prove Build-to-Cart is all-or-none and idempotent.
- Verify Order snapshot and Upgrade lineage do not mutate source history.
- Test every individual and combined Catalog, Compatibility, Pricing, Inventory, Performance, AI, and share failure.
- Test Brazilian Portuguese technical labels, units, long names, money, confidence, warnings, and corrections.
- Test keyboard-only selection without drag, screen reader slot relationships, batched recalculation announcements, zoom, focus, mobile panels, and reduced motion.

## Consequences

### Benefits

- Guests and customers receive durable recoverable Builds.
- Strong Revision semantics prevent silent overwrite.
- Deterministic constraints remain authoritative while optional panels degrade.
- Dependency-aware recalculation keeps a complex workspace responsive.
- Immutable shares preserve recipient trust and owner privacy.
- Conversion and Orders retain exact Build provenance.

### Costs and risks

- Guest Build retention and recovery require server capacity and policy.
- Recalculation coordinates several sources and can be partially stale.
- Immutable revisions and Shares add storage.
- Performance estimation requires separate governance and validation.
- Conflict UX must be understandable without collaborative editing.

## References

- [PC Builder Architecture](../02-information-architecture/09-pc-builder.md)
- [PC Builder Workspace Patterns](../04-design-system/20-pc-builder-workspace-patterns.md)
- [State Ownership and Restoration](08-state-ownership-and-restoration.md)
- [Compatibility Engine Architecture](16-compatibility-engine-architecture.md)
- [Pricing, Promotions, Inventory, and Availability](17-pricing-promotions-inventory-and-availability.md)
- [Cart, Checkout, Payments, and Order Creation](18-cart-checkout-payments-and-order-creation.md)
- [ADR-0027: Durable Server Build and Immutable Share Snapshots](../adrs/ADR-0027-durable-server-build-and-immutable-share-snapshots.md)

