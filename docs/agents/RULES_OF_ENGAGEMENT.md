# 📜 Agent Rules of Engagement

This document defines the mandatory protocols for all AI agents operating within this repository. **All agents must read and adhere to these rules before executing any task.**

---

## 🏗️ 1. Architecture & File System

To prevent "flat-file" clutter and maintain a navigable project structure:

- **Physical Nesting Only**: Slashes in folder names are strictly prohibited.
- **Directory Creation**: Always create physical nested directories (e.g., `src/components/PRIMITIVES/Display/Toolbar/`) instead of a single folder named `PRIMITIVES/Display/Toolbar`.
- **Index Pattern**: Every component folder must include an `index.ts` file that exports the component for clean barrel imports.

## 🎨 2. Design System & Tokens

We use a token-based OKLCH system for maximum theme flexibility:

- **Zero Hex Policy**: Hardcoded hex codes (`#FFFFFF`) or RGB values are strictly forbidden in `.styles.ts` files.
- **Token Usage**: Always use CSS custom properties from the global system (e.g., `var(--sys-color-primary)`, `var(--sys-spacing-md)`).
- **Theme Awareness**: Ensure components respond to `light` and `dark` modes by relying on the tokens defined in `GlobalStyles.ts`.

## ♿ 3. Accessibility (A11Y)

Accessibility is a core requirement, not a "nice-to-have":

- **Semantic Landmarks**: Use appropriate roles (`role="toolbar"`, `role="status"`, `role="contentinfo"`) and semantic HTML tags (`<footer>`, `<nav>`, `<section>`).
- **Labeling**: Use `aria-labelledby` to link regions to their headings to ensure a single source of truth for accessible names.
- **Live Regions**: Use `aria-live="polite"` for dynamic content updates like "All Voted" banners.

## 📝 4. Git & Commit Standards

The `@COMMIT_EXPERT.md` is the final authority on the git history. Every commit must follow this format:

- **Gitmoji Prefix**: Every commit must start with a relevant Gitmoji:
  - 🎨 `:art:` — UI/Style changes.
  - 🏗️ `:building_construction:` — Architectural or folder structure changes.
  - ♿ `:wheelchair:` — Accessibility improvements.
  - 🧪 `:test_tube:` — Storybook or test updates.
  - 🔧 `:wrench:` — System tokens or configuration.
- **Message Format**: `[gitmoji] [Component/Context]: [Action-oriented description]`
  - _Example:_ `🎨 Toolbar: Implement visual island styling with OKLCH tokens`

## 🚦 5. Execution Flow

- **Verify Before Push**: Before performing a `git push`, the `@TECH_LEAD.md` must verify that the Storybook build is successful and that the file system structure matches the request.
- **Atomic Commits**: Group related changes (e.g., a new component and its stories) into a single semantic commit rather than multiple fragmented pushes.
