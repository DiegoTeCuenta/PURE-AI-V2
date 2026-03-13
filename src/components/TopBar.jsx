import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './TopBar.css';

export default function TopBar() {
  const { currentPhase, prevPhase, nextPhase, resetAll, language } = usePrompt();

  const phaseNames = [
    t(language, 'phases.phase1.title'),
    t(language, 'phases.phase2.title'),
    t(language, 'phases.phase3.title'),
    t(language, 'phases.phase4.title'),
    t(language, 'phases.phase5.title'),
    t(language, 'phases.phase6.title')
  ];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>PURE AI REALITY</h2>
      </div>
      
      <div className="topbar-center">
        <div className="progress-indicator">
          <span className="phase-text">{t(language, 'topBar.phase')} {currentPhase}/6 - {phaseNames[currentPhase - 1]}</span>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill neon-glow" 
              style={{ width: `${(currentPhase / 6) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <button className="btn-reset" onClick={resetAll}>{t(language, 'nav.reset')}</button>
      </div>
    </header>
  );
}
