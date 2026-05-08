import React from 'react';
import {
  DerivedHero,
  CoreUpgradeKind,
  CORE_UPGRADE_COSTS,
  CORE_UPGRADE_LABELS,
  useAppStore,
} from '../state/AppState';
import { Sparkles, BookOpen, Plus, Minus, RotateCcw } from 'lucide-react';
import './ProgressionTab.css';

interface ProgressionTabProps {
  hero: DerivedHero;
}

const CORE_UPGRADE_ORDER: CoreUpgradeKind[] = [
  'physicalTraining',
  'mentalFortitude',
  'socialPresence',
  'vitalityBoost',
];

const ProgressionTab: React.FC<ProgressionTabProps> = ({ hero }) => {
  const { purchaseCoreUpgrade, refundCoreUpgrade, updateHero } = useAppStore();

  const adjustInfluence = (kind: 'public' | 'underworld', delta: number) => {
    updateHero(hero.id, {
      influence: {
        ...hero.influence,
        [kind]: Math.max(0, hero.influence[kind] + delta),
      },
    });
  };

  const updateNarrative = (kind: 'keywords' | 'flaws' | 'currentGoal', value: string) => {
    updateHero(hero.id, {
      narrative: { ...hero.narrative, [kind]: value },
    });
  };

  return (
    <div className="tab-content progression-tab fade-in">
      <div className="tab-header">
        <h2>The Ledger</h2>
        <Sparkles size={24} color="var(--accent-tertiary)" />
      </div>

      <div className="ledger-card glass-panel">
        <div className="xp-balance">
          <div className="xp-stat">
            <span className="xp-label">Current XP</span>
            <span className="xp-value highlight">{hero.xp.current}</span>
          </div>
          <div className="xp-divider"></div>
          <div className="xp-stat">
            <span className="xp-label">Lifetime XP</span>
            <span className="xp-value">{hero.xp.max}</span>
          </div>
        </div>
      </div>

      <div className="section-block">
        <h3>Core Upgrades</h3>
        <div className="upgrade-list">
          {CORE_UPGRADE_ORDER.map(kind => {
            const cost = CORE_UPGRADE_COSTS[kind];
            const stacks = hero.coreUpgrades[kind];
            const label = CORE_UPGRADE_LABELS[kind];
            const canAfford = hero.xp.current >= cost;
            return (
              <div className="upgrade-item glass-panel" key={kind}>
                <div className="upgrade-info">
                  <h4>
                    {label.name}
                    {stacks > 0 && (
                      <span style={{ marginLeft: 8, opacity: 0.7, fontSize: '0.85em' }}>
                        ×{stacks}
                      </span>
                    )}
                  </h4>
                  <p>{label.description}</p>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {stacks > 0 && (
                    <button
                      className="buy-btn"
                      onClick={() => refundCoreUpgrade(hero.id, kind)}
                      title={`Refund 1 ${label.name}`}
                      aria-label={`Refund ${label.name}`}
                    >
                      <RotateCcw size={14} />
                    </button>
                  )}
                  <button
                    className={`buy-btn ${canAfford ? 'affordable' : 'unaffordable'}`}
                    disabled={!canAfford}
                    onClick={() => purchaseCoreUpgrade(hero.id, kind)}
                  >
                    {cost} XP
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-block">
        <h3>Influence & Renown</h3>
        <div className="influence-grid">
          <div className="influence-card glass-panel">
            <span className="inf-label">Public</span>
            <div className="inf-controls">
              <button onClick={() => adjustInfluence('public', -1)} aria-label="Decrease public influence">
                <Minus size={14} />
              </button>
              <span className="inf-value">{hero.influence.public}</span>
              <button onClick={() => adjustInfluence('public', 1)} aria-label="Increase public influence">
                <Plus size={14} />
              </button>
            </div>
          </div>
          <div className="influence-card glass-panel">
            <span className="inf-label">Underworld</span>
            <div className="inf-controls">
              <button onClick={() => adjustInfluence('underworld', -1)} aria-label="Decrease underworld influence">
                <Minus size={14} />
              </button>
              <span className="inf-value">{hero.influence.underworld}</span>
              <button onClick={() => adjustInfluence('underworld', 1)} aria-label="Increase underworld influence">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-block narrative-block">
        <div className="narrative-header">
          <h3>Narrative Record</h3>
          <BookOpen size={18} />
        </div>

        <div className="narrative-field">
          <label>Keywords</label>
          <input
            type="text"
            className="narrative-input"
            value={hero.narrative.keywords}
            onChange={e => updateNarrative('keywords', e.target.value)}
            placeholder="e.g. Veteran, Exile, Wanted..."
          />
        </div>

        <div className="narrative-field">
          <label>Flaws</label>
          <input
            type="text"
            className="narrative-input"
            value={hero.narrative.flaws}
            onChange={e => updateNarrative('flaws', e.target.value)}
            placeholder="What holds you back?"
          />
        </div>

        <div className="narrative-field">
          <label>Current Goal / Next Thread</label>
          <textarea
            className="narrative-textarea"
            value={hero.narrative.currentGoal}
            onChange={e => updateNarrative('currentGoal', e.target.value)}
            placeholder="What drives you right now?"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressionTab;
