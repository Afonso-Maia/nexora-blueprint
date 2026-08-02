# Iconography and Imagery

**Status:** Approved

## Purpose

This document defines icon construction, semantic use, custom-icon governance, product photography, editorial imagery, diagrams, placeholders, media treatment, and accessibility.

## Decision

Nexora adopts **Lucide as the base icon system** and permits governed custom extensions only for durable Nexora concepts the base library cannot express accurately.

Product imagery is factual, neutral, and detail-preserving. Editorial imagery supports context and aspiration without displacing Search or product truth. Illustration is primarily explanatory—for systems, onboarding, and recovery—not decorative filler.

The authoritative upstream is the [Lucide project](https://github.com/lucide-icons/lucide), distributed under the [ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE).

## Visual principles

1. Icons clarify actions, objects, and state; labels carry essential meaning.
2. One concept uses one canonical icon across products.
3. Product media represents the actual product and selected variant.
4. Imagery never fabricates inventory, Compatibility, included items, or performance.
5. Technical diagrams favor explanation over spectacle.
6. Theme changes protect legibility without altering product color.
7. Empty states remain calm and actionable rather than illustration-led.
8. Brand logos and manufacturer marks retain their governed source treatment.

## Icon construction

Base icons use:

- `24 × 24` canonical view box
- `2` canonical stroke width
- Round line caps and joins
- No default fill
- Optical alignment to the pixel grid at common sizes
- `currentColor` or equivalent semantic color inheritance

Approved rendered sizes:

| Token | Size | Use |
| --- | ---: | --- |
| `size.icon.xsmall` | `12px` | Inline bounded metadata |
| `size.icon.small` | `16px` | Compact label and status |
| `size.icon.medium` | `20px` | Default control and list |
| `size.icon.large` | `24px` | Primary control or standalone symbol |
| `size.icon.xlarge` | `32px` | Empty, recovery, or major object cue |
| `size.icon.display` | `48px` | Rare explanatory illustration-like use |

Icons smaller than `16px` cannot carry fine internal detail. Stroke may be optically adjusted at approved sizes while preserving the same visual family.

## Icon semantics

### Action icons

Action icons use a visible label unless:

- The action is universally familiar in context.
- An accessible name is present.
- Ambiguity has been tested.
- The same icon is used consistently.

Icon-only controls are appropriate for close, search, menu, account utility, quantity increment/decrement, media controls, and other highly familiar bounded actions. Destructive, financial, permission, and unfamiliar technical actions retain visible labels.

### Object icons

Object icons identify categories, domains, files, communication channels, and operational resources. They cannot substitute for the object name when several objects may share a symbol.

### Status icons

Status icons pair with text and semantic color:

- Informational: circle-information or equivalent
- Positive: check within an appropriate container
- Cautionary: warning triangle or equivalent
- Critical: error or blocked symbol
- Pending: clock or progress symbol
- Unknown: explicit question or unavailable symbol

Compatibility uses separate compatible, warning, hard-incompatible, and unknown semantics. A generic check cannot represent all successful validations when the distinction matters.

### Directional icons

Directional icons follow reading direction where applicable. Arrows that describe physical orientation, graph movement, price change, upload/download, or undo retain their intrinsic meaning.

## Custom icons

A custom icon requires:

- A durable Nexora concept
- Repeated use across approved pages or patterns
- No accurate Lucide equivalent
- A clear accessible name
- Construction compatible with the base grid and stroke
- Light/dark and small-size validation
- Ownership and source asset

Likely governed extension areas include:

- Compatibility relationship and evaluation semantics
- PC component slots and build state
- Comparison difference classes
- Nexora-specific delivery or service objects
- Permission scope or staged-change concepts not expressible by existing symbols

Custom icons cannot depict unapproved product capabilities or create a parallel category taxonomy.

## Icon accessibility

- Decorative icons are hidden from assistive technology.
- Informative icons have an accessible text equivalent.
- Icon buttons expose names matching visible terminology.
- Status is never icon-only.
- Icons inside text inherit text contrast; standalone essential icons meet non-text contrast.
- Tooltips supplement unfamiliar icons but do not replace accessible names or essential visible labels.
- Animated icons follow the governed motion and reduced-motion contract.

## Product photography

### Required media set

Where source assets exist, Product Detail supports:

- Clear primary product view
- Alternate angles
- Ports, connectors, controls, and relevant physical details
- Scale or in-context view when truthful
- Variant-specific imagery
- Packaging and included-item representation when authoritative

The first image prioritizes recognition. Detail views support evaluation rather than lifestyle promotion.

### Product stage

- Use neutral, color-stable surfaces.
- Preserve accurate product hue, finish, texture, and proportions.
- Maintain visible boundaries for white, black, reflective, and transparent products.
- Avoid gold-tinted lighting that changes perceived color.
- Do not place essential text inside product images.
- Use consistent scale within comparable product sets where practical.

### Variants

Selecting a variant updates media only when authoritative variant assets exist. Missing variant imagery is disclosed; the system does not imply that a generic image represents exact color or configuration.

### Image fit

- Product cutouts generally use contain behavior.
- Lifestyle and editorial media may use cover behavior with governed focal points.
- Cropping cannot remove decisive ports, dimensions, accessories, or context.
- Zoom exposes additional genuine detail and retains keyboard and touch access.

## Product-card media

- Cards use one stable bounded ratio per collection context.
- Media does not force decisive price, stock, Compatibility, or action content below an inaccessible fixed height.
- Alternate-image hover is supplementary and has no touch-only dependency.
- Loading preserves media space.
- Missing media uses a neutral placeholder with product identity, not an unrelated stock image.

## Editorial imagery

Editorial imagery may:

- Establish a use context
- Support buying guidance
- Explain a collection or campaign
- Show product scale or environment

It cannot:

- Dominate the Search-first Home hierarchy
- Simulate an unavailable product bundle
- Present AI-generated hardware detail as factual
- Conceal sponsorship or promotion
- Interrupt legal, Support, authentication, transaction, or Admin tasks

Campaign variation remains inside governed slots and contrast treatments.

## AI-generated imagery

AI-generated imagery is allowed only for clearly non-factual editorial or conceptual illustration after content and brand review.

It is prohibited for:

- Product-detail representation
- Variant color or physical-feature evidence
- Packaging or included-item evidence
- Damage, repair, warranty, or return evidence
- Compatibility diagrams presented as deterministic fact
- Identity, payment, delivery, or Support proof

Required disclosure follows future content and legal policy. Lack of a final disclosure policy blocks publication, not system accessibility review.

## Illustration

Illustrations use:

- Restrained geometric construction
- Warm neutrals with scarce gold
- Functional color only when the semantic state is real
- Limited detail that survives theme and scale changes
- No loud gamer motifs, neon glow, mascots, or decorative circuitry

Appropriate uses include:

- First-use education
- System concepts
- Support explanations
- Safe recovery context
- Empty states where an image materially improves comprehension

Illustration remains secondary to the state title, explanation, and recovery action.

## Technical diagrams

Compatibility, PC Builder, networking, installation, and Support diagrams:

- Name parts and relationships explicitly.
- Pair color with labels, line styles, or shapes.
- Provide text alternatives or structured equivalents.
- Preserve direction, scale, and dependency meaning.
- Distinguish deterministic facts from illustrative examples.
- Support zoom and reflow or provide an accessible alternate representation.

## Avatars and identity

Customer and workforce avatars are optional representations, not identity proof.

- Initials use governed text and contrast.
- Missing avatars use a neutral fallback.
- External-provider and non-human subjects are labeled by subject class where relevant.
- AI uses an explicit Nexora AI mark and label, not a human portrait.
- Permission or assurance is never inferred from avatar styling.

## Brand and manufacturer marks

- Nexora marks use approved light/dark assets with protected clear space.
- Manufacturer logos do not replace brand names in Search, filters, or accessibility text.
- Third-party marks retain aspect ratio and source approval.
- Monochrome treatment is allowed only when brand rules permit it.
- Logos are not recolored gold merely for visual consistency.

## Theme behavior

- Photographs are not inverted or globally recolored.
- Icons resolve semantic foreground colors.
- Line art may use theme-specific approved assets.
- Dark-theme media stages reduce glare without hiding detail.
- Placeholder and skeleton media remain distinct.
- Scrims use the [depth contract](07-shape-borders-elevation-and-depth.md).

## Performance and resilience

Later implementation must support:

- Responsive image sources and appropriate formats
- Explicit intrinsic dimensions
- Lazy loading outside the initial critical task
- Priority loading for primary Product Detail media where justified
- Stable placeholders to reduce layout shift
- Asset provenance and versioning
- Graceful failure without losing product identity or action context

Media failure cannot remove price, inventory, Compatibility, labels, or purchase and recovery actions.

## Governance

1. The Lucide version is a governed dependency and cannot update silently.
2. Icon substitution requires semantic review, not only visual preference.
3. Custom icons use the shared contribution lifecycle.
4. Product media remains owned by Catalog or its approved content source.
5. Marketing owns editorial media within governed slots and truth constraints.
6. Support evidence and customer-uploaded media follow Support privacy and retention contracts.
7. New illustration styles require Design System and Brand approval.

## Validation

Validate:

- Canonical icons at every approved size and theme
- Keyboard, touch, accessible-name, and tooltip behavior
- Product images for light, dark, reflective, transparent, and missing-media cases
- Variant mismatch and stale-media states
- Portuguese alternative text and long labels
- Zoom, reflow, high contrast, and reduced transparency
- Low bandwidth, partial media, and asset failure
- Compatibility and technical diagrams with non-color alternatives
- AI, provider, and non-human subject representation

## Consequences

### Benefits

- A mature base library limits redundant icon design.
- Governed extensions preserve Nexora-specific technical meaning.
- Factual imagery supports trustworthy electronics evaluation.
- Illustration remains purposeful and calm.

### Costs and risks

- Upstream icon changes require version review.
- Custom domain icons need consistency and accessibility testing.
- Accurate product media requires disciplined source operations.
- Editorial creativity is intentionally constrained around core tasks.

## Next decision

Define motion tokens, interaction feedback, loading transitions, spatial continuity, and reduced-motion behavior.
