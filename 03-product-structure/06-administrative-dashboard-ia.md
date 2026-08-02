# Administrative Dashboard Information Architecture

**Status:** Approved in part — navigation model approved; detailed behavior pending

## Purpose

This document defines how authorized workforce users navigate Nexora operations, find governed resources, move between related workspaces, and act within permission boundaries.

It builds on the approved [Page Inventory](01-page-inventory.md), [relationships and ownership](02-page-relationships-and-ownership.md), [Information Hierarchy](03-information-hierarchy.md), [Account Architecture](04-account-architecture.md), and [Support Center Architecture](05-support-center-architecture.md).

## Decision

Nexora uses **stable capability-based Admin navigation**.

The Admin shell is organized around durable operational capabilities rather than organizational charts, individual job titles, or temporary assignments. Personal queues, saved views, recent objects, and alerts augment this structure without replacing it.

## Primary Admin navigation

The conceptual navigation is:

1. **Overview**
2. **Catalog**
   - Products
   - Categories
   - Brands
   - Attribute Definitions
   - Compatibility Rules
3. **Commerce Operations**
   - Inventory
   - Pricing
   - Orders
4. **Customers and Support**
   - Customers
   - Support Queue
5. **Content and Growth**
   - Collections
   - Promotions
   - Content Library
   - Search Governance
   - Review Moderation
6. **Access and Governance**
   - Workforce Users
   - Roles
   - Audit Log
   - Operational Settings
7. **Insights**
   - Reports and Analytics

These are navigation groups, not additional canonical pages. Each listed destination uses its approved inventory entry.

## Navigation stability

Section names, resource ownership, and canonical routes remain stable across workforce roles. Permissions adapt what a user may discover and do; they do not create a different information architecture for every team.

1. Users see navigation destinations they are authorized to discover.
2. Counts, badges, summaries, and alerts follow the same permission and data-scope rules as their destinations.
3. A hidden destination is not an authorization control; every route and operation independently enforces access.
4. Direct links preserve a safe intended destination through authentication or step-up when eligible.
5. Revoked or insufficient access produces a non-disclosing boundary and safe return path.
6. A user with partial field access can reach an eligible workspace without receiving restricted values in navigation labels, previews, search, or counts.
7. Temporary assignments can add queues or saved views without renaming or relocating the canonical capability.

Exact roles, permissions, field restrictions, approvals, and segregation-of-duties rules remain governed by the later Roles and Permissions architecture.

## Object-centered transitions

Admin collection and queue pages lead to durable object workspaces. Related resources use explicit contextual links, including:

- Product to Category, Brand, Attributes, Compatibility, Inventory, Pricing, Reviews, and customer-facing preview
- Order to Customer, payment, fulfillment, Support Case, and audit context
- Customer to eligible Orders and Support Cases
- Content or promotion to governed products, collections, publication state, and preview
- Workforce user or role to permitted access and audit context

Contextual links do not duplicate source records or transfer ownership. The destination identifies its owning capability and rechecks authorization, resource scope, current state, and permitted actions.

Cross-domain navigation preserves a safe origin and relevant object reference when useful. Returning may restore eligible list filters, saved view, selection, or scroll context. It never replays a mutation or carries sensitive values in URLs.

## Operational discovery

Admin operational search, saved views, recents, and alerts are permission-filtered discovery mechanisms.

- Operational search returns only resource types, records, fields, and actions the user may discover.
- Result grouping communicates the owning capability.
- Saved views retain governed filters and presentation, not access rights.
- Recent-resource history excludes or redacts objects after access changes.
- Alerts link to the authoritative queue or workspace and cannot grant access or preserve stale action eligibility.
- Shared URLs identify the resource or governed view; recipients independently resolve their permitted representation.

Public customer Universal Search does not index Admin destinations or operational records.

## Responsive continuity

Compact and mobile Admin layouts preserve the same conceptual groups and canonical destinations. Navigation may collapse into a drawer or switcher, while workspace controls progressively disclose according to the approved Admin archetype contracts.

High-density, comparison-heavy, or bulk operations may require a guarded larger-workspace mode as approved in the Information Hierarchy. The user receives a clear explanation and safe continuation path; the underlying resource does not move to a different IA.

## Governance rules

1. Admin Platform owns the shared shell, navigation system, operational discovery, and cross-workspace continuity.
2. Each destination and resource retains the owner recorded in the ownership ledger.
3. Organizational restructuring alone does not rename or relocate canonical capabilities.
4. New navigation groups require a durable capability distinction, not merely a new team.
5. Cross-domain summaries cite source state and do not become parallel records.
6. Counts and previews never expose restricted object existence or sensitive field values.
7. Permission changes take effect across navigation, search, recents, saved views, deep links, and active workspaces.
8. AI may help locate or summarize permitted operational context but cannot expand discovery or action scope.

## Provisional dependencies

The following remain pending:

- Operations Overview composition and prioritization
- Collection, queue, saved-view, and bulk-action model
- Resource workspace editing, validation, approval, and publication model
- Cross-domain order, customer, and Support operations
- Admin search, command, and recent-work behavior
- Audit and high-risk action presentation
- Exact roles, permissions, and segregation of duties
- Admin degraded and continuity behavior

## Next decision

Define the Operations Overview composition and prioritization, followed by queues, workspaces, cross-domain operations, and governance behavior.
