# Page Inventory

**Status:** Approved in part — classification model approved; complete inventory pending

## Purpose

The Page Inventory is the governed registry of Nexora pages and page templates. It must support wireframing without requiring designers to invent missing pages, relationships, states, access boundaries, or ownership.

This document currently approves the inventory classification model. It does not yet approve the complete page inventory.

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
| Decision status | Proposed, Approved, Superseded, or Deprecated |

## Classification rules

1. Every page has exactly one primary class and one accountable owning domain. It may have multiple supporting domains.
2. Pages and transient states are distinct. A full-route system destination may be inventoried as a page; inline empty, loading, error, offline, and degraded conditions attach to their host page.
3. A route is not automatically a unique page. Suggestions, drawers, modals, checkout sections, and contextual AI panels are embedded experience units unless they have an independent user goal, URL, lifecycle, or access boundary.
4. Lifecycle position and Tier 1 journeys are cross-references, not containers. This prevents multi-stage pages from being duplicated.
5. Page classification does not create navigation. Navigation remains governed by the approved [Navigation](../02-information-architecture/03-navigation.md).
6. Search participation follows the approved [Universal Search](../02-information-architecture/05-search.md) and must be explicit for every page or template.
7. Conceptual URL patterns do not approve implementation routing.

## Protected architectural boundaries

- Unified checkout remains one page with modular sections.
- Guided and Expert PC Builder initialization converge on the same non-linear Engineering Workspace.
- Contextual AI panels are embedded units; the dedicated AI experience is a page.
- Search result groups remain one unified results experience unless a later decision approves separate landing templates.
- System states are not duplicated as standalone pages unless they have their own route-level purpose.

## Next decision

Populate the complete Page Inventory using this model, then validate coverage, relationships, domain ownership, access, search participation, and required states.

