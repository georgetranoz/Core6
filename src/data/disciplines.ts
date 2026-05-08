export interface Discipline {
  id: string;
  name: string;
  classification: string;
  stat: string;
  tags: string[];
  description: string;
  range: string;
}

export const disciplinesData: Discipline[] = [
  {
    "id": "acrobatics",
    "name": "Acrobatics",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Utility",
      "Movement",
      "Self"
    ],
    "description": "Exceptional agility and bodily control. +1 bonus die on balance/climbing/tumbling and allows gap leaping.",
    "range": "Self / Variable"
  },
  {
    "id": "agility",
    "name": "Agility",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Utility",
      "Self"
    ],
    "description": "Gain +1 Movement space. Upgrades add extra Major and Minor Action Points.",
    "range": "Self"
  },
  {
    "id": "aid-ally",
    "name": "Aid Ally",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Support"
    ],
    "description": "Mentally guide an ally. Lowers their required Combat Target (CT) for attacks.",
    "range": "4 squares"
  },
  {
    "id": "babble-fish",
    "name": "Babble Fish",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Utility"
    ],
    "description": "Universally communicate with and understand the spoken language of people and animals.",
    "range": "Hearing distance"
  },
  {
    "id": "backstab",
    "name": "Backstab",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Melee"
    ],
    "description": "Gain +2 situational bonus dice on Physical melee attacks against unaware or already engaged targets.",
    "range": "Melee"
  },
  {
    "id": "battlefield-reflexes",
    "name": "Battlefield Reflexes",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat"
    ],
    "description": "Reaction to a ranged attack: immediately move 1 square to cover before the roll.",
    "range": "Self"
  },
  {
    "id": "berserker-rage",
    "name": "Berserker Rage",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Self"
    ],
    "description": "Enter a fury to gain +1 attack die and +1 Universal DR but become easier to hit.",
    "range": "Self"
  },
  {
    "id": "blast",
    "name": "Blast",
    "classification": "Standard",
    "stat": "Mental, Social",
    "tags": [
      "Combat",
      "Ranged",
      "AoE"
    ],
    "description": "Ranged energy burst dealing 1 damage per success to a primary target and adjacent units.",
    "range": "Short (4 squares)"
  },
  {
    "id": "brace-for-impact",
    "name": "Brace for Impact",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat"
    ],
    "description": "Take a defensive stance to counter-attack a charging enemy with a +2 attack die bonus.",
    "range": "Melee"
  },
  {
    "id": "burrow-mastery",
    "name": "Burrow Mastery",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Movement"
    ],
    "description": "Burrow underground to become untargetable and unseen.",
    "range": "Self"
  },
  {
    "id": "charge",
    "name": "Charge",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Melee"
    ],
    "description": "Move 3 or more squares to gain a +2 situational bonus dice on a Physical melee attack.",
    "range": "Melee"
  },
  {
    "id": "commanding-voice",
    "name": "Commanding Voice",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Utility"
    ],
    "description": "Inspire allies (+1 bonus die) or intimidate foes (-1 penalty die).",
    "range": "4 squares"
  },
  {
    "id": "dark-vision",
    "name": "Dark Vision",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Self",
      "Utility"
    ],
    "description": "Ignore penalties from low light conditions.",
    "range": "Self"
  },
  {
    "id": "darkness",
    "name": "Darkness",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility"
    ],
    "description": "Create a 2x2 square zone of supernatural darkness granting +2 CT Defence to those inside.",
    "range": "2x2 zone on Hero"
  },
  {
    "id": "deadly-precision",
    "name": "Deadly Precision",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat"
    ],
    "description": "Natural 6s on attack rolls deal +1 bonus Physical damage.",
    "range": "Weapon Range"
  },
  {
    "id": "death-cultist",
    "name": "Death Cultist",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Self"
    ],
    "description": "Defy death once per battle. Stand back up with 1 HP and the Shaken condition when reduced to 0 HP.",
    "range": "Self"
  },
  {
    "id": "diplomat",
    "name": "Diplomat",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Utility"
    ],
    "description": "Gain +1 bonus die for Social checks like negotiation and persuasion.",
    "range": "Self"
  },
  {
    "id": "disguise-mastery",
    "name": "Disguise Mastery",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Utility"
    ],
    "description": "Subtly shift your presence. Gain +1 dice on Social checks for impersonation or disguise.",
    "range": "Self"
  },
  {
    "id": "dodge",
    "name": "Dodge",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Combat",
      "Defence"
    ],
    "description": "Increases the Combat Target (CT) for incoming attacks by +1.",
    "range": "Self"
  },
  {
    "id": "driving-piloting",
    "name": "Driving & Piloting",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Utility"
    ],
    "description": "Proficiency in vehicles and mounts. Gain +1 bonus die for piloting/driving checks.",
    "range": "Self"
  },
  {
    "id": "entropy-mastery",
    "name": "Entropy Mastery",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Melee",
      "Ranged"
    ],
    "description": "Channel elemental energy for a Physical melee attack with +1 bonus attack die.",
    "range": "Melee"
  },
  {
    "id": "environmental-mastery",
    "name": "Environmental Mastery",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Self"
    ],
    "description": "Breathe underwater and ignore all movement penalties from difficult terrain or liquid surfaces.",
    "range": "Self"
  },
  {
    "id": "fate-weaver",
    "name": "Fate Weaver",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Support"
    ],
    "description": "Generate Fate Tokens to modify dice rolls or allow rerolls for yourself or allies.",
    "range": "Self / Allies"
  },
  {
    "id": "fear-itself",
    "name": "Fear Itself",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Combat",
      "AoE"
    ],
    "description": "Project an aura of dread that inflicts a -1 die penalty to enemy Morale and Rally checks.",
    "range": "Social Stat + 1 radius"
  },
  {
    "id": "first-aid",
    "name": "First Aid",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Heal"
    ],
    "description": "Apply a Heal-over-Time (HoT) effect to an ally and stop ongoing Bleeding or Poison effects.",
    "range": "4 squares"
  },
  {
    "id": "grapple-mastery",
    "name": "Grapple Mastery",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Melee"
    ],
    "description": "Expert grappling. Requires only 1 success to apply the Grappled condition instead of 2.",
    "range": "Melee"
  },
  {
    "id": "green-thumb",
    "name": "Green Thumb",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Utility",
      "Support"
    ],
    "description": "Influence plant growth. Entangle and immobilize a target for rounds equal to successes plus one.",
    "range": "4 squares"
  },
  {
    "id": "heal-ally",
    "name": "Heal Ally",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Heal"
    ],
    "description": "Directly restore 2 HP per success to an ally and stop Bleeding or Poison effects.",
    "range": "4 squares"
  },
  {
    "id": "heightened-senses",
    "name": "Heightened Senses",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility",
      "Self"
    ],
    "description": "Gain +1 dice on perception. Detect hidden/supernatural entities and overcome concealment.",
    "range": "4 squares"
  },
  {
    "id": "illusion",
    "name": "Illusion",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility",
      "Combat",
      "Support",
      "Ranged"
    ],
    "description": "Project vivid illusions into minds to disguise spaces or create false sights/sounds.",
    "range": "Line of sight"
  },
  {
    "id": "inflict-fear",
    "name": "Inflict Fear",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Combat",
      "Ranged"
    ],
    "description": "Unleash a wave of terror forcing enemies to make a Morale Check or become Shaken.",
    "range": "4 squares"
  },
  {
    "id": "inflict-lingering-pain",
    "name": "Inflict Lingering Pain",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Ranged"
    ],
    "description": "Ranged Mental attack that applies a Damage-over-Time (DoT) effect bypassing DR.",
    "range": "Short (4 squares)"
  },
  {
    "id": "invisible",
    "name": "Invisible",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Utility"
    ],
    "description": "Vanish from sight making you untargetable and granting +2 situational dice on your next attack.",
    "range": "Self"
  },
  {
    "id": "juggernaut-chassis",
    "name": "Juggernaut Chassis",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Self",
      "Battlegrounds"
    ],
    "description": "Become a Large vehicle/construct immune to control effects. Move 3 with +1 Physical DR.",
    "range": "Self"
  },
  {
    "id": "leadership",
    "name": "Leadership",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Utility",
      "Self"
    ],
    "description": "Project an aura granting allies +1 die on Morale and Rally checks.",
    "range": "Social Stat + 2 radius"
  },
  {
    "id": "marksman",
    "name": "Marksman",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Mark a target so all ranged attacks against it by your team gain +1 attack die.",
    "range": "Line of sight"
  },
  {
    "id": "master-defender",
    "name": "Master Defender",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Defence"
    ],
    "description": "Reaction to intercept an attack meant for an adjacent ally.",
    "range": "Adjacent (1 square)"
  },
  {
    "id": "master-tactician",
    "name": "Master Tactician",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Adjacent allies gain +1 situational bonus attack die.",
    "range": "Adjacent (1 square)"
  },
  {
    "id": "master-thief",
    "name": "Master Thief",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Utility"
    ],
    "description": "Gain +1 die for thievery-related checks like lock-picking and pick-pocketing.",
    "range": "Self"
  },
  {
    "id": "negate",
    "name": "Negate",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility"
    ],
    "description": "Reaction to negate an enemy's Once per Combat Discipline activation.",
    "range": "8 squares"
  },
  {
    "id": "negation-shield",
    "name": "Negation Shield",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Combat",
      "Defence"
    ],
    "description": "Automatically negates 1 success from attacks trying to trigger specific effects (e.g. Stun or Grapple).",
    "range": "Self"
  },
  {
    "id": "overload",
    "name": "Overload",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Psychic attack that Stuns an enemy for rounds equal to successes plus one.",
    "range": "4 squares"
  },
  {
    "id": "pack-mentality",
    "name": "Pack Mentality",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Self"
    ],
    "description": "Gain +1 situational bonus attack die on melee attacks for each allied Hero adjacent to the target.",
    "range": "Melee"
  },
  {
    "id": "power-strike",
    "name": "Power Strike",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Combat"
    ],
    "description": "Adds a permanent +1 damage to all successful melee or ranged non-AoE attacks.",
    "range": "Weapon Range"
  },
  {
    "id": "protect-ally",
    "name": "Protect Ally",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support",
      "Defence"
    ],
    "description": "Project a ward on an ally granting them +1 to their Defence CT against incoming attacks.",
    "range": "4 squares"
  },
  {
    "id": "ranged-combat",
    "name": "Ranged Combat",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Combat",
      "Ranged"
    ],
    "description": "Allows effective ranged attacks using any Stat without the standard -1 die penalty.",
    "range": "Short (4 squares)"
  },
  {
    "id": "regeneration",
    "name": "Regeneration",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Self",
      "Heal"
    ],
    "description": "Activate a self-healing Heal-over-Time (HoT) effect.",
    "range": "Self"
  },
  {
    "id": "resistance",
    "name": "Resistance",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Combat",
      "Defence"
    ],
    "description": "Gain Damage Reduction (DR) 1 against environmental or elemental hazards (fire/acid/etc).",
    "range": "Self"
  },
  {
    "id": "scholar",
    "name": "Scholar",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility"
    ],
    "description": "Gain +1 die for skill checks relating to research lore and history.",
    "range": "Self"
  },
  {
    "id": "shield-master",
    "name": "Shield Master",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Defence"
    ],
    "description": "Reaction to completely block an incoming attack after the roll is made.",
    "range": "Self"
  },
  {
    "id": "silence-protocol",
    "name": "Silence Protocol",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility"
    ],
    "description": "Create a zone of absolute silence suppressing all sound.",
    "range": "2-square radius on Hero"
  },
  {
    "id": "siren-s-call",
    "name": "Siren's Call",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Enthral a target forcing them to move towards you and protect you from attackers.",
    "range": "4 squares"
  },
  {
    "id": "smoke-grenade",
    "name": "Smoke Grenade",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Create a 2x2 smoke cloud that inflicts a -1 die penalty on attacks passing through it.",
    "range": "4 squares"
  },
  {
    "id": "speed",
    "name": "Speed",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Movement"
    ],
    "description": "Permanently increase base movement speed by +2 squares.",
    "range": "Self"
  },
  {
    "id": "steadfast",
    "name": "Steadfast",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Self",
      "Defence"
    ],
    "description": "Gain +1 dice on all Corruption Morale and Fear Checks.",
    "range": "Self"
  },
  {
    "id": "stealth",
    "name": "Stealth",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Utility"
    ],
    "description": "Become unseen and unheard granting a +2 situational bonus die on your next attack.",
    "range": "Self"
  },
  {
    "id": "suicide-bomber",
    "name": "Suicide Bomber",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "AoE"
    ],
    "description": "Detonate upon reaching 0 HP or by choice dealing damage that bypasses DR.",
    "range": "8 adjacent squares"
  },
  {
    "id": "survivalist",
    "name": "Survivalist",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility"
    ],
    "description": "Gain +1 bonus dice for survival checks and ignore movement penalties from difficult terrain.",
    "range": "Self"
  },
  {
    "id": "sweeping-blow",
    "name": "Sweeping Blow",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Melee"
    ],
    "description": "Make a single Physical melee attack against two adjacent enemies with a -1 dice penalty.",
    "range": "Adjacent enemies"
  },
  {
    "id": "sword-saint",
    "name": "Sword Saint",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Melee",
      "Combat"
    ],
    "description": "Gain +1 attack die when making melee attacks with a weapon.",
    "range": "Melee"
  },
  {
    "id": "tactical-genius",
    "name": "Tactical Genius",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Melee"
    ],
    "description": "Gain +1 situational bonus die on a physical melee attack for each enemy adjacent to you.",
    "range": "Melee"
  },
  {
    "id": "taunt",
    "name": "Taunt",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Force a visible enemy to focus their attention and attacks solely on you.",
    "range": "Line of sight"
  },
  {
    "id": "tech-wiz",
    "name": "Tech Wiz",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility"
    ],
    "description": "Gain +1 bonus die for technology-related checks like hacking or repairs.",
    "range": "Self"
  },
  {
    "id": "telekinesis",
    "name": "Telekinesis",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility",
      "Combat",
      "Ranged"
    ],
    "description": "Interact with objects without touching them using your Mental stat.",
    "range": "Line of sight"
  },
  {
    "id": "telepathy",
    "name": "Telepathy",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Utility"
    ],
    "description": "Reveal surface emotions/thoughts or establish silent mind-to-mind communication.",
    "range": "Line of sight"
  },
  {
    "id": "terrorise",
    "name": "Terrorise",
    "classification": "Standard",
    "stat": "Social",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Potent fear effect forcing a target to drop actions and flee toward the table edge.",
    "range": "4 squares"
  },
  {
    "id": "toughness",
    "name": "Toughness",
    "classification": "Standard",
    "stat": "Universal",
    "tags": [
      "Combat",
      "Defence"
    ],
    "description": "Gain permanent Damage Reduction (DR) 1 to shrug off incoming damage.",
    "range": "Self"
  },
  {
    "id": "trap-mastery",
    "name": "Trap Mastery",
    "classification": "Standard",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Utility"
    ],
    "description": "Place hidden traps that deal damage bypassing DR and drain AP from enemies who trigger them.",
    "range": "4 squares"
  },
  {
    "id": "unarmed-martial",
    "name": "Unarmed Martial",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Melee"
    ],
    "description": "Gain +1 Physical attack die when making unarmed melee attacks.",
    "range": "Melee"
  },
  {
    "id": "undead",
    "name": "Undead",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Self"
    ],
    "description": "Immune to Fear/Morale/Taunt. Move reduced to 3. -1 die on Mental/Social disciplines.",
    "range": "Self"
  },
  {
    "id": "untouchable",
    "name": "Untouchable",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Defence"
    ],
    "description": "Move away from adjacent enemies without provoking Attacks of Opportunity.",
    "range": "Self"
  },
  {
    "id": "wall-crawler",
    "name": "Wall Crawler",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Movement"
    ],
    "description": "Move freely across vertical surfaces and ceilings at no extra movement cost.",
    "range": "Self"
  },
  {
    "id": "web-slinger",
    "name": "Web Slinger",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Entangle a target causing the Stunned condition for rounds equal to successes plus one.",
    "range": "Ranged/Melee"
  },
  {
    "id": "winged-mastery",
    "name": "Winged Mastery",
    "classification": "Standard",
    "stat": "Physical",
    "tags": [
      "Movement"
    ],
    "description": "Spend 1 Minor AP to jump 2 squares passing over ground targets and obstacles.",
    "range": "2 squares"
  },
  {
    "id": "barbed-skin",
    "name": "Barbed Skin",
    "classification": "Ascendant",
    "stat": "Universal",
    "tags": [
      "Combat",
      "Self"
    ],
    "description": "Melee attackers automatically take 1 point of damage bypassing DR when they hit you.",
    "range": "Self"
  },
  {
    "id": "blood-magic",
    "name": "Blood Magic",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Ranged",
      "Heal"
    ],
    "description": "Sacrifice 1 HP to deal 2 unblockable damage to an enemy or heal 2 HP for an ally.",
    "range": "4 squares"
  },
  {
    "id": "dominate",
    "name": "Dominate",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Seize complete control of an enemy's actions and dictate their turns.",
    "range": "8 squares"
  },
  {
    "id": "dread-lord",
    "name": "Dread Lord",
    "classification": "Ascendant",
    "stat": "Social",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Project an intimidating aura that gives adjacent enemies a +1 penalty to their attack/check CT.",
    "range": "Adjacent (1 square)"
  },
  {
    "id": "gravity-mastery",
    "name": "Gravity Mastery",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support",
      "AoE"
    ],
    "description": "Create a 3x3 heavy gravity zone making it difficult terrain and grounding flying units.",
    "range": "4 squares"
  },
  {
    "id": "life-lord",
    "name": "Life Lord",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Ranged",
      "Heal"
    ],
    "description": "Drain 1 HP per success from an enemy and heal yourself for the same amount bypassing DR.",
    "range": "Short (4 squares)"
  },
  {
    "id": "mastermind",
    "name": "Mastermind",
    "classification": "Ascendant",
    "stat": "Social",
    "tags": [
      "Combat",
      "Support",
      "Summon"
    ],
    "description": "Summon 2 Minions to fight by your side.",
    "range": "2 squares"
  },
  {
    "id": "not-on-my-watch",
    "name": "Not On My Watch",
    "classification": "Ascendant",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Make a free melee attack against an adjacent enemy that tries to move away.",
    "range": "Adjacent (1 square)"
  },
  {
    "id": "oracle",
    "name": "Oracle",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Utility",
      "Support"
    ],
    "description": "Automatically detect hidden enemies/items and see through illusions. +2 dice to Perception.",
    "range": "12 squares"
  },
  {
    "id": "primal-bond",
    "name": "Primal Bond",
    "classification": "Ascendant",
    "stat": "Social",
    "tags": [
      "Summon",
      "Combat",
      "Self",
      "Utility"
    ],
    "description": "Summon a loyal bonded animal or creature companion to assist in combat and utility.",
    "range": "Adjacent (1 square)"
  },
  {
    "id": "reversal-of-fortune",
    "name": "Reversal of Fortune",
    "classification": "Ascendant",
    "stat": "Universal",
    "tags": [
      "Support"
    ],
    "description": "Flip every die on any rolled check to its opposite value (e.g. 1 becomes 6).",
    "range": "Line of sight"
  },
  {
    "id": "shape-shift",
    "name": "Shape Shift",
    "classification": "Ascendant",
    "stat": "Physical",
    "tags": [
      "Combat",
      "Self",
      "Melee",
      "Movement"
    ],
    "description": "Transform into a natural creature gaining situational benefits and skill bonuses.",
    "range": "Self"
  },
  {
    "id": "spatial-mastery",
    "name": "Spatial Mastery",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Instantly teleport yourself bypassing obstacles and enemies.",
    "range": "4 squares"
  },
  {
    "id": "temporal-shift",
    "name": "Temporal Shift",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Manipulate time to grant an ally +1 AP (Hasten) or inflict an enemy with -1 AP (Slow).",
    "range": "4 squares"
  },
  {
    "id": "time-lord",
    "name": "Time Lord",
    "classification": "Ascendant",
    "stat": "Mental",
    "tags": [
      "Combat",
      "Support"
    ],
    "description": "Temporarily banish a target from time removing them from the battlefield completely.",
    "range": "Line of sight"
  }
];
