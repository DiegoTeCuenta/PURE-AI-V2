import React from 'react';
import { Play } from 'lucide-react';
import { usePrompt } from '../context/PromptContext';
import './WizardNavigation.css';

const WizardNavigation = () => {
  const { 
    currentPhase, 
    nextPhase, 
    prevPhase,
    cameraStyle,
    subjects,
    actionLocation,
    composition
  } = usePrompt();

  const progress = (currentPhase / 5) * 100;
  const dots = [1, 2, 3, 4, 5];

  const isNextDisabled = () => {
    switch(currentPhase) {
      case 1: return !cameraStyle;
      case 2: return subjects.length === 0;
      case 3: return !actionLocation || actionLocation.trim() === "";
      case 4: return !composition?.framing || !composition?.angle;
      default: return false;
    }
  };

  return (
    <div className="wizard-nav-container">
      <div className="nav-controls">
        <button 
          className="nav-arrow prev" 
          onClick={prevPhase}
          disabled={currentPhase <= 1}
        >
          <Play size={32} style={{ transform: 'rotate(180deg)' }} fill="currentColor" />
          <span className="nav-label">ANTERIOR</span>
        </button>
 
        <div className="phase-dots">
          {dots.map((dot) => (
            <div 
              key={dot} 
              className={`dot ${currentPhase === dot ? 'active' : ''}`}
            />
          ))}
        </div>
 
        <button 
          className="nav-arrow next" 
          onClick={nextPhase}
          disabled={currentPhase >= 5 || isNextDisabled()}
        >
          <span className="nav-label">SIGUIENTE</span>
          <Play size={32} fill="currentColor" />
        </button>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-track">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          >
            <span className="progress-text">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardNavigation;
