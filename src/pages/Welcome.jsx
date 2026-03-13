import React from 'react';
import { usePrompt } from '../context/PromptContext';
import './Welcome.css';

export default function Welcome() {
  const { setLanguage, nextPhase } = usePrompt();

  const handleStart = (lang) => {
    setLanguage(lang);
    nextPhase(); // Moves to phase 1 (Camera & Style)
  };

  return (
    <div className="welcome-container animation-fade-in">
      {/* Background elements to match the lab theme */}
      <div className="welcome-bg-overlay"></div>
      
      <div className="welcome-content">
        <h1 className="welcome-title">
          <span className="pure">PURE</span> AI REALITY <span className="v2">v2</span>
        </h1>
        <p className="welcome-subtitle">
          El Laboratorio Fotográfico de Prompts Definitivo<br/>
          <em>The Ultimate Prompt Photographic Lab</em>
        </p>
        
        <div className="language-selection">
          <h3>Selecciona tu idioma / Choose your language</h3>
          <div className="lang-buttons">
            <button className="btn-lang" onClick={() => handleStart('es')}>
              Español
            </button>
            <button className="btn-lang" onClick={() => handleStart('en')}>
              English
            </button>
          </div>
        </div>

        <div className="welcome-footer">
          <p>PREPARANDO ENTORNO DE LUZ ARTIFICIAL...</p>
          <div className="loading-bar-fake"></div>
        </div>
      </div>
    </div>
  );
}
