import type { Upgrade } from '../data/upgrades';

/**
 * Core6 XP cost rules
 * ===================
 * Cost is per *discipline level*, not per individual upgrade. Each upgrade purchased
 * within a discipline raises that discipline's level by one (acquiring the discipline
 * itself = Level 1). The cost depends only on the level being moved into, not on which
 * specific upgrade is being bought.
 *
 *   Standard:   acquire L1 = 10 XP, then +20, +30, +40, +50, ... (target level * 10)
 *   Ascendant:  acquire L1 = 20 XP, then +30, +40, +50, +50, ...
 *
 * "Pushing Past Limits": disciplines occupying additional slots beyond a hero's
 * normal limit are charged a slot multiplier (2x for the 1st extra, 3x for the 2nd).
 * The multiplier is locked into each Purchase at the moment of purchase, so refunds
 * remain exact even if slot configuration changes later.
 */

export type DisciplineClassification = 'Standard' | 'Ascendant';

function normalizeClassification(c: string): DisciplineClassification {
  return c.toLowerCase() === 'ascendant' ? 'Ascendant' : 'Standard';
}

/**
 * XP cost to acquire the base discipline (Level 1).
 */
export function getBaseDisciplineCost(classification: string, slotPenaltyMultiplier: number = 1): number {
  const baseCost = normalizeClassification(classification) === 'Ascendant' ? 20 : 10;
  return baseCost * slotPenaltyMultiplier;
}

/**
 * XP cost to upgrade a discipline TO a specific target level (i.e. moving from
 * level N-1 to level N). targetLevel must be >= 2.
 */
export function getUpgradeCost(
  classification: string,
  targetLevel: number,
  slotPenaltyMultiplier: number = 1
): number {
  if (targetLevel < 2) {
    throw new Error(`getUpgradeCost called with targetLevel=${targetLevel}; use getBaseDisciplineCost for L1.`);
  }

  let cost: number;
  if (normalizeClassification(classification) === 'Ascendant') {
    if (targetLevel === 2) cost = 30;
    else if (targetLevel === 3) cost = 40;
    else cost = 50; // L4 and beyond
  } else {
    // Standard: incremental cost to reach level N is 10*N XP
    cost = targetLevel * 10;
  }

  return cost * slotPenaltyMultiplier;
}

/**
 * Cumulative XP a hero has invested in a discipline owning `level` total levels
 * (= base + (level-1) upgrade purchases). Useful for displaying total spend.
 *
 * NOTE: this is a theoretical *list price* for an unmultiplied slot — actual debits
 * stored on Purchase records may differ if the slot multiplier was non-1 at purchase time.
 */
export function getCumulativeListPrice(
  classification: string,
  level: number,
  slotPenaltyMultiplier: number = 1
): number {
  if (level < 1) return 0;
  let total = getBaseDisciplineCost(classification, slotPenaltyMultiplier);
  for (let l = 2; l <= level; l++) {
    total += getUpgradeCost(classification, l, slotPenaltyMultiplier);
  }
  return total;
}

/**
 * Returns the current discipline level for a hero given the count of upgrades
 * they own in that discipline (sum of purchase records / stack counts).
 *   level = 1 + numOwnedUpgrades
 */
export function getDisciplineLevel(numOwnedUpgrades: number): number {
  return 1 + Math.max(0, numOwnedUpgrades);
}

/**
 * Cost of the *next* purchase in a discipline given the hero's current level and
 * the multiplier locked to that discipline's slot.
 */
export function getNextUpgradeCost(
  classification: string,
  currentLevel: number,
  slotPenaltyMultiplier: number = 1
): number {
  return getUpgradeCost(classification, currentLevel + 1, slotPenaltyMultiplier);
}

/* --------------------------------------------------------------------------
 * Inference helpers
 * --------------------------------------------------------------------------
 * The upgrade catalog isn't fully annotated with maxStacks / prerequisiteUpgradeId.
 * Until each upgrade is hand-curated, we infer reasonable defaults from the data
 * we have. Explicit fields on the Upgrade record always win over inference.
 */

/** Patterns that flag an upgrade as buyable multiple times. */
const STACKABLE_PATTERNS: RegExp[] = [
  /\bper\s+upgrade\b/i,
  /\bper\s+purchase\b/i,
  /\badditional\s+use\b/i,
  /\bextra\s+use\b/i,
  /\b\+1\s+additional\s+use\b/i,
  /\b\+1\s+use\s+per\s+combat\b/i,
  /\bgrants?\s+\+1\s+additional\b/i,
];

/**
 * Returns the effective max-stack count for an upgrade. Explicit `upgrade.maxStacks`
 * always wins. If absent, falls back to a heuristic on the description/name.
 *  - Stackable patterns => 5 (a generous practical cap; can be raised per-upgrade).
 *  - Otherwise => 1.
 */
export function inferMaxStacks(upgrade: Upgrade): number {
  if (typeof upgrade.maxStacks === 'number') return upgrade.maxStacks;

  const haystack = `${upgrade.name} ${upgrade.description}`;
  for (const pattern of STACKABLE_PATTERNS) {
    if (pattern.test(haystack)) return 5;
  }
  return 1;
}

/**
 * If an upgrade's name ends with " Level N" for N >= 2, returns the id of the
 * sibling upgrade with the same prefix and " Level (N-1)". Returns undefined if
 * no such sibling exists. Explicit `upgrade.prerequisiteUpgradeId` always wins.
 */
export function inferPrerequisiteUpgradeId(
  upgrade: Upgrade,
  siblingsInDiscipline: Upgrade[]
): string | undefined {
  if (upgrade.prerequisiteUpgradeId) return upgrade.prerequisiteUpgradeId;

  const match = upgrade.name.match(/^(.*)\bLevel\s+(\d+)$/i);
  if (!match) return undefined;
  const [, prefix, levelStr] = match;
  const level = parseInt(levelStr, 10);
  if (!Number.isFinite(level) || level < 2) return undefined;

  const wantedName = `${prefix.trim()} Level ${level - 1}`.toLowerCase();
  const sibling = siblingsInDiscipline.find(
    u => u.id !== upgrade.id && u.name.trim().toLowerCase() === wantedName
  );
  return sibling?.id;
}
