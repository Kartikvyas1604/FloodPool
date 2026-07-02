# HalfLine

**Peer-to-peer USDC escrow on Solana.** Two wallets stake USDC on a live football match's first-half corner count (over/under), settled automatically at halftime via an on-chain CPI into TxLINE's `validate_stat`.

HalfLine is a stadium scoreboard that doubles as a settlement engine — no order books, no liquidity pools, just a direct wager between two parties, resolved by an oracle.

## Architecture

This is a **pnpm monorepo** with Turborepo build orchestration.

```
halfline/
├── apps/
│   ├── web/                   Next.js web app (scoreboard UI)
│   ├── mobile/                React Native app (iOS/Android)
│   └── extension/             Browser extension
├── packages/
│   ├── config/                Shared TypeScript, ESLint, Prettier configs
│   ├── ui/                    Shared component library (design tokens, primitives, atoms)
│   ├── hooks/                 Shared React hooks (useTheme, usePlatform, useLocalStorage)
│   ├── utils/                 Pure utility functions (formatters, validators, storage, logger)
│   ├── store/                 Zustand stores (match state, settings)
│   └── api/                   API client and types for TxLINE feed
├── brand.md                   Design token reference
├── turbo.json                 Turborepo pipeline config
└── pnpm-workspace.yaml        Workspace declaration
```

## Quick Start

**Prerequisites:** Node.js >=20.9.0, pnpm 10

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the scoreboard.

### Per-app Commands

| Command | Description |
|---|---|
| `pnpm dev` | Run all apps in dev mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all packages |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | TypeScript check across all packages |
| `pnpm clean` | Clean all build artifacts |
| `pnpm dev:web` | Dev server (web app only) |
| `pnpm dev:mobile` | Dev server (mobile app only) |
| `pnpm dev:extension` | Dev server (extension only) |
| `pnpm build:web` | Production build (web app only) |

## How It Works

1. **Match Selection** — Browse live football fixtures from the TxLINE feed.
2. **Staking** — Connect your Solana wallet and stake USDC on OVER or UNDER the first-half corner line.
3. **Live Tracking** — The scoreboard displays a running clock and live corner count from the oracle feed.
4. **Settlement** — At halftime, an on-chain CPI call to TxLINE validates the final corner count. The winning wallet receives the escrowed USDC automatically.

## Design Identity

HalfLine uses a **stadium scoreboard** aesthetic — deep turf greens, warm chalk-white text, amber floodlight accents, and corner-flag red for stakes. The signature font is **DSEG7 Classic** (seven-segment LED) for the countdown clock and corner tally, **League Gothic** for headlines, and **IBM Plex Mono** for data readouts.

See [`brand.md`](./brand.md) for the full design token reference (colors, typography, voice, and signature animations).

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_TXLINE_API` | `https://api.devnet.txline.io` | TxLINE oracle API endpoint |

## Packages

| Package | Description |
|---|---|
| `@halfline/config` | Shared ESLint, TypeScript, and Prettier configuration presets |
| `@halfline/ui` | Design system primitives and composable UI components |
| `@halfline/hooks` | Cross-platform React hooks |
| `@halfline/utils` | Pure utility functions (number formatting, address shortening, validation) |
| `@halfline/store` | Zustand state management (match state, wallet, UI settings) |
| `@halfline/api` | Typed API client and data models for the TxLINE feed |

## Adding a Shared Package

1. Create `packages/<name>/` with `package.json`, `tsconfig.json`, and `src/index.ts`
2. Add a reference in root `tsconfig.json` if needed
3. Import via `@halfline/<name>` from any app

Shared packages are auto-detected via the `packages/*` glob in `pnpm-workspace.yaml`.

## License

No license specified yet.
