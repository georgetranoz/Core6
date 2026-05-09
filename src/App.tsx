import { useState } from 'react';
import './App.css';
import { Menu, Plus, Swords, Shield, Scroll, X, Heart, Minus, FileDown } from 'lucide-react';
import { useAppStore, getDerivedHeroStats } from './state/AppState';
import CombatTab from './components/CombatTab';
import LoadoutTab from './components/LoadoutTab';
import DiceOverlay from './components/DiceOverlay';
import ProgressionTab from './components/ProgressionTab';
import { disciplinesData } from './data/disciplines';
import { upgradesData } from './data/upgrades';

// Logo lives in /public so it's served at /logo.png by Vite.
const logoUrl = '/logo.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('combat');
  const { heroes, activeHeroId, setActiveHero, createHero, adjustHp } = useAppStore();

  const activeHeroData = activeHeroId ? heroes[activeHeroId] : null;
  const activeHero = activeHeroData ? getDerivedHeroStats(activeHeroData) : null;

  const [rollResult, setRollResult] = useState<{ successes: number, dice: number[], target: number } | null>(null);

  const handleRoll = (diceCount: number, target: number = 4) => {
    // Generate dice results
    const results = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
    const successes = results.filter(r => r >= target).length;
    setRollResult({ successes, dice: results, target });
  };

  if (!activeHero) return <div className="loading">Loading...</div>;
  
  const containerStyle = {
    '--logo-url': `url(${logoUrl})`
  } as React.CSSProperties;

  return (
    <div className="app-container" style={containerStyle}>
      {/* Global Header */}
      <header className="global-header glass-panel">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} color="var(--text-primary)" />
          </button>
          
          <div className="hero-profile-header" onClick={() => setActiveTab('combat')} style={{ cursor: 'pointer' }}>
             <div className="hero-avatar-small">{activeHero.name.charAt(0)}</div>
             <div className="hero-name-archetype">
                <h1 className="hero-name">{activeHero.name}</h1>
                <span className="hero-archetype">{activeHero.archetype}</span>
             </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="stat-pill hp-pill-interactive">
             <button className="hp-btn" onClick={() => adjustHp(activeHero.id, -1)}>
               <Minus size={14} />
             </button>
             <div className="hp-display">
                <Heart size={14} className="icon-pulse" color="var(--danger)" />
                <span className="value">{activeHero.hp}/{activeHero.maxHp}</span>
             </div>
             <button className="hp-btn" onClick={() => adjustHp(activeHero.id, 1)}>
               <Plus size={14} />
             </button>
          </div>
          
          <button className="export-pdf-btn no-print" onClick={() => window.print()} title="Export PDF">
            <FileDown size={20} color="var(--accent-secondary)" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'combat' && <CombatTab onRoll={handleRoll} hero={activeHero} />}
        {activeTab === 'loadout' && <LoadoutTab hero={activeHero} />}
        {activeTab === 'progression' && <ProgressionTab hero={activeHero} />}
      </main>

      {/* Navigation Bar */}
      <nav className="bottom-nav glass-panel">
        <button 
          className={`nav-item ${activeTab === 'combat' ? 'active' : ''}`}
          onClick={() => setActiveTab('combat')}
        >
          <Swords size={20} />
          <span>Combat</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'loadout' ? 'active' : ''}`}
          onClick={() => setActiveTab('loadout')}
        >
          <Shield size={20} />
          <span>Loadout</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'progression' ? 'active' : ''}`}
          onClick={() => setActiveTab('progression')}
        >
          <Scroll size={20} />
          <span>Ledger</span>
        </button>
      </nav>

      {/* Slide-out Menu */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
        <div className="menu-content glass-panel">
          <div className="menu-header">
            <h2>Active Heroes</h2>
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="hero-list">
            {Object.values(heroes).map(heroData => {
              const hero = getDerivedHeroStats(heroData);
              return (
                <div 
                  key={hero.id} 
                  className={`hero-item ${hero.id === activeHeroId ? 'active' : ''}`}
                  onClick={() => {
                    setActiveHero(hero.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="hero-avatar">{hero.name.charAt(0)}</div>
                  <div className="hero-info">
                    <h3>{hero.name}</h3>
                    <p>HP: {hero.hp}/{hero.maxHp} | AP: {hero.ap}/{hero.maxAp}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="create-hero-btn glass-panel" onClick={() => {
            createHero();
            setActiveTab('progression');
            setIsMenuOpen(false);
          }}>
            <Plus size={20} />
            New Hero Template
          </button>
        </div>
      </div>

      {/* Dice Overlay */}
      {rollResult && (
        <DiceOverlay 
          result={rollResult} 
          onClose={() => setRollResult(null)} 
        />
      )}
      {/* Printable Sheet (Hidden in UI) */}
      <div className="printable-sheet">
        <div className="print-top-header">
          <img src={logoUrl} className="print-logo-top" alt="Core6 Logo" />
          <h2 className="print-app-title">Core6 Hero Sheet</h2>
        </div>
        <div className="print-header">
          <h1>{activeHero.name}</h1>
          <p>{activeHero.archetype}</p>
          <div className="print-stats">
            <span>HP: {activeHero.hp}/{activeHero.maxHp}</span>
            <span>XP: {activeHero.xp.max} (Lifetime)</span>
          </div>
        </div>

        <div className="print-section">
          <h2>Core Stats</h2>
          <div className="print-grid">
            <div>Physical: {activeHero.stats.physical}</div>
            <div>Mental: {activeHero.stats.mental}</div>
            <div>Social: {activeHero.stats.social}</div>
          </div>
        </div>

        <div className="print-section">
          <h2>Disciplines</h2>
          {Object.values(activeHero.disciplineState).map(state => {
            const disc = disciplinesData.find(d => d.id === state.disciplineId);
            if (!disc) return null;
            return (
              <div key={disc.id} className="print-power">
                <strong>{disc.name}</strong> - {disc.description}
                <div className="print-upgrades">
                  {state.purchases.map((p, i) => {
                    const upg = upgradesData[disc.id]?.find(u => u.id === p.upgradeId);
                    return upg ? <div key={i} className="print-upgrade">• {upg.name}: {upg.description}</div> : null;
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="print-footer">
          <p>Generated by Core6 Hero Sheet App</p>
        </div>
      </div>
    </div>
  );
}

export default App;
