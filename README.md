# HalfLine — Live Match Escrow

Peer-to-peer USDC escrow on Solana. Two wallets stake USDC on a live football match's first-half corner count (over/under), settled automatically at halftime via an on-chain CPI into TxLINE's `validate_stat`.

## Architecture

This is a **pnpm monorepo** with Turborepo build orchestration.

```
halfline/
├── apps/
│   └── web/                   ← Next.js web app (scoreboard UI)
├── packages/
│   ├── config/                ← Shared TypeScript, ESLint, Prettier configs
│   ├── ui/                    ← Shared component library (design tokens, primitives, atoms)
│   ├── hooks/                 ← Shared React hooks (useTheme, usePlatform, useLocalStorage)
│   ├── utils/                 ← Pure utility functions (formatters, validators, storage, logger)
│   ├── store/                 ← Zustand stores (match state, settings)
│   └── api/                   ← API client and types for TxLINE feed
```

## Getting Started

```bash
pnpm install

# Run the web app
pnpm dev --filter=@halfline/web
```

Open [http://localhost:3000](http://localhost:3000) to see the scoreboard.

## Available Commands

| Command | Description |
|---|---|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | TypeScript check all packages |
| `pnpm clean` | Clean all build artifacts |
| `pnpm dev:web` | Dev server for web app only |
| `pnpm build:web` | Build web app only |

## Adding a Shared Package

1. Create `packages/<name>/` with `package.json`, `tsconfig.json`, and `src/index.ts`
2. Add it to `pnpm-workspace.yaml` if needed (already covers `packages/*`)
3. Add a reference in root `tsconfig.json`
4. Import via `@halfline/<name>` in any app

## Design Identity

HalfLine uses a **stadium scoreboard** aesthetic — deep turf greens, warm chalk-white text, amber floodlight accents, and corner-flag red for stakes. The signature font is **DSEG7 Classic** (seven-segment LED) for the countdown clock and corner tally, **League Gothic** for headlines, and **IBM Plex Mono** for data readouts.

See `brand.md` for the full design token reference.

## Environment

```env
NEXT_PUBLIC_TXLINE_API=https://api.devnet.txline.io
```
