import React, { useState, useEffect, useRef } from 'react';
import { Hero, CoreUpgradeKind, useAppStore, getDerivedHeroStats } from '../state/AppState';
import { BookOpen, UserPlus, Check, Edit2, Trash2 } from 'lucide-react';
import DisciplineSelect from './DisciplineSelect';
import './ProgressionTab.css';

interface ProgressionTabProps {
  hero: Hero;
}

const ProgressionTab: React.FC<ProgressionTabProps> = ({ hero }) => {
  const { updateHero, equipDiscipline, grantXp, deleteHero, purchaseCoreUpgrade, refundCoreUpgrade } = useAppStore();
  const derivedHero = getDerivedHeroStats(hero);

  // Wizard & Ledger state
  const [heroName, setHeroName] = useState(hero.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState(hero.name);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const deleteConfirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (deleteConfirmRef.current && !deleteConfirmRef.current.contains(event.target as Node)) {
        setShowDeleteConfirm(false);
      }
    };
    if (showDeleteConfirm) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDeleteConfirm]);

  // Stats State
  const [phys, setPhys] = useState<number | null>(null);
  const [ment, setMent] = useState<number | null>(null);
  const [soc, setSoc] = useState<number | null>(null);
  
  const [disc1, setDisc1] = useState<string>('');
  const [disc2, setDisc2] = useState<string>('');
  
  const [kw1, setKw1] = useState('');
  const [kw2, setKw2] = useState('');

  const availableStats = [3, 2, 2];
  const usedStats: number[] = [];
  if (phys !== null) usedStats.push(phys);
  if (ment !== null) usedStats.push(ment);
  if (soc !== null) usedStats.push(soc);

  const getAvailableOptions = () => {
    const pool = [...availableStats];
    usedStats.forEach(s => {
      const idx = pool.indexOf(s);
      if (idx !== -1) pool.splice(idx, 1);
    });
    return Array.from(new Set(pool)); // Unique options left
  };

  const handleFinishCreation = () => {
    if (!heroName.trim()) return alert('Please give your hero a name!');
    // Basic validation
    if (phys === null || ment === null || soc === null) return alert('Please assign all stats (3, 2, 2)');
    if (!disc1 || !disc2 || disc1 === disc2) return alert('Please select two distinct starting disciplines');

    // Update base stats and narrative
    updateHero(hero.id, {
      name: heroName.trim(),
      isNewHero: false,
      baseStats: { physical: phys, mental: ment, social: soc },
      narrative: {
        ...hero.narrative,
        keywords: `${kw1}${kw1 && kw2 ? ', ' : ''}${kw2}`
      }
    });

    // Grant 20 XP to cover the cost of the 2 free starting disciplines, then equip them to Slot 1 and Slot 2
    grantXp(hero.id, 20);
    equipDiscipline(hero.id, 'slot-1', disc1);
    equipDiscipline(hero.id, 'slot-2', disc2);
    
    // To ensure the lifetime XP isn't permanently inflated by this free grant, we can subtract 20 max XP.
    // However, it's fine for now as a "starting bonus". To be perfectly clean:
    updateHero(hero.id, {
        xp: { current: 0, max: 0 } // Reset the ledger back to 0 after purchasing
    });
  };

  if (hero.isNewHero) {
    return (
      <div className="tab-content progression-tab fade-in">
        <div className="tab-header">
          <h2>Hero Creation Wizard</h2>
          <UserPlus size={24} color="var(--accent-secondary)" />
        </div>
        
        <div className="wizard-intro glass-panel">
          <p>Welcome to Core6! Your hero starts with <strong>5 HP</strong>, <strong>2 AP</strong>, <strong>4 Move</strong>, and <strong>3 Luck Tokens</strong>. Let's finish your build.</p>
        </div>

        <div className="section-block">
          <h3>Hero Identity</h3>
          <input 
            className="narrative-input" 
            value={heroName} 
            onChange={e => setHeroName(e.target.value)} 
            placeholder="Enter Hero Name" 
            autoFocus
          />
        </div>

        <div className="section-block">
          <h3>Step 1: Assign Stats (3 / 2 / 2)</h3>
          <div className="stat-assign-grid">
            {['Physical', 'Mental', 'Social'].map(statName => {
               const val = statName === 'Physical' ? phys : statName === 'Mental' ? ment : soc;
               const setVal = statName === 'Physical' ? setPhys : statName === 'Mental' ? setMent : setSoc;
               return (
                 <div key={statName} className="stat-assign-row">
                   <label>{statName}</label>
                   <select 
                     value={val ?? ''} 
                     onChange={e => setVal(e.target.value ? Number(e.target.value) : null)}
                     className="narrative-input"
                   >
                     <option value="">- Select -</option>
                     {val !== null && <option value={val}>{val}</option>}
                     {getAvailableOptions().map((opt, i) => (
                       <option key={i} value={opt}>{opt}</option>
                     ))}
                   </select>
                 </div>
               );
            })}
          </div>
        </div>

        <div className="section-block">
          <h3>Step 2: Starting Disciplines</h3>
          <p className="helper-text">Pick 2 free disciplines. You have 3 slots total.</p>
          <DisciplineSelect 
            label="- Select Discipline 1 -"
            value={disc1}
            onChange={setDisc1}
            disabledValue={disc2}
          />
          <div className="mt-2">
            <DisciplineSelect 
              label="- Select Discipline 2 -"
              value={disc2}
              onChange={setDisc2}
              disabledValue={disc1}
            />
          </div>
        </div>

        <div className="section-block">
          <h3>Step 3: Background Keywords</h3>
          <p className="helper-text">Define 2 narrative hooks (e.g. "Mob Connections", "Exile").</p>
          <input className="narrative-input" value={kw1} onChange={e => setKw1(e.target.value)} placeholder="Keyword 1" />
          <input className="narrative-input mt-2" value={kw2} onChange={e => setKw2(e.target.value)} placeholder="Keyword 2" />
        </div>

        <button className="finish-wizard-btn" onClick={handleFinishCreation}>
          <Check size={20} /> Complete Hero
        </button>
      </div>
    );
  }

  const handleSaveName = () => {
    if (editName.trim()) {
      updateHero(hero.id, { name: editName.trim() });
    } else {
      setEditName(hero.name);
    }
    setIsEditingName(false);
  };

  // Regular Ledger View
  return (
    <div className="tab-content progression-tab fade-in">
      
      <div className="ledger-name-header">
        {isEditingName ? (
          <div className="name-edit-mode">
            <input 
              autoFocus 
              className="narrative-input"
              value={editName} 
              onChange={e => setEditName(e.target.value)} 
              onBlur={handleSaveName} 
              onKeyDown={e => e.key === 'Enter' && handleSaveName()} 
            />
          </div>
        ) : (
          <div className="editable-name" onClick={() => setIsEditingName(true)}>
            <h2 className="hero-name-large">{hero.name}</h2>
            <Edit2 size={16} className="edit-icon" />
          </div>
        )}
      </div>

      <div className="tab-header">
        <h2>The Ledger</h2>
      </div>

      <div className="ledger-card glass-panel">
        <div className="xp-balance">
          <div className="xp-stat">
            <span className="xp-label">Current XP</span>
            <input 
              type="number" 
              className="xp-value-input highlight" 
              value={hero.xp.current} 
              onChange={e => updateHero(hero.id, { xp: { ...hero.xp, current: parseInt(e.target.value) || 0 } })} 
            />
          </div>
          <div className="xp-divider"></div>
          <div className="xp-stat">
            <span className="xp-label">Lifetime XP</span>
            <input 
              type="number" 
              className="xp-value-input" 
              value={hero.xp.max} 
              onChange={e => updateHero(hero.id, { xp: { ...hero.xp, max: parseInt(e.target.value) || 0 } })} 
            />
          </div>
        </div>
      </div>

      <div className="section-block">
        <h3>Core Stats & Upgrades</h3>
        
        <div className="current-stats-display glass-panel">
          <div className="stat-box">
            <span className="stat-label">Physical</span>
            <span className="stat-val">{derivedHero.stats.physical}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Mental</span>
            <span className="stat-val">{derivedHero.stats.mental}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">Social</span>
            <span className="stat-val">{derivedHero.stats.social}</span>
          </div>
        </div>

        <div className="upgrade-list">
          {[
            { kind: 'physicalTraining', title: 'Physical Training', desc: 'Permanently increase Physical stat by 1.', cost: 10 },
            { kind: 'mentalFortitude', title: 'Mental Training', desc: 'Permanently increase Mental stat by 1.', cost: 10 },
            { kind: 'socialPresence', title: 'Social Training', desc: 'Permanently increase Social stat by 1.', cost: 10 },
            { kind: 'vitalityBoost', title: 'Vitality Boost', desc: 'Permanently increase Max HP by 1.', cost: 5 },
          ].map(upgrade => {
            const count = hero.coreUpgrades[upgrade.kind as CoreUpgradeKind];
            const canAfford = hero.xp.current >= upgrade.cost;
            return (
              <div className="upgrade-item glass-panel" key={upgrade.kind}>
                <div className="upgrade-info">
                  <h4>{upgrade.title} <span className="upgrade-count">({count})</span></h4>
                  <p>{upgrade.desc}</p>
                  <span className="upgrade-cost-label">{upgrade.cost} XP per rank</span>
                </div>
                <div className="inf-controls upgrade-controls">
                  <button 
                    onClick={() => refundCoreUpgrade(hero.id, upgrade.kind as any)} 
                    disabled={count === 0}
                    className={count === 0 ? 'disabled' : ''}
                  >-</button>
                  <span className="inf-value">{count}</span>
                  <button 
                    onClick={() => purchaseCoreUpgrade(hero.id, upgrade.kind as any)} 
                    disabled={!canAfford}
                    className={!canAfford ? 'disabled' : ''}
                  >+</button>
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
              <button>-</button>
              <span className="inf-value">{hero.influence.public}</span>
              <button>+</button>
            </div>
          </div>
          <div className="influence-card glass-panel">
            <span className="inf-label">Underworld</span>
            <div className="inf-controls">
              <button>-</button>
              <span className="inf-value">{hero.influence.underworld}</span>
              <button>+</button>
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
          <input type="text" className="narrative-input" defaultValue={hero.narrative.keywords} placeholder="e.g. Veteran, Exile, Wanted..." />
        </div>
        
        <div className="narrative-field">
          <label>Flaws</label>
          <input type="text" className="narrative-input" defaultValue={hero.narrative.flaws} placeholder="What holds you back?" />
        </div>
        
        <div className="narrative-field">
          <label>Current Goal / Next Thread</label>
          <textarea className="narrative-textarea" defaultValue={hero.narrative.currentGoal} placeholder="What drives you right now?"></textarea>
        </div>
      </div>

      <div className="section-block delete-section" ref={deleteConfirmRef}>
        {showDeleteConfirm ? (
          <div className="delete-confirm-box glass-panel">
            <p>Are you sure you want to permanently delete <strong>{hero.name}</strong>?</p>
            <div className="delete-actions">
              <button className="cancel-delete-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="confirm-delete-btn" onClick={() => deleteHero(hero.id)}>Yes, Delete Hero</button>
            </div>
          </div>
        ) : (
          <button className="delete-hero-btn" onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 size={18} /> Delete Hero
          </button>
        )}
      </div>

    </div>
  );
};

export default ProgressionTab;
