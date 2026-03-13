import React, { useState } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './LivePromptSidebar.css';

export default function LivePromptSidebar() {
  const { currentPhase, cameraStyle, subjects, environment, composition, language, globalAction } = usePrompt();
  const [outputMode, setOutputMode] = useState('text'); // 'text' | 'json'

  // Basic logic to construct the prompt string from context state
  // We will refine this block as we build the phases
  const buildPromptString = () => {
    const parts = [];
    if (cameraStyle?.prompt) parts.push(`**${cameraStyle.prompt}**`);
    
    if (composition.framing) parts.push(composition.framing);
    if (composition.angle) parts.push(composition.angle);
    
    if (subjects.length > 0) {
      subjects.forEach(s => {
        let subjDesc = `[Subject ${s.name}: `;
        const props = [];
        if (s.properties?.customDNA) props.push(`DNA: ${s.properties.customDNA}`);
        else {
          if (s.properties?.build) props.push(`build: ${s.properties.build}`);
          if (s.properties?.ethnicity) props.push(`ethnicity: ${s.properties.ethnicity}`);
          if (s.properties?.eyes) props.push(`${s.properties.eyes} eyes`);
          if (s.properties?.hair) props.push(`${s.properties.hair} hair`);
        }
        if (s.properties?.clothing) props.push(`wearing ${s.properties.clothing}`);
        
        subjDesc += props.length > 0 ? props.join(', ') : 'Base character';
        subjDesc += ']';
        parts.push(subjDesc);
      });
      if (globalAction) {
        parts.push(`Scene Action: ${globalAction}`);
      }
    }
    
    if (environment.location) parts.push(environment.location);
    if (environment.lighting) parts.push(`Lighting: ${environment.lighting}`);
    if (environment.lightingDetails) parts.push(environment.lightingDetails);
    if (environment.extras && environment.extras.length > 0) parts.push(environment.extras.join(', '));
    if (composition.advanced) parts.push(composition.advanced);

    return parts.length > 0 ? parts.join(', ') : t(language, 'sidebar.placeholder');
  };

  const buildPromptJSON = () => {
    return JSON.stringify({
      style: cameraStyle?.label || cameraStyle?.id || '',
      composition,
      subjects,
      environment
    }, null, 2);
  };

  const handleCopy = () => {
    const textToCopy = outputMode === 'text' ? buildPromptString() : buildPromptJSON();
    navigator.clipboard.writeText(textToCopy);
    alert(t(language, 'sidebar.copied'));
  };

  const isFinished = currentPhase >= 7;

  return (
    <aside className={`live-sidebar ${isFinished ? 'finished' : ''}`}>
      {isFinished ? (
        <>
          <div className="sidebar-header">
            <h3>{t(language, 'sidebar.finalOutput')}</h3>
            <div className="mode-toggle">
              <button 
                className={`toggle-btn ${outputMode === 'text' ? 'active' : ''}`}
                onClick={() => setOutputMode('text')}
              >TXT</button>
              <button 
                className={`toggle-btn ${outputMode === 'json' ? 'active' : ''}`}
                onClick={() => setOutputMode('json')}
              >JSON</button>
            </div>
          </div>
          <div className="prompt-content final-output">
            <pre className="prompt-text final-text">
              {outputMode === 'text' ? buildPromptString() : buildPromptJSON()}
            </pre>
          </div>
          <button className="btn-final-copy glow" onClick={handleCopy}>
            {t(language, 'sidebar.copyPrompt')}
          </button>
        </>
      ) : (
        <>
          <h3>{t(language, 'sidebar.building')}</h3>
          <div className="prompt-content">
            <p className="prompt-text">
              {buildPromptString()}
            </p>
            <div className="scanner-line"></div>
          </div>
        </>
      )}
    </aside>
  );
}
