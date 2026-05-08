import React, { useState } from 'react';
import { DerivedHero } from '../state/AppState';
import { Dices, Target, Zap } from 'lucide-react';
import './CombatTab.css';

interface CombatTabProps {
  hero: DerivedHero;
  onRoll: (dice: number) => void;
}

const CombatTab: React.FC<CombatTabProps> = ({ hero, onRoll }) => {
  const [showRollModal, setShowRollModal] = useState<string | null>(null);
  const [bonusDice, setBonusDice] = useState(0);

  const handleStatRoll = (statName: string) => {
    setShowRollModal(statName);
    setBonusDice(0);
  };

  const confirmRoll = (baseValue: number) => {
    onRoll(baseValue + bonusDice);
    setShowRollModal(null);
  };

  return (
    <div className="tab-content combat-tab fade-in">
      <div className="tab-header">
        <h2>Active Combat</h2>
        <Target size={24} color="var(--danger)" />
      </div>

      <div className="stats-grid">
        {Object.entries(hero.stats).map(([stat, value]) => (
          <div key={stat} className="stat-card glass-panel">
            <div className="stat-info">
              <span className="stat-name">{stat.toUpperCase()}</span>
              <span className="stat-value">{value}</span>
            </div>
            <button
              className="roll-btn"
              onClick={() => handleStatRoll(stat)}
            >
              <Dices size={20} />
            </button>
            
            {showRollModal === stat && (
              <div className="roll-modal-overlay">
                <div className="roll-modal glass-panel">
                  <h3>Rolling {stat.toUpperCase()}</h3>
                  <p>Base Dice: {value}</p>
                  
                  <div className="bonus-selector">
                    <label>Situational Bonus</label>
                    <div className="bonus-controls">
                      <button onClick={() => setBonusDice(Math.max(0, bonusDice - 1))}>-</button>
                      <span>+{bonusDice}</span>
                      <button onClick={() => setBonusDice(Math.min(3, bonusDice + 1))}>+</button>
                    </div>
                  </div>
                  
                  <div className="modal-actions">
                    <button className="cancel-btn" onClick={() => setShowRollModal(null)}>Cancel</button>
                    <button className="confirm-btn" onClick={() => confirmRoll(value as number)}>
                      Roll {Number(value) + bonusDice}d6
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="quick-actions glass-panel">
        <h3>Quick Actions</h3>
        <div className="action-list">
          <button className="action-btn">
            <Zap size={16} />
            Power Strike (2 AP)
          </button>
          <button className="action-btn outline">
            Defensive Stance (1 AP)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CombatTab;
