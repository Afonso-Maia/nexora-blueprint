# Page-to-System Mapping

**Status:** Approved

## Purpose

This document maps every canonical Page Inventory entry to one Design System page template, its required pattern families, and its principal design emphasis.

## Decision

All 89 approved pages consume one of the nine [Page Templates](25-page-templates.md). No page receives an independent visual architecture.

The mapping inherits the primary archetypes approved in [Page-Level Information Hierarchy](../03-product-structure/03-information-hierarchy.md).

## Universal obligations

Every row also consumes:

- Product-appropriate [Navigation Components](13-navigation-components.md)
- [System-State Components](22-system-state-components.md)
- [Accessibility Foundations](10-accessibility-foundations.md)
- [Content and Localization](23-content-and-localization.md)
- Light/dark theme, responsive layout, motion, and lifecycle validation

The table lists page-specific pattern families in addition to these universal obligations.

## Hub — 9 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| STF-001 | Home | Search, product/merchandising, recommendation | Search first; meaningful continuation before bounded merchandising |
| STF-007 | Campaign Landing | Product/merchandising, content | Bounded campaign purpose and governed destinations |
| ACC-001 | Account Dashboard | Account/post-purchase | Current obligations and federated continuation |
| PCB-001 | PC Builder Start | PC Builder | Create, resume, Guided or Expert initialization |
| SUP-001 | Support Center | Support | Search, editable issue intent, current obligation |
| SUP-003 | Returns and Refunds Hub | Support, content | Eligibility-oriented return/refund routing |
| SUP-004 | Warranty and Repairs Hub | Support, content | Product and issue context before service route |
| LEG-001 | Legal and Policies Hub | Content/document | Authoritative policy discovery and version context |
| ADM-001 | Operations Overview | Admin | Exceptions, obligations, scoped work, and degradation |

## Results/List — 13 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| STF-002 | Deals Hub | Search/filtering, product/merchandising | Governed deal criteria without banner density |
| STF-003 | Collection | Search/filtering, product/merchandising | Collection context with one product grid |
| STF-004 | Brand | Search/filtering, product/merchandising | Brand context and governed product results |
| STF-005 | Buying Guides Hub | Search/filtering, content | Find and select governed guides |
| DSC-001 | Universal Search Results | Search/filtering, product/merchandising | Query, grouped types, visible intent, products first |
| DSC-002 | Category Discovery | Search/filtering, product/merchandising | Attribute filters and one Guided/Expert grid |
| ACC-002 | Orders | Account/post-purchase | Customer-relevant status and required action |
| ACC-004 | Wishlist | Account/post-purchase, product, comparison | Saved product state and validated continuation |
| ACC-005 | Addresses | Account/post-purchase, forms | Address objects, default, eligibility, edit/remove |
| ACC-006 | Payment Methods | Account/post-purchase, forms | Masked methods, default, assurance, removal limits |
| ACC-007 | Notifications | Account/post-purchase | Source event, read state, and safe destination |
| PCB-003 | Saved Builds | PC Builder | Owned builds, freshness, resume, duplicate, archive |
| SUP-006 | My Support Cases | Support | Case state, obligation, responsibility, and resume |

## Detail — 4 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| EVA-001 | Product Detail | Product/merchandising, comparison | Variant, facts, constraints, action, evidence |
| ACC-003 | Order Detail | Account/post-purchase, Support | Composite status, current obligation, items, timeline |
| PCB-004 | Shared Build | PC Builder, product | Read-only snapshot, freshness, duplicate to own build |
| SUP-007 | Support Case Detail | Support | Current obligation before communication and history |

## Workspace — 4 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| EVA-002 | Comparison Workspace | Comparison/recommendation, product | Key differences, evidence, conditional recommendation |
| ACC-008 | Account Settings | Account/post-purchase, forms | Persistent settings, assurance, privacy, lifecycle |
| PCB-002 | Engineering Workspace | PC Builder, search/filtering, product | Non-linear slots, deterministic constraints, persistence |
| AIS-001 | AI Assistant Conversation | Recommendation, AI conversation | Optional labelled guidance, visible context, user control |

## Transaction — 9 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| PUR-001 | Cart | Cart/Checkout, product | Corrective item state, totals, direct Checkout |
| PUR-002 | Unified Checkout | Cart/Checkout, forms | Modular one-page review and idempotent commitment |
| PUR-003 | Order Confirmation | Cart/Checkout, Account | Authoritative order outcome and next obligation |
| SUP-005 | Contact and Case Start | Support, forms | Reviewed typed case creation |
| AUT-001 | Sign In | Authentication, forms | Focused identity goal and safe return |
| AUT-002 | Create Account | Authentication, forms | Minimal data, consent separation, continuation |
| AUT-004 | Credential Reset | Authentication, forms | Valid attempt, requirements, confirmed completion |
| AUT-005 | Verification | Authentication, forms | Protected action, code/link state, resend/recovery |
| AUT-006 | Security Challenge | Authentication, forms | Additional assurance without risk disclosure |

## Content/Document — 11 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| STF-006 | Buying Guide | Content/document, product | Governed advice, criteria, product continuation |
| SUP-002 | Support Article | Support, content/document | Applicability, steps, references, escalation |
| INF-001 | About Nexora | Content/document | Brand and company information without promotion density |
| LEG-002 | Terms of Use | Content/document | Authority, effective date, structured terms |
| LEG-003 | Privacy Notice | Content/document, Account | Rights, processing context, privacy continuation |
| LEG-004 | Cookie Notice | Content/document, forms | Categories, policy authority, preference continuation |
| LEG-005 | Accessibility Statement | Content/document, Support | Commitments, limitations, accessible feedback |
| LEG-006 | Delivery Policy | Content/document, Support | Applicability and delivery authority |
| LEG-007 | Returns and Refund Policy | Content/document, Support | Eligibility terms and governed return path |
| LEG-008 | Warranty Policy | Content/document, Support | Coverage, exclusions, and service path |
| LEG-009 | Financing Terms | Content/document, Cart/Checkout | Financial authority and applicable continuation |

## Recovery — 6 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| AUT-003 | Account Recovery | Authentication, forms | Non-disclosing recovery and attempt lifecycle |
| SYS-001 | Not Found | System state, Search | Safe Search, Home, or parent recovery |
| SYS-002 | Access Denied | System state, authentication | Non-disclosing safe capability destination |
| SYS-003 | Unexpected Error | System state, Support | Preserved context, safe retry, useful reference |
| SYS-004 | Service Unavailable | System state | Affected service, continuity, and retry guidance |
| SYS-005 | Offline | System state | Reconnect when no viable host-owned state remains |

## Admin Queue — 15 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| ADM-002 | Products | Admin, product | Permitted catalog worklist and product handoff |
| ADM-004 | Categories | Admin, search/filtering | Governed taxonomy worklist |
| ADM-006 | Brands | Admin, product | Brand objects and governed content |
| ADM-008 | Attribute Definitions | Admin, product | Governed attribute schema worklist |
| ADM-010 | Compatibility Rules | Admin, PC Builder | Rule lifecycle, scope, and validation state |
| ADM-012 | Inventory | Admin, product | Location/item stock, freshness, exception |
| ADM-014 | Pricing | Admin, product | Price/rule scope, schedule, and exceptions |
| ADM-016 | Orders | Admin, Cart/Checkout | Operational order state and required work |
| ADM-018 | Customers | Admin, Account | Permission-filtered customer objects |
| ADM-020 | Support Queue | Admin, Support | Priority, assignment, obligation, case handoff |
| ADM-022 | Collections | Admin, product/merchandising | Governed collection lifecycle |
| ADM-024 | Promotions | Admin, product/merchandising | Eligibility, schedule, combination, lifecycle |
| ADM-026 | Content Library | Admin, content | Content type, owner, review, publication |
| ADM-029 | Review Moderation | Admin, product | Provenance, policy, moderation outcome |
| ADM-030 | Workforce Users | Admin, authentication | Subject lifecycle, scope, access review |

## Admin Resource Workspace — 18 pages

| ID | Page | Required pattern families | Principal emphasis |
| --- | --- | --- | --- |
| ADM-003 | Product Workspace | Admin, product, forms | Current product facts versus staged catalog change |
| ADM-005 | Category Workspace | Admin, search/filtering, forms | Taxonomy impact, validation, and version |
| ADM-007 | Brand Workspace | Admin, product, forms | Brand state, content, and publication |
| ADM-009 | Attribute Workspace | Admin, product, forms | Schema impact and dependent consumers |
| ADM-011 | Compatibility Rule Workspace | Admin, PC Builder, forms | Rule test, impact, approval, activation, rollback |
| ADM-013 | Inventory Item Workspace | Admin, product, forms | Stock truth, adjustment reason, correlation |
| ADM-015 | Pricing Rule Workspace | Admin, product, forms | Simulation, scope, schedule, approval |
| ADM-017 | Order Workspace | Admin, Cart/Checkout, Account | Source actions, orchestration, partial outcomes |
| ADM-019 | Customer Workspace | Admin, Account, Support | Scoped customer view and domain-owned action gateways |
| ADM-021 | Support Case Workspace | Admin, Support | Assignment, obligation, communication, provider work |
| ADM-023 | Collection Workspace | Admin, product/merchandising | Membership, preview, schedule, publication |
| ADM-025 | Promotion Workspace | Admin, product/merchandising | Eligibility, preview, approval, activation |
| ADM-027 | Content Workspace | Admin, content | Version, localization, preview, review, publication |
| ADM-028 | Search Governance | Admin, search/filtering | Query/ranking configuration, test, impact, audit |
| ADM-031 | Role Workspace | Admin, authentication, forms | Complete scopes, segregation, impact, approval |
| ADM-032 | Audit Log | Admin | Immutable query, correlation, redaction, export |
| ADM-033 | Reports and Analytics | Admin | Scoped data, freshness, methodology, export |
| ADM-034 | Operational Settings | Admin, forms | Versioned configuration, impact, approval, history |

## Coverage counts

| Template | Pages |
| --- | ---: |
| Hub | 9 |
| Results/List | 13 |
| Detail | 4 |
| Workspace | 4 |
| Transaction | 9 |
| Content/Document | 11 |
| Recovery | 6 |
| Admin Queue | 15 |
| Admin Resource Workspace | 18 |
| **Total** | **89** |

## Extension classification

The mapping requires domain modules but no additional primary page template.

Approved domain extensions include:

- Commerce facts and merchandising
- Deterministic Compatibility
- Comparison and recommendation
- Cart and Checkout
- Account and post-purchase
- Support and authentication
- PC Builder
- Admin work and access presentation

These extensions use the shared foundations, primitives, state components, and lifecycle. They do not create parallel token or component systems.

## Validation rules

The mapping passes only when:

1. Every Page Inventory ID appears exactly once.
2. Every row uses its approved Phase 2B archetype.
3. Every template count matches the approved totals.
4. Required pattern families have approved specifications.
5. Universal obligations apply to every row.
6. No mapping creates a new page, owner, lifecycle, permission, or source truth.

## Consequences

### Benefits

- Every approved page is directly traceable to system rules.
- Wireframes can select components and states without inventing foundations.
- Domain extensions remain visible and governed.
- Coverage can be mechanically validated.

### Costs and risks

- Page-specific content and exact module applicability still require wireframe annotation.
- Changes to Page Inventory or archetype mapping require synchronized review.
- Pattern evolution needs consumer tracking across many pages.

## Next decision

Perform Phase 3 Design System and Experience Specification validation.
