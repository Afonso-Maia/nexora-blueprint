# Light and Dark Theme Parity

**Status:** Approved

## Decision

Provide light, dark, and system-preference modes with user override persisted locally without identity or tracking. Both themes expose identical information, hierarchy, state, interaction, and accessibility.

Use semantic publication tokens and theme-aware code, diagram, image, focus, selection, status, and surface treatments. Do not invert arbitrary images, reduce text weight for dark mode, or use low-contrast gray for visual refinement.

Prevent avoidable theme flash through standards-compatible initialization. If scripting fails, the system preference and all content remain usable.

## Validation

Run automated contrast checks plus manual comparison across landing, source documents, navigation, search, filters, tables, diagrams, code, status, errors, print, forced colors, and high zoom. Theme parity is release blocking.

## References

- [Precision Gold, Color, and Themes](../04-design-system/04-precision-gold-color-and-themes.md)
- [Visual Regression and Theme Validation](../07-testing/09-visual-regression-and-theme-validation.md)
