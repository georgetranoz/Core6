import React, { useMemo, useState } from 'react';
import {
  DerivedHero,
  SlotKey,
  ALL_SLOTS,
  SLOT_LABELS,
  countOwnedUpgrades,
  getCurrentDisciplineLevel,
  evaluateUpgrade,
  useAppStore,
} from '../state/AppState';
import { ShieldAlert, Info, ChevronRight, X, Lock, Plus, RotateCcw } from 'lucide-react';
import { disciplinesData, Discipline } from '../data/disciplines';
import { upgradesData } from '../data/upgrades';
import { getBaseDisciplineCost } from '../utils/xpCalculator';
import './LoadoutTab.css';

interface LoadoutTabProps {
  hero: DerivedHero;
}

interface EquippedSlotEntry {
  slot: SlotKey;
  discipline: Discipline | null;
}

const LoadoutTab: React.FC<LoadoutTabProps> = ({ hero }) => {
  const [openDisciplineId, setOpenDisciplineId] = useState<string | null>(null);
  const [equippingSlot, setEquippingSlot] = useState<SlotKey | null>(null);
  const { purchaseUpgrade, refundUpgrade, equipDiscipline, unequipDiscipline } = useAppStore();

  const slotEntries: EquippedSlotEntry[] = useMemo(() => {
    return ALL_SLOTS.map(slot => {
      const state = Object.values(hero.disciplineState).find(s => s.slot === slot);
      const discipline = state ? disciplinesData.find(d => d.id === state.disciplineId) ?? null : null;
      return { slot, discipline };
    });
  }, [hero.disciplineState]);

  const openDiscipline = openDisciplineId
    ? disciplinesData.find(d => d.id === openDisciplineId) ?? null
    : null;

  const eligibleForSlot = (slot: SlotKey): Discipline[] => {
    const equippedIds = new Set(Object.keys(hero.disciplineState));
    return disciplinesData.filter(d => {
      if (equippedIds.has(d.id)) return false;
      if (slot === 'ascendant') return d.classification === 'Ascendant';
      return d.classification === 'Standard';
    });
  };

  return (
    <div className="tab-content loadout-tab fade-in">
      <div className="tab-header">
        <h2>Loadout</h2>
        <ShieldAlert size={24} color="var(--accent-secondary)" />
      </div>

      <div className="equipped-list">
        {slotEntries.map(({ slot, discipline }) => {
          const state = discipline ? hero.disciplineState[discipline.id] : undefined;
          const level = getCurrentDisciplineLevel(state);
          return (
            <div key={slot} className="discipline-slot glass-panel">
              <div className="slot-label">{SLOT_LABELS[slot]}</div>
              {discipline ? (
                <div className="discipline-card" onClick={() => setOpenDisciplineId(discipline.id)}>
                  <div className="discipline-info">
                    <h3 className="discipline-title">{discipline.name}</h3>
                    <span className="discipline-level">Level {level}</span>
                  </div>
                  <div className="discipline-actions">
                    <button className="info-btn" aria-label={`Open ${discipline.name} record`}>
                      <Info size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="empty-slot"
                  onClick={() => setEquippingSlot(slot)}
                  aria-label={`Equip a discipline in ${SLOT_LABELS[slot]}`}
                >
                  <span className="empty-text">
                    <Plus size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    Equip Discipline
                  </span>
                  <ChevronRight size={16} color="var(--text-secondary)" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Equip-discipline picker */}
      <div className={`bottom-sheet ${equippingSlot ? 'open' : ''}`}>
        <div className="sheet-overlay" onClick={() => setEquippingSlot(null)} />
        <div className="sheet-content glass-panel">
          {equippingSlot && (
            <>
              <div className="sheet-header">
                <div className="sheet-title-group">
                  <h2 className="sheet-title">Equip into {SLOT_LABELS[equippingSlot]}</h2>
                  <div className="sheet-meta">
                    <span className="classification-badge">
                      {equippingSlot === 'ascendant' ? 'Ascendant disciplines only' : 'Standard disciplines'}
                    </span>
                  </div>
                </div>
                <button className="close-btn" onClick={() => setEquippingSlot(null)}>
                  <X size={24} />
                </button>
              </div>

              <div className="upgrade-list-modal">
                {eligibleForSlot(equippingSlot).map(d => {
                  const cost = getBaseDisciplineCost(d.classification);
                  const canAfford = hero.xp.current >= cost;
                  return (
                    <div key={d.id} className={`upgrade-item ${canAfford ? '' : 'locked'}`}>
                      <div className="upgrade-info">
                        <h4>{d.name}</h4>
                        <p>{d.description}</p>
                      </div>
                      <button
                        className={`buy-btn ${canAfford ? 'affordable' : 'unaffordable'}`}
                        disabled={!canAfford}
                        onClick={() => {
                          equipDiscipline(hero.id, equippingSlot, d.id);
                          setEquippingSlot(null);
                        }}
                      >
                        {cost} XP
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Discipline Record Modal */}
      <div className={`bottom-sheet ${openDiscipline ? 'open' : ''}`}>
        <div className="sheet-overlay" onClick={() => setOpenDisciplineId(null)} />
        <div className="sheet-content glass-panel">
          {openDiscipline && (() => {
            const state = hero.disciplineState[openDiscipline.id];
            const owned = countOwnedUpgrades(state);
            const level = getCurrentDisciplineLevel(state);
            const upgrades = upgradesData[openDiscipline.id] ?? [];

            return (
              <>
                <div className="sheet-header">
                  <div className="sheet-title-group">
                    <h2 className="sheet-title">{openDiscipline.name}</h2>
                    <div className="sheet-meta">
                      <span className="stat-badge">{openDiscipline.stat}</span>
                      <span className="classification-badge">{openDiscipline.classification}</span>
                      <span className="classification-badge">Level {level}</span>
                    </div>
                  </div>
                  <button className="close-btn" onClick={() => setOpenDisciplineId(null)}>
                    <X size={24} />
                  </button>
                </div>

                <div className="tags-container">
                  {openDiscipline.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                  <span className="tag range-tag">Range: {openDiscipline.range}</span>
                </div>

                <div className="base-effect-box">
                  <h3>Base Effect (Level 1)</h3>
                  <p>{openDiscipline.description}</p>
                </div>

                <div className="upgrade-tree">
                  <h3>Upgrade Path ({owned} owned)</h3>
                  <div className="upgrade-list-modal">
                    {upgrades.length === 0 && (
                      <p className="placeholder-text">No upgrades available for this discipline.</p>
                    )}
                    {upgrades.map(upgrade => {
                      const av = evaluateUpgrade(hero, openDiscipline, upgrade);
                      const stackCount = av.stackCount;
                      const showStacks = av.maxStacks > 1;
                      const prereqName = av.prerequisiteUpgradeId
                        ? upgrades.find(u => u.id === av.prerequisiteUpgradeId)?.name
                        : undefined;
                      const purchasedAtLeastOnce = stackCount > 0;

                      return (
                        <div
                          key={upgrade.id}
                          className={`upgrade-item ${purchasedAtLeastOnce ? 'purchased' : 'locked'}`}
                        >
                          <div className="upgrade-info">
                            <h4>
                              {upgrade.name}
                              {showStacks && (
                                <span style={{ marginLeft: 8, opacity: 0.7, fontSize: '0.85em' }}>
                                  ({stackCount}/{av.maxStacks === Infinity ? '∞' : av.maxStacks})
                                </span>
                              )}
                            </h4>
                            <p>{upgrade.description}</p>
                            {!av.prerequisiteSatisfied && prereqName && (
                              <p style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: 0.75 }}>
                                <Lock size={12} /> Requires {prereqName}
                              </p>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: 6 }}>
                            {purchasedAtLeastOnce && (
                              <button
                                className="buy-btn"
                                onClick={() => refundUpgrade(hero.id, openDiscipline.id, upgrade.id)}
                                title="Refund last purchased stack"
                                aria-label={`Refund ${upgrade.name}`}
                              >
                                <RotateCcw size={14} />
                              </button>
                            )}
                            <button
                              className={`buy-btn ${av.canPurchase ? 'affordable' : 'unaffordable'}`}
                              disabled={!av.canPurchase}
                              onClick={() => purchaseUpgrade(hero.id, openDiscipline.id, upgrade.id)}
                              title={
                                !av.prerequisiteSatisfied
                                  ? `Requires ${prereqName ?? 'prerequisite'}`
                                  : !av.underStackCap
                                  ? 'Max stacks reached'
                                  : !av.affordable
                                  ? 'Not enough XP'
                                  : 'Purchase'
                              }
                            >
                              {av.nextCost} XP
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {state && (
                  <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="buy-btn unaffordable"
                      onClick={() => {
                        unequipDiscipline(hero.id, state.slot);
                        setOpenDisciplineId(null);
                      }}
                      title="Unequip and refund all XP spent on this discipline"
                    >
                      Unequip & Refund
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default LoadoutTab;
