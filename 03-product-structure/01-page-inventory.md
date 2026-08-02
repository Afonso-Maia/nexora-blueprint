# Page Inventory

**Status:** Approved in part — classification, population method, and page boundaries approved; complete inventory pending

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
