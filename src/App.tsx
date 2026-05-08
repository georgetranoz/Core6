import { useState } from 'react';
import './App.css';
import { Menu, Plus, Swords, Shield, Scroll, X, Heart, RefreshCw, Minus } from 'lucide-react';
import { useAppStore, getDerivedHeroStats } from './state/AppState';
import CombatTab from './components/CombatTab';
import LoadoutTab from './components/LoadoutTab';
import DiceOverlay from './components/DiceOverlay';
import ProgressionTab from './components/ProgressionTab';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('combat');
  const { heroes, activeHeroId, setActiveHero, createHero, spendAp, adjustHp, healMax } = useAppStore();

  const activeHeroData = activeHeroId ? heroes[activeHeroId] : null;
  const activeHero = activeHeroData ? getDerivedHeroStats(activeHeroData) : null;

  const [rollResult, setRollResult] = useState<{ successes: number, dice: number[] } | null>(null);

  const handleRoll = (diceCount: number) => {
    // Generate dice results
    const results = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
    const successes = results.filter(r => r >= 4).length;
    setRollResult({ successes, dice: results });
  };

  if (!activeHero) return <div className="loading">Loading...</div>;

  return (
    <div className="app-container">
      {/* Global Header */}
      <header className="global-header glass-panel">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} color="var(--text-primary)" />
          </button>
          
          <div className="hero-profile-header">
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
          
          <div className="stat-pill ap-pill" onClick={() => spendAp(activeHero.id)}>
            <span className="label">AP</span>
            <div className="ap-pips">
              {Array.from({ length: activeHero.maxAp }).map((_, i) => (
                <div key={i} className={`pip ${i < activeHero.ap ? 'active' : ''}`}></div>
              ))}
            </div>
          </div>

          <button className="end-combat-btn" onClick={() => healMax(activeHero.id)} title="End Combat (Restore HP/AP)">
              <RefreshCw size={18} color="var(--text-secondary)" />
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
          <button className="create-hero-btn glass-panel" onClick={createHero}>
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
    </div>
  );
}

export default App;
