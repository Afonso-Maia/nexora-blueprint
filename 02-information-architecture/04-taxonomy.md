# Product Taxonomy

**Status:** Approved

**Decision:** Hybrid taxonomy comprising Categories, Collections, Brands, Compatibility Groups, and Attributes.

## Rules

- Every product has exactly one canonical category.
- Products may belong to multiple collections.
- Collections never replace categories.
- Brands do not become category parents.
- Filters derive from governed attributes.
- Compatibility uses one shared relationship model.
- New top-level categories require an ADR.
- AI consumes governed catalog data and does not create a competing taxonomy.

## Initial top-level categories

PC Components, Laptops, Smartphones, TVs, Monitors, Gaming, Networking, Smart Home, and Accessories.

