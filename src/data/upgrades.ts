export interface Upgrade {
  id: string;
  disciplineId: string;
  name: string;
  description: string;

  /**
   * Maximum number of times this upgrade can be purchased.
   * Undefined means single-purchase (1).
   * Use Infinity for fully stackable upgrades like Power Strike's "More Power".
   * If absent, the runtime helper inferMaxStacks() heuristically detects
   * stackable upgrades from the description text (e.g. "per upgrade", "Additional Use").
   */
  maxStacks?: number;

  /**
   * If set, this upgrade requires the named upgrade (in the same discipline) to be
   * owned before it can be purchased. If absent, the runtime helper inferPrerequisiteUpgradeId()
   * detects "Level 2/3/..." naming patterns and resolves to the matching previous level.
   */
  prerequisiteUpgradeId?: string;

  /**
   * @deprecated XP cost is no longer per-upgrade. It's per-discipline-level — see
   * src/utils/xpCalculator.ts. This field is preserved on existing data entries
   * for backward compatibility but is not read by any code path.
   */
  xpCost?: number;
}

export const upgradesData: Record<string, Upgrade[]> = {
  "acrobatics": [
    {
      "id": "acrobatics-expert-acrobat",
      "disciplineId": "acrobatics",
      "name": "Expert Acrobat",
      "description": "Gain an additional +1 bonus die on all Acrobatics-related checks.",
      "xpCost": 10
    },
    {
      "id": "acrobatics-fluid-motion",
      "disciplineId": "acrobatics",
      "name": "Fluid Motion",
      "description": "Reduce the CT for all Acrobatics-related checks by -1.",
      "xpCost": 10
    },
    {
      "id": "acrobatics-safe-landing",
      "disciplineId": "acrobatics",
      "name": "Safe Landing",
      "description": "Reduce all damage taken from falls by an amount equal to your Physical stat.",
      "xpCost": 10
    },
    {
      "id": "acrobatics-tumble-dodge",
      "disciplineId": "acrobatics",
      "name": "Tumble Dodge",
      "description": "Reaction to move 1 square away without provoking an Attack of Opportunity after successful DC check against damage.",
      "xpCost": 10
    },
    {
      "id": "acrobatics-wall-run",
      "disciplineId": "acrobatics",
      "name": "Wall Run",
      "description": "Run along vertical surfaces at the cost of 1 additional square of movement per 2 squares horizontal.",
      "xpCost": 10
    }
  ],
  "agility": [
    {
      "id": "agility-agility-level-1",
      "disciplineId": "agility",
      "name": "Agility Level 1",
      "description": "Hero has 1 Major AP and 2 Minor AP.",
      "xpCost": 10
    },
    {
      "id": "agility-agility-level-2",
      "disciplineId": "agility",
      "name": "Agility Level 2",
      "description": "Hero has 1 Major AP and 3 Minor AP.",
      "xpCost": 10
    },
    {
      "id": "agility-agility-level-3",
      "disciplineId": "agility",
      "name": "Agility Level 3",
      "description": "Hero has 2 Major AP and 3 Minor AP. Allows a second attack.",
      "xpCost": 10
    }
  ],
  "aid-ally": [
    {
      "id": "aid-ally-improved-guidance",
      "disciplineId": "aid-ally",
      "name": "Improved Guidance",
      "description": "Reduce the CT for the activation check by -1.",
      "xpCost": 10
    },
    {
      "id": "aid-ally-potent-guidance",
      "disciplineId": "aid-ally",
      "name": "Potent Guidance",
      "description": "The CT reduction granted to the aided ally increases by an additional -1.",
      "xpCost": 10
    },
    {
      "id": "aid-ally-additional-use",
      "disciplineId": "aid-ally",
      "name": "Additional Use",
      "description": "Gain +1 additional use of this ability per combat.",
      "xpCost": 10
    },
    {
      "id": "aid-ally-team-leader",
      "disciplineId": "aid-ally",
      "name": "Team Leader",
      "description": "May target +1 additional ally with this ability when activated.",
      "xpCost": 10
    }
  ],
  "babble-fish": [
    {
      "id": "babble-fish-emotional-shift",
      "disciplineId": "babble-fish",
      "name": "Emotional Shift",
      "description": "Subtly shift the emotional tone of your communication towards positive or negative.",
      "xpCost": 10
    },
    {
      "id": "babble-fish-rapport",
      "disciplineId": "babble-fish",
      "name": "Rapport",
      "description": "Gain +1 Bonus Dice on Social interaction DC checks once basic communication is established.",
      "xpCost": 10
    }
  ],
  "backstab": [
    {
      "id": "backstab-kidney-shot",
      "disciplineId": "backstab",
      "name": "Kidney Shot",
      "description": "Gain an additional +1 bonus attack die when Backstabbing.",
      "xpCost": 10
    },
    {
      "id": "backstab-accuracy",
      "disciplineId": "backstab",
      "name": "Accuracy",
      "description": "Gain -1 CT on this attack.",
      "xpCost": 10
    },
    {
      "id": "backstab-quick-thinking",
      "disciplineId": "backstab",
      "name": "Quick Thinking",
      "description": "You may change the damage type to either Mental or Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "backstab-disabling",
      "disciplineId": "backstab",
      "name": "Disabling",
      "description": "Target gains Slowed Condition for 1 round (-1 AP).",
      "xpCost": 10
    },
    {
      "id": "backstab-poisoned",
      "disciplineId": "backstab",
      "name": "Poisoned",
      "description": "Target gains the Ill Condition for 1 round (+1 CT to all attacks).",
      "xpCost": 10
    }
  ],
  "battlefield-reflexes": [
    {
      "id": "battlefield-reflexes-return-fire-level-1",
      "disciplineId": "battlefield-reflexes",
      "name": "Return Fire Level 1",
      "description": "Reaction to make a single ranged attack back at your attacker at +1 CT penalty.",
      "xpCost": 10
    },
    {
      "id": "battlefield-reflexes-dive-further-level-1",
      "disciplineId": "battlefield-reflexes",
      "name": "Dive Further Level 1",
      "description": "Move up to 2 squares instead of 1 when hitting the dirt.",
      "xpCost": 10
    },
    {
      "id": "battlefield-reflexes-return-fire-level-2",
      "disciplineId": "battlefield-reflexes",
      "name": "Return Fire Level 2",
      "description": "Return Fire reaction no longer suffers the +1 CT penalty.",
      "xpCost": 10
    },
    {
      "id": "battlefield-reflexes-return-fire-level-3",
      "disciplineId": "battlefield-reflexes",
      "name": "Return Fire Level 3",
      "description": "Return Fire reaction gains +1 attack die.",
      "xpCost": 10
    },
    {
      "id": "battlefield-reflexes-combat-flow-level-3",
      "disciplineId": "battlefield-reflexes",
      "name": "Combat Flow Level 3",
      "description": "Hit the Dirt or Return Fire reactions no longer cost your Major Action on your next turn.",
      "xpCost": 10
    }
  ],
  "berserker-rage": [
    {
      "id": "berserker-rage-big-mad",
      "disciplineId": "berserker-rage",
      "name": "Big Mad",
      "description": "Gain +1 extra round of Rage duration.",
      "xpCost": 10
    },
    {
      "id": "berserker-rage-loose-canon",
      "disciplineId": "berserker-rage",
      "name": "Loose Canon",
      "description": "Gain -1 CT for Rage check.",
      "xpCost": 10
    },
    {
      "id": "berserker-rage-me-smart",
      "disciplineId": "berserker-rage",
      "name": "Me Smart",
      "description": "+1 additional Mental DR while raging.",
      "xpCost": 10
    },
    {
      "id": "berserker-rage-me-tough",
      "disciplineId": "berserker-rage",
      "name": "Me Tough",
      "description": "+1 additional Physical DR while raging.",
      "xpCost": 10
    },
    {
      "id": "berserker-rage-me-no-stink",
      "disciplineId": "berserker-rage",
      "name": "Me No Stink",
      "description": "+1 additional Social DR while raging.",
      "xpCost": 10
    }
  ],
  "blast": [
    {
      "id": "blast-selective-blast",
      "disciplineId": "blast",
      "name": "Selective Blast",
      "description": "Your blast avoids hitting allies within the splash radius.",
      "xpCost": 10
    },
    {
      "id": "blast-more-blast",
      "disciplineId": "blast",
      "name": "More Blast",
      "description": "Gain +1 additional use of this ability per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "blast-deadlier-blast",
      "disciplineId": "blast",
      "name": "Deadlier Blast",
      "description": "Reduce CT required to hit by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "blast-expanded-blast",
      "disciplineId": "blast",
      "name": "Expanded Blast",
      "description": "Expand the splash radius by 1 square.",
      "xpCost": 10
    },
    {
      "id": "blast-range-increase",
      "disciplineId": "blast",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    },
    {
      "id": "blast-bigger-boom",
      "disciplineId": "blast",
      "name": "Bigger Boom",
      "description": "Gain +1 dice for this attack.",
      "xpCost": 10
    },
    {
      "id": "blast-poison",
      "disciplineId": "blast",
      "name": "Poison",
      "description": "Deal damage as poison damage (DoT) bypassing DR.",
      "xpCost": 10
    },
    {
      "id": "blast-humiliation",
      "disciplineId": "blast",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "blast-puncture",
      "disciplineId": "blast",
      "name": "Puncture",
      "description": "Change the damage type to Physical on the fly.",
      "xpCost": 10
    }
  ],
  "brace-for-impact": [
    {
      "id": "brace-for-impact-reinforced-counter",
      "disciplineId": "brace-for-impact",
      "name": "Reinforced Counter",
      "description": "The free melee counter-attack gains an additional +1 attack die.",
      "xpCost": 10
    },
    {
      "id": "brace-for-impact-long-pikes",
      "disciplineId": "brace-for-impact",
      "name": "Long Pikes",
      "description": "Inflict damage on a target at a range of 2 squares immediately.",
      "xpCost": 10
    },
    {
      "id": "brace-for-impact-humiliation",
      "disciplineId": "brace-for-impact",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "brace-for-impact-outsmart",
      "disciplineId": "brace-for-impact",
      "name": "Outsmart",
      "description": "Change the damage type to Mental on the fly.",
      "xpCost": 10
    }
  ],
  "burrow-mastery": [
    {
      "id": "burrow-mastery-ambusher",
      "disciplineId": "burrow-mastery",
      "name": "Ambusher",
      "description": "Perform a reaction attack with +1 die against an enemy that moves adjacent while burrowed.",
      "xpCost": 10
    },
    {
      "id": "burrow-mastery-persistent-tunneler",
      "disciplineId": "burrow-mastery",
      "name": "Persistent Tunneler",
      "description": "Use Burrow Mastery one additional time per combat.",
      "xpCost": 10
    },
    {
      "id": "burrow-mastery-subterranean-movement",
      "disciplineId": "burrow-mastery",
      "name": "Subterranean Movement",
      "description": "Move up to full Move speed underground before emerging.",
      "xpCost": 10
    },
    {
      "id": "burrow-mastery-structural-collapse-level-1",
      "disciplineId": "burrow-mastery",
      "name": "Structural Collapse Level 1",
      "description": "Bypass light structure DR by 1 (Universal) when attacking from underneath.",
      "xpCost": 10
    },
    {
      "id": "burrow-mastery-structural-collapse-level-2",
      "disciplineId": "burrow-mastery",
      "name": "Structural Collapse Level 2",
      "description": "Bypass medium structure DR by 2 (Universal) when attacking from underneath.",
      "xpCost": 10
    },
    {
      "id": "burrow-mastery-structural-collapse-level-3",
      "disciplineId": "burrow-mastery",
      "name": "Structural Collapse Level 3",
      "description": "Bypass structure DR by 3 (Universal) when attacking from underneath.",
      "xpCost": 10
    }
  ],
  "charge": [
    {
      "id": "charge-relentless-momentum",
      "disciplineId": "charge",
      "name": "Relentless Momentum",
      "description": "The charge situational bonus increases by +1 attack die.",
      "xpCost": 10
    },
    {
      "id": "charge-devastating-impact",
      "disciplineId": "charge",
      "name": "Devastating Impact",
      "description": "The target is thrown 1 square away; hits cause 1 damage to both.",
      "xpCost": 10
    },
    {
      "id": "charge-humiliation",
      "disciplineId": "charge",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "charge-outsmart",
      "disciplineId": "charge",
      "name": "Outsmart",
      "description": "Change the damage type to Mental on the fly.",
      "xpCost": 10
    }
  ],
  "commanding-voice": [
    {
      "id": "commanding-voice-more-command",
      "disciplineId": "commanding-voice",
      "name": "More Command",
      "description": "Gain an additional use per combat.",
      "xpCost": 10
    },
    {
      "id": "commanding-voice-proficient-command",
      "disciplineId": "commanding-voice",
      "name": "Proficient Command",
      "description": "Reduce the CT for activation by -1.",
      "xpCost": 10
    },
    {
      "id": "commanding-voice-commanding-presence-level-1",
      "disciplineId": "commanding-voice",
      "name": "Commanding Presence Level 1",
      "description": "Target a small group (3-5) or one target at +4 range; Inspire/Intimidate effect increases to +1 automatic success.",
      "xpCost": 10
    },
    {
      "id": "commanding-voice-commanding-presence-level-2",
      "disciplineId": "commanding-voice",
      "name": "Commanding Presence Level 2",
      "description": "Influence a large crowd or pacify a hostile creature out of combat (Social vs. Mental +2 CT).",
      "xpCost": 10
    }
  ],
  "dark-vision": [
    {
      "id": "dark-vision-dark-sight",
      "disciplineId": "dark-vision",
      "name": "Dark Sight",
      "description": "See in complete darkness including supernatural darkness (Banned in Battlegrounds).",
      "xpCost": 10
    },
    {
      "id": "dark-vision-heat-vision",
      "disciplineId": "dark-vision",
      "name": "Heat Vision",
      "description": "Detect heat signatures through materials up to 1 square deep and gain +1 die to Perception against hidden living targets.",
      "xpCost": 10
    }
  ],
  "darkness": [
    {
      "id": "darkness-extended-cast",
      "disciplineId": "darkness",
      "name": "Extended Cast",
      "description": "Place the darkness zone up to 4 squares away.",
      "xpCost": 10
    },
    {
      "id": "darkness-expanded-zone",
      "disciplineId": "darkness",
      "name": "Expanded Zone",
      "description": "Increase the darkness field by +1 square in any dimension per upgrade.",
      "xpCost": 10
    },
    {
      "id": "darkness-efficient-deployment",
      "disciplineId": "darkness",
      "name": "Efficient Deployment",
      "description": "Reduce the CT required to activate this power by -1.",
      "xpCost": 10
    },
    {
      "id": "darkness-mobile-field",
      "disciplineId": "darkness",
      "name": "Mobile Field",
      "description": "The darkness zone now moves with you.",
      "xpCost": 10
    }
  ],
  "deadly-precision": [
    {
      "id": "deadly-precision-rupturing-strike-level-1",
      "disciplineId": "deadly-precision",
      "name": "Rupturing Strike Level 1",
      "description": "Rolling two or more natural 6s inflicts Bleeding DoT equal to 50% of damage dealt.",
      "xpCost": 10
    },
    {
      "id": "deadly-precision-rupturing-strike-level-2",
      "disciplineId": "deadly-precision",
      "name": "Rupturing Strike Level 2",
      "description": "Bleed triggers on two or more natural 5s or 6s.",
      "xpCost": 10
    },
    {
      "id": "deadly-precision-salt-the-wound-level-2",
      "disciplineId": "deadly-precision",
      "name": "Salt the Wound Level 2",
      "description": "All attacks against a target suffering from a Bleed you inflicted deal +1 bonus damage.",
      "xpCost": 10
    }
  ],
  "death-cultist": [
    {
      "id": "death-cultist-vital-resurgence",
      "disciplineId": "death-cultist",
      "name": "Vital Resurgence",
      "description": "Return with +2 HP when the base effect triggers.",
      "xpCost": 10
    },
    {
      "id": "death-cultist-unholy-resolve",
      "disciplineId": "death-cultist",
      "name": "Unholy Resolve",
      "description": "You do not become Shaken when the base effect triggers.",
      "xpCost": 10
    }
  ],
  "diplomat": [
    {
      "id": "diplomat-expert-diplomat",
      "disciplineId": "diplomat",
      "name": "Expert Diplomat",
      "description": "Gain +1 Dice per upgrade.",
      "xpCost": 10
    },
    {
      "id": "diplomat-master-diplomat",
      "disciplineId": "diplomat",
      "name": "Master Diplomat",
      "description": "Gain -1 Target Number per upgrade.",
      "xpCost": 10
    }
  ],
  "disguise-mastery": [
    {
      "id": "disguise-mastery-expert-disguise",
      "disciplineId": "disguise-mastery",
      "name": "Expert Disguise",
      "description": "Gain +1 Dice per upgrade.",
      "xpCost": 10
    },
    {
      "id": "disguise-mastery-master-disguise",
      "disciplineId": "disguise-mastery",
      "name": "Master Disguise",
      "description": "Gain -1 Target Number per upgrade.",
      "xpCost": 10
    }
  ],
  "dodge": [
    {
      "id": "dodge-level-1",
      "disciplineId": "dodge",
      "name": "Level 1",
      "description": "Attacker removes 1 die from the attack.",
      "xpCost": 10
    },
    {
      "id": "dodge-level-2",
      "disciplineId": "dodge",
      "name": "Level 2",
      "description": "Apply an additional +1 CT Dodge.",
      "xpCost": 10
    },
    {
      "id": "dodge-level-3",
      "disciplineId": "dodge",
      "name": "Level 3",
      "description": "Attacker removes +1 die from the attack.",
      "xpCost": 10
    },
    {
      "id": "dodge-level-4",
      "disciplineId": "dodge",
      "name": "Level 4",
      "description": "Apply an additional +1 CT Dodge.",
      "xpCost": 10
    },
    {
      "id": "dodge-fast-move",
      "disciplineId": "dodge",
      "name": "Fast Move",
      "description": "Apply an additional +1 CT Dodge bonus specifically against Physical attacks (Trifecta rule).",
      "xpCost": 10
    },
    {
      "id": "dodge-popular-kid",
      "disciplineId": "dodge",
      "name": "Popular Kid",
      "description": "Apply an additional +1 CT Dodge bonus specifically against Social attacks (Trifecta rule).",
      "xpCost": 10
    },
    {
      "id": "dodge-quick-thinking",
      "disciplineId": "dodge",
      "name": "Quick Thinking",
      "description": "Apply an additional +1 CT Dodge bonus specifically against Mental attacks (Trifecta rule).",
      "xpCost": 10
    }
  ],
  "driving-piloting": [
    {
      "id": "driving-piloting-expert-pilot",
      "disciplineId": "driving-piloting",
      "name": "Expert Pilot",
      "description": "Gain +1 Dice per upgrade.",
      "xpCost": 10
    },
    {
      "id": "driving-piloting-master-pilot",
      "disciplineId": "driving-piloting",
      "name": "Master Pilot",
      "description": "Gain -1 Target Number per upgrade.",
      "xpCost": 10
    }
  ],
  "entropy-mastery": [
    {
      "id": "entropy-mastery-reach-level-1",
      "disciplineId": "entropy-mastery",
      "name": "Reach Level 1",
      "description": "Use as a ranged attack.",
      "xpCost": 10
    },
    {
      "id": "entropy-mastery-reach-level-2",
      "disciplineId": "entropy-mastery",
      "name": "Reach Level 2",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    },
    {
      "id": "entropy-mastery-intensity",
      "disciplineId": "entropy-mastery",
      "name": "Intensity",
      "description": "Gain +1 attack dice with your entropic attacks per upgrade.",
      "xpCost": 10
    },
    {
      "id": "entropy-mastery-focus",
      "disciplineId": "entropy-mastery",
      "name": "Focus",
      "description": "Reduce the CT to hit by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "entropy-mastery-retaliation",
      "disciplineId": "entropy-mastery",
      "name": "Retaliation",
      "description": "Melee attackers automatically suffer 1 HP damage bypassing DR.",
      "xpCost": 10
    }
  ],
  "environmental-mastery": [
    {
      "id": "environmental-mastery-amphibious-movement",
      "disciplineId": "environmental-mastery",
      "name": "Amphibious Movement",
      "description": "Move through deep water as normal terrain and gain +2 Move Speed submerged.",
      "xpCost": 10
    },
    {
      "id": "environmental-mastery-hostile-environment-adaptation-level-1",
      "disciplineId": "environmental-mastery",
      "name": "Hostile Environment Adaptation Level 1",
      "description": "Breathe normally in poisonous gas or toxic atmospheres.",
      "xpCost": 10
    },
    {
      "id": "environmental-mastery-hostile-environment-adaptation-level-2",
      "disciplineId": "environmental-mastery",
      "name": "Hostile Environment Adaptation Level 2",
      "description": "Survive indefinitely in the vacuum of space or airless environments.",
      "xpCost": 10
    }
  ],
  "fate-weaver": [
    {
      "id": "fate-weaver-diviner",
      "disciplineId": "fate-weaver",
      "name": "Diviner",
      "description": "Gain +1 additional use of this ability per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "fate-weaver-improved-weaving",
      "disciplineId": "fate-weaver",
      "name": "Improved Weaving",
      "description": "Gain a -1 CT for check.",
      "xpCost": 10
    }
  ],
  "fear-itself": [
    {
      "id": "fear-itself-expanded-terror",
      "disciplineId": "fear-itself",
      "name": "Expanded Terror",
      "description": "Increase the radius of your dread aura by +1 square per purchase.",
      "xpCost": 10
    },
    {
      "id": "fear-itself-crushing-despair",
      "disciplineId": "fear-itself",
      "name": "Crushing Despair",
      "description": "Enemy units within aura cannot benefit from positive modifiers to Morale or Rally checks.",
      "xpCost": 10
    },
    {
      "id": "fear-itself-overwhelming-dread",
      "disciplineId": "fear-itself",
      "name": "Overwhelming Dread",
      "description": "Increase the die penalty inflicted by your aura by an additional -1 die per purchase.",
      "xpCost": 10
    }
  ],
  "first-aid": [
    {
      "id": "first-aid-deft-healing",
      "disciplineId": "first-aid",
      "name": "Deft Healing",
      "description": "Reduce CT required for activation by -1.",
      "xpCost": 10
    },
    {
      "id": "first-aid-added-healing",
      "disciplineId": "first-aid",
      "name": "Added Healing",
      "description": "Target +1 additional ally per upgrade.",
      "xpCost": 10
    },
    {
      "id": "first-aid-box-of-bandages",
      "disciplineId": "first-aid",
      "name": "Box of Bandages",
      "description": "Gain +1 additional use per combat and +1 bonus die for medical skill checks.",
      "xpCost": 10
    },
    {
      "id": "first-aid-range-increase",
      "disciplineId": "first-aid",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    }
  ],
  "grapple-mastery": [
    {
      "id": "grapple-mastery-sweeping-kick-level-1",
      "disciplineId": "grapple-mastery",
      "name": "Sweeping Kick Level 1",
      "description": "Attempt to sweep up to two adjacent targets knocking them Prone (1 AP).",
      "xpCost": 10
    },
    {
      "id": "grapple-mastery-sweeping-kick-level-2",
      "disciplineId": "grapple-mastery",
      "name": "Sweeping Kick Level 2",
      "description": "Sweeping Kick targets +1 additional adjacent enemy per upgrade.",
      "xpCost": 10
    },
    {
      "id": "grapple-mastery-crushing-grip",
      "disciplineId": "grapple-mastery",
      "name": "Crushing Grip",
      "description": "Deal +1 point of Physical damage bypassing DR upon successful grapple.",
      "xpCost": 10
    },
    {
      "id": "grapple-mastery-constricting-hold",
      "disciplineId": "grapple-mastery",
      "name": "Constricting Hold",
      "description": "Grappled targets suffer +1 penalty to the CT of all actions they attempt.",
      "xpCost": 10
    }
  ],
  "green-thumb": [
    {
      "id": "green-thumb-entangling-vines",
      "disciplineId": "green-thumb",
      "name": "Entangling Vines",
      "description": "Immobilise +1 additional target per upgrade.",
      "xpCost": 10
    },
    {
      "id": "green-thumb-improved-growth",
      "disciplineId": "green-thumb",
      "name": "Improved Growth",
      "description": "Gain a -1 bonus to the CT required.",
      "xpCost": 10
    },
    {
      "id": "green-thumb-additional-vines",
      "disciplineId": "green-thumb",
      "name": "Additional Vines",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "green-thumb-extended-range",
      "disciplineId": "green-thumb",
      "name": "Extended Range",
      "description": "Extend range by +4 squares.",
      "xpCost": 10
    }
  ],
  "heal-ally": [
    {
      "id": "heal-ally-additional-use",
      "disciplineId": "heal-ally",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat and +1 bonus die for medical checks.",
      "xpCost": 10
    },
    {
      "id": "heal-ally-improved-healing",
      "disciplineId": "heal-ally",
      "name": "Improved Healing",
      "description": "Reduce CT required for activation by -1.",
      "xpCost": 10
    },
    {
      "id": "heal-ally-potent-healing",
      "disciplineId": "heal-ally",
      "name": "Potent Healing",
      "description": "Restore an additional +1 HP per success per upgrade.",
      "xpCost": 10
    },
    {
      "id": "heal-ally-extended-range",
      "disciplineId": "heal-ally",
      "name": "Extended Range",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    }
  ],
  "heightened-senses": [
    {
      "id": "heightened-senses-possession-detection",
      "disciplineId": "heightened-senses",
      "name": "Possession Detection",
      "description": "Detect if a visible target is possessed or controlled.",
      "xpCost": 10
    },
    {
      "id": "heightened-senses-residual-echo",
      "disciplineId": "heightened-senses",
      "name": "Residual Echo",
      "description": "2+ successes grant fragmented sensory impressions from the past.",
      "xpCost": 10
    },
    {
      "id": "heightened-senses-extended-range",
      "disciplineId": "heightened-senses",
      "name": "Extended Range",
      "description": "Gain an additional +4 square range in detection of hidden/supernatural targets.",
      "xpCost": 10
    }
  ],
  "illusion": [
    {
      "id": "illusion-mind-burn",
      "disciplineId": "illusion",
      "name": "Mind Burn",
      "description": "1 AP attack causing 1 Mental damage per success against targets perceiving your illusion.",
      "xpCost": 10
    },
    {
      "id": "illusion-sharper-images",
      "disciplineId": "illusion",
      "name": "Sharper Images",
      "description": "Gain -1 CT bonus to illusion checks and Mind Burn attacks.",
      "xpCost": 10
    },
    {
      "id": "illusion-tactical-illusions-level-1",
      "disciplineId": "illusion",
      "name": "Tactical Illusions Level 1",
      "description": "Create a 4x1 illusion zone acting as an obstacle or difficult terrain.",
      "xpCost": 10
    },
    {
      "id": "illusion-tactical-illusions-level-2",
      "disciplineId": "illusion",
      "name": "Tactical Illusions Level 2",
      "description": "Increases illusion size by +2 squares per upgrade.",
      "xpCost": 10
    }
  ],
  "inflict-fear": [
    {
      "id": "inflict-fear-additional-use",
      "disciplineId": "inflict-fear",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per purchase.",
      "xpCost": 10
    },
    {
      "id": "inflict-fear-expanded-radius",
      "disciplineId": "inflict-fear",
      "name": "Expanded Radius",
      "description": "The radius is increased by +2 squares.",
      "xpCost": 10
    }
  ],
  "inflict-lingering-pain": [
    {
      "id": "inflict-lingering-pain-additional-use",
      "disciplineId": "inflict-lingering-pain",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "inflict-lingering-pain-accuracy",
      "disciplineId": "inflict-lingering-pain",
      "name": "Accuracy",
      "description": "Reduce CT required to hit by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "inflict-lingering-pain-chain",
      "disciplineId": "inflict-lingering-pain",
      "name": "Chain",
      "description": "Affect +1 additional target per upgrade.",
      "xpCost": 10
    },
    {
      "id": "inflict-lingering-pain-range-increase",
      "disciplineId": "inflict-lingering-pain",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    }
  ],
  "invisible": [
    {
      "id": "invisible-additional-use",
      "disciplineId": "invisible",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "invisible-effortless-vanishing",
      "disciplineId": "invisible",
      "name": "Effortless Vanishing",
      "description": "Gain +1 automatic success on activation per upgrade.",
      "xpCost": 10
    },
    {
      "id": "invisible-shared-cloak",
      "disciplineId": "invisible",
      "name": "Shared Cloak",
      "description": "Affect +1 adjacent ally per upgrade.",
      "xpCost": 10
    },
    {
      "id": "invisible-attacking-while-invisible",
      "disciplineId": "invisible",
      "name": "Attacking While Invisible",
      "description": "You may attack without ending invisibility (requires 2 upgrade investments).",
      "xpCost": 10
    }
  ],
  "juggernaut-chassis": [
    {
      "id": "juggernaut-chassis-armour-plating",
      "disciplineId": "juggernaut-chassis",
      "name": "Armour Plating",
      "description": "Increase DR (Physical) by +1.",
      "xpCost": 10
    },
    {
      "id": "juggernaut-chassis-extreme-range",
      "disciplineId": "juggernaut-chassis",
      "name": "Extreme Range",
      "description": "Minimum range of 8 squares; calculates range from 12 squares.",
      "xpCost": 10
    },
    {
      "id": "juggernaut-chassis-larger",
      "disciplineId": "juggernaut-chassis",
      "name": "Larger",
      "description": "Takes up +1 additional squares.",
      "xpCost": 10
    },
    {
      "id": "juggernaut-chassis-firing-ports",
      "disciplineId": "juggernaut-chassis",
      "name": "Firing Ports",
      "description": "Up to 2 units inside transport may use ranged attack at -1 die.",
      "xpCost": 10
    },
    {
      "id": "juggernaut-chassis-transport-bay",
      "disciplineId": "juggernaut-chassis",
      "name": "Transport Bay",
      "description": "Carry up to 3 allied units inside hull.",
      "xpCost": 10
    },
    {
      "id": "juggernaut-chassis-wall-breacher",
      "disciplineId": "juggernaut-chassis",
      "name": "Wall Breacher",
      "description": "Convey troops over fortification walls.",
      "xpCost": 10
    }
  ],
  "leadership": [
    {
      "id": "leadership-extended-command",
      "disciplineId": "leadership",
      "name": "Extended Command",
      "description": "Increase the radius of your Leadership aura by +1 square.",
      "xpCost": 10
    },
    {
      "id": "leadership-inspiring-presence",
      "disciplineId": "leadership",
      "name": "Inspiring Presence",
      "description": "Allies gain an additional +1 die bonus to Morale/Rally Checks (+2 total).",
      "xpCost": 10
    },
    {
      "id": "leadership-unflinching-presence",
      "disciplineId": "leadership",
      "name": "Unflinching Presence",
      "description": "Allies become immune to Fear and Taunt effects.",
      "xpCost": 10
    },
    {
      "id": "leadership-sanctified-presence",
      "disciplineId": "leadership",
      "name": "Sanctified Presence",
      "description": "Aura grants a bonus to Corruption Checks.",
      "xpCost": 10
    },
    {
      "id": "leadership-strategic-mastermind",
      "disciplineId": "leadership",
      "name": "Strategic Mastermind",
      "description": "Allies gain +1 bonus to Initiative; activate one additional unit round 1.",
      "xpCost": 10
    },
    {
      "id": "leadership-inspiring-command",
      "disciplineId": "leadership",
      "name": "Inspiring Command",
      "description": "Spend 1 AP to have an ally automatically succeed a Morale/Rally check (1 use per combat).",
      "xpCost": 10
    },
    {
      "id": "leadership-seize-the-initiative-",
      "disciplineId": "leadership",
      "name": "Seize the Initiative!",
      "description": "Commander spends Major Action to immediately activate one other friendly unit (1 use per combat).",
      "xpCost": 10
    },
    {
      "id": "leadership-martyrdom-i",
      "disciplineId": "leadership",
      "name": "Martyrdom I",
      "description": "Negates army-wide Morale Check when this unit is reduced to 0 HP or Routs.",
      "xpCost": 10
    },
    {
      "id": "leadership-direct-the-assault",
      "disciplineId": "leadership",
      "name": "Direct the Assault",
      "description": "Commander spends Major Action to give an ally a full turn (1 use per combat).",
      "xpCost": 10
    },
    {
      "id": "leadership-martyrdom-ii",
      "disciplineId": "leadership",
      "name": "Martyrdom II",
      "description": "When this unit dies grant allies +1 die bonus to combat rolls for this and next round.",
      "xpCost": 10
    }
  ],
  "marksman": [
    {
      "id": "marksman-enhanced-marking",
      "disciplineId": "marksman",
      "name": "Enhanced Marking",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "marksman-sharpshooter",
      "disciplineId": "marksman",
      "name": "Sharpshooter",
      "description": "Gain +1 attack die on ranged attacks against your marked target per upgrade.",
      "xpCost": 10
    },
    {
      "id": "marksman-target-acquisition",
      "disciplineId": "marksman",
      "name": "Target Acquisition",
      "description": "Reduce CT required to hit marked target by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "marksman-range-increase",
      "disciplineId": "marksman",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    },
    {
      "id": "marksman-shared-intel",
      "disciplineId": "marksman",
      "name": "Shared Intel",
      "description": "Allies gain +1 die to Perception checks when tracking your marked target.",
      "xpCost": 10
    }
  ],
  "master-defender": [
    {
      "id": "master-defender-added-defence-level-1",
      "disciplineId": "master-defender",
      "name": "Added Defence Level 1",
      "description": "Each upgrade grants +1 additional use of this ability per round.",
      "xpCost": 10
    },
    {
      "id": "master-defender-added-defence-level-2",
      "disciplineId": "master-defender",
      "name": "Added Defence Level 2",
      "description": "Each upgrade grants +1 damage resistance when intercepting an attack.",
      "xpCost": 10
    },
    {
      "id": "master-defender-guardian-overwatch",
      "disciplineId": "master-defender",
      "name": "Guardian Overwatch",
      "description": "Reaction move and attack if an enemy ends turn next to protected ally (costs next round's Major Action).",
      "xpCost": 10
    }
  ],
  "master-tactician": [
    {
      "id": "master-tactician-better-tactics",
      "disciplineId": "master-tactician",
      "name": "Better Tactics",
      "description": "Increase the bonus attack die granted to adjacent allies by +1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "master-tactician-ranged-tactics",
      "disciplineId": "master-tactician",
      "name": "Ranged Tactics",
      "description": "Increase the range of your effect by +1 per upgrade.",
      "xpCost": 10
    }
  ],
  "master-thief": [
    {
      "id": "master-thief-expert-thief",
      "disciplineId": "master-thief",
      "name": "Expert Thief",
      "description": "Gain +1 dice per upgrade.",
      "xpCost": 10
    },
    {
      "id": "master-thief-master-thief",
      "disciplineId": "master-thief",
      "name": "Master Thief",
      "description": "Gain -1 Target Number per upgrade.",
      "xpCost": 10
    }
  ],
  "negate": [
    {
      "id": "negate-more-uses",
      "disciplineId": "negate",
      "name": "More uses",
      "description": "+1 Use per Combat.",
      "xpCost": 10
    },
    {
      "id": "negate-power-surge",
      "disciplineId": "negate",
      "name": "Power surge",
      "description": "Gain +1 die bonus on your opposed check to negate.",
      "xpCost": 10
    },
    {
      "id": "negate-unravel",
      "disciplineId": "negate",
      "name": "Unravel",
      "description": "Target one ongoing effect and unbind it with a Mental check (Major Action).",
      "xpCost": 10
    },
    {
      "id": "negate-psychic-feedback-level-1",
      "disciplineId": "negate",
      "name": "Psychic Feedback Level 1",
      "description": "Enemy suffers 1 damage per success on opposed check (bypasses DR).",
      "xpCost": 10
    },
    {
      "id": "negate-psychic-feedback-level-2",
      "disciplineId": "negate",
      "name": "Psychic Feedback Level 2",
      "description": "Enemy suffers 2 damage per success on opposed check (bypasses DR).",
      "xpCost": 10
    },
    {
      "id": "negate-psychic-feedback-level-3",
      "disciplineId": "negate",
      "name": "Psychic Feedback Level 3",
      "description": "Enemy suffers 3 damage per success on opposed check (bypasses DR).",
      "xpCost": 10
    }
  ],
  "negation-shield": [
    {
      "id": "negation-shield-physical-negation",
      "disciplineId": "negation-shield",
      "name": "Physical Negation",
      "description": "+1 success negation against Physical-based effects.",
      "xpCost": 10
    },
    {
      "id": "negation-shield-mental-negation",
      "disciplineId": "negation-shield",
      "name": "Mental Negation",
      "description": "+1 success negation against Mental-based effects.",
      "xpCost": 10
    },
    {
      "id": "negation-shield-social-negation",
      "disciplineId": "negation-shield",
      "name": "Social Negation",
      "description": "+1 success negation against Social-based effects.",
      "xpCost": 10
    }
  ],
  "overload": [
    {
      "id": "overload-reload",
      "disciplineId": "overload",
      "name": "Reload",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "overload-over-distance",
      "disciplineId": "overload",
      "name": "Over Distance",
      "description": "Increase range by +4 squares.",
      "xpCost": 10
    },
    {
      "id": "overload-expert-controller",
      "disciplineId": "overload",
      "name": "Expert Controller",
      "description": "Target +1 additional enemy within 4 squares per upgrade.",
      "xpCost": 10
    },
    {
      "id": "overload-more-potent",
      "disciplineId": "overload",
      "name": "More Potent",
      "description": "Reduce CT required by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "overload-lingering-effect",
      "disciplineId": "overload",
      "name": "Lingering Effect",
      "description": "Increase duration by +1 round.",
      "xpCost": 10
    },
    {
      "id": "overload-outsmart",
      "disciplineId": "overload",
      "name": "Outsmart",
      "description": "Gain +1 attack die on activation roll per upgrade.",
      "xpCost": 10
    },
    {
      "id": "overload-humiliation",
      "disciplineId": "overload",
      "name": "Humiliation",
      "description": "Attack is directed at Social rather than Mental.",
      "xpCost": 10
    }
  ],
  "pack-mentality": [
    {
      "id": "pack-mentality-fierce-pack",
      "disciplineId": "pack-mentality",
      "name": "Fierce Pack",
      "description": "Deal +1 bonus attack die per upgrade level on attacks benefiting from Pack Mentality.",
      "xpCost": 10
    }
  ],
  "power-strike": [
    {
      "id": "power-strike-more-power",
      "disciplineId": "power-strike",
      "name": "More Power",
      "description": "Each upgrade grants an additional +1 bonus damage.",
      "xpCost": 10
    }
  ],
  "protect-ally": [
    {
      "id": "protect-ally-thicker-shield",
      "disciplineId": "protect-ally",
      "name": "Thicker Shield",
      "description": "CT defence bonus increases by +1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "protect-ally-greater-protection",
      "disciplineId": "protect-ally",
      "name": "Greater Protection",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "protect-ally-bigger-shield",
      "disciplineId": "protect-ally",
      "name": "Bigger Shield",
      "description": "Target +1 additional ally within 4 squares.",
      "xpCost": 10
    }
  ],
  "ranged-combat": [
    {
      "id": "ranged-combat-potent",
      "disciplineId": "ranged-combat",
      "name": "Potent",
      "description": "Gain +1 attack die per upgrade.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-accuracy",
      "disciplineId": "ranged-combat",
      "name": "Accuracy",
      "description": "Reduce CT required to hit by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-point-blank-shot",
      "disciplineId": "ranged-combat",
      "name": "Point Blank Shot",
      "description": "No longer suffer penalty from being Threatened or Grappled.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-range-increase",
      "disciplineId": "ranged-combat",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-shotgun-impact",
      "disciplineId": "ranged-combat",
      "name": "Shotgun Impact",
      "description": "If achieving 2+ successes the target is knocked Prone.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-shotgun-spread",
      "disciplineId": "ranged-combat",
      "name": "Shotgun Spread",
      "description": "Target +1 additional adjacent enemy.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-suppression-overwatch",
      "disciplineId": "ranged-combat",
      "name": "Suppression Overwatch",
      "description": "When performing Overwatch the target must make a Morale Check.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-humiliation",
      "disciplineId": "ranged-combat",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-outsmart",
      "disciplineId": "ranged-combat",
      "name": "Outsmart",
      "description": "Change the damage type to Mental on the fly.",
      "xpCost": 10
    },
    {
      "id": "ranged-combat-puncture",
      "disciplineId": "ranged-combat",
      "name": "Puncture",
      "description": "Change the damage type to Physical on the fly.",
      "xpCost": 10
    }
  ],
  "regeneration": [
    {
      "id": "regeneration-improved-regeneration",
      "disciplineId": "regeneration",
      "name": "Improved Regeneration",
      "description": "Reduce CT required for activation by -1.",
      "xpCost": 10
    },
    {
      "id": "regeneration-additional-use",
      "disciplineId": "regeneration",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "regeneration-potent-regeneration",
      "disciplineId": "regeneration",
      "name": "Potent Regeneration",
      "description": "Starting HoT value is increased by +1 per upgrade.",
      "xpCost": 10
    }
  ],
  "resistance": [
    {
      "id": "resistance-specialised-resistance",
      "disciplineId": "resistance",
      "name": "Specialised Resistance",
      "description": "Gain +2 additional DR against a specific environmental/elemental damage type.",
      "xpCost": 10
    }
  ],
  "scholar": [
    {
      "id": "scholar-expert-scholar",
      "disciplineId": "scholar",
      "name": "Expert Scholar",
      "description": "Gain +1 die per upgrade.",
      "xpCost": 10
    },
    {
      "id": "scholar-master-scholar",
      "disciplineId": "scholar",
      "name": "Master Scholar",
      "description": "Gain -1 Target Number per upgrade.",
      "xpCost": 10
    }
  ],
  "shield-master": [
    {
      "id": "shield-master-additional-use",
      "disciplineId": "shield-master",
      "name": "Additional Use",
      "description": "Each upgrade grants +1 additional use per combat.",
      "xpCost": 10
    }
  ],
  "silence-protocol": [
    {
      "id": "silence-protocol-ghost-walk",
      "disciplineId": "silence-protocol",
      "name": "Ghost Walk",
      "description": "Allies in zone gain +1 Stealth die and are undetectable by cameras/thermals.",
      "xpCost": 10
    },
    {
      "id": "silence-protocol-expand-radius",
      "disciplineId": "silence-protocol",
      "name": "Expand Radius",
      "description": "Increase the radius by +2 squares per upgrade.",
      "xpCost": 10
    },
    {
      "id": "silence-protocol-project-effect",
      "disciplineId": "silence-protocol",
      "name": "Project Effect",
      "description": "Centre the effect up to 4 squares away.",
      "xpCost": 10
    }
  ],
  "siren-s-call": [
    {
      "id": "siren-s-call-additional-use",
      "disciplineId": "siren-s-call",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "siren-s-call-extended-range",
      "disciplineId": "siren-s-call",
      "name": "Extended Range",
      "description": "Increase range by +4 squares.",
      "xpCost": 10
    },
    {
      "id": "siren-s-call-chain-lure",
      "disciplineId": "siren-s-call",
      "name": "Chain Lure",
      "description": "Target +1 additional enemy within 4 squares per upgrade.",
      "xpCost": 10
    },
    {
      "id": "siren-s-call-force-of-personality",
      "disciplineId": "siren-s-call",
      "name": "Force of Personality",
      "description": "Gain +1 attack die on activation roll per upgrade.",
      "xpCost": 10
    },
    {
      "id": "siren-s-call-attraction",
      "disciplineId": "siren-s-call",
      "name": "Attraction",
      "description": "Attack is directed at Social rather than Mental.",
      "xpCost": 10
    },
    {
      "id": "siren-s-call-undying-devotion",
      "disciplineId": "siren-s-call",
      "name": "Undying Devotion",
      "description": "Gain +1 CT against Physical attacks while target is adjacent; target takes damage meant for you.",
      "xpCost": 10
    }
  ],
  "smoke-grenade": [
    {
      "id": "smoke-grenade-extra-munitions",
      "disciplineId": "smoke-grenade",
      "name": "Extra Munitions",
      "description": "+1 use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "smoke-grenade-expanded-cloud",
      "disciplineId": "smoke-grenade",
      "name": "Expanded Cloud",
      "description": "Smoke covers a larger 3x3 area.",
      "xpCost": 10
    },
    {
      "id": "smoke-grenade-enhanced-launcher",
      "disciplineId": "smoke-grenade",
      "name": "Enhanced Launcher",
      "description": "Deployment range increases by +4 squares.",
      "xpCost": 10
    },
    {
      "id": "smoke-grenade-targeting-matrix",
      "disciplineId": "smoke-grenade",
      "name": "Targeting Matrix",
      "description": "Allies ignore the attack die penalty from your smoke.",
      "xpCost": 10
    },
    {
      "id": "smoke-grenade-range-increase",
      "disciplineId": "smoke-grenade",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    },
    {
      "id": "smoke-grenade-restorative-corrosive-cloud",
      "disciplineId": "smoke-grenade",
      "name": "Restorative/Corrosive Cloud",
      "description": "Chosen characters ending turn in smoke regain or suffer 1 HP.",
      "xpCost": 10
    },
    {
      "id": "smoke-grenade-dense-obscurant",
      "disciplineId": "smoke-grenade",
      "name": "Dense Obscurant",
      "description": "Attack die penalty increases by an additional -1 die.",
      "xpCost": 10
    },
    {
      "id": "smoke-grenade-expert-deployment",
      "disciplineId": "smoke-grenade",
      "name": "Expert Deployment",
      "description": "Reduce Mental CT check to deploy by -1.",
      "xpCost": 10
    }
  ],
  "speed": [
    {
      "id": "speed-relentless",
      "disciplineId": "speed",
      "name": "Relentless",
      "description": "Each level grants an additional +2 squares of base movement.",
      "xpCost": 10
    },
    {
      "id": "speed-momentum",
      "disciplineId": "speed",
      "name": "Momentum",
      "description": "Gain +1 situational bonus die on a melee attack if you move at least 3 squares prior.",
      "xpCost": 10
    },
    {
      "id": "speed-skirmisher-s-step",
      "disciplineId": "speed",
      "name": "Skirmisher's Step",
      "description": "Do not provoke Attacks of Opportunity from the first enemy you move away from each turn.",
      "xpCost": 10
    },
    {
      "id": "speed-blur-of-motion",
      "disciplineId": "speed",
      "name": "Blur of Motion",
      "description": "Enemies have a +1 CT penalty to hit you with ranged attacks if you moved at least 6 squares.",
      "xpCost": 10
    }
  ],
  "steadfast": [
    {
      "id": "steadfast-unwavering-faith-level-1",
      "disciplineId": "steadfast",
      "name": "Unwavering Faith Level 1",
      "description": "Gain an additional +1 dice on all Corruption, Morale, and Fear Checks.",
      "xpCost": 10
    },
    {
      "id": "steadfast-unwavering-faith-level-2",
      "disciplineId": "steadfast",
      "name": "Unwavering Faith Level 2",
      "description": "Reduce DC of Corruption and Fear/Morale Checks by -1.",
      "xpCost": 10
    },
    {
      "id": "steadfast-inner-peace",
      "disciplineId": "steadfast",
      "name": "Inner Peace",
      "description": "Reduce Target Number for successes on Corruption/Morale/Fear by -1.",
      "xpCost": 10
    }
  ],
  "stealth": [
    {
      "id": "stealth-additional-use",
      "disciplineId": "stealth",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "stealth-padfoot",
      "disciplineId": "stealth",
      "name": "Padfoot",
      "description": "Reduce CT required for activation by -1.",
      "xpCost": 10
    },
    {
      "id": "stealth-improved-stealth",
      "disciplineId": "stealth",
      "name": "Improved Stealth",
      "description": "Make attacks without breaking Stealth (requires 2 levels).",
      "xpCost": 10
    }
  ],
  "suicide-bomber": [
    {
      "id": "suicide-bomber-bigger-charge",
      "disciplineId": "suicide-bomber",
      "name": "Bigger Charge",
      "description": "Detonation deals an additional +1 damage.",
      "xpCost": 10
    },
    {
      "id": "suicide-bomber-demoralise-level-1",
      "disciplineId": "suicide-bomber",
      "name": "Demoralise Level 1",
      "description": "Units affected must make a Morale Check.",
      "xpCost": 10
    },
    {
      "id": "suicide-bomber-demoralise-level-2",
      "disciplineId": "suicide-bomber",
      "name": "Demoralise Level 2",
      "description": "Affected units must make a Morale Check at -1 die.",
      "xpCost": 10
    },
    {
      "id": "suicide-bomber-over-packed-casing",
      "disciplineId": "suicide-bomber",
      "name": "Over-packed Casing",
      "description": "Blast radius increases to 2 squares in all directions.",
      "xpCost": 10
    },
    {
      "id": "suicide-bomber-humiliation",
      "disciplineId": "suicide-bomber",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "suicide-bomber-outsmart",
      "disciplineId": "suicide-bomber",
      "name": "Outsmart",
      "description": "Change the damage type to Mental on the fly.",
      "xpCost": 10
    }
  ],
  "survivalist": [
    {
      "id": "survivalist-expert-survivalist",
      "disciplineId": "survivalist",
      "name": "Expert Survivalist",
      "description": "Gain +1 Dice per upgrade.",
      "xpCost": 10
    },
    {
      "id": "survivalist-master-survivalist",
      "disciplineId": "survivalist",
      "name": "Master Survivalist",
      "description": "Gain -1 Target Number per upgrade.",
      "xpCost": 10
    }
  ],
  "sweeping-blow": [
    {
      "id": "sweeping-blow-additional-use",
      "disciplineId": "sweeping-blow",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "sweeping-blow-accuracy",
      "disciplineId": "sweeping-blow",
      "name": "Accuracy",
      "description": "Gain -1 CT bonus.",
      "xpCost": 10
    },
    {
      "id": "sweeping-blow-knockback",
      "disciplineId": "sweeping-blow",
      "name": "Knockback",
      "description": "Each enemy hit is pushed 1 square away.",
      "xpCost": 10
    },
    {
      "id": "sweeping-blow-wide-arc",
      "disciplineId": "sweeping-blow",
      "name": "Wide Arc",
      "description": "Target +1 additional adjacent enemy per upgrade.",
      "xpCost": 10
    },
    {
      "id": "sweeping-blow-humiliation",
      "disciplineId": "sweeping-blow",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "sweeping-blow-outsmart",
      "disciplineId": "sweeping-blow",
      "name": "Outsmart",
      "description": "Change the damage type to Mental on the fly.",
      "xpCost": 10
    }
  ],
  "sword-saint": [
    {
      "id": "sword-saint-long-reach",
      "disciplineId": "sword-saint",
      "name": "Long Reach",
      "description": "Strike enemies up to 2 squares away.",
      "xpCost": 10
    },
    {
      "id": "sword-saint-blade-precision",
      "disciplineId": "sword-saint",
      "name": "Blade Precision",
      "description": "Enemies suffer a -1 penalty to their CT when defending against your attacks.",
      "xpCost": 10
    },
    {
      "id": "sword-saint-focused-form",
      "disciplineId": "sword-saint",
      "name": "Focused Form",
      "description": "Gain an additional +1 attack die.",
      "xpCost": 10
    },
    {
      "id": "sword-saint-dual-wielding",
      "disciplineId": "sword-saint",
      "name": "Dual Wielding",
      "description": "Make 2 attacks at a +1 CT penalty requiring all AP.",
      "xpCost": 10
    },
    {
      "id": "sword-saint-parry",
      "disciplineId": "sword-saint",
      "name": "Parry",
      "description": "Ready an Action to Parry reducing incoming damage by 1 per success (2 uses per upgrade).",
      "xpCost": 10
    },
    {
      "id": "sword-saint-poison-blade",
      "disciplineId": "sword-saint",
      "name": "Poison Blade",
      "description": "Mental CT 4 attack causing Bleed/Poison DoT (1 use per combat).",
      "xpCost": 10
    },
    {
      "id": "sword-saint-humiliation",
      "disciplineId": "sword-saint",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "sword-saint-outsmart",
      "disciplineId": "sword-saint",
      "name": "Outsmart",
      "description": "Change the damage type to Mental on the fly.",
      "xpCost": 10
    },
    {
      "id": "sword-saint-penetration",
      "disciplineId": "sword-saint",
      "name": "Penetration",
      "description": "Change the damage type to Physical on the fly.",
      "xpCost": 10
    }
  ],
  "tactical-genius": [
    {
      "id": "tactical-genius-horde-breaker-level-1",
      "disciplineId": "tactical-genius",
      "name": "Horde Breaker Level 1",
      "description": "Situational bonus increases by +1 (max +4).",
      "xpCost": 10
    },
    {
      "id": "tactical-genius-crowd-surfer-level-1",
      "disciplineId": "tactical-genius",
      "name": "Crowd Surfer Level 1",
      "description": "Move through squares occupied by enemies as difficult terrain.",
      "xpCost": 10
    },
    {
      "id": "tactical-genius-horde-breaker-level-2",
      "disciplineId": "tactical-genius",
      "name": "Horde Breaker Level 2",
      "description": "Situational bonus increases by another +1 (max +5).",
      "xpCost": 10
    },
    {
      "id": "tactical-genius-whirlwind-defence-level-2",
      "disciplineId": "tactical-genius",
      "name": "Whirlwind Defence Level 2",
      "description": "Gain +1 CT against incoming melee attacks while adjacent to 2+ enemies.",
      "xpCost": 10
    }
  ],
  "taunt": [
    {
      "id": "taunt-additional-use",
      "disciplineId": "taunt",
      "name": "Additional Use",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "taunt-more-potent",
      "disciplineId": "taunt",
      "name": "More Potent",
      "description": "Reduce CT required by -1.",
      "xpCost": 10
    },
    {
      "id": "taunt-more-annoying",
      "disciplineId": "taunt",
      "name": "More Annoying",
      "description": "Target +1 additional enemy within 4 squares per upgrade.",
      "xpCost": 10
    }
  ],
  "tech-wiz": [
    {
      "id": "tech-wiz-expert-wiz",
      "disciplineId": "tech-wiz",
      "name": "Expert Wiz",
      "description": "Gain +1 die per upgrade.",
      "xpCost": 10
    },
    {
      "id": "tech-wiz-master-wiz",
      "disciplineId": "tech-wiz",
      "name": "Master Wiz",
      "description": "Gain -1 Target Number per upgrade.",
      "xpCost": 10
    }
  ],
  "telekinesis": [
    {
      "id": "telekinesis-kinetic-attack-level-1",
      "disciplineId": "telekinesis",
      "name": "Kinetic Attack Level 1",
      "description": "Make a Mental-based ranged attack (CT 4) inflicting Physical damage.",
      "xpCost": 10
    },
    {
      "id": "telekinesis-kinetic-attack-level-2",
      "disciplineId": "telekinesis",
      "name": "Kinetic Attack Level 2",
      "description": "Reduce CT to hit by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "telekinesis-alternate-kinetic-attack-level-2",
      "disciplineId": "telekinesis",
      "name": "Alternate Kinetic Attack Level 2",
      "description": "Gain +1 attack die per upgrade on kinetic attacks.",
      "xpCost": 10
    },
    {
      "id": "telekinesis-range-increase",
      "disciplineId": "telekinesis",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    }
  ],
  "telepathy": [
    {
      "id": "telepathy-deep-read-level-1",
      "disciplineId": "telepathy",
      "name": "Deep Read Level 1",
      "description": "Focused mental probing for specific surface-level information.",
      "xpCost": 10
    },
    {
      "id": "telepathy-memory-control-level-2",
      "disciplineId": "telepathy",
      "name": "Memory Control Level 2",
      "description": "Subtly implant or erase short-term memories.",
      "xpCost": 10
    }
  ],
  "terrorise": [
    {
      "id": "terrorise-additional-terror",
      "disciplineId": "terrorise",
      "name": "Additional Terror",
      "description": "Gain +1 additional use per combat per upgrade.",
      "xpCost": 10
    },
    {
      "id": "terrorise-extended-range",
      "disciplineId": "terrorise",
      "name": "Extended Range",
      "description": "Increase range by +2 squares.",
      "xpCost": 10
    },
    {
      "id": "terrorise-more-fearful",
      "disciplineId": "terrorise",
      "name": "More Fearful",
      "description": "Target +1 additional enemy within 4 squares per upgrade.",
      "xpCost": 10
    },
    {
      "id": "terrorise-scarier",
      "disciplineId": "terrorise",
      "name": "Scarier",
      "description": "Reduce CT required by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "terrorise-sheer-terror",
      "disciplineId": "terrorise",
      "name": "Sheer Terror",
      "description": "Gain +1 attack die on activation roll per upgrade.",
      "xpCost": 10
    },
    {
      "id": "terrorise-nightmare",
      "disciplineId": "terrorise",
      "name": "Nightmare",
      "description": "Attack is directed at Social rather than Mental.",
      "xpCost": 10
    },
    {
      "id": "terrorise-range-increase",
      "disciplineId": "terrorise",
      "name": "Range Increase",
      "description": "Increase the range limit by +2 squares.",
      "xpCost": 10
    }
  ],
  "toughness": [
    {
      "id": "toughness-physically-tough",
      "disciplineId": "toughness",
      "name": "Physically Tough",
      "description": "Gain +1 additional point of DR against Physical damage.",
      "xpCost": 10
    },
    {
      "id": "toughness-mentally-tough",
      "disciplineId": "toughness",
      "name": "Mentally Tough",
      "description": "Gain +1 additional point of DR against Mental damage.",
      "xpCost": 10
    },
    {
      "id": "toughness-socially-tough",
      "disciplineId": "toughness",
      "name": "Socially Tough",
      "description": "Gain +1 additional point of DR against Social damage.",
      "xpCost": 10
    }
  ],
  "trap-mastery": [
    {
      "id": "trap-mastery-expert-placement",
      "disciplineId": "trap-mastery",
      "name": "Expert Placement",
      "description": "Traps are harder to resist (-1 CT to trigger).",
      "xpCost": 10
    },
    {
      "id": "trap-mastery-more-traps",
      "disciplineId": "trap-mastery",
      "name": "More Traps",
      "description": "Place +1 additional trap marker.",
      "xpCost": 10
    },
    {
      "id": "trap-mastery-increased-area",
      "disciplineId": "trap-mastery",
      "name": "Increased Area",
      "description": "Place traps up to 6 squares away.",
      "xpCost": 10
    },
    {
      "id": "trap-mastery-crippling-trap",
      "disciplineId": "trap-mastery",
      "name": "Crippling Trap",
      "description": "On trigger the target is knocked Prone.",
      "xpCost": 10
    },
    {
      "id": "trap-mastery-lingering-damage",
      "disciplineId": "trap-mastery",
      "name": "Lingering Damage",
      "description": "On trigger the target begins Bleeding.",
      "xpCost": 10
    },
    {
      "id": "trap-mastery-extra-use",
      "disciplineId": "trap-mastery",
      "name": "Extra Use",
      "description": "Use Trap Mastery one additional time per combat.",
      "xpCost": 10
    }
  ],
  "unarmed-martial": [
    {
      "id": "unarmed-martial-hit-harder",
      "disciplineId": "unarmed-martial",
      "name": "Hit Harder",
      "description": "Gain an additional +1 attack die per upgrade.",
      "xpCost": 10
    },
    {
      "id": "unarmed-martial-deadly-aim",
      "disciplineId": "unarmed-martial",
      "name": "Deadly Aim",
      "description": "Gain -1 CT for Unarmed Melee attacks.",
      "xpCost": 10
    },
    {
      "id": "unarmed-martial-humiliation",
      "disciplineId": "unarmed-martial",
      "name": "Humiliation",
      "description": "Change the damage type to Social on the fly.",
      "xpCost": 10
    },
    {
      "id": "unarmed-martial-outsmart",
      "disciplineId": "unarmed-martial",
      "name": "Outsmart",
      "description": "Change the damage type to Mental on the fly.",
      "xpCost": 10
    },
    {
      "id": "unarmed-martial-counter-strike-level-1",
      "disciplineId": "unarmed-martial",
      "name": "Counter-Strike Level 1",
      "description": "Gain +1 CT against Physical melee; ready a counter-strike for 1 Minor AP.",
      "xpCost": 10
    },
    {
      "id": "unarmed-martial-flurry-of-blows-level-2",
      "disciplineId": "unarmed-martial",
      "name": "Flurry of Blows Level 2",
      "description": "Make two separate unarmed attacks with a -1 die penalty (costs all AP).",
      "xpCost": 10
    }
  ],
  "undead": [
    {
      "id": "undead-unnatural-vigor",
      "disciplineId": "undead",
      "name": "Unnatural Vigor",
      "description": "Removes the base Move Speed penalty restoring normal Move Speed.",
      "xpCost": 10
    },
    {
      "id": "undead-soulless-presence",
      "disciplineId": "undead",
      "name": "Soulless Presence",
      "description": "Gain +2 DR specifically against Social damage.",
      "xpCost": 10
    },
    {
      "id": "undead-mindless-resilience",
      "disciplineId": "undead",
      "name": "Mindless Resilience",
      "description": "Gain +2 DR specifically against Mental damage.",
      "xpCost": 10
    },
    {
      "id": "undead-draining-touch",
      "disciplineId": "undead",
      "name": "Draining Touch",
      "description": "Regain 1 HP when dealing 1+ damage with a melee attack.",
      "xpCost": 10
    },
    {
      "id": "undead-terrifying-visage",
      "disciplineId": "undead",
      "name": "Terrifying Visage",
      "description": "Living enemies adjacent at end of turn suffer -1 die on next Morale/Rally check.",
      "xpCost": 10
    },
    {
      "id": "undead-reclaimed-mind",
      "disciplineId": "undead",
      "name": "Reclaimed Mind",
      "description": "Removes the -1 dice penalty on your own Mental discipline rolls.",
      "xpCost": 10
    },
    {
      "id": "undead-compelling-presence",
      "disciplineId": "undead",
      "name": "Compelling Presence",
      "description": "Removes the -1 dice penalty on your own Social discipline rolls.",
      "xpCost": 10
    }
  ],
  "untouchable": [
    {
      "id": "untouchable-combat-opportunist",
      "disciplineId": "untouchable",
      "name": "Combat Opportunist",
      "description": "Make up to two Attacks of Opportunity per round.",
      "xpCost": 10
    },
    {
      "id": "untouchable-untouchable-presence",
      "disciplineId": "untouchable",
      "name": "Untouchable Presence",
      "description": "Grant adjacent ally immunity to Attacks of Opportunity until next turn (1 minor action).",
      "xpCost": 10
    },
    {
      "id": "untouchable-perfect-flow",
      "disciplineId": "untouchable",
      "name": "Perfect Flow",
      "description": "Move through enemy-occupied squares without stopping treating as difficult terrain (1 use per combat).",
      "xpCost": 10
    }
  ],
  "wall-crawler": [
    {
      "id": "wall-crawler-combat-adhesion",
      "disciplineId": "wall-crawler",
      "name": "Combat Adhesion",
      "description": "Perform attacks and use Disciplines while clinging to walls/ceilings.",
      "xpCost": 10
    },
    {
      "id": "wall-crawler-rapid-scramble",
      "disciplineId": "wall-crawler",
      "name": "Rapid Scramble",
      "description": "Movement speed while wall crawling increases by +2 squares.",
      "xpCost": 10
    },
    {
      "id": "wall-crawler-death-from-above",
      "disciplineId": "wall-crawler",
      "name": "Death From Above",
      "description": "Gain +1 bonus attack die when dropping down to make a melee attack.",
      "xpCost": 10
    },
    {
      "id": "wall-crawler-effortless-grip",
      "disciplineId": "wall-crawler",
      "name": "Effortless Grip",
      "description": "Remain clinging indefinitely without conscious concentration.",
      "xpCost": 10
    }
  ],
  "web-slinger": [
    {
      "id": "web-slinger-extra-web",
      "disciplineId": "web-slinger",
      "name": "Extra Web",
      "description": "Gain +1 additional use per combat.",
      "xpCost": 10
    },
    {
      "id": "web-slinger-grapple-swing",
      "disciplineId": "web-slinger",
      "name": "Grapple Swing",
      "description": "Move up to 6 squares passing over obstacles (1 AP).",
      "xpCost": 10
    },
    {
      "id": "web-slinger-humiliation",
      "disciplineId": "web-slinger",
      "name": "Humiliation",
      "description": "Attack is directed at Social rather than Physical.",
      "xpCost": 10
    },
    {
      "id": "web-slinger-outsmart",
      "disciplineId": "web-slinger",
      "name": "Outsmart",
      "description": "Attack is directed at Mental rather than Physical.",
      "xpCost": 10
    },
    {
      "id": "web-slinger-wide-net",
      "disciplineId": "web-slinger",
      "name": "Wide Net",
      "description": "Target +1 additional enemy within 4 squares per upgrade.",
      "xpCost": 10
    },
    {
      "id": "web-slinger-stronger-web",
      "disciplineId": "web-slinger",
      "name": "Stronger Web",
      "description": "Duration increased by +1 round.",
      "xpCost": 10
    },
    {
      "id": "web-slinger-targeting-system",
      "disciplineId": "web-slinger",
      "name": "Targeting System",
      "description": "Reduce CT required to hit by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "web-slinger-range-increase",
      "disciplineId": "web-slinger",
      "name": "Range Increase",
      "description": "Increase the range limit by +4 squares.",
      "xpCost": 10
    }
  ],
  "winged-mastery": [
    {
      "id": "winged-mastery-aerial-transport",
      "disciplineId": "winged-mastery",
      "name": "Aerial Transport",
      "description": "Carry one willing/incapacitated medium target while flying.",
      "xpCost": 10
    },
    {
      "id": "winged-mastery-hover-level-1",
      "disciplineId": "winged-mastery",
      "name": "Hover Level 1",
      "description": "Remain airborne at end of turn; immune to non-flying melee attacks.",
      "xpCost": 10
    },
    {
      "id": "winged-mastery-dive-bomb-level-2",
      "disciplineId": "winged-mastery",
      "name": "Dive Bomb Level 2",
      "description": "Gain +1 attack die after moving 3+ squares in a straight line while flying.",
      "xpCost": 10
    },
    {
      "id": "winged-mastery-mighty-wings",
      "disciplineId": "winged-mastery",
      "name": "Mighty Wings",
      "description": "Jump/Flight movement is increased by +3 squares.",
      "xpCost": 10
    }
  ],
  "barbed-skin": [
    {
      "id": "barbed-skin-thorn-damage-level-1",
      "disciplineId": "barbed-skin",
      "name": "Thorn Damage Level 1",
      "description": "Increase automatic spike damage dealt by +1 (max 3 upgrades).",
      "xpCost": 10
    },
    {
      "id": "barbed-skin-thorn-aura-level-2",
      "disciplineId": "barbed-skin",
      "name": "Thorn Aura Level 2",
      "description": "Adjacent hostile targets take 1 damage at start of turn if they remain adjacent.",
      "xpCost": 10
    }
  ],
  "blood-magic": [
    {
      "id": "blood-magic-vital-surge",
      "disciplineId": "blood-magic",
      "name": "Vital Surge",
      "description": "Increase total effect to 3 HP (damage or heal).",
      "xpCost": 10
    },
    {
      "id": "blood-magic-ritual-expenditure",
      "disciplineId": "blood-magic",
      "name": "Ritual Expenditure",
      "description": "Sacrifice an additional +1 HP to increase effect by +1.",
      "xpCost": 10
    },
    {
      "id": "blood-magic-blood-echo",
      "disciplineId": "blood-magic",
      "name": "Blood Echo",
      "description": "Regain 2 HP if Blood Magic kills an enemy or saves an ally from 0 HP.",
      "xpCost": 10
    }
  ],
  "dominate": [
    {
      "id": "dominate-iron-will",
      "disciplineId": "dominate",
      "name": "Iron Will",
      "description": "Reduce Target Number for Dominate checks by 1 per purchase.",
      "xpCost": 10
    },
    {
      "id": "dominate-enduring-dominion",
      "disciplineId": "dominate",
      "name": "Enduring Dominion",
      "description": "Gain +1 additional use per combat per purchase.",
      "xpCost": 10
    },
    {
      "id": "dominate-apex-subjugator",
      "disciplineId": "dominate",
      "name": "Apex Subjugator",
      "description": "Gain +1 automatic success against Elite or Boss targets per purchase.",
      "xpCost": 10
    }
  ],
  "dread-lord": [
    {
      "id": "dread-lord-crushing-aura",
      "disciplineId": "dread-lord",
      "name": "Crushing Aura",
      "description": "Increase CT penalty inflicted by aura to -2.",
      "xpCost": 10
    },
    {
      "id": "dread-lord-intimidate-level-1",
      "disciplineId": "dread-lord",
      "name": "Intimidate Level 1",
      "description": "Force adjacent enemies to make opposed check or move away (1 use per combat).",
      "xpCost": 10
    },
    {
      "id": "dread-lord-intimidate-level-2",
      "disciplineId": "dread-lord",
      "name": "Intimidate Level 2",
      "description": "Use Intimidate twice per combat.",
      "xpCost": 10
    },
    {
      "id": "dread-lord-dark-domain",
      "disciplineId": "dread-lord",
      "name": "Dark Domain",
      "description": "Aura affects enemies within 2 squares.",
      "xpCost": 10
    }
  ],
  "gravity-mastery": [
    {
      "id": "gravity-mastery-anti-gravity-field",
      "disciplineId": "gravity-mastery",
      "name": "Anti-gravity field",
      "description": "Targets in zone are lifted unable to move and only targetable by ranged attacks.",
      "xpCost": 10
    },
    {
      "id": "gravity-mastery-gravity-shift",
      "disciplineId": "gravity-mastery",
      "name": "Gravity Shift",
      "description": "Targets entering zone may gain Slowed Condition.",
      "xpCost": 10
    },
    {
      "id": "gravity-mastery-levitate",
      "disciplineId": "gravity-mastery",
      "name": "Levitate",
      "description": "Grant Flight to self or ally in the zone.",
      "xpCost": 10
    },
    {
      "id": "gravity-mastery-skystride",
      "disciplineId": "gravity-mastery",
      "name": "Skystride",
      "description": "Gain Flight (Move 4) for combat; upgrades add +2 Move.",
      "xpCost": 10
    },
    {
      "id": "gravity-mastery-expanded-field",
      "disciplineId": "gravity-mastery",
      "name": "Expanded Field",
      "description": "Gravity zone becomes 4x4 and may be placed up to 8 squares away.",
      "xpCost": 10
    },
    {
      "id": "gravity-mastery-gravitic-recall",
      "disciplineId": "gravity-mastery",
      "name": "Gravitic Recall",
      "description": "Use Gravitic Surge a second time per battle.",
      "xpCost": 10
    },
    {
      "id": "gravity-mastery-selective-field",
      "disciplineId": "gravity-mastery",
      "name": "Selective Field",
      "description": "Allies ignore the gravity zone's terrain penalties and effects.",
      "xpCost": 10
    }
  ],
  "life-lord": [
    {
      "id": "life-lord-renewed-rite",
      "disciplineId": "life-lord",
      "name": "Renewed Rite",
      "description": "+1 use per combat.",
      "xpCost": 10
    },
    {
      "id": "life-lord-life-gift",
      "disciplineId": "life-lord",
      "name": "Life Gift",
      "description": "Transfer healing to an ally within 4 squares instead of yourself.",
      "xpCost": 10
    },
    {
      "id": "life-lord-draining-glare",
      "disciplineId": "life-lord",
      "name": "Draining Glare",
      "description": "Target suffers -1 CT to all actions until their next turn.",
      "xpCost": 10
    },
    {
      "id": "life-lord-efficient-drain",
      "disciplineId": "life-lord",
      "name": "Efficient Drain",
      "description": "Reduce activation CT by -1 per upgrade.",
      "xpCost": 10
    },
    {
      "id": "life-lord-soul-drain",
      "disciplineId": "life-lord",
      "name": "Soul Drain",
      "description": "Each success drains +1 HP.",
      "xpCost": 10
    }
  ],
  "mastermind": [
    {
      "id": "mastermind-tactical-legion",
      "disciplineId": "mastermind",
      "name": "Tactical Legion",
      "description": "Max Minions increases to 4.",
      "xpCost": 10
    },
    {
      "id": "mastermind-hardened-constructs",
      "disciplineId": "mastermind",
      "name": "Hardened Constructs",
      "description": "Minions gain +1 HP and DR 1 (Physical).",
      "xpCost": 10
    },
    {
      "id": "mastermind-bladed-servants",
      "disciplineId": "mastermind",
      "name": "Bladed Servants",
      "description": "Minion attacks become 2d6.",
      "xpCost": 10
    },
    {
      "id": "mastermind-unrelenting-swarm",
      "disciplineId": "mastermind",
      "name": "Unrelenting Swarm",
      "description": "Replace a dead Minion for free once per combat.",
      "xpCost": 10
    },
    {
      "id": "mastermind-overlord-s-reach",
      "disciplineId": "mastermind",
      "name": "Overlord’s Reach",
      "description": "Summon Minions up to 6 squares away.",
      "xpCost": 10
    },
    {
      "id": "mastermind-hated-presence",
      "disciplineId": "mastermind",
      "name": "Hated Presence",
      "description": "Minions can Taunt once per combat.",
      "xpCost": 10
    }
  ],
  "not-on-my-watch": [
    {
      "id": "not-on-my-watch-rooted-strike",
      "disciplineId": "not-on-my-watch",
      "name": "Rooted Strike",
      "description": "If your attack hits the enemy's movement ends.",
      "xpCost": 10
    },
    {
      "id": "not-on-my-watch-battlefield-anchor",
      "disciplineId": "not-on-my-watch",
      "name": "Battlefield Anchor",
      "description": "Make 2 Opportunity Strikes per round.",
      "xpCost": 10
    },
    {
      "id": "not-on-my-watch-punishing-presence",
      "disciplineId": "not-on-my-watch",
      "name": "Punishing Presence",
      "description": "Strike enemies entering your melee reach as a free action once per turn.",
      "xpCost": 10
    },
    {
      "id": "not-on-my-watch-deep-enmity-level-1",
      "disciplineId": "not-on-my-watch",
      "name": "Deep Enmity Level 1",
      "description": "Use 1 AP to Taunt all adjacent enemies (1 use per combat).",
      "xpCost": 10
    },
    {
      "id": "not-on-my-watch-deep-enmity-level-2",
      "disciplineId": "not-on-my-watch",
      "name": "Deep Enmity Level 2",
      "description": "Gain +1 use per combat of Deep Enmity.",
      "xpCost": 10
    }
  ],
  "oracle": [
    {
      "id": "oracle-keen-focus",
      "disciplineId": "oracle",
      "name": "Keen Focus",
      "description": "Gain +1 dice on Mental DC checks for awareness/investigation.",
      "xpCost": 10
    },
    {
      "id": "oracle-eyes-of-the-battlefield",
      "disciplineId": "oracle",
      "name": "Eyes of the Battlefield",
      "description": "Dispel stealth/invisibility on visible targets; reveal ghosts.",
      "xpCost": 10
    },
    {
      "id": "oracle-precognition-level-1",
      "disciplineId": "oracle",
      "name": "Precognition Level 1",
      "description": "One visible enemy suffers -1 CT vs. all allies' attacks for 1 round.",
      "xpCost": 10
    },
    {
      "id": "oracle-precognition-level-2",
      "disciplineId": "oracle",
      "name": "Precognition Level 2",
      "description": "CT penalty increases to -2.",
      "xpCost": 10
    }
  ],
  "primal-bond": [
    {
      "id": "primal-bond-primal-bond-level-2",
      "disciplineId": "primal-bond",
      "name": "Primal Bond - Level 2",
      "description": "Strengthen bond via Warrior Stalker Guardian or Enhanced Link paths.",
      "xpCost": 10
    },
    {
      "id": "primal-bond-primal-bond-level-3",
      "disciplineId": "primal-bond",
      "name": "Primal Bond - Level 3",
      "description": "Apex bond via Apex Warrior Stalker Guardian Astral Wings or Master Link paths.",
      "xpCost": 10
    }
  ],
  "reversal-of-fortune": [
    {
      "id": "reversal-of-fortune-more-fortunate",
      "disciplineId": "reversal-of-fortune",
      "name": "More Fortunate",
      "description": "+1 use per combat/DC encounter targeting a different roll.",
      "xpCost": 10
    }
  ],
  "shape-shift": [
    {
      "id": "shape-shift-aquatic-form-level-1",
      "disciplineId": "shape-shift",
      "name": "Aquatic Form Level 1",
      "description": "Assume aquatic creature shape and breathe underwater.",
      "xpCost": 10
    },
    {
      "id": "shape-shift-more-shifts-level-1",
      "disciplineId": "shape-shift",
      "name": "More Shifts Level 1",
      "description": "Shape shift +1 times per scene/combat.",
      "xpCost": 10
    },
    {
      "id": "shape-shift-mass-shift-level-1",
      "disciplineId": "shape-shift",
      "name": "Mass Shift Level 1",
      "description": "Change size by one category altering stats.",
      "xpCost": 10
    },
    {
      "id": "shape-shift-bear-brother-level-1",
      "disciplineId": "shape-shift",
      "name": "Bear Brother Level 1",
      "description": "Gain DR 1 +2 Physical +5 temp HP and +1 melee damage in Bear Form.",
      "xpCost": 10
    },
    {
      "id": "shape-shift-skyshape-level-2",
      "disciplineId": "shape-shift",
      "name": "Skyshape Level 2",
      "description": "Transform into a flying creature with Flight (Move 4).",
      "xpCost": 10
    },
    {
      "id": "shape-shift-apex-predator-level-2",
      "disciplineId": "shape-shift",
      "name": "Apex Predator Level 2",
      "description": "+2 Physical while shifted (stacks with Bear Brother).",
      "xpCost": 10
    }
  ],
  "spatial-mastery": [
    {
      "id": "spatial-mastery-phase-reach",
      "disciplineId": "spatial-mastery",
      "name": "Phase Reach",
      "description": "Teleport range increases +4 squares.",
      "xpCost": 10
    },
    {
      "id": "spatial-mastery-displacement-push-pull",
      "disciplineId": "spatial-mastery",
      "name": "Displacement Push/Pull",
      "description": "Move target adjacent to you or teleport them up to 4 squares.",
      "xpCost": 10
    },
    {
      "id": "spatial-mastery-spatial-swap",
      "disciplineId": "spatial-mastery",
      "name": "Spatial Swap",
      "description": "Instantly swap places with target or ally.",
      "xpCost": 10
    },
    {
      "id": "spatial-mastery-echo-blink",
      "disciplineId": "spatial-mastery",
      "name": "Echo Blink",
      "description": "Teleport an additional time per combat/scene.",
      "xpCost": 10
    },
    {
      "id": "spatial-mastery-ripple-step",
      "disciplineId": "spatial-mastery",
      "name": "Ripple Step",
      "description": "Target +1 unit per upgrade when using Pull/Swap.",
      "xpCost": 10
    }
  ],
  "temporal-shift": [
    {
      "id": "temporal-shift-repeat-time",
      "disciplineId": "temporal-shift",
      "name": "Repeat Time",
      "description": "+1 use per combat.",
      "xpCost": 10
    },
    {
      "id": "temporal-shift-shiftier",
      "disciplineId": "temporal-shift",
      "name": "Shiftier",
      "description": "Affect +1 additional target per upgrade.",
      "xpCost": 10
    },
    {
      "id": "temporal-shift-space-and-time",
      "disciplineId": "temporal-shift",
      "name": "Space and Time",
      "description": "Increase range by +4 squares per upgrade.",
      "xpCost": 10
    },
    {
      "id": "temporal-shift-increase-potency",
      "disciplineId": "temporal-shift",
      "name": "Increase Potency",
      "description": "Hasten grants +2 Move or Slow inflicts -1 attack die.",
      "xpCost": 10
    }
  ],
  "time-lord": [
    {
      "id": "time-lord-chrono-reserve",
      "disciplineId": "time-lord",
      "name": "Chrono Reserve",
      "description": "+1 use of Temporal Dismissal per battle.",
      "xpCost": 10
    },
    {
      "id": "time-lord-unshackled-pulse",
      "disciplineId": "time-lord",
      "name": "Unshackled Pulse",
      "description": "Bosses/Elites/Heroes require -1 extra success to resist per upgrade.",
      "xpCost": 10
    },
    {
      "id": "time-lord-battlefield-master",
      "disciplineId": "time-lord",
      "name": "Battlefield Master",
      "description": "Affect +1 additional enemy per use.",
      "xpCost": 10
    },
    {
      "id": "time-lord-focus",
      "disciplineId": "time-lord",
      "name": "Focus",
      "description": "-1 CT bonus when checking for success.",
      "xpCost": 10
    },
    {
      "id": "time-lord-time-master",
      "disciplineId": "time-lord",
      "name": "Time master",
      "description": "Add +1 duration.",
      "xpCost": 10
    }
  ]
};
