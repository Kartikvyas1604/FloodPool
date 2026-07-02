# Contributing to HalfLine

Thank you for your interest in contributing. This document covers the conventions and workflows we follow.

## Code of Conduct

Be respectful, constructive, and inclusive. HalfLine is a small team project — every contribution matters.

## Development Setup

```bash
# Clone and install
pnpm install

# Run the web app
pnpm dev:web

# Run typecheck in watch mode
pnpm typecheck --watch
```

## Shared-First Rule

Before writing any logic inside `apps/*`, ask: **could this live in `packages/`?**

If yes, put it there. This ensures web, mobile, and extension share 90%+ of their logic without copy-pasting.

```
apps/web      → UI specific to the web scoreboard
apps/mobile   → UI specific to React Native
packages/ui   → All shared components, design primitives
packages/hooks → All shared React hooks
packages/api  → API client, types, data models
packages/utils → Pure functions (formatters, validators)
packages/store → Zustand stores
```

## Platform Resolution

- `.native.tsx` files are resolved automatically by Metro/Expo on mobile
- `.tsx` files are used by web and extension
- Never use `if (Platform.OS === ...)` inside shared packages — use file extensions instead

## Code Style

- **TypeScript** — Strict mode enabled. Avoid `any` and `@ts-ignore`.
- **React** — Functional components with hooks. No class components.
- **CSS** — Tailwind CSS v4 with `@theme` tokens defined in `globals.css`. Use design tokens (e.g., `text-chalk`, `bg-pitch-dark`) rather than raw colors.
- **Formatting** — Prettier with default config. Run `pnpm lint` before pushing.
- **Imports** — Prefer named exports. Use `import type` for type-only imports.

## Commit Guidelines

We use conventional, descriptive commit messages:

```
area: brief description of the change
```

Examples:

```
web: add live glow animation to active scoreboard
api: add typed response for validate_stat CPI
ui: fix TeamBadge highlight prop not being consumed
store: migrate match state to Zustand
```

Keep commits small and focused. Each commit should represent one logical change. Avoid "fix stuff" or "wip" commits.

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm typecheck` and `pnpm lint` — CI will run these too
4. Open a PR against `main`
5. CI runs automatically via GitHub Actions (build + lint). Only affected packages are rebuilt thanks to Turborepo.

### PR Checklist

- [ ] Typecheck passes (`pnpm typecheck`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Changes follow the shared-first rule
- [ ] Design tokens used where applicable (not raw hex values)
- [ ] Reduced-motion media query respected for new animations

## Adding a New Shared Package

1. Create `packages/<name>/` with `package.json`, `tsconfig.json`, and `src/index.ts`
2. Add build/lint/typecheck tasks to the package's `package.json`
3. Import via `@halfline/<name>` from any app — Turborepo handles the dependency graph

## Design System

HalfLine uses a stadium scoreboard aesthetic. Refer to `brand.md` for:

- **Color palette** — pitch greens, chalk white, floodlight amber, corner-flag red
- **Typography** — DSEG7 Classic (LED digits), League Gothic (headlines), IBM Plex Mono (data)
- **Voice** — Direct, sports-broadcast tone. No crypto-jargon overuse.
- **Signature animation** — The split-flap flip at halftime resolution. Everything else stays subtle.

New UI should feel like it belongs on a scoreboard, not a dashboard. If you're unsure, open a draft PR and we'll review together.

## Questions?

Open a discussion or issue. We're responsive and happy to help.
