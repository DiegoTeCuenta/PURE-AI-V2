import React, { useState, useEffect } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase3.css';

export default function Phase3() {
  const { subjects, setSubjects, nextPhase, prevPhase, language } = usePrompt();
  
  // Local state to know which subject tab we are currently editing
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  useEffect(() => {
    // Auto-select first subject on mount if none selected
    if (subjects.length > 0 && !activeSubjectId) {
      setActiveSubjectId(subjects[0].id);
    }
  }, [subjects, activeSubjectId]);

  if (subjects.length === 0) {
    return (
      <div className="phase-container">
        <h2 style={{color: 'white'}}>{t(language, 'phases.phase3.noSubjects')}</h2>
        <button className="btn-nav prev" onClick={prevPhase}>{t(language, 'nav.prev')}</button>
      </div>
    );
  }

  const activeSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0];

  const updateSubjectProperty = (key, value) => {
    setSubjects(subjects.map(s => {
      if (s.id === activeSubjectId) {
        return { ...s, properties: { ...s.properties, [key]: value } };
      }
      return s;
    }));
  };

  const handleIngestDNA = () => {
    // Here we construct a refined text based on the visual properties
    const props = activeSubject.properties;
    const parts = [];
    if (props.build) parts.push(`build: ${props.build}`);
    if (props.ethnicity) parts.push(`ethnicity: ${props.ethnicity}`);
    if (props.eyes) parts.push(`${props.eyes} eyes`);
    if (props.hair) parts.push(`${props.hair} hair`);
    
    // Auto update the custom DNA string
    updateSubjectProperty('customDNA', parts.join(', '));
  };

  return (
    <div className="phase-container animation-fade-in dna-lab-container">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase3.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase3.subtitle')}</p>
      </div>

      {subjects.length > 1 && (
        <div className="subject-tabs">
          {subjects.map(s => {
            const displayName = s.id.startsWith('custom-') ? s.name : t(language, `phases.phase2.subjects.${s.id}`);
            return (
              <button 
                key={s.id} 
                className={`subject-tab ${s.id === activeSubjectId ? 'active' : ''}`}
                onClick={() => setActiveSubjectId(s.id)}
              >
                {s.isProtagonist ? '★ ' : ''}{displayName}
              </button>
            )
          })}
        </div>
      )}

      <div className="dna-editor-grid">
        {/* Conditional rendering based on subject type */}
        {activeSubject.type === 'Humanos' ? (
          <div className="dna-visual-selectors">
            <div className="selector-group">
              <h4>{t(language, 'phases.phase3.build')}</h4>
              <div className="options-row">
                {[{id: 'slim'}, {id: 'athletic'}, {id: 'muscular'}, {id: 'curvy'}, {id: 'plusSize'}].map(opt => (
                  <button 
                    key={opt.id} 
                    className={`opt-btn ${activeSubject.properties?.build === opt.id ? 'selected' : ''}`}
                    onClick={() => updateSubjectProperty('build', opt.id)}
                  >
                    {t(language, `phases.phase3.builds.${opt.id}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="selector-group">
              <h4>{t(language, 'phases.phase3.ethnicity')}</h4>
              <div className="options-row">
                {[{id: 'caucasian'}, {id: 'afro'}, {id: 'asian'}, {id: 'latino'}, {id: 'pale'}, {id: 'tanned'}].map(opt => (
                  <button 
                    key={opt.id} 
                    className={`opt-btn ${activeSubject.properties?.ethnicity === opt.id ? 'selected' : ''}`}
                    onClick={() => updateSubjectProperty('ethnicity', opt.id)}
                  >
                    {t(language, `phases.phase3.ethnicities.${opt.id}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="selector-group split">
              <div className="child">
                <h4>{t(language, 'phases.phase3.eyes')}</h4>
                <input 
                  type="text" 
                  placeholder="Ej. Azules cristalinos"
                  className="dna-input"
                  value={activeSubject.properties?.eyes || ''}
                  onChange={(e) => updateSubjectProperty('eyes', e.target.value)}
                />
              </div>
              <div className="child">
                <h4>{t(language, 'phases.phase3.hair')}</h4>
                <input 
                  type="text" 
                  placeholder="Ej. Rubio rizado, corto"
                  className="dna-input"
                  value={activeSubject.properties?.hair || ''}
                  onChange={(e) => updateSubjectProperty('hair', e.target.value)}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="dna-visual-selectors non-human-panel">
            <div className="selector-group" style={{height: '100%'}}>
              <h4>{t(language, `phases.phase2.tabs.${activeSubject.type === 'Humanos' ? 'human' : activeSubject.type === 'Animales' ? 'animal' : activeSubject.type === 'Criaturas' ? 'creature' : 'object'}`)}</h4>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5'}}>
                {t(language, 'phases.phase3.nonHumanPlaceholder')}
              </p>
              <textarea 
                className="dna-textarea"
                style={{flex: 1, minHeight: '150px'}}
                placeholder="..."
                value={activeSubject.properties?.description || ''}
                onChange={(e) => updateSubjectProperty('description', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Terminal always stays mostly the same, but we can change the label if non-human */}
        <div className="dna-terminal">
          <div className="terminal-header">secuencia_genoma.txt</div>
          <textarea 
            className="dna-textarea"
            placeholder={t(language, 'phases.phase3.customHolder')}
            value={activeSubject.properties?.customDNA || ''}
            onChange={(e) => updateSubjectProperty('customDNA', e.target.value)}
          />
          {activeSubject.type === 'Humanos' && (
            <button className="btn-ingestar glow" onClick={handleIngestDNA}>
              INGESTAR ADN
            </button>
          )}
        </div>
      </div>

      <div className="phase-navigation" style={{ marginTop: '4rem' }}>
        <button className="btn-nav prev" onClick={prevPhase}>{t(language, 'nav.prev')}</button>
        <button className="btn-nav next" onClick={nextPhase}>{t(language, 'nav.next')}</button>
      </div>
    </div>
  );
}
