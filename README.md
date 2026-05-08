# Core6 Hero Sheet

A local-first, offline-capable web app for the **Core6 RPG system** — a dynamic
character sheet, XP/respec ledger, and active combat tool with integrated dice
rolling. Built mobile-first; designed to support running multiple heroes
simultaneously via rapid context switching.

## Stack

- Vite + React 18 + TypeScript (strict)
- `framer-motion` for the success-overlay animations
- `lucide-react` for icons
- `localStorage` for persistence (schema-versioned)
- No backend, no auth, no cloud sync — strictly local for v1

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run lint
```

## Project layout

```
src/
├── App.tsx                 # shell: header, tabs, side menu, overlay
├── state/AppState.tsx      # context, Hero/Discipline state, actions
├── utils/xpCalculator.ts   # cost engine (per-level pricing + heuristics)
├── data/
│   ├── disciplines.ts      # 90 disciplines (75 Standard + 15 Ascendant)
│   └── upgrades.ts         # upgrade catalog keyed by discipline id
└── components/
    ├── CombatTab.tsx       # stat blocks, roll modal
    ├── LoadoutTab.tsx      # equipped slots + Discipline Record modal
    ├── ProgressionTab.tsx  # Ledger, core upgrades, influence, narrative
    └── DiceOverlay.tsx     # massive success-reveal overlay
```

## Cost rules (Core6)

XP cost is per **discipline level**, not per upgrade. Each upgrade purchased
moves the discipline up one level; cost depends only on the level being moved
into.

- **Standard:** acquire L1 = 10 XP, then +20, +30, +40, +50… (target level × 10)
- **Ascendant:** acquire L1 = 20 XP, then +30, +40, +50, +50…
- **Pushing Past Limits:** disciplines beyond a hero's normal slot count cost
  ×2 (1st extra) or ×3 (2nd extra). Multiplier is locked into each purchase
  record so refunds stay exact.
- **Respec:** any upgrade can be refunded at any time for the exact XP debited
  at purchase. Refund is LIFO per stack and blocked when an owned upgrade
  depends on it via prerequisite.

## Status

Working today: hero CRUD, hero switcher, three-tab navigation, dice roller +
success overlay, equip/unequip disciplines, buy/refund upgrades with correct
per-level pricing, core upgrades (Vitality Boost, stat training), influence
counters, narrative fields, persistent localStorage with schema versioning.

Not yet wired:

- Discipline-level effects on derived stats (Agility → AP, Speed → move,
  Toughness → DR) — needs per-upgrade effect descriptors.
- Hand-curated `prerequisiteUpgradeId` and `maxStacks` on the upgrade catalog
  (heuristic inference handles the common cases for now).
- "Pushing Past Limits" UI — engine supports the multiplier; no UI to grant
  additional slots beyond the base five (Slots 1–3, Attunement, Ascendant).
- Custom Discipline Builder, hero export/import, accessibility polish.

## Specs

The original design and rules documents are in the repo root:

- `# Core6 Hero Sheet App - Technical Specification v1.txt`
- `hero sheet design.md`
- `Core6 Disciplines list csv.txt`
- `Core6 Upgrade list .txt`
