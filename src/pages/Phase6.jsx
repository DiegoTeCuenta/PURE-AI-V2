import React, { useState } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase6.css';

export default function Phase6() {
  const { composition, setComposition, nextPhase, prevPhase, cameraStyle, subjects, environment, language } = usePrompt();
  
  const [outputMode, setOutputMode] = useState('text'); // 'text' | 'json'

  const FRAMING = [
    { id: 'full-shot', label: 'Full Shot', img: '/assets/composition/frame_full.webp' },
    { id: 'medium-shot', label: 'Medium Shot', img: '/assets/composition/frame_medium.webp' },
    { id: 'close-up', label: 'Close-up', img: '/assets/composition/frame_closeup.webp' },
    { id: 'ultra-wide', label: 'Ultra Wide', img: '/assets/composition/frame_wide.webp' }
  ];
  
  const ANGLES = [
    { id: 'eye-level', label: 'Eye level', img: '/assets/composition/angle_eye.webp' },
    { id: 'low-angle', label: 'Low angle', img: '/assets/composition/angle_low.webp' },
    { id: 'high-angle', label: 'High angle', img: '/assets/composition/angle_high.webp' },
    { id: 'dutch-angle', label: 'Dutch Angle', img: '/assets/composition/angle_dutch.webp' },
    { id: 'aerial-view', label: 'Aerial view', img: '/assets/composition/angle_aerial.webp' }
  ];

  const toggleProperty = (key, value) => {
    setComposition({
      ...composition,
      [key]: composition[key] === value ? null : value
    });
  };

  const handleAdvancedChange = (e) => {
    setComposition({ ...composition, advanced: e.target.value });
  };

  // Construct Final Prompt
  const buildFinalTextPrompt = () => {
    let parts = [];
    
    // 1. Camera Style Base
    if (cameraStyle?.prompt) parts.push(cameraStyle.prompt);
    
    // 2. Composition (Framing + Angle)
    if (composition.framing) parts.push(composition.framing);
    if (composition.angle) parts.push(composition.angle);
    
    // 3. Subjects (DNA, Action, Expression, Clothing)
    if (subjects.length > 0) {
      subjects.forEach(s => {
        let subjDesc = `[Subject ${s.name}: `;
        const props = [];
        if (s.properties?.description) props.push(`description: ${s.properties.description}`);
        if (s.properties?.customDNA) props.push(`DNA: ${s.properties.customDNA}`);
        if (s.properties?.clothing) props.push(`wearing ${s.properties.clothing}`);
        if (s.properties?.action) props.push(`action: ${s.properties.action}`);
        if (s.properties?.expression) props.push(`expression: ${s.properties.expression}`);
        
        subjDesc += props.join(', ') + ']';
        parts.push(subjDesc);
      });
      // Interaction
      if (subjects.length > 1 && subjects[0].properties?.interaction) {
        parts.push(`Interaction: ${subjects[0].properties.interaction}`);
      }
    }
    
    // 4. Environment
    if (environment.location) parts.push(environment.location);
    if (environment.lighting) parts.push(`Lighting: ${environment.lighting}`);
    if (environment.lightingDetails) parts.push(environment.lightingDetails);
    if (environment.extras && environment.extras.length > 0) parts.push(environment.extras.join(', '));
    
    // 5. Advanced Composition
    if (composition.advanced) parts.push(composition.advanced);

    return parts.join(', ');
  };

  const buildFinalJSONPrompt = () => {
    return JSON.stringify({
      style: cameraStyle?.label || cameraStyle?.id || '',
      composition,
      subjects,
      environment
    }, null, 2);
  };

  const handleCopy = () => {
    const textToCopy = outputMode === 'text' ? buildFinalTextPrompt() : buildFinalJSONPrompt();
    navigator.clipboard.writeText(textToCopy);
    alert('¡Prompt copiado al portapapeles!');
  };

  return (
    <div className="phase-container animation-fade-in comp-container">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase6.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase6.subtitle')}</p>
      </div>

      <div className="comp-full-width">
        <div className="comp-section">
          <h4>{t(language, 'phases.phase6.framing')}</h4>
          <div className="comp-cards-grid">
            {FRAMING.map(f => (
              <div 
                key={f.id} 
                className={`comp-card ${composition.framing === f.label ? 'selected' : ''}`}
                onClick={() => toggleProperty('framing', f.label)}
              >
                <div className="comp-img-container">
                  <img src={f.img} alt={f.label} />
                  {composition.framing === f.label && <div className="scanner-line"></div>}
                </div>
                <div className="comp-card-label">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="comp-section mt-3">
          <h4>{t(language, 'phases.phase6.angle')}</h4>
          <div className="comp-cards-grid">
            {ANGLES.map(a => (
              <div 
                key={a.id} 
                className={`comp-card ${composition.angle === a.label ? 'selected' : ''}`}
                onClick={() => toggleProperty('angle', a.label)}
              >
                <div className="comp-img-container">
                  <img src={a.img} alt={a.label} />
                  {composition.angle === a.label && <div className="scanner-line"></div>}
                </div>
                <div className="comp-card-label">{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="comp-section mt-3">
          <h4>{t(language, 'phases.phase6.advanced')}</h4>
          <textarea 
            className="comp-textarea"
            placeholder={t(language, 'phases.phase6.advHolder')}
            value={composition.advanced || ''}
            onChange={handleAdvancedChange}
          />
        </div>

        <div className="phase-navigation" style={{ marginTop: '3rem' }}>
          <button className="btn-nav prev" onClick={prevPhase}>{t(language, 'nav.prev')}</button>
          {/* We use nextPhase to go to a "Phase 7" virtual state to signify completion */}
          <button className="btn-nav next glow" onClick={nextPhase}>{t(language, 'nav.finish')}</button>
        </div>
      </div>
    </div>
  );
}
