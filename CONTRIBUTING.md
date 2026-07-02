# Contributing

## Shared-First Rule

Before writing any logic in an app (`apps/*`), ask: **could this live in `packages/`?** If yes, put it there.

This ensures:
- Web, mobile, and extension share 90%+ of their logic
- No copy-pasting across apps
- One source of truth for types, utilities, and components

## Platform Resolution

- `.native.tsx` files are resolved automatically by Metro/Expo on mobile
- `.tsx` files are used by web and extension
- Never use `if (Platform.OS === ...)` inside shared components

## Commits

Keep commits small and focused. Each commit should represent one logical change.

## Pull Requests

PRs run CI (build + lint) automatically via GitHub Actions. Only affected packages are rebuilt thanks to Turborepo.
