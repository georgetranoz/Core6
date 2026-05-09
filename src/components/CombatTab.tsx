import React, { useState } from 'react';
import { DerivedHero, useAppStore } from '../state/AppState';
import { Dices, RotateCcw } from 'lucide-react';
import { disciplinesData } from '../data/disciplines';
import { upgradesData } from '../data/upgrades';
import './CombatTab.css';

interface CombatTabProps {
  hero: DerivedHero;
  onRoll: (dice: number, target: number) => void;
}

const CombatTab: React.FC<CombatTabProps> = ({ hero, onRoll }) => {
  const { togglePowerUse, combatReset } = useAppStore();
  const [showRollModal, setShowRollModal] = useState<string | null>(null);
  const [activeRollingDisciplineId, setActiveRollingDisciplineId] = useState<string | null>(null);
  const [baseDiceForModal, setBaseDiceForModal] = useState(0);
  const [baseCTForModal, setBaseCTForModal] = useState(4);
  const [bonusDice, setBonusDice] = useState(0);
  const [ctBonus, setCtBonus] = useState(0);

  const handleStatRoll = (statName: string, baseValue: number) => {
    setShowRollModal(statName);
    setActiveRollingDisciplineId(null);
    setBaseDiceForModal(baseValue);
    setBaseCTForModal(4);
    setBonusDice(0);
    setCtBonus(0);
  };

  const confirmRoll = () => {
    onRoll(baseDiceForModal + bonusDice, baseCTForModal + ctBonus);
    
    // Auto-consume a use if this is a limited power
    if (activeRollingDisciplineId) {
      const uses = hero.powerUses[activeRollingDisciplineId] || [];
      const firstFreeIdx = Array.from({ length: 10 }).findIndex((_, i) => !uses[i]);
      if (firstFreeIdx !== -1) {
        togglePowerUse(hero.id, activeRollingDisciplineId, firstFreeIdx);
      }
    }
    
    setShowRollModal(null);
    setActiveRollingDisciplineId(null);
  };

  return (
    <div className="tab-content combat-tab fade-in">
      <div className="stats-grid">
        {Object.entries(hero.stats).map(([stat, value]) => (
          <div key={stat} className="stat-card glass-panel">
            <div className="stat-info">
              <span className="stat-name">{stat}</span>
              <span className="stat-value">{value}</span>
            </div>
            <button className="roll-btn" onClick={() => handleStatRoll(stat, value)}>
              <Dices size={24} />
            </button>
          </div>
        ))}
      </div>

      {showRollModal && (
        <div className="roll-modal-overlay">
          <div className="roll-modal glass-panel">
            <h3>Roll {showRollModal}</h3>
            
            <div className="roll-params-grid">
              <div className="bonus-selector">
                <span className="param-label">Situational Bonus</span>
                <div className="bonus-controls">
                  <button onClick={() => setBonusDice(prev => prev - 1)}>-</button>
                  <span>{bonusDice >= 0 ? `+${bonusDice}` : bonusDice} Dice</span>
                  <button onClick={() => setBonusDice(prev => prev + 1)}>+</button>
                </div>
              </div>

              <div className="bonus-selector">
                <span className="param-label">Combat Target (CT)</span>
                <div className="bonus-controls">
                  <button onClick={() => setCtBonus(prev => prev - 1)}>-</button>
                  <span>{baseCTForModal + ctBonus}</span>
                  <button onClick={() => setCtBonus(prev => prev + 1)}>+</button>
                </div>
              </div>
            </div>

            <p className="roll-summary">
              Rolling <strong>{baseDiceForModal + bonusDice}</strong> dice vs. CT <strong>{baseCTForModal + ctBonus}</strong>
            </p>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowRollModal(null)}>Cancel</button>
              <button className="confirm-btn" onClick={confirmRoll}>Roll Dice</button>
            </div>
          </div>
        </div>
      )}

      <div className="powers-list">
        <h3>Combat Powers</h3>
        {Object.values(hero.disciplineState).length === 0 ? (
          <p className="placeholder-text">No disciplines equipped.</p>
        ) : (
          Object.values(hero.disciplineState).map(state => {
            const discipline = disciplinesData.find(d => d.id === state.disciplineId);
            if (!discipline) return null;
            
            // Logic Tree for Combat Uses:
            const baseDesc = discipline.description.toLowerCase();
            const hasBaseLimit = baseDesc.includes('once per combat') || 
                                baseDesc.includes('once per battle') || 
                                baseDesc.includes('once per scene');
            
            let maxUses = hasBaseLimit ? 1 : 0;
            
            // 3. Dice Calculation: Max of stats + "+1 Dice" upgrades
            const statsToTry = discipline.stat.split(',').map(s => s.trim().toLowerCase());
            const statValues = statsToTry.map(s => (hero.stats as any)[s] || 0);
            const baseStatDice = Math.max(...statValues, 0);
            
            let upgradeDice = 0;
            const siblings = upgradesData[discipline.id] || [];
            state.purchases.forEach(p => {
              const upg = siblings.find(u => u.id === p.upgradeId);
              if (!upg) return;
              
              // Check for additional uses
              const uDesc = upg.description.toLowerCase();
              const uName = upg.name.toLowerCase();
              const addsUse = uDesc.includes('additional use') || 
                             uDesc.includes('+1 use') || 
                             uDesc.includes('extra use') ||
                             uDesc.includes('one additional time') ||
                             uName.includes('additional use') ||
                             (uName.includes('more ') && uDesc.includes('per combat'));
              if (addsUse) maxUses += 1;

              // Check for dice upgrades
              const d = upg.description.toLowerCase();
              if (d.includes('+1 dice') || d.includes('+1 die') || d.includes('+1 attack die') || d.includes('+1 bonus die')) {
                upgradeDice += 1;
              }
            });

            // 4. CT Calculation: Base 4 + "-1 CT" upgrades
            let upgradeCT = 0;
            state.purchases.forEach(p => {
              const upg = siblings.find(u => u.id === p.upgradeId);
              if (!upg) return;
              const d = upg.description.toLowerCase();
              if (d.includes('-1 ct') || d.includes('reduce ct by -1') || d.includes('lowers their required combat target')) {
                upgradeCT -= 1;
              }
            });

            const finalBaseCT = Math.max(1, 4 + upgradeCT);
            const totalBaseDice = baseStatDice + upgradeDice;
            const uses = hero.powerUses[discipline.id] || [];

            return (
              <div key={discipline.id} className="power-card glass-panel">
                <div className="power-header">
                  <div className="power-title-group">
                    <h4>{discipline.name} <span className="power-stat">({discipline.stat})</span></h4>
                    <button 
                      className="power-roll-btn" 
                      onClick={() => {
                        setShowRollModal(discipline.name);
                        setActiveRollingDisciplineId(discipline.id);
                        setBaseDiceForModal(totalBaseDice);
                        setBaseCTForModal(finalBaseCT);
                        setBonusDice(0);
                        setCtBonus(0);
                      }}
                      title={`Roll ${totalBaseDice} dice, CT ${finalBaseCT}`}
                    >
                      <Dices size={18} />
                      <span className="dice-count">{totalBaseDice}</span>
                    </button>
                  </div>
                  {maxUses > 0 && (
                    <div className="power-uses">
                      {Array.from({ length: maxUses }).map((_, idx) => (
                        <button 
                          key={idx}
                          className={`use-toggle ${uses[idx] ? 'used' : ''}`}
                          onClick={() => togglePowerUse(hero.id, discipline.id, idx)}
                        ></button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="power-body">
                  <p className="base-power"><strong>Base:</strong> {discipline.description}</p>
                  {state.purchases.length > 0 && (
                    <div className="power-upgrades">
                      {state.purchases.map(p => {
                        const siblings = upgradesData[discipline.id] || [];
                        const upg = siblings.find(u => u.id === p.upgradeId);
                        if (!upg) return null;
                        return (
                          <p key={p.id} className="purchased-upgrade">
                            <strong>Level {p.level} ({upg.name}):</strong> {upg.description}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="combat-reset-section">
        <button className="combat-reset-btn" onClick={() => combatReset(hero.id)}>
          <RotateCcw size={18} />
          Combat Reset
        </button>
      </div>
    </div>
  );
};

export default CombatTab;
