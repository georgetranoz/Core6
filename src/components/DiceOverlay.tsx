import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DiceOverlay.css';

interface DiceOverlayProps {
  result: {
    successes: number;
    dice: number[];
    target: number;
  };
  onClose: () => void;
}

const DiceOverlay: React.FC<DiceOverlayProps> = ({ result, onClose }) => {
  const [showDamage, setShowDamage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDamage(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dice-overlay" onClick={onClose}>
      <div className="particles-container">
        {/* Simple particle effect placeholder */}
      </div>
      
      <div className="overlay-content">
        <div className="target-threshold-label">Target: {result.target}+</div>
        
        <motion.div 
          className="dice-container"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          {result.dice.map((die, i) => (
            <motion.div 
              key={i} 
              className={`die ${die >= result.target ? 'hit' : 'miss'}`}
              initial={{ y: -50, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              {die}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="result-text-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h1 className={`massive-text ${result.successes > 0 ? 'success-text' : 'fail-text'}`}>
            {result.successes} {result.successes === 1 ? 'SUCCESS' : 'SUCCESSES'}
          </h1>
          
          <AnimatePresence>
            {showDamage && result.successes > 0 && (
              <motion.h2 
                className="damage-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                +{result.successes} DAMAGE
              </motion.h2>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p 
          className="dismiss-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Tap anywhere to continue
        </motion.p>
      </div>
    </div>
  );
};

export default DiceOverlay;
