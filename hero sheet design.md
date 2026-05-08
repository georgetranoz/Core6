Core6 Hero Sheet Mobile App - Design Document v1.2
1. Overview
A local-first, offline-capable mobile and tablet application for the Core6 RPG system. The app serves as a dynamic character sheet, an XP/respec ledger, and an active combat tool with integrated dice rolling. It supports running multiple heroes simultaneously via rapid context switching.
2. Core Navigation & Architecture
* Global Header: Features a Hamburger Menu (top left) for instant Hero switching, alongside critical active stats (HP, AP).
* Tab 1: Combat & Core: The primary screen used during active encounters.
* Tab 2: Loadout: Disciplines, Upgrades, and Attunement slots.
* Tab 3: Progression (The Ledger): XP spending, Respecs, Influence, and Hero background details.
3. Detailed View Specifications
3.1 The Global Hamburger Menu (Hero Switcher)
* Accessible from any screen via the top-left hamburger icon.
* Opens a slide-out drawer listing all active Heroes.
* Displays each avatar, Name, and current HP/Max HP at a glance.
* Tapping a Hero instantly swaps the global state, updating all tabs and headers to that character without losing navigation context.
* Includes a persistent add button at the bottom of the drawer to instantly generate a new 0 XP Hero template.
3.2 Global Header (Sticky)
* Hero Profile: Avatar thumbnail, Name, and Archetype/Background Hook.
* HP Tracker: Large numbers with quick tap buttons for taking damage or healing.
* AP Tracker: Defaults to 2. Tap to spend or refund.
* End Combat Button: Instantly restores HP and AP to max, and resets "Once per combat" trackers strictly for the currently active Hero.
3.3 Tab 1: Combat & Core
* Stat Blocks: Visual representation of Physical, Mental, and Social stats. Tap a block to initiate a standard dice roll pool.
* Combat Target Calculator: Quick reference area showing defensive CT and Damage Reduction.
* Active Status Bar: Toggles for states like Stealth, Cover, or Rage, and counters for Luck Tokens and Epic Die.
* Integrated Dice Roller: Tapping an action opens a modal requesting Situational Bonus Dice or Power Strike toggles. The app calculates the final pool and RNG generates the d6 results.
* Success Overlay: A massive, screen-dominating overlay triggers immediately after the roll, displaying individual die faces, highlighting hits, and showing total successes and damage. Tap anywhere to dismiss.
3.4 Tab 2: Loadout & The Discipline Record Modal
* Overview List: Displays a clean list of the Hero's equipped Disciplines (Slots 1-3, Attunement, Ascendant) showing title, active level, and quick-roll buttons.
* Discipline Record (Deep Dive): Tapping the Title of any Discipline opens a full-screen or bottom-sheet modal.
* Modal Header: Discipline Name, Tags, and Governing Stat.
* Base Effect: Full text description of the Level 1 ability.
* Upgrade Path Tree: A scrollable list of all available upgrades for that specific Discipline.
* Interactive State: Upgrades already purchased are highlighted. Unpurchased upgrades display their XP cost.
* Quick Buy/Refund: Purchase upgrades directly from this modal if Current XP allows, or tap a Refund button on owned upgrades to instantly strip the level and return the XP to the ledger.
3.5 Tab 3: Progression & Background
* The XP Ledger: Tracks Max XP (lifetime) and Current XP (spendable).
* Core Upgrades: Spend XP to bump Stats or buy extra HP.
* Instant Respec: The refund logic automatically subtracts an upgrade, calculates the exact XP spent, and credits Current XP.
* Influence Tracker: Counters for Public and Underworld Influence with quick-spend buttons.
* Narrative Details: Fields for Keywords, Flaws, and Current Goal/Next Thread notes.
3.6 Custom Discipline Builder
* Creation Form: Inputs for Name, Description, Tags, Associated Stat, and Base Effect.
* Upgrades List: Ability to add custom upgrade tiers with specific XP costs.
* Integration: Saved custom disciplines populate alongside the official roster and support the full Discipline Record Modal view.
4. State Management Requirements
* Immutable Transaction Log: Every time XP is spent or refunded, it logs as a transaction to prevent math errors.
* Derived Stats: Max HP and Max AP are derived dynamically based on base values and purchased upgrades.
* Local-First Sync: State writes to device storage immediately on every interaction to prevent data loss.
* Hero Dictionary: State maintains a fast dictionary lookup for all heroes and an active pointer for the currently selected hero to allow rapid switching.
5. UI/UX Theming
* Default: High contrast, clean, modern.
* Fantasy Theme: Parchment textures, serif fonts.
* Cyberpunk Theme: Neon accents, dark mode, monospace terminal fonts.