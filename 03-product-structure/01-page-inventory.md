# Page Inventory

**Status:** Approved in part — governing model and customer-facing inventory through Legal and Informational approved; System and Admin pending

## Purpose

The Page Inventory is the governed registry of Nexora pages and page templates. It must support wireframing without requiring designers to invent missing pages, relationships, states, access boundaries, or ownership.

This document currently approves the inventory classification model, comprehensive population method, and page-boundary model. It does not yet approve the individual entries in the complete page inventory.

## Decision

Nexora uses a **product-surface registry**. Every page or reusable page template has one primary product-surface class and one accountable owning domain. Lifecycle stage and Tier 1 journey participation are secondary metadata rather than the primary hierarchy.

This structure reflects Nexora’s non-linear, search-first architecture. Search is persistent, comparison and PC Builder are workspaces, AI spans multiple contexts, and Account, Support, and Admin do not fit cleanly into a linear shopping funnel.

## Primary classes

| Class | Scope |
| --- | --- |
| Public Storefront | Home, Deals, collections, brands, buying guides, and public merchandising |
| Discovery | Search results, category results, and search recovery |
| Product Evaluation | Product detail, comparison, reviews, and compatibility views |
| Purchase | Cart, unified checkout, and order confirmation |
| Customer Account | Dashboard, orders, wishlist, addresses, payments, notifications, and settings |
| PC Builder | Initialization, Engineering Workspace, saved builds, and shared builds |
| AI Shopping Assistant | Dedicated assistant and conversation history |
| Support | Support home, articles, order help, returns, warranties, and contact |
| Authentication | Sign in, registration, account recovery, and verification |
| Legal and Informational | Company information, policies, terms, privacy, and accessibility |
| System and Utility States | Full-route errors, empty destinations, offline handling, and degraded-service destinations |
| Administrative Dashboard | Catalog, inventory, orders, customers, content, promotions, support, and access administration |

## Registry fields

| Field | Requirement |
| --- | --- |
| Page ID | Stable reference independent of URL |
| Page or template | Distinguishes a fixed page from a reusable entity template |
| Primary class | Exactly one approved product-surface class |
| Owning domain | Exactly one accountable product or operational domain |
| Supporting domains | Domains contributing data or capabilities |
| Audience | Guest, customer, support agent, operator, or administrator |
| Access | Public, authenticated, conditional, or role-restricted |
| Page purpose | User outcome enabled by the page |
| Entry points | Navigation, search, deep link, contextual action, or notification |
| Global shell | Storefront, focused purchase, workspace, support, authentication, or admin |
| Search participation | Indexed, surfaced contextually, or excluded |
| Parent and related pages | Structural and cross-journey relationships |
| Primary actions | Page-level user commitments |
| Required states | Applicable empty, loading, error, offline, degraded, and permission-denied states |
| URL pattern | Conceptual route and parameter strategy |
| Responsive obligation | Mobile equivalence or an explicitly specialized behavior |
| Lifecycle and journey references | Relevant lifecycle stages and Tier 1 journeys |
| Delivery horizon | Foundation, Expansion, or Future; independent from architectural approval |
| Metadata maturity | Confirmed or Provisional |
| Decision status | Proposed, Approved, Superseded, or Deprecated |

## Classification rules

1. Every page has exactly one primary class and one accountable owning domain. It may have multiple supporting domains.
2. Pages and transient states are distinct. A full-route system destination may be inventoried as a page; inline empty, loading, error, offline, and degraded conditions attach to their host page.
3. A route is not automatically a unique page. Suggestions, drawers, modals, checkout sections, and contextual AI panels are embedded experience units unless they have an independent user goal, URL, lifecycle, or access boundary.
4. Lifecycle position and Tier 1 journeys are cross-references, not containers. This prevents multi-stage pages from being duplicated.
5. Page classification does not create navigation. Navigation remains governed by the approved [Navigation](../02-information-architecture/03-navigation.md).
6. Search participation follows the approved [Universal Search](../02-information-architecture/05-search.md) and must be explicit for every page or template.
7. Conceptual URL patterns do not approve implementation routing.
8. The inventory is comprehensive rather than limited to Tier 1 journeys. All known product surfaces are mapped before page-level architecture is considered complete.
9. Inventory inclusion does not establish delivery priority. Delivery horizon is tracked independently as Foundation, Expansion, or Future.
10. Metadata that depends on later Account, Support, Admin, permissions, or system-state decisions is marked `Provisional` instead of being treated as approved architecture.

## Page-boundary model

Nexora uses **destination-oriented pages**. A separate page or page template requires at least one of these properties:

- An independent user goal
- A durable or shareable URL
- A distinct access or permission boundary
- State that must be resumed securely
- A distinct lifecycle or ownership boundary

Tabs, drawers, modals, autocomplete, contextual AI, checkout sections, and similar interaction units remain embedded within their host page unless they meet this threshold.

This model preserves meaningful context and limits route proliferation. It aligns with the adaptive customer journeys, unified checkout, Decision Workspace, and non-linear Engineering Workspace.

### Exceptions

1. A subtask becomes a page when it must be securely resumed or deep-linked.
2. Legally consequential actions may use a focused confirmation destination.
3. Complex support cases may become persistent case-detail pages after initiation.

### Boundary examples

- Search result types remain grouped within one unified results page.
- Product specifications, reviews, and compatibility are sections of the Product Detail template.
- Checkout delivery, payment, financing, warranty, and review are modules of one page.
- Order tracking, invoices, cancellation, and support entry points are coordinated from Order Detail; a persistent return or support case may have its own detail page.
- Component selection is contained by the PC Builder Engineering Workspace.
- Contextual AI remains embedded; the dedicated AI Assistant is a page.

## Category Discovery template

Nexora uses one **unified Category Discovery template** for each canonical category. It combines:

- Concise category orientation
- Optional, visible intent controls
- Quick and technical filters
- Sorting
- The product grid
- Relevant buying guidance
- Explainable recommendations

Guided and Expert interactions modify the same product grid and represented filter state. They do not lead to separate category landing and product-listing pages.

This boundary preserves the fast path and supports the approved Intent-Driven Discovery journey. Category orientation and merchandising remain subordinate to product discovery, preventing category pages from becoming banner-heavy campaign destinations.

Exact layout, responsive interactions, and visual treatment remain deferred to wireframing and Design System work.

## Order-centric post-purchase architecture

Order Detail is the durable coordination point for post-purchase activity. It brings together:

- Order status and shipment tracking
- Purchased items and any PC Build summary
- Payment summary
- Delivery address
- Invoice access
- Cancellation eligibility
- Return and warranty initiation
- Contextual support entry points

Tracking, invoice access, cancellation eligibility, and case initiation do not become independent pages before a persistent case exists. A return, warranty claim, or support request may become a separate case-detail page after initiation because it then has its own lifecycle, resumable state, and ownership boundary.

This model preserves order context, gives customers one reliable place to resume, and prevents fragmented post-purchase navigation. Exact action eligibility, case ownership, guest-order access, and status models remain provisional until Account, Support, and roles-and-permissions architecture are approved.

Comparison remains the Product Evaluation Decision Workspace, and Saved Builds remain part of PC Builder. Account navigation may link to these capabilities but does not create duplicate Account pages.

## Build-centered Engineering Workspace

Each PC Build is a persistent object coordinated through one non-linear **Engineering Workspace**.

Guided and Expert modes are initialization choices, not separate workspace types. Both establish initial constraints or selections and converge on the same build object and workspace. The workspace contains the component list, compatibility panel, budget panel, performance panel, AI Copilot, and component-selection interactions.

The page model distinguishes four destination responsibilities:

1. Entry and initialization
2. Editing one persistent build in the Engineering Workspace
3. Managing Saved Builds
4. Viewing a read-only Shared Build

Save, resume, duplicate, share, purchase, and upgrade-later actions operate on the persistent build. Upgrade-later reopens or duplicates an eligible build rather than creating another page type.

Component categories, compatibility review, budget review, performance review, and purchase preparation do not become routed steps. This preserves immediate recalculation, makes non-linear editing possible, and prevents the Builder from becoming a wizard after initialization.

Authentication requirements for persistence, share-link controls, ownership transfer, collaboration, version history, and retention remain provisional until Account and roles-and-permissions architecture are approved.

## Conversation-centered AI Assistant

The dedicated AI Shopping Assistant uses one reusable **Assistant Conversation** page template.

The template supports:

- A new-conversation state
- A durable route for each persisted conversation
- Conversation history as an embedded sidebar or drawer
- Transparent context received from Search, Category Discovery, Product Detail, Comparison, PC Builder, or Checkout
- Controls to inspect, remove, replace, or reset imported context

An AI landing page and a separate conversation-history page are not independent destinations. Starting a conversation and finding or managing prior conversations occur within the Assistant template.

Contextual AI elsewhere remains embedded in its host page. Opening the dedicated Assistant may carry visible context forward, but it must not conceal the resulting scope or changes. Returning to the host experience preserves meaningful non-sensitive state where appropriate.

The Assistant does not replace deterministic search results, governed product data, compatibility facts, pricing, availability, or checkout controls. Recommendations must remain optional and explain their rationale, trade-offs, and confidence.

Conversation retention, deletion, sharing, privacy controls, guest persistence, and authenticated access remain provisional until Account, legal, and roles-and-permissions architecture are approved.

## Typed unified support case model

General support, returns and refunds, and warranties and repairs use one customer-facing **Support Case** model with a governed case type.

Every case shares:

- A stable case identity
- Customer-visible status
- Timeline
- Communication history
- Attachments and evidence
- Associated order, products, and PC Build where applicable
- Current owner or responsible function
- Required next actions

Type-specific modules extend the shared case with return logistics, refund status, warranty evidence, repair events, replacement information, or other governed workflow data.

This model gives customers one coherent support history while allowing specialized operational workflows and ownership behind it. General inquiries, returns, and warranty cases may have different internal queues, permissions, service-level expectations, and state transitions without becoming separate customer-facing case systems.

Case initiation may begin contextually from Order Detail, Product Detail, Support Center, Returns and Refunds, Warranty and Repairs, or Contact and Case Start. A case receives its own detail page only after it becomes persistent.

Support search remains part of Universal Search with a visible Support scope. FAQs use the Support Article template rather than a separate page type.

The precise case taxonomy, statuses, escalation rules, ownership transfer, refund authority, repair-provider access, service levels, and agent permissions remain provisional until Support Center, Administrative Dashboard, and roles-and-permissions architecture are approved.

## Focused authentication destinations

Authentication uses separate focused destinations within one minimal shared shell.

Sign-in, account creation, recovery request, credential reset, identity-factor verification, and security challenge are distinct pages because they have different:

- Security contexts and assurance requirements
- Expiration and retry behavior
- Resumable entry links
- Success and failure outcomes
- Eligibility and abuse controls

Every authentication page may preserve a validated return destination. Return context must not expose sensitive state, permit open redirects, or bypass authorization. A successful authentication or verification returns the user to the initiating destination when it remains valid; otherwise it uses a safe account or storefront fallback.

Sign-out, session-timeout warnings, password visibility, provider selection, consent controls, and reauthentication prompts remain embedded interactions. Identity-provider callbacks and token exchanges are system endpoints, not user-facing page inventory entries.

Exact identity factors, social providers, password policy, passkeys, multi-factor methods, recovery assurance, session duration, and abuse controls remain provisional until Account, engineering, legal, and roles-and-permissions decisions are approved.

## Versioned legal document architecture

Nexora maintains independently versioned legal and policy documents with stable destinations. A Legal and Policies Hub indexes the current authoritative documents.

Each policy destination must support:

- A stable canonical URL
- Document title and accountable owner
- Current version or effective date
- Publication and supersession status
- Direct links from relevant product tasks
- Accessible reading and navigation
- A governed method for accessing prior versions when legally required

Separate documents allow registration, Checkout, Account Settings, Support, and other consequential tasks to reference the exact policy and version that applies without linking into an unrelated consolidated page.

Support content may explain policies and help users act, but it cannot redefine them. The Returns and Refunds Hub and Warranty and Repairs Hub must reference the authoritative Returns and Refund Policy and Warranty Policy. If guidance and policy conflict, the policy owner must resolve the inconsistency rather than allowing parallel interpretations.

Consent capture, prior-version retention, jurisdictional variants, policy ownership, translation, effective-date rules, and change-notification obligations remain provisional until legal, content ownership, Account, and Administrative Dashboard architecture are approved.

## Approved canonical inventory

### Block 1 — Storefront, Discovery, and Product Evaluation

All Block 1 pages require mobile-equivalent access to their primary goal. Layout adaptation is deferred to wireframing. Unless stated otherwise, required states include loading, partial-data degradation, recoverable error, and relevant empty content.

#### STF-001 — Home

- **Type / class:** Fixed page / Public Storefront
- **Purpose:** Provide the global discovery hub and the most useful continuation point.
- **Ownership:** Marketing; supported by Discovery, Catalog, Customer, AI, and PC Builder
- **Audience / access / shell:** Guest and customer / Public with optional personalization / Storefront
- **Entry / URL:** Primary navigation and logo / `/`
- **Search participation:** Indexed as the Nexora root, not as a commercial result
- **Relationships / actions:** Leads to Search, Category Discovery, Deals, Collections, Product Detail, PC Builder, and AI; primary action is search, with contextual resume and discovery actions
- **Required states:** Anonymous, personalized, no-history, unavailable recommendation source, and degraded personalization
- **Lifecycle / journeys:** Land and Discover / J-01, J-02, J-04, J-05
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### STF-002 — Deals Hub

- **Type / class:** Fixed page / Public Storefront
- **Purpose:** Provide governed promotional discovery without displacing search or categories.
- **Ownership:** Marketing; supported by Catalog, Pricing, Inventory, and Discovery
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Primary navigation, search, campaigns, and contextual links / `/deals`
- **Search participation:** Indexed and eligible as a separated supporting result
- **Relationships / actions:** Leads to Collection, Category Discovery, and Product Detail; primary actions are filter, sort, and select an offer
- **Required states:** No active deals, expired promotion recovery, price or availability degradation, and standard result states
- **Lifecycle / journeys:** Discover and Evaluate / J-01, J-02
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### STF-003 — Collection

- **Type / class:** Reusable entity template / Public Storefront
- **Purpose:** Present a governed curated assortment without replacing canonical categories.
- **Ownership:** Marketing; supported by Catalog, Pricing, Inventory, and Discovery
- **Audience / access / shell:** Guest and customer / Public when published / Storefront
- **Entry / URL:** Search, Home, Deals, campaigns, and contextual links / `/collections/{collection-slug}`
- **Search participation:** Indexed when published and eligible as a separated supporting result
- **Relationships / actions:** References Category Discovery and Product Detail; primary actions are inspect collection rationale, filter, sort, and select a product
- **Required states:** Unpublished or expired recovery, empty assortment, partial availability, and standard result states
- **Lifecycle / journeys:** Discover and Evaluate / J-01, J-02
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### STF-004 — Brand

- **Type / class:** Reusable entity template / Public Storefront
- **Purpose:** Combine governed brand context with the brand’s available products.
- **Ownership:** Catalog; supported by Marketing, Discovery, Pricing, and Inventory
- **Audience / access / shell:** Guest and customer / Public when active / Storefront
- **Entry / URL:** Search, Product Detail, Category Discovery, and contextual links / `/brands/{brand-slug}`
- **Search participation:** Indexed and eligible as a separated supporting result
- **Relationships / actions:** Leads to Category Discovery and Product Detail; primary actions are browse, filter, sort, and select a product
- **Required states:** Brand with no active products, incomplete brand content, partial availability, and standard result states
- **Lifecycle / journeys:** Discover and Evaluate / J-01, J-02
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### STF-005 — Buying Guides Hub

- **Type / class:** Fixed page / Public Storefront
- **Purpose:** Provide a browsable library of decision-support content without elevating editorial content above product discovery.
- **Ownership:** Marketing; supported by Catalog, Support, and Discovery
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Footer, search, contextual guidance, and Buying Guides / `/guides`
- **Search participation:** Indexed; the hub is lower priority than products, categories, and individual relevant guides
- **Relationships / actions:** Leads to Buying Guide, Category Discovery, and Product Detail; primary actions are find and open a guide
- **Required states:** No matching guides, unavailable taxonomy mapping, and standard content states
- **Lifecycle / journeys:** Discover and Evaluate / J-01, J-02, J-04
- **Horizon / maturity / status:** Expansion / Confirmed / Approved

#### STF-006 — Buying Guide

- **Type / class:** Reusable entity template / Public Storefront
- **Purpose:** Explain a purchase decision and connect governed guidance to relevant products.
- **Ownership:** Marketing; supported by Catalog, Support, Discovery, and AI
- **Audience / access / shell:** Guest and customer / Public when published / Storefront
- **Entry / URL:** Search, Buying Guides Hub, Product Detail, Category Discovery, and contextual AI / `/guides/{guide-slug}`
- **Search participation:** Indexed and eligible as a separated supporting result
- **Relationships / actions:** References Category Discovery, Product Detail, and Comparison; primary actions are understand criteria and continue to relevant products
- **Required states:** Unpublished recovery, stale product references, partial supporting content, and standard content states
- **Lifecycle / journeys:** Discover and Evaluate / J-01, J-02, J-04
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### STF-007 — Campaign Landing

- **Type / class:** Reusable bounded template / Public Storefront
- **Purpose:** Support time-bounded campaigns without creating permanent navigation or a competing taxonomy.
- **Ownership:** Marketing; supported by Catalog, Pricing, Inventory, and Discovery
- **Audience / access / shell:** Guest and customer / Public only while published / Storefront
- **Entry / URL:** External campaign, Home, Deals, notification, and contextual link / `/campaigns/{campaign-slug}`
- **Search participation:** Conditional; indexed only when the campaign has durable discovery value
- **Relationships / actions:** Leads to Collection, Category Discovery, and Product Detail; actions depend on the governed campaign goal
- **Required states:** Scheduled, expired, withdrawn, empty assortment, partial promotion service, and standard content states
- **Lifecycle / journeys:** Land, Discover, and Evaluate / J-01, J-02
- **Horizon / maturity / status:** Expansion / Provisional / Approved

#### DSC-001 — Universal Search Results

- **Type / class:** Stateful page template / Discovery
- **Purpose:** Return unified, grouped results with products first for commercial queries.
- **Ownership:** Discovery; supported by Catalog, Marketing, Support, PC Builder, AI, Pricing, and Inventory
- **Audience / access / shell:** Guest and customer / Public with optional personalized context / Storefront
- **Entry / URL:** Persistent search, submitted suggestion, recent query, and deep link / `/search?q={query}` with represented filter, sort, and intent state
- **Search participation:** The page itself is not indexed as arbitrary query content; governed result entities retain their own index behavior
- **Relationships / actions:** Leads to Category, Collection, Brand, Buying Guide, Product Detail, PC Build, Support Article, promotion, Comparison, and AI follow-up; actions are refine, filter, sort, compare, and select
- **Required states:** Empty query, zero results with recovery, corrected query, partial result-type failure, stale query state, and degraded ranking or personalization
- **Lifecycle / journeys:** Discover and Evaluate / J-01, J-02, J-03, J-04
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### DSC-002 — Category Discovery

- **Type / class:** Reusable entity and stateful result template / Discovery
- **Purpose:** Orient users and provide one shared product grid for guided and expert category discovery.
- **Ownership:** Discovery; supported by Catalog, Marketing, Pricing, Inventory, Compatibility, and AI
- **Audience / access / shell:** Guest and customer / Public with optional personalized context / Storefront
- **Entry / URL:** Categories mega menu, search, Home, related pages, and deep links / `/categories/{category-slug}` with represented filter, sort, and intent state
- **Search participation:** Canonical category page is indexed and eligible as a separated supporting result
- **Relationships / actions:** Leads to Product Detail, Comparison, Brand, Collection, Buying Guide, and contextual AI; actions are inspect visible intent effects, clear or modify them, filter, sort, compare, and select
- **Required states:** No matching products, no applicable filters, invalid or retired filter state, partial inventory or compatibility data, and degraded recommendations
- **Lifecycle / journeys:** Discover and Evaluate / J-01, J-02, J-03, J-04
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### EVA-001 — Product Detail

- **Type / class:** Reusable sellable-entity template / Product Evaluation
- **Purpose:** Enable confident evaluation and movement to purchase, comparison, or configuration.
- **Ownership:** Catalog; supported by Pricing, Inventory, Reviews, Compatibility, Marketing, Purchase, Discovery, and AI
- **Audience / access / shell:** Guest and customer / Public for active or recoverable products / Storefront
- **Entry / URL:** Search, Category, Brand, Collection, Buying Guide, Comparison, PC Builder, recommendation, and deep link / `/products/{product-slug}`
- **Search participation:** Indexed while active; discontinued products follow an explicit recovery and successor policy
- **Relationships / actions:** Leads to Cart, Comparison, PC Builder, related products, Support content, and contextual AI; actions are choose an offer or variant, inspect evidence, compare, save, and add to cart
- **Required states:** Out of stock, discontinued, unknown price, partial specifications, review outage, compatibility uncertainty, invalid variant, and degraded recommendations
- **Lifecycle / journeys:** Evaluate, Compare, Configure, and Purchase / J-01 through J-05
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### EVA-002 — Comparison Workspace

- **Type / class:** Stateful Decision Workspace / Product Evaluation
- **Purpose:** Reduce cognitive load through layered comparison and explainable recommendations.
- **Ownership:** Catalog; supported by Discovery, Pricing, Inventory, Reviews, Compatibility, AI, and Customer
- **Audience / access / shell:** Guest and customer / Public session with optional authenticated persistence / Workspace
- **Entry / URL:** Compare utility, Product Detail, Category Discovery, Search, and share link / `/compare` with validated shareable comparison state
- **Search participation:** Excluded from public indexing
- **Relationships / actions:** Leads to Product Detail, Cart, PC Builder where relevant, and contextual AI; actions are add or remove products, inspect differences, change comparison focus, save or share, and select a product
- **Required states:** Empty comparison, single product, unsupported cross-category comparison, removed or unavailable product, partial attributes, price or inventory degradation, and AI unavailable
- **Lifecycle / journeys:** Evaluate, Compare, Configure, and Purchase / J-01, J-02, J-03, J-04, J-05
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

### Block 1 embedded experience units

The following are required interaction units within approved host pages, not independent pages:

- Search suggestions, autocomplete, trending searches, and recent searches
- Filter, sort, and intent controls
- Product grid and product cards
- Product media, specifications, reviews, compatibility, financing, warranty, and recommendation sections
- Comparison layers and optional AI summary
- Contextual AI panels
- Quick view
- Home continuation, recommendation, category, collection, and editorial modules

Embedded units inherit the host page’s access and shell but must define their own loading, empty, error, and degraded behavior during the later system-state review.

### Block 2 — Purchase and Customer Account

Account entries are authenticated unless an explicitly governed guest-order recovery path applies. Exact authentication assurance, action eligibility, retention, and permissions remain provisional until the Account and roles-and-permissions architecture decisions.

#### PUR-001 — Cart

- **Type / class:** Stateful fixed destination / Purchase
- **Purpose:** Review and prepare selected products or a validated PC Build for checkout.
- **Ownership:** Purchase; supported by Catalog, Pricing, Inventory, Promotions, Compatibility, Customer, and AI
- **Audience / access / shell:** Guest and customer / Public session with optional authenticated persistence / Storefront
- **Entry / URL:** Cart utility, Product Detail, PC Builder, Comparison, and direct resume / `/cart`
- **Search participation:** Excluded from indexing and search results
- **Relationships / actions:** Leads to Product Detail, PC Builder, Checkout, and contextual AI; actions are adjust quantity, remove or save items, inspect compatibility, apply eligible promotion, and proceed
- **Required states:** Empty cart, unavailable item, changed price, insufficient stock, expired promotion, compatibility warning or hard conflict, merge conflict after sign-in, and degraded recommendations
- **Lifecycle / journeys:** Evaluate, Configure, and Purchase / J-01 through J-06
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### PUR-002 — Unified Checkout

- **Type / class:** Stateful fixed destination / Purchase
- **Purpose:** Complete a purchase on one page through progressively disclosed modules.
- **Ownership:** Purchase; supported by Customer, Inventory, Pricing, Promotions, Payments, Delivery, Compatibility, Notifications, and AI
- **Audience / access / shell:** Guest and customer / Public session with elevated verification when required / Focused purchase
- **Entry / URL:** Valid Cart / `/checkout`; sensitive state is not represented in the URL
- **Search participation:** Excluded from indexing and search results
- **Relationships / actions:** Receives Cart and leads to Order Confirmation or recoverable Cart; actions cover Contact, Delivery, Payment, Review, Promotions, Financing, Warranty, and Place Order
- **Required states:** Missing or invalid contact, no delivery option, address failure, payment decline or timeout, financing ineligibility, inventory change, price change, promotion expiry, duplicate-submission protection, compatibility change, and partial service degradation
- **Lifecycle / journeys:** Purchase / J-01 through J-06
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### PUR-003 — Order Confirmation

- **Type / class:** Transaction outcome page / Purchase
- **Purpose:** Confirm the order exactly once, communicate next steps, and provide a safe transition to persistent order access.
- **Ownership:** Purchase; supported by Customer, Payments, Delivery, Notifications, Compatibility, and Support
- **Audience / access / shell:** Purchasing guest or customer / Transaction-bound access / Focused purchase
- **Entry / URL:** Successful order placement / `/order-confirmation/{confirmation-reference}` using a non-sensitive, expiring reference
- **Search participation:** Excluded from indexing and search results
- **Relationships / actions:** Leads to Order Detail or secure guest-order access, Home, Support, and PC Build context; actions are review confirmation, obtain receipt, and continue
- **Required states:** Confirmation delayed, notification delayed, payment pending, duplicate revisit, expired guest reference, and partial order-summary degradation
- **Lifecycle / journeys:** Purchase and Track / J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### ACC-001 — Account Dashboard

- **Type / class:** Fixed page / Customer Account
- **Purpose:** Summarize the customer relationship and provide prioritized continuation points.
- **Ownership:** Customer; supported by Purchase, Support, PC Builder, Discovery, and Notifications
- **Audience / access / shell:** Customer / Authenticated / Storefront account
- **Entry / URL:** Account utility, post-authentication return, and contextual links / `/account`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Leads to Orders, Wishlist, Addresses, Payment Methods, Notifications, Settings, Comparison, Saved Builds, and Support; actions prioritize current orders and meaningful resumptions
- **Required states:** New account, no activity, partial order or recommendation service, stale continuation, and restricted account
- **Lifecycle / journeys:** Manage relationship, Track, and Support / all journeys where authenticated context persists
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### ACC-002 — Orders

- **Type / class:** Collection page / Customer Account
- **Purpose:** Provide the customer’s durable, filterable order history.
- **Ownership:** Customer; supported by Purchase, Delivery, Payments, and Support
- **Audience / access / shell:** Customer / Authenticated / Storefront account
- **Entry / URL:** Account navigation, Dashboard, and notifications / `/account/orders`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Leads to Order Detail and relevant Support cases; actions are filter, find, and open an order
- **Required states:** No orders, no filtered matches, delayed order synchronization, partial shipment data, and restricted order
- **Lifecycle / journeys:** Track, Receive, Support, and Return / J-01 through J-06 after purchase
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### ACC-003 — Order Detail

- **Type / class:** Reusable authenticated entity template / Customer Account
- **Purpose:** Act as the durable hub for one order and its post-purchase activity.
- **Ownership:** Customer; supported by Purchase, Delivery, Payments, Support, Compatibility, PC Builder, and Notifications
- **Audience / access / shell:** Owning customer; governed guest access remains provisional / Authenticated or securely verified / Storefront account
- **Entry / URL:** Orders, Order Confirmation, notification, Support, and secure deep link / `/account/orders/{order-reference}`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Coordinates tracking, items, PC Build summary, payment summary, delivery address, invoice, cancellation eligibility, return or warranty initiation, and Support; persistent cases lead to their own detail pages
- **Required states:** Processing, payment pending, partially shipped, delivered, cancelled, returned, delayed tracking, missing invoice, action ineligible, partial service failure, and unauthorized access
- **Lifecycle / journeys:** Track, Receive, Support, and Return / J-01 through J-06 after purchase
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### ACC-004 — Wishlist

- **Type / class:** Stateful collection page / Customer Account
- **Purpose:** Persist products for later evaluation or purchase.
- **Ownership:** Customer; supported by Catalog, Pricing, Inventory, Discovery, and Purchase
- **Audience / access / shell:** Customer / Authenticated, with optional pre-authentication merge / Storefront account
- **Entry / URL:** Wishlist utility, Account navigation, Dashboard, Product Detail, and contextual links / `/account/wishlist`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Leads to Product Detail, Comparison, Cart, and Category Discovery; actions are remove, compare, and add available products to Cart
- **Required states:** Empty wishlist, unavailable or discontinued product, changed price, merge conflict, and partial catalog data
- **Lifecycle / journeys:** Evaluate, Compare, and Purchase / J-01, J-02, J-03, J-04
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### ACC-005 — Addresses

- **Type / class:** Collection and management page / Customer Account
- **Purpose:** Manage reusable delivery addresses outside checkout.
- **Ownership:** Customer; supported by Delivery and Purchase
- **Audience / access / shell:** Customer / Authenticated with step-up verification for sensitive changes when required / Storefront account
- **Entry / URL:** Account navigation, Dashboard, and Checkout handoff / `/account/addresses`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Supports Checkout and Order Detail without altering historical order addresses; actions are add, edit, validate, set default, and remove eligible addresses
- **Required states:** No addresses, invalid or unsupported address, validation unavailable, address in use, removal blocked, and save conflict
- **Lifecycle / journeys:** Manage relationship and Purchase / J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### ACC-006 — Payment Methods

- **Type / class:** Collection and management page / Customer Account
- **Purpose:** Manage eligible stored payment instruments without exposing sensitive payment data.
- **Ownership:** Customer; supported by Payments and Purchase
- **Audience / access / shell:** Customer / Authenticated with step-up verification / Storefront account
- **Entry / URL:** Account navigation, Dashboard, and Checkout handoff / `/account/payment-methods`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Supports Checkout; actions are add through a governed provider flow, label, set default, and remove eligible instruments
- **Required states:** No stored methods, expired instrument, provider unavailable, verification required, method in use, removal blocked, and tokenization failure
- **Lifecycle / journeys:** Manage relationship and Purchase / J-01 through J-06
- **Horizon / maturity / status:** Expansion / Provisional / Approved

#### ACC-007 — Notifications

- **Type / class:** Stateful collection page / Customer Account
- **Purpose:** Provide a durable history of actionable customer notifications.
- **Ownership:** Customer; supported by Notifications, Purchase, Delivery, Support, Marketing, and PC Builder
- **Audience / access / shell:** Customer / Authenticated / Storefront account
- **Entry / URL:** Account navigation, Dashboard, notification utility when present, and deep link / `/account/notifications`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Leads to Order Detail, Support cases, Product Detail, PC Builder, and Settings; actions are open, mark read, and manage notification preferences
- **Required states:** No notifications, expired target, partial channel synchronization, duplicate event, and notification service unavailable
- **Lifecycle / journeys:** Manage relationship, Track, and Support / all journeys with persistent customer context
- **Horizon / maturity / status:** Expansion / Provisional / Approved

#### ACC-008 — Account Settings

- **Type / class:** Fixed settings page / Customer Account
- **Purpose:** Manage profile, security, privacy, communication preferences, and account lifecycle through governed sections.
- **Ownership:** Customer; supported by Authentication, Notifications, Legal, and Support
- **Audience / access / shell:** Customer / Authenticated with step-up verification for sensitive actions / Storefront account
- **Entry / URL:** Account navigation, Dashboard, authentication prompts, and Notifications / `/account/settings`
- **Search participation:** Excluded from public and universal search indexing
- **Relationships / actions:** Coordinates profile, credentials, sessions, privacy controls, notification preferences, and account closure; legally significant actions use explicit confirmation
- **Required states:** Verification required, stale session, duplicate identity data, save conflict, channel unavailable, export pending, closure blocked, and partial settings failure
- **Lifecycle / journeys:** Manage relationship / all authenticated journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

### Block 2 embedded experience units

The following remain modules or focused interactions within approved pages:

- Cart line items, summary, promotion entry, compatibility summary, and contextual AI
- Checkout Contact, Delivery, Payment, Review, Promotions, Financing, Warranty, and Place Order modules
- Address and payment-method editors
- Order timeline, shipment tracking, invoice access, cancellation eligibility, and case initiation
- Account overview and continuation cards
- Profile, security, privacy, communication, and account-lifecycle settings

Persistent returns, warranty claims, and support requests become Support case pages after initiation. Exact system states and embedded-unit behavior remain subject to the later error, empty, loading, offline, and degraded-state review.

### Block 3A — PC Builder

Every PC Builder destination preserves the deterministic compatibility model as authoritative. AI guidance remains distinguishable from compatibility facts.

#### PCB-001 — PC Builder Start

- **Type / class:** Fixed entry and initialization page / PC Builder
- **Purpose:** Explain the Builder, let users choose Guided or Expert initialization, and create a build.
- **Ownership:** PC Builder; supported by Catalog, Compatibility, Customer, AI, Pricing, and Inventory
- **Audience / access / shell:** Guest and customer / Public / Workspace entry
- **Entry / URL:** Primary navigation, Home, Search, Product Detail, Comparison, Saved Builds, and contextual links / `/pc-builder`
- **Search participation:** Indexed as the canonical PC Builder destination and eligible as a primary-task result
- **Relationships / actions:** Creates and leads to Engineering Workspace; may resume eligible local or saved context; primary action is initialize a build
- **Required states:** No prior build, resumable draft, unavailable catalog, compatibility service unavailable, initialization conflict, and authentication handoff
- **Lifecycle / journeys:** Configure / J-04, J-05
- **Horizon / maturity / status:** Foundation / Confirmed / Approved

#### PCB-002 — Engineering Workspace

- **Type / class:** Stateful persistent-object template / PC Builder
- **Purpose:** Configure, validate, save, share, and purchase one non-linear PC Build.
- **Ownership:** PC Builder; supported by Compatibility, Catalog, Pricing, Inventory, Customer, Purchase, and AI
- **Audience / access / shell:** Guest draft or owning customer / Session-bound or authenticated owner / Workspace
- **Entry / URL:** PC Builder Start, Saved Builds, Shared Build duplication, Order Detail upgrade action, and resume link / `/pc-builder/builds/{build-reference}`
- **Search participation:** Excluded from public indexing; owned saved builds may surface only in authenticated search context
- **Relationships / actions:** Leads to Saved Builds, Shared Build, Cart, Product Detail, and contextual AI; actions include select components, inspect constraints, save, duplicate, share, convert to Cart, and create an upgrade variant
- **Required states:** Empty slots, warning, hard incompatibility, budget conflict, unavailable component, changed price, insufficient stock, stale compatibility result, recalculation in progress, unsaved guest draft, save conflict, and partial AI or performance degradation
- **Lifecycle / journeys:** Evaluate, Compare, Configure, and Purchase / J-03, J-04, J-05, J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### PCB-003 — Saved Builds

- **Type / class:** Authenticated collection page / PC Builder
- **Purpose:** Manage the customer’s persistent PC Builds across their lifecycle.
- **Ownership:** PC Builder; supported by Customer, Compatibility, Catalog, Pricing, and Inventory
- **Audience / access / shell:** Customer / Authenticated / Workspace
- **Entry / URL:** Account navigation, Account Dashboard, PC Builder Start, Engineering Workspace, and notifications / `/account/builds`
- **Search participation:** Excluded from public indexing; entries may participate in authenticated search
- **Relationships / actions:** Leads to Engineering Workspace and Shared Build; actions are resume, duplicate, rename, share, archive, purchase, and start an upgrade variant
- **Required states:** No builds, locally recoverable draft, unavailable component, compatibility changed, price or stock changed, archive conflict, and partial metadata failure
- **Lifecycle / journeys:** Configure, Purchase, and Upgrade later / J-04, J-05, J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### PCB-004 — Shared Build

- **Type / class:** Read-only shared-object template / PC Builder
- **Purpose:** Let a recipient inspect an explainable build snapshot and optionally duplicate it into their own workspace.
- **Ownership:** PC Builder; supported by Compatibility, Catalog, Pricing, Inventory, Customer, and AI
- **Audience / access / shell:** Guest and customer / Governed share-link access / Workspace
- **Entry / URL:** Share link and contextual references / `/pc-builder/shared/{share-reference}`
- **Search participation:** Excluded from indexing and universal search
- **Relationships / actions:** Leads to Product Detail, PC Builder Start, and a duplicated Engineering Workspace; actions are inspect components and compatibility, duplicate, and begin purchase through an owned copy
- **Required states:** Invalid, revoked, or expired link; unavailable component; changed compatibility; stale price or stock; owner-deleted build; and partial catalog data
- **Lifecycle / journeys:** Evaluate, Configure, and Purchase / J-03, J-04, J-05
- **Horizon / maturity / status:** Foundation / Provisional / Approved

### Block 3A embedded experience units

The following remain inside the PC Builder destinations:

- Guided and Expert initialization controls
- Component list and component selection
- Compatibility, Budget, and Performance panels
- AI Copilot
- Constraint explanations and recalculation feedback
- Save, rename, duplicate, share, archive, purchase, and upgrade actions

Collaboration, ownership transfer, version history, and public discoverability are not approved capabilities. They require later decisions before they may change the inventory.

### Block 3B — AI Shopping Assistant

#### AIS-001 — AI Assistant Conversation

- **Type / class:** Stateful conversation template / AI Shopping Assistant
- **Purpose:** Support open-ended, explainable shopping conversations without replacing deterministic product systems.
- **Ownership:** AI; supported by Discovery, Catalog, Compatibility, Pricing, Inventory, Customer, PC Builder, Purchase, Marketing, and Support
- **Audience / access / shell:** Guest and customer / Session-bound guest or authenticated customer / Workspace
- **Entry / URL:** AI utility, contextual AI handoff, prior conversation, and deep link / `/assistant` for a new conversation and `/assistant/{conversation-reference}` for a persisted conversation
- **Search participation:** Excluded from public indexing; owned conversations may participate only in authenticated personal search
- **Relationships / actions:** Receives visible context from Search, Category Discovery, Product Detail, Comparison, PC Builder, or Checkout and may return users to those destinations; actions are ask, refine, inspect evidence and context, compare recommendations, remove context, reset, and manage conversations
- **Required states:** New conversation, no history, response generation, partial evidence, low confidence, conflicting requirements, unavailable source system, stale referenced product, interrupted response, usage limitation, guest persistence boundary, and deletion pending
- **Lifecycle / journeys:** Discover, Evaluate, Compare, Configure, Purchase, and Support / J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

### Block 3B embedded experience units

The following remain within AIS-001:

- Conversation history and conversation management
- Context inspector
- Source and evidence presentation
- Rationale, trade-off, and confidence disclosures
- Product, comparison, and build recommendations
- Context removal, reset, and deletion controls

Contextual AI panels remain embedded within their host pages and are not additional AI destinations. Conversation sharing and proactive autonomous actions are not approved capabilities.

### Block 4A — Support

Support pages use the shared customer-facing case model. Exact eligibility, state transitions, service levels, internal queues, and agent permissions remain provisional.

#### SUP-001 — Support Center

- **Type / class:** Fixed hub page / Support
- **Purpose:** Provide search-first issue resolution, contextual routing, and continuation of active cases.
- **Ownership:** Support; supported by Discovery, Customer, Purchase, Catalog, PC Builder, AI, and Notifications
- **Audience / access / shell:** Guest and customer / Public with authenticated continuation modules / Support
- **Entry / URL:** Primary navigation, footer, Universal Search, Order Detail, Product Detail, Account, and contextual help / `/support`
- **Search participation:** Indexed as the canonical Support destination and eligible as a primary-task result
- **Relationships / actions:** Leads to Support Article, Returns and Refunds, Warranty and Repairs, Contact and Case Start, My Support Cases, Order Detail, and contextual AI; actions are search, select an issue path, and resume a case
- **Required states:** No query, zero support results, no active cases, unavailable order context, partial article index, case service unavailable, and degraded AI
- **Lifecycle / journeys:** Support and Return / all Tier 1 journeys after or during evaluation and purchase
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### SUP-002 — Support Article

- **Type / class:** Reusable content template / Support
- **Purpose:** Provide governed procedural guidance or a focused FAQ answer with relevant next actions.
- **Ownership:** Support; supported by Catalog, Purchase, Customer, Legal, Discovery, and AI
- **Audience / access / shell:** Guest and customer / Public when published; restricted variants require explicit governance / Support
- **Entry / URL:** Universal Search, Support Center, Product Detail, Order Detail, case context, and contextual AI / `/support/articles/{article-slug}`
- **Search participation:** Indexed and eligible in the separated Support result group
- **Relationships / actions:** Leads to relevant product, order, policy, hub, or case-initiation destination; primary actions are follow guidance, provide feedback, and escalate when unresolved
- **Required states:** Unpublished or retired article, stale product or policy reference, missing localization, partial media, and escalation service unavailable
- **Lifecycle / journeys:** Evaluate, Purchase, Track, Support, and Return / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### SUP-003 — Returns and Refunds Hub

- **Type / class:** Fixed policy-and-task hub / Support
- **Purpose:** Explain return eligibility and initiate an order-linked return without creating a case prematurely.
- **Ownership:** Support; supported by Customer, Purchase, Delivery, Payments, Inventory, Legal, and Notifications
- **Audience / access / shell:** Guest and customer / Public guidance with verified order context for initiation / Support
- **Entry / URL:** Support Center, Order Detail, Support Article, footer policy links, and Universal Search / `/support/returns`
- **Search participation:** Indexed and eligible in the separated Support result group
- **Relationships / actions:** Leads to Order Detail, relevant policy content, Contact and Case Start, and a created Support Case Detail; actions are understand eligibility, identify an order or item, and initiate an eligible return
- **Required states:** No eligible order, outside return window, non-returnable item, verification required, partial-order eligibility, initiation failure, and refund service degradation
- **Lifecycle / journeys:** Support and Return / post-purchase J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### SUP-004 — Warranty and Repairs Hub

- **Type / class:** Fixed policy-and-task hub / Support
- **Purpose:** Explain warranty or repair coverage and initiate a product-linked claim.
- **Ownership:** Support; supported by Customer, Purchase, Catalog, Legal, Notifications, and external repair operations when governed
- **Audience / access / shell:** Guest and customer / Public guidance with verified product or order context for initiation / Support
- **Entry / URL:** Support Center, Order Detail, Product Detail, Support Article, footer policy links, and Universal Search / `/support/warranty`
- **Search participation:** Indexed and eligible in the separated Support result group
- **Relationships / actions:** Leads to Order Detail, Product Detail, relevant policy content, Contact and Case Start, and a created Support Case Detail; actions are understand coverage, identify a product, provide initial evidence, and initiate an eligible claim
- **Required states:** Product not found, coverage expired or unknown, manufacturer-only route, verification required, evidence incomplete, initiation failure, and repair service degradation
- **Lifecycle / journeys:** Support and Return / post-purchase J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### SUP-005 — Contact and Case Start

- **Type / class:** Adaptive triage page / Support
- **Purpose:** Resolve routing and collect the minimum information needed to create a persistent case.
- **Ownership:** Support; supported by Customer, Purchase, Catalog, PC Builder, AI, Authentication, and Notifications
- **Audience / access / shell:** Guest and customer / Public triage with verification or authentication before sensitive case creation / Support
- **Entry / URL:** Support Center, Support Article, Returns and Refunds, Warranty and Repairs, Order Detail, Product Detail, and contextual help / `/support/contact`
- **Search participation:** Surfaced contextually but excluded from public result indexing
- **Relationships / actions:** May return to self-service content or create and lead to Support Case Detail; actions are select issue context, identify relevant order or product, choose an available channel, and submit
- **Required states:** Insufficient context, authentication or verification required, duplicate-case warning, channel unavailable, outside service hours, attachment failure, submission failure, and emergency-scope redirection
- **Lifecycle / journeys:** Support and Return / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### SUP-006 — My Support Cases

- **Type / class:** Authenticated collection page / Support
- **Purpose:** Find, filter, and resume the customer’s persistent support cases.
- **Ownership:** Support; supported by Customer, Purchase, Notifications, and Authentication
- **Audience / access / shell:** Customer / Authenticated / Support
- **Entry / URL:** Support Center, Account Dashboard, Account navigation, notifications, and case completion / `/account/support-cases`
- **Search participation:** Excluded from public indexing; entries may participate in authenticated personal search
- **Relationships / actions:** Leads to Support Case Detail and associated Order Detail; actions are filter, find, open, and resume a case
- **Required states:** No cases, no filtered matches, archived case, restricted case, delayed synchronization, and partial status data
- **Lifecycle / journeys:** Support and Return / all Tier 1 journeys with persistent customer context
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### SUP-007 — Support Case Detail

- **Type / class:** Reusable typed case template / Support
- **Purpose:** Coordinate the timeline, evidence, communication, and next actions for one persistent support, return, refund, warranty, or repair case.
- **Ownership:** Support; specialized operational ownership varies by case type; supported by Customer, Purchase, Delivery, Payments, Catalog, Inventory, Notifications, and Authentication
- **Audience / access / shell:** Verified participant / Authenticated or securely verified case access / Support
- **Entry / URL:** Case creation, My Support Cases, Order Detail, notification, agent communication, and secure deep link / `/support/cases/{case-reference}`
- **Search participation:** Excluded from public indexing; owned cases may participate in authenticated personal search
- **Relationships / actions:** Links associated Order Detail, products, PC Build, policies, and articles; actions depend on case state and may include message, upload evidence, confirm logistics, review refund or repair progress, withdraw when eligible, and close
- **Required states:** Awaiting customer, awaiting Nexora, awaiting carrier or repair provider, resolved, closed, cancelled, escalated, overdue, missing evidence, failed upload, delayed external update, unauthorized access, and partial case-service degradation
- **Lifecycle / journeys:** Track, Receive, Support, and Return / all post-purchase Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

### Block 4A embedded experience units

The following remain embedded within Support destinations:

- Support-scoped search and zero-result recovery
- Issue routing and self-service recommendations
- Eligibility checks
- Order and product identification
- Case initiation
- Case status, timeline, messaging, attachments, logistics, refund, warranty, and repair modules
- Channel availability and escalation controls

Separate customer-facing detail templates for returns, refunds, warranties, and repairs are not approved. Type-specific modules extend SUP-007.

### Block 4B — Authentication

Authentication pages use one minimal shell, accessible recovery paths, non-disclosing identity responses, abuse controls, and validated return destinations. Exact authentication methods remain provisional.

#### AUT-001 — Sign In

- **Type / class:** Focused fixed page / Authentication
- **Purpose:** Establish a customer session and safely resume the initiating task.
- **Ownership:** Customer Authentication; supported by Customer, Security, Legal, and relevant return-destination domains
- **Audience / access / shell:** Guest; authenticated customers receive a safe redirect / Public / Authentication
- **Entry / URL:** Account utility, protected destination, Checkout, save or persistence action, and explicit link / `/sign-in` with a validated return reference
- **Search participation:** Excluded from indexing and Universal Search
- **Relationships / actions:** Leads to the validated return destination, Account Dashboard, Create Account, Account Recovery, Verification, or Security Challenge; actions are authenticate and choose an approved identity method
- **Required states:** Invalid credential, unknown identity without disclosure, verification required, security challenge required, rate limit, locked or restricted account, provider unavailable, stale return context, and existing session
- **Lifecycle / journeys:** Any lifecycle stage requiring identity persistence / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### AUT-002 — Create Account

- **Type / class:** Focused fixed page / Authentication
- **Purpose:** Register a customer identity with the minimum required information and consent.
- **Ownership:** Customer Authentication; supported by Customer, Legal, Notifications, and Security
- **Audience / access / shell:** Guest / Public / Authentication
- **Entry / URL:** Sign In, Checkout, persistence action, and explicit link / `/create-account` with a validated return reference
- **Search participation:** Excluded from indexing and Universal Search
- **Relationships / actions:** Leads to Verification, Security Challenge when required, or the validated return destination; action is create an account
- **Required states:** Identity already associated without unsafe disclosure, invalid data, consent missing, verification delivery failure, rate limit, registration unavailable, and stale return context
- **Lifecycle / journeys:** Purchase and Manage relationship, or any stage requiring persistence / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### AUT-003 — Account Recovery

- **Type / class:** Focused fixed page / Authentication
- **Purpose:** Begin secure account recovery without revealing whether an identity exists.
- **Ownership:** Customer Authentication; supported by Security, Customer, Notifications, Legal, and Support
- **Audience / access / shell:** Guest or customer unable to authenticate / Public / Authentication
- **Entry / URL:** Sign In, failed authentication, Support guidance, and explicit link / `/account-recovery`
- **Search participation:** Excluded from indexing and Universal Search
- **Relationships / actions:** Leads to a neutral submission outcome, Verification, Credential Reset, Support, or Sign In; action is request a governed recovery method
- **Required states:** Neutral accepted response, invalid input, rate limit, delivery delay, recovery unavailable, insufficient assurance, and support escalation
- **Lifecycle / journeys:** Authenticate and Manage relationship / all Tier 1 journeys where account access is required
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### AUT-004 — Credential Reset

- **Type / class:** Focused resumable page / Authentication
- **Purpose:** Set a new credential from a verified, expiring recovery context.
- **Ownership:** Customer Authentication; supported by Security, Customer, Notifications, and Legal
- **Audience / access / shell:** Verified recovery participant / Valid recovery context / Authentication
- **Entry / URL:** Governed recovery link or completed verification / `/credential-reset/{recovery-reference}`
- **Search participation:** Excluded from indexing and Universal Search
- **Relationships / actions:** Leads to Sign In, Security Challenge, or a safe account destination; action is set and confirm a new credential
- **Required states:** Invalid, used, or expired reference; credential-policy failure; compromised credential warning; rate limit; save failure; and session revocation pending
- **Lifecycle / journeys:** Authenticate and Manage relationship / all authenticated journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### AUT-005 — Verification

- **Type / class:** Focused resumable page / Authentication
- **Purpose:** Verify a governed identity or contact factor for registration, recovery, or sensitive account activity.
- **Ownership:** Customer Authentication; supported by Security, Customer, Notifications, and the initiating domain
- **Audience / access / shell:** Holder of a valid verification context / Context-bound / Authentication
- **Entry / URL:** Create Account, Account Recovery, sensitive Account action, Checkout, Support, or verification link / `/verify/{verification-reference}`
- **Search participation:** Excluded from indexing and Universal Search
- **Relationships / actions:** Returns to the validated initiating destination or proceeds to Credential Reset or Security Challenge; actions are submit, resend when eligible, or choose an approved alternative
- **Required states:** Invalid, used, or expired reference; incorrect code; retry exhaustion; delivery delay; resend cooldown; factor unavailable; and context mismatch
- **Lifecycle / journeys:** Authenticate, Purchase, Support, and Manage relationship / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### AUT-006 — Security Challenge

- **Type / class:** Focused resumable page / Authentication
- **Purpose:** Establish stronger assurance for authentication or a sensitive action.
- **Ownership:** Customer Authentication; supported by Security and the initiating domain
- **Audience / access / shell:** Customer or verified transaction participant / Existing authentication or transaction context / Authentication
- **Entry / URL:** Sign In, Payment Methods, Account Settings, Checkout, Support case access, or another governed sensitive action / `/security-challenge/{challenge-reference}`
- **Search participation:** Excluded from indexing and Universal Search
- **Relationships / actions:** Returns only to the validated initiating destination or a safe fallback; actions are complete an approved challenge, retry, or choose an eligible recovery path
- **Required states:** Incorrect response, expired challenge, retry exhaustion, unavailable factor, trusted-device conflict, suspicious context, session expiry, recovery required, and challenge service unavailable
- **Lifecycle / journeys:** Authenticate, Purchase, Support, and Manage relationship / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

### Block 4B embedded experience units

The following remain within authentication pages or their initiating host experiences:

- Password visibility and strength feedback
- Identity-provider selection
- Consent controls
- Resend and cooldown feedback
- Session-timeout and reauthentication prompts
- Sign-out

Provider callbacks, token exchanges, and session endpoints are not pages. Authentication assurance and abuse-state details will be refined in later Account, roles-and-permissions, legal, and engineering work.

### Block 5A — Legal and Informational

Legal entries require accountable ownership, version or effective date, publication status, accessible presentation, and prior-version access when legally required. Exact Brazilian legal content is not defined by this inventory.

#### INF-001 — About Nexora

- **Type / class:** Fixed informational page / Legal and Informational
- **Purpose:** Explain Nexora’s identity, first-party retail model, product promise, and responsible contact paths.
- **Ownership:** Marketing; supported by Legal and Support
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Footer, Home context, external link, and Legal and Policies Hub / `/about`
- **Search participation:** Indexed as informational content; lower priority than commercial and Support results
- **Relationships / actions:** Leads to Support Center, Legal and Policies Hub, and relevant public commitments; primary action is understand Nexora and find the right contact path
- **Required states:** Partial content, unavailable supporting media, and localization fallback
- **Lifecycle / journeys:** Land and Manage relationship / supporting all journeys
- **Horizon / maturity / status:** Expansion / Provisional / Approved

#### LEG-001 — Legal and Policies Hub

- **Type / class:** Fixed index page / Legal and Informational
- **Purpose:** Index current authoritative policies and their applicable status.
- **Ownership:** Legal; supported by Marketing, Support, Customer, and Purchase
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Footer, Account Settings, Checkout, Authentication, Support, and direct link / `/legal`
- **Search participation:** Indexed as the canonical legal index
- **Relationships / actions:** Leads to every current policy destination and governed prior-version access; action is locate the applicable document
- **Required states:** Document temporarily unavailable, superseded reference, missing translation, and partial policy index
- **Lifecycle / journeys:** All lifecycle stages / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### LEG-002 — Terms of Use

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** Publish the authoritative terms governing use of Nexora’s customer-facing products.
- **Ownership:** Legal; supported by Customer Authentication, Customer, Purchase, AI, PC Builder, and Support
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Legal and Policies Hub, Authentication, Checkout, Account Settings, and footer / `/legal/terms`
- **Search participation:** Indexed as authoritative legal content
- **Relationships / actions:** References related policies and prior versions where required; action is read and navigate the document
- **Required states:** Superseded version, prior-version request, missing translation, and document retrieval failure
- **Lifecycle / journeys:** All lifecycle stages / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### LEG-003 — Privacy Notice

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** Explain personal-data processing, retention, sharing, safeguards, and customer rights.
- **Ownership:** Legal; supported by Security, Customer, Customer Authentication, AI, Marketing, Support, and Admin
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Legal and Policies Hub, Authentication, Account Settings, cookie controls, AI Assistant, Support, and footer / `/legal/privacy`
- **Search participation:** Indexed as authoritative legal content
- **Relationships / actions:** Leads to relevant privacy controls, Support contact paths, Cookie Notice, and prior versions; action is understand rights and reach governed controls
- **Required states:** Superseded version, prior-version request, missing translation, unavailable rights-request path, and document retrieval failure
- **Lifecycle / journeys:** All lifecycle stages / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### LEG-004 — Cookie Notice

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** Explain cookies and similar technologies, purposes, duration, and available controls.
- **Ownership:** Legal; supported by Marketing, Security, Customer, and Analytics when governed
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Legal and Policies Hub, cookie controls, Privacy Notice, and footer / `/legal/cookies`
- **Search participation:** Indexed as authoritative legal content
- **Relationships / actions:** Leads to governed cookie controls, Privacy Notice, and prior versions; action is understand technologies and manage available choices
- **Required states:** Superseded version, control service unavailable, missing translation, and document retrieval failure
- **Lifecycle / journeys:** All lifecycle stages / all Tier 1 journeys
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### LEG-005 — Accessibility Statement

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** State accessibility commitments, known limitations, standards target, and an accessible feedback path.
- **Ownership:** Legal; supported by Design, Engineering, Product, and Support
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Legal and Policies Hub, footer, and accessibility feedback references / `/legal/accessibility`
- **Search participation:** Indexed as authoritative informational content
- **Relationships / actions:** Leads to an accessible Support contact path and prior versions; action is understand commitments and report a barrier
- **Required states:** Contact path unavailable, missing alternate format, missing translation, superseded version, and document retrieval failure
- **Lifecycle / journeys:** All lifecycle stages / all Tier 1 journeys
- **Horizon / maturity / status:** Expansion / Provisional / Approved

#### LEG-006 — Delivery Policy

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** Publish authoritative delivery conditions, responsibilities, constraints, and exception handling.
- **Ownership:** Legal; supported by Purchase, Delivery, Support, and Customer
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Legal and Policies Hub, Checkout, Order Detail, Support Center, Support Article, and footer / `/legal/delivery`
- **Search participation:** Indexed as authoritative legal and Support-adjacent content
- **Relationships / actions:** References relevant Support guidance and prior versions; action is understand applicable delivery terms
- **Required states:** Superseded version, jurisdiction or service-area mismatch, missing translation, and document retrieval failure
- **Lifecycle / journeys:** Purchase, Track, Receive, and Support / J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### LEG-007 — Returns and Refund Policy

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** Publish authoritative return eligibility, timing, condition, logistics, and refund rules.
- **Ownership:** Legal; supported by Support, Purchase, Payments, Delivery, and Customer
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Legal and Policies Hub, Returns and Refunds Hub, Order Detail, Checkout, Support Article, and footer / `/legal/returns`
- **Search participation:** Indexed as authoritative legal and Support-adjacent content
- **Relationships / actions:** Leads to actionable Returns and Refunds guidance and prior versions; action is understand applicable rules
- **Required states:** Superseded version, policy-version mismatch with an order, missing translation, and document retrieval failure
- **Lifecycle / journeys:** Purchase, Receive, Support, and Return / post-purchase J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### LEG-008 — Warranty Policy

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** Publish authoritative coverage, exclusions, evidence, remedies, and warranty-process rules.
- **Ownership:** Legal; supported by Support, Catalog, Purchase, Customer, and repair operations when governed
- **Audience / access / shell:** Guest and customer / Public / Storefront
- **Entry / URL:** Legal and Policies Hub, Warranty and Repairs Hub, Product Detail, Order Detail, Support Article, and footer / `/legal/warranty`
- **Search participation:** Indexed as authoritative legal and Support-adjacent content
- **Relationships / actions:** Leads to actionable Warranty and Repairs guidance and prior versions; action is understand applicable coverage
- **Required states:** Superseded version, product-policy mismatch, manufacturer-only coverage, missing translation, and document retrieval failure
- **Lifecycle / journeys:** Evaluate, Purchase, Receive, Support, and Return / J-01 through J-06
- **Horizon / maturity / status:** Foundation / Provisional / Approved

#### LEG-009 — Financing Terms

- **Type / class:** Versioned fixed document / Legal and Informational
- **Purpose:** Publish applicable financing disclosures, eligibility conditions, costs, obligations, and provider terms.
- **Ownership:** Legal; supported by Purchase, Payments, Customer, and financing providers when governed
- **Audience / access / shell:** Guest and customer / Public when financing is offered / Storefront
- **Entry / URL:** Legal and Policies Hub, Product Detail financing information, Cart, Checkout, Order Detail, and Support / `/legal/financing`
- **Search participation:** Indexed only while applicable financing is available
- **Relationships / actions:** References provider disclosures, Checkout, Support, and prior versions; action is understand financing before selection
- **Required states:** Financing unavailable, provider-specific variant, superseded version, offer mismatch, missing translation, and document retrieval failure
- **Lifecycle / journeys:** Evaluate, Purchase, and Support / J-01 through J-06
- **Horizon / maturity / status:** Foundation when financing launches; otherwise Future / Provisional / Approved

### Block 5A embedded experience units

The following remain embedded within legal or initiating product experiences:

- Document table of contents and section navigation
- Version and effective-date disclosure
- Prior-version selector when required
- Consent acknowledgement
- Cookie controls
- Policy excerpts and contextual links

Contextual excerpts never replace the authoritative policy destination. Exact legal content, consent events, and retention rules require specialist legal review.

## Protected architectural boundaries

- Unified checkout remains one page with modular sections.
- Guided and Expert PC Builder initialization converge on the same non-linear Engineering Workspace.
- Contextual AI panels are embedded units; the dedicated AI experience is a page.
- Search result groups remain one unified results experience unless a later decision approves separate landing templates.
- System states are not duplicated as standalone pages unless they have their own route-level purpose.

## Population method

The complete inventory will be assembled as one canonical registry across all 12 product-surface classes. This allows cross-surface gaps, duplicated responsibilities, missing relationships, and ownership conflicts to be identified before wireframing.

A journey-first subset is insufficient as the canonical inventory because it would underrepresent post-purchase, operational, legal, and system surfaces. Tier 1 journey coverage remains a validation lens over the comprehensive registry.

## Next decision

Review and approve the individual entries in the complete Page Inventory, then validate coverage, relationships, domain ownership, access, search participation, required states, metadata maturity, and delivery horizons.
