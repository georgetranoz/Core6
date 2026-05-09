import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { disciplinesData } from '../data/disciplines';
import './DisciplineSelect.css';

interface DisciplineSelectProps {
  value: string;
  onChange: (val: string) => void;
  disabledValue?: string;
  label: string;
}

const DisciplineSelect: React.FC<DisciplineSelectProps> = ({ value, onChange, disabledValue, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const standardDisciplines = disciplinesData.filter(d => d.classification === 'Standard');
  const selectedDiscipline = standardDisciplines.find(d => d.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-select-container" ref={containerRef}>
      <div 
        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedDiscipline ? selectedDiscipline.name : label}</span>
        <ChevronDown size={18} />
      </div>

      {isOpen && (
        <div className="custom-select-dropdown fade-in">
          {standardDisciplines.map(d => {
            const isDisabled = d.id === disabledValue;
            return (
              <div 
                key={d.id} 
                className={`custom-select-option ${isDisabled ? 'disabled' : ''} ${value === d.id ? 'selected' : ''}`}
                onClick={() => {
                  if (!isDisabled) {
                    onChange(d.id);
                    setIsOpen(false);
                  }
                }}
              >
                <div className="option-content">
                  <span className="option-name">{d.name}</span>
                  <div className="option-tooltip">
                    <p>{d.description}</p>
                    <span className="tooltip-stat">Stat: {d.stat}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DisciplineSelect;
