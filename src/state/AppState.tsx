import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { disciplinesData, Discipline } from '../data/disciplines';
import { upgradesData, Upgrade } from '../data/upgrades';
import {
  getBaseDisciplineCost,
  getNextUpgradeCost,
  inferMaxStacks,
  inferPrerequisiteUpgradeId,
} from '../utils/xpCalculator';

/* ---------- Slots ---------- */

export type SlotKey = 'slot-1' | 'slot-2' | 'slot-3' | 'attunement' | 'ascendant';
export const ALL_SLOTS: SlotKey[] = ['slot-1', 'slot-2', 'slot-3', 'attunement', 'ascendant'];
export const SLOT_LABELS: Record<SlotKey, string> = {
  'slot-1': 'Slot 1',
  'slot-2': 'Slot 2',
  'slot-3': 'Slot 3',
  attunement: 'Attunement',
  ascendant: 'Ascendant',
};

/**
 * Slot multiplier for "Pushing Past Limits" pricing. The five named slots above
 * are all base slots (multiplier 1). Multipliers of 2 / 3 are reserved for future
 * additional slots beyond these base five.
 */
export function getSlotMultiplier(_slot: SlotKey): number {
  return 1;
}

/* ---------- Purchase / Discipline state ---------- */

export interface Purchase {
  id: string;
  upgradeId: string;
  /** Exact XP debited at purchase time (already includes any slot multiplier). */
  debitedXp: number;
  /** Slot multiplier in effect at purchase time, locked for refund parity. */
  multiplier: number;
  /** Discipline level reached by this purchase (>= 2 — L1 is the base discipline). */
  level: number;
  timestamp: string;
}

export interface DisciplineState {
  disciplineId: string;
  slot: SlotKey;
  /** XP debited at the moment this discipline was acquired (Level 1). */
  basePurchase: { debitedXp: number; multiplier: number; timestamp: string };
  /** Level-2+ upgrade purchases, in chronological order. */
  purchases: Purchase[];
}

/* ---------- Core (non-discipline) upgrades ---------- */

export interface CoreUpgrades {
  /** +1 Max HP each. List price 5 XP per. */
  vitalityBoost: number;
  /** +1 Physical stat each. List price 10 XP per. */
  physicalTraining: number;
  /** +1 Mental stat each. */
  mentalFortitude: number;
  /** +1 Social stat each. */
  socialPresence: number;
}

export type CoreUpgradeKind = keyof CoreUpgrades;

export const CORE_UPGRADE_COSTS: Record<CoreUpgradeKind, number> = {
  vitalityBoost: 5,
  physicalTraining: 10,
  mentalFortitude: 10,
  socialPresence: 10,
};

export const CORE_UPGRADE_LABELS: Record<CoreUpgradeKind, { name: string; description: string }> = {
  vitalityBoost: { name: 'Vitality Boost', description: 'Permanently increase Max HP by 1.' },
  physicalTraining: { name: 'Physical Training', description: 'Permanently increase Physical stat by 1.' },
  mentalFortitude: { name: 'Mental Fortitude', description: 'Permanently increase Mental stat by 1.' },
  socialPresence: { name: 'Social Presence', description: 'Permanently increase Social stat by 1.' },
};

/* ---------- Transaction log ---------- */

export type TransactionType =
  | 'GRANT_XP'
  | 'PURCHASE_CORE_UPGRADE'
  | 'REFUND_CORE_UPGRADE'
  | 'EQUIP_DISCIPLINE'
  | 'UNEQUIP_DISCIPLINE'
  | 'PURCHASE_UPGRADE'
  | 'REFUND_UPGRADE';

export interface Transaction {
  id: string;
  timestamp: string;
  type: TransactionType;
  details: string;
  /** Signed XP delta. Negative = spent, positive = credited. */
  delta: number;
}

/* ---------- Hero ---------- */

export interface BaseStats {
  physical: number;
  mental: number;
  social: number;
}

export interface Hero {
  id: string;
  name: string;
  archetype: string;
  isNewHero: boolean;
  baseStats: BaseStats;
  baseHp: number;
  baseAp: number;
  baseMove: number;
  baseCt: number;

  /** Current (combat) HP and AP — track damage / spent actions. */
  hp: number;
  ap: number;

  xp: { current: number; max: number };

  luckTokens: number;
  epicDie: boolean;

  statuses: { stealth: boolean; cover: boolean; rage: boolean };
  influence: { public: number; underworld: number };
  narrative: { keywords: string; flaws: string; currentGoal: string };

  powerUses: Record<string, boolean[]>;

  coreUpgrades: CoreUpgrades;
  /** Per-discipline state, keyed by discipline id. */
  disciplineState: Record<string, DisciplineState>;
  transactions: Transaction[];
}

/** Hero shape augmented with derived (computed) values for display. */
export interface DerivedHero extends Hero {
  stats: BaseStats;
  maxHp: number;
  maxAp: number;
  move: number;
  ct: number;
  damageReduction: number;
}

/* ---------- Derived stats ---------- */

export const getDerivedHeroStats = (hero: Hero): DerivedHero => {
  // Defensive fallbacks for missing properties in persisted state
  const baseStats = hero.baseStats || { physical: 0, mental: 0, social: 0 };
  const coreUpgrades = hero.coreUpgrades || { vitalityBoost: 0, physicalTraining: 0, mentalFortitude: 0, socialPresence: 0 };
  const powerUses = hero.powerUses || {};
  const disciplineState = hero.disciplineState || {};

  const stats: BaseStats = {
    physical: baseStats.physical + coreUpgrades.physicalTraining,
    mental: baseStats.mental + coreUpgrades.mentalFortitude,
    social: baseStats.social + coreUpgrades.socialPresence,
  };

  const maxHp = (hero.baseHp || 0) + coreUpgrades.vitalityBoost;
  const maxAp = hero.baseAp || 0;
  const move = hero.baseMove || 0;
  const ct = hero.baseCt || 0;
  const damageReduction = 0;

  return {
    ...hero,
    baseStats,
    coreUpgrades,
    powerUses,
    disciplineState,
    stats,
    maxHp,
    maxAp,
    move,
    ct,
    damageReduction,
  };
};

/* ---------- Discipline-state helpers (pure) ---------- */

/** Number of upgrades currently owned in a discipline (counting stacks). */
export function countOwnedUpgrades(state: DisciplineState | undefined): number {
  return state ? state.purchases.length : 0;
}

/** Current discipline level: 1 (base) + number of upgrade purchases. */
export function getCurrentDisciplineLevel(state: DisciplineState | undefined): number {
  return 1 + countOwnedUpgrades(state);
}

/** How many times a particular upgrade has been purchased in this discipline. */
export function getStackCount(state: DisciplineState | undefined, upgradeId: string): number {
  if (!state) return 0;
  return state.purchases.filter(p => p.upgradeId === upgradeId).length;
}

export interface UpgradeAvailability {
  affordable: boolean;
  prerequisiteSatisfied: boolean;
  underStackCap: boolean;
  /** True if all gates pass and the hero can buy this upgrade right now. */
  canPurchase: boolean;
  /** Cost of the next stack of this upgrade (the discipline's next level). */
  nextCost: number;
  stackCount: number;
  maxStacks: number;
  prerequisiteUpgradeId?: string;
}

export function evaluateUpgrade(
  hero: Hero,
  discipline: Discipline,
  upgrade: Upgrade,
): UpgradeAvailability {
  const state = hero.disciplineState[discipline.id];
  const equipped = !!state;
  const currentLevel = getCurrentDisciplineLevel(state);
  const multiplier = equipped ? getSlotMultiplier(state!.slot) : 1;
  const nextCost = getNextUpgradeCost(discipline.classification, currentLevel, multiplier);

  const stackCount = getStackCount(state, upgrade.id);
  const maxStacks = inferMaxStacks(upgrade);
  const underStackCap = stackCount < maxStacks;

  const siblings = upgradesData[discipline.id] ?? [];
  const prerequisiteUpgradeId = inferPrerequisiteUpgradeId(upgrade, siblings);
  const prerequisiteSatisfied = prerequisiteUpgradeId
    ? getStackCount(state, prerequisiteUpgradeId) > 0
    : true;

  const affordable = equipped && hero.xp.current >= nextCost;

  return {
    affordable,
    prerequisiteSatisfied,
    underStackCap,
    canPurchase: equipped && affordable && prerequisiteSatisfied && underStackCap,
    nextCost,
    stackCount,
    maxStacks,
    prerequisiteUpgradeId,
  };
}

/* ---------- Defaults ---------- */

const STARTING_XP_FOR_NEW_HERO = 0;

const createDefaultHero = (): Hero => ({
  id: uuidv4(),
  name: 'New Hero',
  archetype: 'Mercenary',
  baseStats: { physical: 3, mental: 2, social: 2 },
  baseHp: 5,
  baseAp: 2,
  baseMove: 4,
  baseCt: 10,

  isNewHero: true,
  hp: 5,
  ap: 2,

  xp: { current: STARTING_XP_FOR_NEW_HERO, max: STARTING_XP_FOR_NEW_HERO },
  luckTokens: 3,
  epicDie: false,
  statuses: { stealth: false, cover: false, rage: false },
  influence: { public: 0, underworld: 0 },
  narrative: { keywords: '', flaws: '', currentGoal: '' },

  powerUses: {},

  coreUpgrades: {
    vitalityBoost: 0,
    physicalTraining: 0,
    mentalFortitude: 0,
    socialPresence: 0,
  },
  disciplineState: {},
  transactions: [],
});

/* ---------- Persistence ---------- */

const STORAGE_KEY = 'core6_app_state';
const SCHEMA_VERSION = 3;

interface PersistedState {
  schemaVersion: number;
  heroes: Record<string, Hero>;
  activeHeroId: string | null;
}

function loadPersistedState(): { heroes: Record<string, Hero>; activeHeroId: string | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.schemaVersion === SCHEMA_VERSION) {
        return { heroes: parsed.heroes, activeHeroId: parsed.activeHeroId };
      }
      // eslint-disable-next-line no-console
      console.warn(
        `[core6] localStorage schema v${parsed.schemaVersion} does not match current v${SCHEMA_VERSION}. Discarding old state.`
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('[core6] Failed to load saved state', e);
  }
  const initial = createDefaultHero();
  initial.name = 'Valerius';
  return { heroes: { [initial.id]: initial }, activeHeroId: initial.id };
}

/* ---------- Context ---------- */

export interface AppState {
  heroes: Record<string, Hero>;
  activeHeroId: string | null;

  setActiveHero: (id: string) => void;
  createHero: () => string;
  deleteHero: (id: string) => void;
  updateHero: (id: string, updates: Partial<Hero>) => void;

  // Combat
  spendAp: (heroId: string) => void;
  adjustHp: (heroId: string, amount: number) => void;
  healMax: (heroId: string) => void;
  combatReset: (heroId: string) => void;
  togglePowerUse: (heroId: string, powerId: string, useIndex: number) => void;

  // XP
  grantXp: (heroId: string, amount: number) => void;

  // Core upgrades
  purchaseCoreUpgrade: (heroId: string, kind: CoreUpgradeKind) => void;
  refundCoreUpgrade: (heroId: string, kind: CoreUpgradeKind) => void;

  // Disciplines
  equipDiscipline: (heroId: string, slot: SlotKey, disciplineId: string) => void;
  unequipDiscipline: (heroId: string, slot: SlotKey) => void;

  // Discipline upgrades
  purchaseUpgrade: (heroId: string, disciplineId: string, upgradeId: string) => void;
  refundUpgrade: (heroId: string, disciplineId: string, upgradeId: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

/* ---------- Provider ---------- */

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initial = useMemo(loadPersistedState, []);
  const [heroes, setHeroes] = useState<Record<string, Hero>>(initial.heroes);
  const [activeHeroId, setActiveHeroId] = useState<string | null>(initial.activeHeroId);

  useEffect(() => {
    const payload: PersistedState = { schemaVersion: SCHEMA_VERSION, heroes, activeHeroId };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[core6] Failed to persist state', e);
    }
  }, [heroes, activeHeroId]);

  /* ----- helpers ----- */

  const updateOneHero = (heroId: string, fn: (hero: Hero) => Hero) => {
    setHeroes(prev => {
      const hero = prev[heroId];
      if (!hero) return prev;
      const next = fn(hero);
      if (next === hero) return prev;
      return { ...prev, [heroId]: next };
    });
  };

  const appendTx = (hero: Hero, tx: Omit<Transaction, 'id' | 'timestamp'>): Transaction[] => [
    ...hero.transactions,
    { id: uuidv4(), timestamp: new Date().toISOString(), ...tx },
  ];

  /* ----- hero lifecycle ----- */

  const setActiveHero = (id: string) => setActiveHeroId(id);

  const createHero = () => {
    const newHero = createDefaultHero();
    setHeroes(prev => ({ ...prev, [newHero.id]: newHero }));
    setActiveHeroId(newHero.id);
    return newHero.id;
  };

  const deleteHero = (id: string) => {
    setHeroes(prev => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setActiveHeroId(prev => {
      if (prev !== id) return prev;
      const remaining = Object.keys(heroes).filter(hid => hid !== id);
      return remaining[0] ?? null;
    });
  };

  const updateHero = (id: string, updates: Partial<Hero>) => {
    updateOneHero(id, hero => ({ ...hero, ...updates }));
  };

  /* ----- combat ----- */

  const spendAp = (heroId: string) => {
    updateOneHero(heroId, hero => (hero.ap > 0 ? { ...hero, ap: hero.ap - 1 } : hero));
  };

  const adjustHp = (heroId: string, amount: number) => {
    updateOneHero(heroId, hero => {
      const derived = getDerivedHeroStats(hero);
      const newHp = Math.max(0, Math.min(derived.maxHp, hero.hp + amount));
      return newHp === hero.hp ? hero : { ...hero, hp: newHp };
    });
  };

  const healMax = (heroId: string) => {
    updateOneHero(heroId, hero => {
      const derived = getDerivedHeroStats(hero);
      return { ...hero, hp: derived.maxHp, ap: derived.maxAp };
    });
  };

  const combatReset = (heroId: string) => {
    updateOneHero(heroId, hero => {
      const derived = getDerivedHeroStats(hero);
      return { ...hero, hp: derived.maxHp, ap: derived.maxAp, powerUses: {} };
    });
  };

  const togglePowerUse = (heroId: string, powerId: string, useIndex: number) => {
    updateOneHero(heroId, hero => {
      const currentUses = hero.powerUses[powerId] || [false, false, false];
      const newUses = [...currentUses];
      newUses[useIndex] = !newUses[useIndex];
      return { ...hero, powerUses: { ...hero.powerUses, [powerId]: newUses } };
    });
  };

  /* ----- XP ----- */

  const grantXp = (heroId: string, amount: number) => {
    if (amount === 0) return;
    updateOneHero(heroId, hero => ({
      ...hero,
      xp: {
        current: hero.xp.current + amount,
        max: hero.xp.max + Math.max(0, amount),
      },
      transactions: appendTx(hero, {
        type: 'GRANT_XP',
        details: `Granted ${amount} XP`,
        delta: amount,
      }),
    }));
  };

  /* ----- core upgrades ----- */

  const purchaseCoreUpgrade = (heroId: string, kind: CoreUpgradeKind) => {
    const cost = CORE_UPGRADE_COSTS[kind];
    updateOneHero(heroId, hero => {
      if (hero.xp.current < cost) return hero;
      return {
        ...hero,
        xp: { ...hero.xp, current: hero.xp.current - cost },
        coreUpgrades: { ...hero.coreUpgrades, [kind]: hero.coreUpgrades[kind] + 1 },
        transactions: appendTx(hero, {
          type: 'PURCHASE_CORE_UPGRADE',
          details: `${CORE_UPGRADE_LABELS[kind].name} (+1)`,
          delta: -cost,
        }),
      };
    });
  };

  const refundCoreUpgrade = (heroId: string, kind: CoreUpgradeKind) => {
    const cost = CORE_UPGRADE_COSTS[kind];
    updateOneHero(heroId, hero => {
      if (hero.coreUpgrades[kind] <= 0) return hero;

      // If refunding HP would put current HP above the new max, clamp.
      const newCoreUpgrades = { ...hero.coreUpgrades, [kind]: hero.coreUpgrades[kind] - 1 };
      const probeHero: Hero = { ...hero, coreUpgrades: newCoreUpgrades };
      const newMaxHp = getDerivedHeroStats(probeHero).maxHp;
      const newHp = Math.min(hero.hp, newMaxHp);

      return {
        ...hero,
        hp: newHp,
        xp: { ...hero.xp, current: hero.xp.current + cost },
        coreUpgrades: newCoreUpgrades,
        transactions: appendTx(hero, {
          type: 'REFUND_CORE_UPGRADE',
          details: `${CORE_UPGRADE_LABELS[kind].name} (-1)`,
          delta: cost,
        }),
      };
    });
  };

  /* ----- discipline equip ----- */

  const equipDiscipline = (heroId: string, slot: SlotKey, disciplineId: string) => {
    const discipline = disciplinesData.find(d => d.id === disciplineId);
    if (!discipline) return;

    updateOneHero(heroId, hero => {
      // Already equipped somewhere?
      if (hero.disciplineState[disciplineId]) return hero;

      // Slot occupied?
      const slotOccupant = Object.values(hero.disciplineState).find(s => s.slot === slot);
      if (slotOccupant) return hero;

      // Ascendant slot only takes Ascendant disciplines and vice versa.
      const isAscendantSlot = slot === 'ascendant';
      const isAscendantDiscipline = discipline.classification === 'Ascendant';
      if (isAscendantSlot !== isAscendantDiscipline) return hero;

      const multiplier = getSlotMultiplier(slot);
      const cost = getBaseDisciplineCost(discipline.classification, multiplier);
      if (hero.xp.current < cost) return hero;

      const timestamp = new Date().toISOString();
      const newState: DisciplineState = {
        disciplineId,
        slot,
        basePurchase: { debitedXp: cost, multiplier, timestamp },
        purchases: [],
      };

      return {
        ...hero,
        xp: { ...hero.xp, current: hero.xp.current - cost },
        disciplineState: { ...hero.disciplineState, [disciplineId]: newState },
        transactions: appendTx(hero, {
          type: 'EQUIP_DISCIPLINE',
          details: `Equipped ${discipline.name} into ${SLOT_LABELS[slot]}`,
          delta: -cost,
        }),
      };
    });
  };

  const unequipDiscipline = (heroId: string, slot: SlotKey) => {
    updateOneHero(heroId, hero => {
      const entry = Object.values(hero.disciplineState).find(s => s.slot === slot);
      if (!entry) return hero;

      const discipline = disciplinesData.find(d => d.id === entry.disciplineId);

      // Refund: base + every upgrade purchase, in full.
      const refund =
        entry.basePurchase.debitedXp +
        entry.purchases.reduce((sum, p) => sum + p.debitedXp, 0);

      const newDS = { ...hero.disciplineState };
      delete newDS[entry.disciplineId];

      return {
        ...hero,
        xp: { ...hero.xp, current: hero.xp.current + refund },
        disciplineState: newDS,
        transactions: appendTx(hero, {
          type: 'UNEQUIP_DISCIPLINE',
          details: `Unequipped ${discipline?.name ?? entry.disciplineId} from ${SLOT_LABELS[slot]}`,
          delta: refund,
        }),
      };
    });
  };

  /* ----- discipline upgrade purchase / refund ----- */

  const purchaseUpgrade = (heroId: string, disciplineId: string, upgradeId: string) => {
    const discipline = disciplinesData.find(d => d.id === disciplineId);
    if (!discipline) return;
    const siblings = upgradesData[disciplineId] ?? [];
    const upgrade = siblings.find(u => u.id === upgradeId);
    if (!upgrade) return;

    updateOneHero(heroId, hero => {
      const state = hero.disciplineState[disciplineId];
      if (!state) return hero; // discipline must be equipped first
      const availability = evaluateUpgrade(hero, discipline, upgrade);
      if (!availability.canPurchase) return hero;

      const newLevel = 1 + state.purchases.length + 1; // base(1) + existing + this one
      const purchase: Purchase = {
        id: uuidv4(),
        upgradeId,
        debitedXp: availability.nextCost,
        multiplier: getSlotMultiplier(state.slot),
        level: newLevel,
        timestamp: new Date().toISOString(),
      };

      return {
        ...hero,
        xp: { ...hero.xp, current: hero.xp.current - availability.nextCost },
        disciplineState: {
          ...hero.disciplineState,
          [disciplineId]: { ...state, purchases: [...state.purchases, purchase] },
        },
        transactions: appendTx(hero, {
          type: 'PURCHASE_UPGRADE',
          details: `${discipline.name} → ${upgrade.name} (L${newLevel})`,
          delta: -availability.nextCost,
        }),
      };
    });
  };

  /**
   * Refund the most-recent purchase of `upgradeId` in the given discipline.
   * Blocked if any other owned upgrade in the discipline depends on this upgrade
   * via prerequisite (resolved or inferred); the dependent must be refunded first.
   */
  const refundUpgrade = (heroId: string, disciplineId: string, upgradeId: string) => {
    const discipline = disciplinesData.find(d => d.id === disciplineId);
    if (!discipline) return;
    const siblings = upgradesData[disciplineId] ?? [];
    const upgrade = siblings.find(u => u.id === upgradeId);
    if (!upgrade) return;

    updateOneHero(heroId, hero => {
      const state = hero.disciplineState[disciplineId];
      if (!state) return hero;

      // Find most recent matching purchase (LIFO for stacks).
      let lastIndex = -1;
      for (let i = state.purchases.length - 1; i >= 0; i--) {
        if (state.purchases[i].upgradeId === upgradeId) {
          lastIndex = i;
          break;
        }
      }
      if (lastIndex === -1) return hero;

      // If any owned upgrade depends on this one (and we're refunding the last stack),
      // block the refund.
      const isLastStack = state.purchases.filter(p => p.upgradeId === upgradeId).length === 1;
      if (isLastStack) {
        const dependents = siblings.filter(u => {
          const prereq = inferPrerequisiteUpgradeId(u, siblings);
          return prereq === upgradeId && state.purchases.some(p => p.upgradeId === u.id);
        });
        if (dependents.length > 0) {
          // eslint-disable-next-line no-console
          console.warn(
            `[core6] Cannot refund ${upgrade.name}: depended on by ${dependents.map(d => d.name).join(', ')}.`
          );
          return hero;
        }
      }

      const refunded = state.purchases[lastIndex];
      const newPurchases = [...state.purchases.slice(0, lastIndex), ...state.purchases.slice(lastIndex + 1)];

      // Clamp current HP if this somehow lowers maxHp (no-op for now since
      // discipline upgrades don't yet feed into derived stats — placeholder for
      // when Agility / Vitality-style discipline upgrades are wired).
      return {
        ...hero,
        xp: { ...hero.xp, current: hero.xp.current + refunded.debitedXp },
        disciplineState: {
          ...hero.disciplineState,
          [disciplineId]: { ...state, purchases: newPurchases },
        },
        transactions: appendTx(hero, {
          type: 'REFUND_UPGRADE',
          details: `Refunded ${discipline.name} → ${upgrade.name} (L${refunded.level})`,
          delta: refunded.debitedXp,
        }),
      };
    });
  };

  /* ----- context value ----- */

  const value: AppState = {
    heroes,
    activeHeroId,
    setActiveHero,
    createHero,
    deleteHero,
    updateHero,
    spendAp,
    adjustHp,
    healMax,
    combatReset,
    togglePowerUse,
    grantXp,
    purchaseCoreUpgrade,
    refundCoreUpgrade,
    equipDiscipline,
    unequipDiscipline,
    purchaseUpgrade,
    refundUpgrade,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppStore = (): AppState => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used within an AppProvider');
  return ctx;
};
