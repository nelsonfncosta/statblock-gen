---
applyTo: "**/*.{js,jsx,css,md,json}"
description: "Project guidance for cleaning up and extending the statblock generator while keeping the app focused, maintainable, and aligned with its purpose."
---

# Statblock Generator project guidance

## Purpose

This project is a statblock generator for tabletop game content. Keep updates aligned with that goal: generate, refine, and present creature/statblock data clearly and efficiently.

## Core principles

- Prefer improvements that make statblocks easier to create, understand, and edit.
- Keep the app focused on its domain; avoid unrelated features or decorative complexity.
- Favor small, readable React components over clever but opaque abstractions.
- Clean up duplication before introducing more state or UI layers.
- Improve usability and clarity before adding new polish.

## Refactoring expectations

- Prefer clear, semantic naming for components, props, and state.
- Break large components into smaller focused pieces when logic or rendering becomes hard to follow.
- Keep component responsibilities narrow: data shaping, rendering, and user interaction should be separated where practical.
- Remove dead code, stale props, and confusing patterns during the same change set when possible.
- Preserve the current app flow unless a change clearly improves the generator experience.

## Feature design guidance

- New features should support statblock creation, editing, or presentation.
- Favor improvements that reduce friction for users creating content.
- Avoid adding random extra screens, dashboards, or generic UI widgets that do not help the generator workflow.
- If a feature is added, ensure it fits the app’s theme and does not disrupt the existing statblock workflow.
- Prefer sensible defaults and simple controls over over-engineered configuration.

## Implementation preferences

- Keep React code in functional components with straightforward state patterns.
- Use existing conventions in the repo before creating new abstractions.
- Keep styling consistent with the current app aesthetic; avoid adding large style systems unless necessary.
- Prefer local state and simple prop flows unless multiple components genuinely share the same data.
- Do not add dependencies unless they clearly solve a real project problem.

## Validation

- Before finishing work, confirm the app still builds cleanly.
- Prefer targeted, maintainable changes over broad rewrites.
- If the UX becomes harder to follow, simplify it rather than layering more complexity.

## Default approach for this repo

When making changes, default to:

1. understanding the current statblock generation flow,
2. removing clutter or confusion,
3. adding only the missing features that clearly support the generator, and
4. keeping the code easy to maintain for future iteration.
