# Page Relationships and Domain Ownership

**Status:** Approved in part — relationship graph through System and ownership ledger through Account approved; Admin graph and remaining ledger pending

## Purpose

This document defines the canonical relationship graph and ownership ledger for the approved [Page Inventory](01-page-inventory.md). It exists to expose broken handoffs, navigation dead ends, duplicated authority, unsafe recovery, and unclear operational responsibility before wireframing.

Journey maps remain validation views. They do not replace the canonical graph because pages and relationships may participate in multiple journeys or sit outside Tier 1 customer journeys.

## Decision

Nexora uses a **typed, directed relationship graph** with a companion **ownership ledger**.

Each graph edge declares a source page, relationship type, target page, trigger or condition, context carried, and expected recovery. Each page has exactly one accountable page domain while authoritative data, mutation, approval, and escalation responsibilities remain explicit and may belong to different domains.

## Relationship types

| Type | Meaning |
| --- | --- |
| `leads-to` | Ordinary navigation or continuation to another destination |
| `creates` | Creates a durable object, order, build, conversation, or case |
| `resumes` | Returns to persisted or safely recoverable state |
| `converts-to` | Converts one durable commercial object into another |
| `manages` | An authorized Admin workspace governs an entity |
| `references` | Displays authoritative data without taking ownership |
| `supports` | Provides optional contextual guidance |
| `recovers-to` | Provides a safe recovery destination after interruption or failure |

Relationship types describe architectural intent, not a particular visual control. A link, button, notification, redirect, contextual panel, or system transition may implement an edge later.

## Graph granularity

The canonical graph records **consequential relationships**, not every navigational link.

An edge belongs in the graph when the transition does one or more of the following:

- Changes lifecycle stage
- Creates, resumes, or converts a durable object
- Crosses a product surface or accountable domain
- Transfers meaningful context
- Requires authentication, verification, or permission evaluation
- Initiates a consequential action
- Defines recovery from failure
- Connects customer and Admin views of the same authoritative object

Footer links, breadcrumbs, repeated global navigation, and ordinary related-content links remain governed by the Page Inventory, sitemap, navigation architecture, and later wireframes unless they also meet a consequential criterion.

This threshold keeps the graph focused on context, authority, lifecycle, and recovery. A UI link does not automatically require an edge, and the absence of a routine edge does not prohibit ordinary navigation already allowed by the approved page metadata.

## Edge record

Every consequential edge records:

| Field | Requirement |
| --- | --- |
| Edge ID | Stable identifier independent of labels and routes |
| Source | Approved Page Inventory ID |
| Type | One approved relationship type |
| Target | Approved Page Inventory ID |
| Trigger | User or system condition that activates the relationship |
| Context carried | Minimum meaningful state passed or referenced |
| Context exclusions | Sensitive or irrelevant state that must not cross the boundary |
| Access transition | Authentication, verification, or permission consequence |
| Failure behavior | Host-owned recovery when the transition cannot complete |
| Status | Proposed, Approved, Superseded, or Deprecated |

Embedded experience units do not become graph nodes. Their consequential transitions are recorded against the host page.

## Ownership ledger

Every page records:

| Field | Requirement |
| --- | --- |
| Page ID | Approved Page Inventory ID |
| Accountable page domain | One domain accountable for the destination and its user outcome |
| Supporting domains | Capabilities required to deliver the page |
| Authoritative data owner | Domain or service owning each consequential data object |
| Mutation authority | Domain responsible for validating and applying changes |
| Approval authority | Required owner for governed or high-risk changes |
| Escalation owner | Domain responsible when normal processing cannot complete |
| Provisional dependencies | Responsibilities awaiting later Phase 2B decisions |

Page accountability does not transfer ownership of referenced data. For example:

- Customer Account owns the Order Detail customer experience, while Purchase owns the order record.
- Support owns the Support Case experience and case record, while referenced orders and products remain owned by Purchase and Catalog.
- Admin workspaces govern authoritative resources through their owning services rather than storing parallel copies.
- AI consumes authoritative data and owns neither catalog facts nor deterministic compatibility.

### Shared Compatibility ownership

Compatibility is an independent shared domain under [ADR-0002](../adrs/ADR-0002-shared-compatibility-domain.md).

- Catalog owns governed product attributes and facts used as rule inputs.
- Compatibility owns deterministic rules, evaluations, explanations, versions, and Admin rule-governance pages.
- PC Builder owns build state and the Engineering Workspace.
- Other consuming domains own their page experience but cannot alter compatibility truth.
- AI may explain or supplement guidance but cannot override deterministic results.

### Ledger granularity

The ownership ledger contains one explicit row for each approved Page Inventory ID. Ownership is not inherited implicitly from a page class or product-surface family.

Each row must make exceptions visible, particularly where:

- The page experience and its primary durable object have different owners
- Several domains contribute consequential data or actions
- A customer and Admin page expose the same authoritative object
- Mutation requires another domain’s validation
- Approval or escalation crosses an operational boundary
- A later Phase 2B decision must resolve provisional authority

The ledger will be reviewed in four slices matching the customer relationship graph, followed by Admin pages. Completion requires:

- All 89 approved page IDs exactly once
- Exactly one accountable page domain per page
- Authoritative data ownership for every consequential object
- Mutation authority for every mutable object
- Explicit approval authority or `Not applicable`
- An escalation owner
- Visible provisional dependencies rather than inferred decisions

## Governance rules

1. Every page has at least one valid inbound relationship or a documented deep-link-only justification.
2. Every consequential action has a target, completion outcome, and safe recovery.
3. One edge is recorded once even when multiple journeys use it.
4. Context transfer is minimal, visible when user intent is affected, and subject to the target’s access checks.
5. Authentication and authorization are re-evaluated at the target; graph edges never grant access.
6. `references` never implies mutation or ownership.
7. `supports` remains optional and cannot block the host page’s fast path.
8. `recovers-to` cannot bypass authentication, authorization, or consequential-action safeguards.
9. Admin and customer surfaces reference the same durable objects through authoritative services.
10. New relationship types require explicit approval and an update to this model.

## Validation criteria

The completed graph and ledger must demonstrate:

- No accidental navigation dead ends
- Valid entry and exit paths for every product surface
- Preserved context across Search, Comparison, PC Builder, Cart, Checkout, Orders, and Support
- Safe guest-to-customer and customer-to-workforce boundaries
- No duplicate ownership across Account, Purchase, Support, Catalog, Marketing, AI, and Admin
- Explicit mutation and approval authority for consequential Admin actions
- Recovery paths that preserve intent without duplicating transactions
- Coverage of customer, operational, legal, authentication, and system destinations

## Approved relationship graph

### Slice 1 — Discovery, evaluation, and purchase

The following exclusions apply to every edge in this slice:

- No payment credentials, authentication secrets, unnecessary personal data, or internal-only identifiers cross the boundary.
- URL-carried state is limited to non-sensitive, validated references and inspectable discovery state.
- The target revalidates price, promotion eligibility, inventory, compatibility, authentication, and authorization as applicable.

| Edge | Relationship | Trigger | Context carried | Context excluded | Access transition | Failure behavior | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REL-DP-001 | `STF-001` `leads-to` `DSC-001` | Submit Home search | Query and optional visible intent | Personalization internals | Public; optional customer context is re-evaluated | Remain on Home with actionable search failure or open recoverable Search state | Approved |
| REL-DP-002 | `STF-002` `leads-to` `EVA-001` | Select a deal product | Promotion reference | Assumed eligibility or guaranteed price | Public | Product Detail explains expired, invalid, or changed promotion | Approved |
| REL-DP-003 | `STF-003` `leads-to` `EVA-001` | Select a collection product | Collection reference and result position | Internal merchandising rules | Public | Preserve Collection context and show Product Detail recovery | Approved |
| REL-DP-004 | `STF-004` `leads-to` `EVA-001` | Select a brand product | Brand reference and result position | Internal brand-governance data | Public | Preserve Brand context and show Product Detail recovery | Approved |
| REL-DP-005 | `STF-006` `leads-to` `DSC-002` | Follow guide criteria to products | Guide reference and visible suggested filters | Hidden editorial or AI inference | Public | Category opens without invalid filters and explains omitted criteria | Approved |
| REL-DP-006 | `DSC-001` `leads-to` `EVA-001` | Select a product result | Query, filters, visible intent, and result position | Ranking internals and unrelated result data | Public; optional customer context re-evaluated | Preserve Search state and expose Product Detail recovery | Approved |
| REL-DP-007 | `DSC-002` `leads-to` `EVA-001` | Select a category product | Category, filters, visible intent, and result position | Ranking internals and hidden inference | Public; optional customer context re-evaluated | Preserve Category state and expose Product Detail recovery | Approved |
| REL-DP-008 | `DSC-001` `leads-to` `EVA-002` | Compare selected search results | Product references and Search context | Non-selected results and ranking internals | Public session; authenticated persistence optional | Retain valid products and report invalid comparison members | Approved |
| REL-DP-009 | `DSC-002` `leads-to` `EVA-002` | Compare selected category products | Product references and Category context | Non-selected results and hidden intent | Public session; authenticated persistence optional | Retain valid products and report invalid comparison members | Approved |
| REL-DP-010 | `EVA-001` `leads-to` `EVA-002` | Add product to comparison | Product reference and evaluation origin | Unselected variant or private recommendation internals | Public session; authenticated persistence optional | Remain on Product Detail and preserve existing comparison set | Approved |
| REL-DP-011 | `EVA-002` `leads-to` `EVA-001` | Inspect or select compared product | Product reference and retained comparison set | AI chain-of-thought and unrelated products | Public session; authenticated persistence optional | Preserve Comparison and report unavailable product | Approved |
| REL-DP-012 | `EVA-001` `leads-to` `PUR-001` | Add product to Cart | Product, selected variant, quantity, and offer reference | Stale displayed price and recommendation internals | Public session; authenticated Cart merge optional | Remain on Product Detail with inventory, variant, price, or compatibility correction | Approved |
| REL-DP-013 | `EVA-002` `leads-to` `PUR-001` | Choose compared product for purchase | Product, valid variant, quantity, and offer reference | Other compared products and AI internals | Public session; authenticated Cart merge optional | Preserve Comparison and explain purchase constraint | Approved |
| REL-DP-014 | `PUR-001` `leads-to` `PUR-002` | Proceed to Checkout | Valid Cart reference, items, compatibility summary, eligible promotions, and calculated totals | Payment credentials and unvalidated client totals | Guest or customer; Checkout establishes required assurance | Remain on Cart with item-level correction and no transaction attempt | Approved |
| REL-DP-015 | `PUR-002` `creates` `PUR-003` | Successful idempotent order placement | New order reference and non-sensitive outcome | Payment credentials, fraud signals, and internal transaction details | Transaction-bound guest or customer access | Remain in Checkout with safe retry or pending status until an order exists | Approved |
| REL-DP-016 | `PUR-002` `recovers-to` `PUR-001` | Checkout detects a Cart-level correction | Affected items and reason category | Payment credentials and unrelated checkout data | Preserve guest or customer Cart ownership | Return to Cart with corrections highlighted and no duplicate order | Approved |
| REL-DP-017 | `PUR-003` `resumes` `ACC-003` | Open persistent Order Detail | Order reference | Confirmation token after exchange and sensitive payment data | Authenticated owner or securely verified guest path | Route to verification, Sign In, or safe confirmation recovery without exposing order data | Approved |
| REL-DP-018 | `PUR-003` `leads-to` `STF-001` | Continue shopping after confirmation | Completed-order continuation signal only | Order contents, payment data, and personal data | Public with optional authenticated context | Open Home without order context if continuation data is unavailable | Approved |

### Slice 1 invariants

- Query, filter, intent, comparison, and Cart state remain inspectable and clearable.
- Returning from Product Detail preserves meaningful Search, Category, Collection, Brand, or Comparison context.
- Promotion context never guarantees eligibility or price.
- Failed order creation remains in Checkout with idempotent recovery.
- Order Confirmation is reached only after an order exists.
- Graph edges do not bypass host-owned validation or state handling.

### Slice 2 — Account, PC Builder, AI, and Support

The following exclusions apply throughout this slice:

- Account, notification, build, conversation, and case references never grant access.
- Payment credentials, authentication secrets, private AI reasoning, internal case notes, and unrelated customer data do not cross boundaries.
- Referenced price, availability, compatibility, warranty, return, and order state is revalidated by its authoritative service.

| Edge | Relationship | Trigger | Context carried | Context excluded | Access transition | Failure behavior | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REL-CX-001 | `ACC-001` `resumes` `ACC-002` | Open order activity | Current order filter or reference | Unrelated dashboard data | Authenticated customer; Orders rechecks ownership | Return to Dashboard with unavailable activity notice | Approved |
| REL-CX-002 | `ACC-001` `resumes` `PCB-003` | Open saved or recent builds | Owned build collection context | Build internals not needed by the list | Authenticated customer | Return to Dashboard with build-service recovery | Approved |
| REL-CX-003 | `ACC-001` `resumes` `SUP-006` | Open active support activity | Active-case filter | Internal queue and agent data | Authenticated customer | Return to Dashboard with case-service recovery | Approved |
| REL-CX-004 | `ACC-004` `leads-to` `EVA-001` | Open saved product | Product reference | Wishlist metadata unrelated to evaluation | Authenticated source; Product Detail remains public | Preserve Wishlist and show product recovery | Approved |
| REL-CX-005 | `ACC-004` `leads-to` `EVA-002` | Compare selected saved products | Product references | Wishlist notes and unavailable selections | Authenticated source; Comparison uses permitted session state | Retain valid products and explain rejected members | Approved |
| REL-CX-006 | `ACC-004` `leads-to` `PUR-001` | Add saved product to Cart | Product, chosen variant, quantity, and offer reference | Stale price and private Wishlist metadata | Authenticated Cart | Preserve Wishlist and explain validation failure | Approved |
| REL-CX-007 | `ACC-007` `resumes` `ACC-003` | Open order notification | Order reference and event category | Message-delivery metadata | Authenticated customer; Order Detail rechecks ownership | Mark target unavailable without exposing order data | Approved |
| REL-CX-008 | `ACC-007` `resumes` `PCB-002` | Open build notification | Build reference and event category | Message-delivery metadata | Authenticated owner; Workspace rechecks ownership | Preserve notification and show build recovery | Approved |
| REL-CX-009 | `ACC-007` `resumes` `SUP-007` | Open case notification | Case reference and event category | Internal note or routing data | Authenticated or securely verified participant | Preserve notification and show safe case recovery | Approved |
| REL-CX-010 | `ACC-003` `creates` `SUP-007` | Submit order-linked issue | Verified order, item, issue type, and customer submission | Payment credentials and unrelated order data | Authenticated owner or securely verified guest; case creation rechecks eligibility | Remain on Order Detail with duplicate warning or recoverable submission | Approved |
| REL-CX-011 | `ACC-003` `resumes` `PCB-002` | Start upgrade from purchased build | Purchased build reference and user-confirmed copy intent | Immutable original order state | Authenticated owner; creates or opens an owned working copy | Remain on Order Detail if build cannot be reconstructed | Approved |
| REL-CX-012 | `PCB-001` `creates` `PCB-002` | Confirm Guided or Expert initialization | Visible constraints, budget, goals, and initial selections | Hidden inference and unrelated profile data | Guest draft or authenticated owner established by Workspace | Remain on Start with correctable initialization error | Approved |
| REL-CX-013 | `PCB-003` `resumes` `PCB-002` | Open saved build | Owned build reference | Other builds and list-only metadata | Authenticated owner; Workspace rechecks ownership | Remain on Saved Builds with unavailable-build recovery | Approved |
| REL-CX-014 | `PCB-002` `creates` `PCB-004` | Confirm sharing | Governed read-only snapshot and share policy | Owner identity beyond approved attribution and private history | Owner must be authorized; recipient receives only share scope | Remain in Workspace with share creation or policy error | Approved |
| REL-CX-015 | `PCB-004` `creates` `PCB-002` | Confirm duplicate | Shared component snapshot and visible constraints | Source ownership, private history, and edit authority | Guest draft or authenticated new owner; source remains immutable | Remain on Shared Build with duplication recovery | Approved |
| REL-CX-016 | `PCB-002` `converts-to` `PUR-001` | Convert build to Cart | Component references, quantities, compatibility summary, and build reference | AI reasoning and stale price or stock | Guest or customer Cart; every component revalidated | Remain in Workspace with item-level correction and no partial Cart mutation | Approved |
| REL-CX-017 | `DSC-001` `supports` `AIS-001` | Request AI help from Search | Visible query, filters, intent, and selected results | Ranking internals and unselected personal history | Guest or customer Assistant context | Keep Search usable if AI is unavailable or context rejected | Approved |
| REL-CX-018 | `DSC-002` `supports` `AIS-001` | Request AI help from Category | Category, visible intent, filters, and selected products | Hidden ranking or inferred intent | Guest or customer Assistant context | Keep Category usable if AI is unavailable or context rejected | Approved |
| REL-CX-019 | `EVA-001` `supports` `AIS-001` | Request product guidance | Product and selected variant | Private review signals and hidden recommendation data | Guest or customer Assistant context | Keep Product Detail usable if AI is unavailable | Approved |
| REL-CX-020 | `EVA-002` `supports` `AIS-001` | Request comparison guidance | Comparison set and selected criteria | Private scoring internals | Guest or customer Assistant context | Keep Comparison usable and preserve its set | Approved |
| REL-CX-021 | `PCB-002` `supports` `AIS-001` | Request engineering guidance | Build constraints, components, warnings, and budget | Compatibility engine internals and private history | Guest draft or authenticated owner context | Keep Workspace usable; deterministic validation remains authoritative | Approved |
| REL-CX-022 | `PUR-002` `supports` `AIS-001` | Request checkout guidance | Non-sensitive section and eligible-option context | Contact details, addresses, payment data, fraud signals, and credentials | Same guest or customer session with minimized context | Keep Checkout usable and preserve sensitive state locally | Approved |
| REL-CX-023 | `AIS-001` `leads-to` `EVA-001` | User selects recommendation | Product reference, visible rationale, and relevant stated requirement | Private reasoning and unrelated conversation | Product Detail independently validates public access | Preserve conversation and explain unavailable recommendation | Approved |
| REL-CX-024 | `AIS-001` `leads-to` `EVA-002` | User confirms recommendation set | Product references and visible comparison criteria | Private reasoning and unrelated conversation | Comparison session or authenticated persistence | Preserve conversation and retain only valid products | Approved |
| REL-CX-025 | `AIS-001` `leads-to` `PCB-001` | User confirms Builder handoff | Visible requirements, budget, and goals as initialization suggestions | Hidden inference and conversation content outside the task | Guest or customer; Builder makes effects inspectable | Preserve conversation and open Builder without rejected constraints | Approved |
| REL-CX-026 | `SUP-003` `creates` `SUP-007` | Submit eligible return | Verified order, item, return intent, evidence, and logistics data | Payment credentials and unrelated order data | Authenticated owner or securely verified participant | Remain on Returns Hub with duplicate warning or recoverable submission | Approved |
| REL-CX-027 | `SUP-004` `creates` `SUP-007` | Submit eligible warranty or repair claim | Verified product, coverage context, issue, and evidence | Unrelated customer and product data | Authenticated owner or securely verified participant | Remain on Warranty Hub with coverage or submission recovery | Approved |
| REL-CX-028 | `SUP-005` `creates` `SUP-007` | Submit triaged request | Issue type, relevant verified references, channel choice, and submission | Unrelated profile data and internal routing rules | Authentication or verification applied before sensitive creation | Remain on Case Start with duplicate warning or recoverable submission | Approved |
| REL-CX-029 | `SUP-006` `resumes` `SUP-007` | Open owned case | Authorized case reference | Other cases and internal routing data | Authenticated customer; Case Detail rechecks participation | Remain on My Cases with safe unavailable-case state | Approved |
| REL-CX-030 | `SUP-007` `references` `ACC-003` | Inspect associated order context | Order reference and permitted customer-visible fields | Payment credentials, fraud data, and internal order notes | Verified case participant; Order Detail independently authorizes access | Keep case usable with order context marked unavailable | Approved |
| REL-CX-031 | `SUP-007` `references` `EVA-001` | Inspect associated product | Product reference | Internal catalog governance data | Public active product or governed recovery | Keep case usable with product snapshot and unavailable notice | Approved |
| REL-CX-032 | `SUP-007` `references` `PCB-002` | Inspect associated build | Build reference and permitted snapshot | Private build history and edit authority | Authenticated owner or explicitly governed snapshot access | Keep case usable with build context marked unavailable | Approved |

### Slice 2 invariants

- Dashboard and notification edges never bypass target authorization.
- Wishlist price and availability are always revalidated.
- Upgrade-later preserves the purchased build and works on an owned copy.
- Shared Build duplication never changes the source.
- Build-to-Cart revalidates every component and blocks hard incompatibilities.
- AI context is visible, removable, minimal, and excludes payment or credential data.
- AI recommendations require user confirmation before comparison or Builder initialization.
- Support cases reference authoritative orders, products, and builds rather than copying ownership.
- Case creation is idempotent and warns about likely duplicates.

### Slice 3 — Authentication, legal, and system recovery

The following rules apply throughout this slice:

- Return references are allowlisted, short-lived, non-sensitive, and independently validated.
- Authentication and verification responses do not reveal identity or protected-resource existence.
- A policy reference resolves to the applicable version when consequential consent or terms depend on it.
- System recovery never automatically retries consequential mutations.

| Edge | Relationship | Trigger | Context carried | Context excluded | Access transition | Failure behavior | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| REL-AS-001 | `ACC-001` `recovers-to` `AUT-001` | Request Account without a valid session | Validated Account return reference | Account data and identity existence | Guest to authentication | Safe storefront fallback if return expires | Approved |
| REL-AS-002 | `ACC-008` `recovers-to` `AUT-006` | Start sensitive setting action | Action category and validated return reference | Setting value and credentials | Customer session to stronger assurance | Preserve unsaved non-sensitive intent or require restart | Approved |
| REL-AS-003 | `PCB-002` `recovers-to` `AUT-001` | Persist guest build | Build return reference and local draft handle | Components in authentication URL and private draft data | Guest to authenticated customer | Preserve local draft and resume only after ownership establishment | Approved |
| REL-AS-004 | `AIS-001` `recovers-to` `AUT-001` | Persist guest conversation | Conversation return reference | Conversation content and model internals | Guest to authenticated customer | Keep guest session available or explain persistence limit | Approved |
| REL-AS-005 | `SUP-006` `recovers-to` `AUT-001` | Request personal case history | Validated case-list return reference | Case existence and customer data | Guest to authenticated customer | Safe Support fallback if authentication fails | Approved |
| REL-AS-006 | `SUP-007` `recovers-to` `AUT-005` | Guest case access requires verification | Case-scoped verification reference | Case content and participant identity | Unverified participant to verified case scope | Keep case undisclosed and route to safe Support recovery | Approved |
| REL-AS-007 | `AUT-001` `leads-to` `AUT-005` | Sign-in requires factor verification | Expiring verification reference and validated final return | Credential and identity detail | Partial authentication to verified factor | Return to Sign In or governed recovery | Approved |
| REL-AS-008 | `AUT-001` `leads-to` `AUT-006` | Sign-in requires stronger assurance | Expiring challenge reference and validated final return | Credential, risk signals, and factor secrets | Partial authentication to stronger assurance | Return to Sign In or Account Recovery | Approved |
| REL-AS-009 | `AUT-002` `leads-to` `AUT-005` | Registration requires verification | New-identity verification reference and validated return | Registration secrets and duplicate-identity signals | Pending identity to verified identity | Neutral resend, retry, or safe registration recovery | Approved |
| REL-AS-010 | `AUT-003` `leads-to` `AUT-005` | Recovery requires factor verification | Recovery-scoped verification reference | Identity existence and recovery evidence | Unverified requester to verified recovery scope | Neutral recovery response or Support escalation | Approved |
| REL-AS-011 | `AUT-003` `leads-to` `AUT-004` | Open valid recovery link | Expiring recovery reference | Identity data and recovery proof | Verified recovery context | Return to Account Recovery on invalid or expired reference | Approved |
| REL-AS-012 | `AUT-005` `resumes` `AUT-004` | Recovery verification succeeds | Verified recovery reference | Verification secret and identity detail | Verified factor to credential-reset scope | Return to Account Recovery if reset context cannot be established | Approved |
| REL-AS-013 | `AUT-005` `resumes` `PUR-002` | Checkout verification succeeds | Validated Checkout return reference and assurance result | Contact, address, payment, and order data | Verified participant to Checkout session | Safe Cart recovery if Checkout context expired | Approved |
| REL-AS-014 | `AUT-006` `resumes` `ACC-008` | Step-up succeeds | Validated setting action return and assurance result | Challenge secret and setting value | Stronger assurance to sensitive Account action | Require action restart if context expired | Approved |
| REL-AS-015 | `AUT-006` `resumes` `PUR-002` | Purchase challenge succeeds | Validated Checkout return and assurance result | Payment data, fraud signals, and credentials | Stronger assurance to Checkout session | Safe Cart or Checkout recovery without transaction retry | Approved |
| REL-AS-016 | `AUT-006` `resumes` `SUP-007` | Sensitive case challenge succeeds | Case return reference and assurance result | Case content and challenge secret | Stronger assurance to authorized case scope | Keep case undisclosed and use Support recovery | Approved |
| REL-AS-017 | `AUT-002` `references` `LEG-002` | Show registration terms | Applicable Terms version reference | Registration form data | Public policy access | Keep registration usable with explicit policy retrieval error handling | Approved |
| REL-AS-018 | `AUT-002` `references` `LEG-003` | Show registration privacy notice | Applicable Privacy version reference | Registration form data | Public policy access | Keep registration state and provide policy retrieval recovery | Approved |
| REL-AS-019 | `PUR-002` `references` `LEG-006` | Review delivery conditions | Applicable Delivery Policy version | Address details and delivery selection | Public policy access without Checkout state transfer | Preserve Checkout while policy opens or report retrieval failure | Approved |
| REL-AS-020 | `PUR-002` `references` `LEG-007` | Review return conditions | Applicable Returns Policy version | Cart, address, and payment data | Public policy access | Preserve Checkout while policy opens or report retrieval failure | Approved |
| REL-AS-021 | `PUR-002` `references` `LEG-008` | Review warranty conditions | Applicable Warranty Policy version | Cart, address, and payment data | Public policy access | Preserve Checkout while policy opens or report retrieval failure | Approved |
| REL-AS-022 | `PUR-002` `references` `LEG-009` | Select or review financing | Applicable financing terms and provider version | Financial application data and eligibility signals | Public applicable-terms access; provider scope separately governed | Disable financing selection if authoritative terms are unavailable | Approved |
| REL-AS-023 | `ACC-008` `references` `LEG-003` | Inspect privacy rights or controls | Current and applicable Privacy version | Account settings and personal data | Authenticated source to public policy | Preserve Settings and expose rights-request recovery | Approved |
| REL-AS-024 | `ACC-008` `references` `LEG-004` | Inspect cookie choices | Current Cookie Notice version | Account settings and tracking state | Authenticated source to public policy | Preserve Settings and report control-service failure | Approved |
| REL-AS-025 | `SUP-003` `references` `LEG-007` | Explain return eligibility | Applicable Returns Policy version | Order details and case draft | Public policy access | Keep Support context and flag policy retrieval failure | Approved |
| REL-AS-026 | `SUP-004` `references` `LEG-008` | Explain coverage | Applicable Warranty Policy version | Product evidence and case draft | Public policy access | Keep Support context and flag policy retrieval failure | Approved |
| REL-AS-027 | `SYS-001` `recovers-to` `STF-001` | Choose storefront fallback | No context beyond safe locale or theme | Unknown route contents and sensitive query data | Public | Home opens without unsafe context | Approved |
| REL-AS-028 | `SYS-001` `recovers-to` `DSC-001` | Search for intended destination | User-entered recovery query only | Unknown route contents and inferred protected resource | Public | Remain on Not Found with actionable search failure | Approved |
| REL-AS-029 | `SYS-002` `recovers-to` `AUT-001` | Access may be remediated by authentication | Validated non-sensitive return reference | Protected resource detail and permission model | Guest or wrong session to authentication | Safe surface fallback when access remains denied | Approved |
| REL-AS-030 | `SYS-003` `recovers-to` `STF-001` | Choose safe customer fallback | Non-sensitive correlation reference only when useful | Error internals and failed mutation payload | Public | Remain on error page with Support path | Approved |
| REL-AS-031 | `SYS-003` `recovers-to` `ADM-001` | Choose safe Admin fallback | Non-sensitive correlation reference | Error internals, restricted navigation, and mutation payload | Workforce session; Overview independently authorizes modules | Remain on error page with governed incident path | Approved |
| REL-AS-032 | `SYS-004` `recovers-to` `SUP-001` | Support remains available during degradation | Public service-impact category | Internal topology, security data, and unverified restoration time | Public or customer session as available | Remain on Service Unavailable with authoritative status guidance | Approved |
| REL-AS-033 | `SYS-005` `recovers-to` `STF-001` | Connectivity restored and user chooses fallback | Safe locale, theme, and reconnection result | Pending mutations and stale sensitive data | Public with optional re-established session | Remain Offline and preserve local work when reconnection fails | Approved |

### Slice 3 invariants

- Failed authentication preserves safe task context without preserving secrets.
- Contextual policy summaries never replace authoritative documents.
- Financing Terms are referenced only when financing is available and applicable.
- System recovery never retries orders, payments, refunds, access changes, or Admin mutations.
- Admin recovery does not disclose restricted navigation or resource existence.
- Host-owned states remain preferred whenever the original page can still serve the user.

## Approved ownership ledger

`Not applicable` means no separate human approval beyond normal validation by the authoritative domain. It does not remove authentication, authorization, audit, or business-rule enforcement.

### Ledger Slice 1 — Storefront, Discovery, Evaluation, Purchase, and Account

| Page | Accountable page domain | Supporting domains | Authoritative data owner | Mutation authority | Approval authority | Escalation owner | Provisional dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| STF-001 | Marketing | Discovery, Catalog, Customer, AI, PC Builder | Each source domain for its module | Marketing for composition; source owner for data | Marketing | Marketing | Personalization and module-governance detail |
| STF-002 | Marketing | Catalog, Pricing, Inventory, Discovery | Marketing for promotion; Catalog, Pricing, and Inventory for commercial facts | Respective source owner | Marketing and Pricing for applicable changes | Marketing | Promotion approval workflow |
| STF-003 | Marketing | Catalog, Pricing, Inventory, Discovery | Marketing for collection; source owners for product facts | Marketing for membership and content; source owners for facts | Marketing | Marketing | Scheduling and approval workflow |
| STF-004 | Catalog | Marketing, Discovery, Pricing, Inventory | Catalog for brand and products; Marketing for delegated public content | Catalog; Marketing for delegated content | Catalog | Catalog | Brand merge and content delegation |
| STF-005 | Marketing | Catalog, Support, Discovery | Marketing for guide index; source owners for references | Marketing | Marketing | Marketing | Editorial review and localization |
| STF-006 | Marketing | Catalog, Support, Discovery, AI | Marketing for content; source owners for referenced facts | Marketing; source owner corrects facts | Marketing and specialist review when required | Marketing | Specialist-review triggers |
| STF-007 | Marketing | Catalog, Pricing, Inventory, Discovery | Marketing for campaign; source owners for offers and products | Marketing; source owners validate commercial facts | Marketing plus affected commercial owner | Marketing | Campaign review, indexing, and expiry |
| DSC-001 | Discovery | Catalog, Marketing, Support, PC Builder, AI, Pricing, Inventory | Discovery for index and ranking; result-source domains for entities | Discovery for search configuration; source owners for entities | Discovery for governed ranking changes | Discovery | Ranking approval and authenticated personal search |
| DSC-002 | Discovery | Catalog, Marketing, Pricing, Inventory, Compatibility, AI | Catalog for taxonomy and attributes; Discovery for ranking and state; specialist source owners | Catalog for taxonomy; Discovery for presentation and ranking; source owners for facts | Catalog for taxonomy; Discovery for ranking | Discovery | Intent-ranking governance |
| EVA-001 | Catalog | Pricing, Inventory, Reviews, Compatibility, Marketing, Purchase, Discovery, AI | Catalog, Pricing, Inventory, Reviews, and Compatibility for their facts | Each authoritative owner | Catalog publication; specialist owners for governed facts | Catalog | Review, financing, and warranty governance |
| EVA-002 | Catalog | Discovery, Pricing, Inventory, Reviews, Compatibility, AI, Customer | Source domains for compared facts; Customer for saved comparison state | Source owners; Customer for persistence | Not applicable | Catalog | Comparison persistence and share controls |
| PUR-001 | Purchase | Catalog, Pricing, Inventory, Promotions, Compatibility, Customer, AI | Purchase for Cart; source domains for commercial facts | Purchase with source-domain validation | Not applicable | Purchase | Cart merge and promotion governance |
| PUR-002 | Purchase | Customer, Inventory, Pricing, Promotions, Payments, Delivery, Compatibility, Notifications, AI | Purchase for Checkout and order intent; specialist domains for payment, delivery, and facts | Purchase coordinates; specialist domains apply mutations | Payment or financing authority when required | Purchase | Financing, payment, delivery, and assurance rules |
| PUR-003 | Purchase | Customer, Payments, Delivery, Notifications, Compatibility, Support | Purchase for order outcome; Notifications for delivery | Purchase; Notifications for message delivery | Not applicable | Purchase | Guest-order access and pending-payment handling |
| ACC-001 | Customer | Purchase, Support, PC Builder, Discovery, Notifications | Customer for profile and composition; source domains for summaries | Source owner for each object | Not applicable | Customer | Personalization and prioritization |
| ACC-002 | Customer | Purchase, Delivery, Payments, Support | Purchase for orders; specialist domains for their statuses | Purchase and relevant specialist owner | Not applicable | Customer, escalating order faults to Purchase | Guest-order consolidation and retention |
| ACC-003 | Customer | Purchase, Delivery, Payments, Support, Compatibility, PC Builder, Notifications | Purchase for order; specialist domains for payment, delivery, cases, and builds | Relevant authoritative owner | Governed owner for cancellation, refund, or other consequential action | Customer, routing operational faults | Cancellation, refund, guest access, and case eligibility |
| ACC-004 | Customer | Catalog, Pricing, Inventory, Discovery, Purchase | Customer for Wishlist; source domains for product facts | Customer for Wishlist; source owners for facts | Not applicable | Customer | Pre-authentication merge and retention |
| ACC-005 | Customer | Delivery, Purchase | Customer for address records; Delivery for validation rules | Customer with Delivery validation | Not applicable | Customer | Address assurance and supported-area rules |
| ACC-006 | Customer | Payments, Purchase, Security | Payments for instrument tokens; Customer for labels and default | Payments for instruments; Customer for preferences | Payments and Security rules | Customer, escalating provider faults | Provider controls, assurance, and deletion constraints |
| ACC-007 | Customer | Notifications, Purchase, Delivery, Support, Marketing, PC Builder | Notifications for records; source domains for triggering events | Notifications for delivery and read state; source owner for event | Not applicable | Customer | Channel policy, retention, and notification preferences |
| ACC-008 | Customer | Customer Authentication, Notifications, Legal, Support | Customer for profile and preferences; Authentication, Notifications, and Legal for governed controls | Owner of each setting | Strong assurance or Legal workflow where applicable | Customer | Privacy workflows, closure, export, and assurance levels |

### Ledger Slice 2 — PC Builder, AI, Support, and Authentication

| Page | Accountable page domain | Supporting domains | Authoritative data owner | Mutation authority | Approval authority | Escalation owner | Provisional dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PCB-001 | PC Builder | Catalog, Compatibility, Customer, AI, Pricing, Inventory | PC Builder for initialization; source owners for product facts | PC Builder | Not applicable | PC Builder | Guest draft persistence and initialization constraints |
| PCB-002 | PC Builder | Compatibility, Catalog, Pricing, Inventory, Customer, Purchase, AI | PC Builder for build; Compatibility for rules; Catalog, Pricing, and Inventory for facts | PC Builder for build; source owners for facts | Compatibility owner for rule changes | PC Builder | Save conflicts, performance model, ownership, and collaboration |
| PCB-003 | PC Builder | Customer, Compatibility, Catalog, Pricing, Inventory | PC Builder for builds; Customer for ownership relationship | PC Builder | Not applicable | PC Builder | Retention, archive, and authenticated personal search |
| PCB-004 | PC Builder | Compatibility, Catalog, Pricing, Inventory, Customer, AI | PC Builder for share snapshot and access policy; source owners for current facts | PC Builder | Not applicable | PC Builder | Share expiry, revocation, attribution, and abuse controls |
| AIS-001 | AI | Discovery, Catalog, Compatibility, Pricing, Inventory, Customer, PC Builder, Purchase, Marketing, Support | AI for conversation; source domains for referenced facts | AI for conversation; source owners for facts | Not applicable for suggestions | AI | Retention, deletion, guest persistence, privacy, and sharing |
| SUP-001 | Support | Discovery, Customer, Purchase, Catalog, PC Builder, AI, Notifications | Support for routing and content; source owners for summaries | Support | Support | Support | Case continuation, AI scope, and channel availability |
| SUP-002 | Support | Catalog, Purchase, Customer, Legal, Discovery, AI | Support for article; source owners for referenced facts and policies | Support; source owner corrects authoritative fact | Support plus specialist review when required | Support | Review triggers, localization, and policy synchronization |
| SUP-003 | Support | Customer, Purchase, Delivery, Payments, Inventory, Legal, Notifications | Support for guidance and created case; Legal for policy; Purchase for order | Support for guidance and case; source owners for facts | Support eligibility and refund authority | Support | Eligibility, refund authority, logistics, and guest verification |
| SUP-004 | Support | Customer, Purchase, Catalog, Legal, Notifications, repair operations | Support for guidance and case; Legal for policy; Catalog for product | Support for guidance and case; source owners for facts | Warranty and repair authority | Support | Coverage rules, evidence, provider access, and remedies |
| SUP-005 | Support | Customer, Purchase, Catalog, PC Builder, AI, Customer Authentication, Notifications | Support for triage and created case; source owners for context | Support | Support routing rules | Support | Channel rules, duplicate detection, and verification |
| SUP-006 | Support | Customer, Purchase, Notifications, Customer Authentication | Support for cases; Customer for participant relationship | Support for case state | Not applicable | Support | Retention, archive, and authenticated personal search |
| SUP-007 | Support | Customer, Purchase, Delivery, Payments, Catalog, Inventory, Notifications, Customer Authentication, PC Builder | Support for case; source owners for referenced order, product, build, payment, and delivery data | Support for case; source owners for referenced objects | Specialized remedy owner by case type | Support | Status model, service levels, escalation, remedy authority, and provider access |
| AUT-001 | Customer Authentication | Customer, Security, Legal, initiating domains | Customer Authentication for session and identity methods | Customer Authentication | Security policy | Customer Authentication | Identity methods, session duration, providers, and abuse controls |
| AUT-002 | Customer Authentication | Customer, Legal, Notifications, Security | Customer Authentication for identity; Legal for consent requirements and records | Customer Authentication; Legal for consent rules | Security and Legal where applicable | Customer Authentication | Required fields, consent versions, verification, and duplicate handling |
| AUT-003 | Customer Authentication | Security, Customer, Notifications, Legal, Support | Customer Authentication for recovery context; Security for assurance policy | Customer Authentication | Security policy | Customer Authentication | Recovery factors, anti-enumeration, rate limits, and escalation |
| AUT-004 | Customer Authentication | Security, Customer, Notifications, Legal | Customer Authentication for verified recovery and credential | Customer Authentication | Security policy | Customer Authentication | Credential policy, session revocation, and assurance |
| AUT-005 | Customer Authentication | Security, Customer, Notifications, initiating domain | Customer Authentication for verification context and factor state | Customer Authentication | Security policy or initiating-domain requirement | Customer Authentication | Factor types, expiry, resend, and initiating-domain assurance |
| AUT-006 | Customer Authentication | Security and initiating domain | Customer Authentication for challenge and session assurance; initiating domain for action | Customer Authentication for assurance; initiating domain for action | Security policy and initiating domain | Customer Authentication | Challenge methods, trusted devices, recovery, and action-specific assurance |

### Ledger Slice 3 — Legal, Informational, and System

| Page | Accountable page domain | Supporting domains | Authoritative data owner | Mutation authority | Approval authority | Escalation owner | Provisional dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| INF-001 | Marketing | Legal, Support | Marketing for company content; Legal for regulated claims | Marketing; Legal corrects regulated claims | Marketing and Legal where applicable | Marketing | Regulated-claim review and responsible contact ownership |
| LEG-001 | Legal | Marketing, Support, Customer, Purchase | Legal for policy index and publication status | Legal | Legal | Legal | Prior-version access and jurisdictional variants |
| LEG-002 | Legal | Customer Authentication, Customer, Purchase, AI, PC Builder, Support | Legal for Terms versions | Legal | Legal | Legal | Consent linkage, localization, and prior-version retention |
| LEG-003 | Legal | Security, Customer, Customer Authentication, AI, Marketing, Support, Admin | Legal for Privacy versions; control owners for linked functionality | Legal for notice; control owner for functionality | Legal and privacy authority | Legal | Privacy authority, rights workflows, retention, and localization |
| LEG-004 | Legal | Marketing, Security, Customer, consent service | Legal for Cookie Notice; Customer or consent service for choices | Legal for notice; consent owner for controls | Legal and privacy authority | Legal | Consent service, category model, and jurisdictional variants |
| LEG-005 | Legal | Design, Engineering, Product, Support | Legal for statement; responsible domains for conformance evidence | Legal for statement; responsible domain fixes barriers | Legal and accessibility owner | Legal, routing barriers to responsible domain | Standard target, audit method, and accessibility ownership |
| LEG-006 | Legal | Purchase, Delivery, Support, Customer | Legal for Delivery Policy; Delivery for operational facts | Legal for policy; Delivery corrects operational facts | Legal and Delivery | Legal | Service areas, exception ownership, and policy-version applicability |
| LEG-007 | Legal | Support, Purchase, Payments, Delivery, Customer | Legal for Returns and Refund Policy; operational domains for facts | Legal for policy; Support and Purchase correct guidance and processes | Legal and applicable remedy authority | Legal | Remedy authority, windows, logistics, and refund governance |
| LEG-008 | Legal | Support, Catalog, Purchase, Customer, repair operations | Legal for Warranty Policy; Support and Catalog for operational and product facts | Legal for policy; source owners correct guidance and facts | Legal and warranty authority | Legal | Warranty authority, provider governance, evidence, and remedies |
| LEG-009 | Legal | Purchase, Payments, Customer, financing providers | Legal for Nexora Financing Terms; provider for provider-specific terms | Legal for Nexora document; provider owns provider terms | Legal and financing authority | Legal | Provider governance, applicability, localization, and launch condition |
| SYS-001 | Platform | Discovery, Marketing, Catalog, Support, originating domain | Platform for routing; source domain for known successor | Platform; source owner declares successor | Not applicable | Platform | Retired-route registry and successor governance |
| SYS-002 | Platform Security | Customer Authentication, Customer, Admin, Support, protected domain | Platform Security for authorization policy; protected domain for resource rules | Security and protected domain | Security policy | Platform Security | Workforce/customer distinction, remediation, and support path |
| SYS-003 | Platform | Observability, Security, Support, failed domain | Platform for error handling; failed domain for underlying capability | Platform for recovery; failed domain fixes cause | Not applicable | Platform, routing to failed domain | Correlation references, incident linkage, and safe retry classification |
| SYS-004 | Platform Operations | Communications, Support, Security, affected domains | Platform Operations for service state; affected domains for impact | Platform Operations; Communications for public message | Incident commander or operations authority | Platform Operations | Incident command, message approval, and status-resource integration |
| SYS-005 | Platform | Current surface, Customer | Platform for connectivity and local recovery state | Platform | Not applicable | Platform | Cache policy, local persistence, and mutation reconciliation |

### Ledger Slice 4A — Administrative Dashboard: Operations

| Page | Accountable page domain | Supporting domains | Authoritative data owner | Mutation authority | Approval authority | Escalation owner | Provisional dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ADM-001 | Admin Platform | Catalog, Inventory, Pricing, Purchase, Support, Marketing, Platform Operations | Each source domain for operational data; Admin Platform for composition | Source domain for each object; Admin Platform for dashboard configuration | Not applicable | Admin Platform | Alert ownership, metric definitions, and module permissions |
| ADM-002 | Catalog | Inventory, Pricing, Marketing, Compatibility, Admin Platform | Catalog for products; source domains for related facts | Catalog for product lifecycle; source owners for facts | Catalog | Catalog | Bulk-action limits, exports, and approval states |
| ADM-003 | Catalog | Inventory, Pricing, Marketing, Compatibility, Reviews, Admin Platform | Catalog for product; source domains for linked facts | Catalog for product; source owners for their records | Catalog publication; specialist review where required | Catalog | Publication workflow, field permissions, and concurrent editing |
| ADM-004 | Catalog | Discovery, Marketing, Compatibility, Admin Platform | Catalog for canonical category hierarchy | Catalog | Catalog; new top-level category requires ADR | Catalog | Bulk moves, impact analysis, and retirement |
| ADM-005 | Catalog | Discovery, Marketing, Compatibility, Admin Platform | Catalog for category and hierarchy | Catalog | Catalog; new top-level category requires ADR | Catalog | Approval workflow, product reassignment, and preview |
| ADM-006 | Catalog | Marketing, Discovery, Admin Platform | Catalog for brands; Marketing for delegated public content | Catalog; Marketing for delegated content | Catalog | Catalog | Merge authority, duplicate detection, and delegated fields |
| ADM-007 | Catalog | Marketing, Discovery, Admin Platform | Catalog for brand identity and relationships; Marketing for delegated content | Catalog; Marketing for delegated content | Catalog | Catalog | Merge workflow, retirement, and public-content approval |
| ADM-008 | Catalog | Discovery, Compatibility, Admin Platform | Catalog for attribute definitions, units, and values | Catalog | Catalog with affected-domain review | Catalog | Schema-change approval, migration, and impact computation |
| ADM-009 | Catalog | Discovery, Compatibility, Admin Platform | Catalog for one attribute and migrations | Catalog | Catalog with Discovery and Compatibility review when affected | Catalog | Versioning, migration execution, and rollback |
| ADM-010 | Compatibility | PC Builder, Catalog, Admin Platform | Compatibility for deterministic rules and versions; Catalog for input facts | Compatibility for rules; Catalog for input facts | Compatibility | Compatibility | Approval stages, coverage thresholds, and incident response |
| ADM-011 | Compatibility | PC Builder, Catalog, Admin Platform | Compatibility for rule, tests, explanation contract, and versions | Compatibility | Compatibility | Compatibility | Test environments, activation, rollback, and audit retention |
| ADM-012 | Inventory | Catalog, Purchase, Pricing, Admin Platform | Inventory for quantities, reservations, and source state | Inventory | Inventory; stronger authority for governed bulk or manual changes | Inventory | Source integration, bulk limits, and location model |
| ADM-013 | Inventory | Catalog, Purchase, Pricing, Admin Platform | Inventory for one position, reservations, and adjustments | Inventory | Inventory; stronger authority for manual adjustment | Inventory | Reason taxonomy, reconciliation, and source precedence |
| ADM-014 | Pricing | Catalog, Purchase, Marketing, Admin Platform | Pricing for base prices, rules, schedules, and exceptions | Pricing | Pricing and financial authority where required | Pricing | Bulk changes, approval thresholds, and source integration |
| ADM-015 | Pricing | Catalog, Purchase, Marketing, Legal, Admin Platform | Pricing for price or reusable rule and versions | Pricing | Pricing and financial authority where required | Pricing | Simulation, scheduling, rollback, and segregation of duties |
| ADM-016 | Purchase | Customer, Payments, Delivery, Inventory, Support, Admin Platform | Purchase for orders; specialist domains for their states | Purchase for order; specialist owners for payment, delivery, inventory, and case actions | Action owner for governed transitions | Purchase | Queue assignment, exports, bulk transitions, and record scope |
| ADM-017 | Purchase | Customer, Payments, Delivery, Inventory, Support, Compatibility, PC Builder, Notifications, Admin Platform | Purchase for order; specialist domains for referenced objects and operations | Purchase coordinates; each action owner applies its mutation | Refund, cancellation, fulfillment, payment, or remedy owner by action | Purchase | Action matrix, reason capture, assurance, and concurrent operations |
| ADM-018 | Customer | Security, Legal, Purchase, Support, Admin Platform | Customer for profile and relationship index; source domains for related objects | Customer; source owner for linked object | Customer, Security, Legal, or privacy authority by operation | Customer | Purpose limitation, export, and record-level scope |
| ADM-019 | Customer | Customer Authentication, Security, Legal, Purchase, Support, Notifications, Admin Platform | Customer for profile and relationship state; Authentication for identity assurance; source owners for related objects | Owner of each field or workflow | Customer, Security, Legal, or privacy authority by action | Customer | Masking, privacy requests, restrictions, assurance, and retention |
| ADM-020 | Support | Customer, Purchase, Delivery, Payments, Catalog, Notifications, Admin Platform | Support for case queue and assignment; source domains for referenced facts | Support for routing and assignment | Support; specialized authority for governed bulk routing | Support | Service levels, queue permissions, and escalation model |
| ADM-021 | Support | Customer, Purchase, Delivery, Payments, Catalog, Inventory, Notifications, Legal, Admin Platform | Support for case; source owners for referenced orders, products, payments, delivery, inventory, and policies | Support for case; specialist owners for remedies and referenced objects | Specialized remedy owner by case type | Support | Remedy matrix, internal/external providers, escalation, and segregation of duties |

## Next decision

Populate and review consequential relationships in four slices:

1. Admin management edges and the ownership ledger

Unresolved responsibilities must be marked `Provisional` rather than inferred as approved.
