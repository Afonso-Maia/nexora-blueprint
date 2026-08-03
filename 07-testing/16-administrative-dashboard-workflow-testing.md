# Administrative Dashboard Workflow Testing

**Status:** Approved

## Decision

Admin testing follows capability, object scope, field restriction, assurance, approval, source effect, and Audit boundaries. The separate Admin application is tested as a governed workforce coordinator, never as generic CRUD or direct database access.

## Coverage model

Every Admin Queue and Resource Workspace covers:

- capability-filtered navigation and route access;
- object and regional/organizational scope;
- restricted fields and non-disclosure;
- source freshness, revision, eligibility, and conflict;
- reason, preview, impact, assurance, approval, and segregation requirements;
- authoritative command outcome and Audit correlation;
- empty, partial, stale, unavailable, pending, indeterminate, and recovery states;
- compact/data-wide layouts, keyboard operation, focus, announcements, and long pt-BR content.

## Workflow families

Representative deployed workflows cover:

- Order/fulfillment exception handling
- Support Case and obligation work
- Catalog/taxonomy publication
- Pricing/promotion governance
- Inventory adjustment
- Content publication
- User access, temporary privilege, review, offboarding, and emergency access
- Export, privacy, Audit investigation, bulk, and scheduled operation

Source-specific suites prove detailed rules. Admin journeys prove permission-aware composition and source-owned effects.

## Bulk, approval, and export

Tests exercise mixed eligibility, selection invalidation, partial acceptance, per-item outcomes, retry/reconciliation, cancellation, large scope, and safe leave/return. Approval cannot be self-granted where segregation applies. Exports prove scope, field filtering, reason, assurance, encryption, expiry, download authorization, and Audit.

## Negative matrix

For each Q0/Q1 action, cover absent capability, wrong object scope, restricted field, insufficient assurance, stale approval, conflicted revision, retired resource, dependency loss, and tampered client request. Source enforcement is asserted independently of UI visibility.

## Rejected alternative

Role-name-only testing is rejected because roles are bundles, while effective authorization depends on capability, scope, object, field, context, assurance, and lifecycle.

## References

- [Admin IA](../03-product-structure/06-administrative-dashboard-ia.md)
- [Roles and Permissions](../03-product-structure/07-roles-and-permissions.md)
- [Admin Engineering](../06-engineering/23-administrative-dashboard-application-architecture.md)
