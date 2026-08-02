# Page Inventory

**Status:** Approved in part — governing model and Blocks 1–2 approved; remaining inventory pending

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
