import React, { useState, useEffect } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase4.css';

export default function Phase4() {
  const { subjects, setSubjects, nextPhase, prevPhase, language } = usePrompt();
  const [activeSubjectId, setActiveSubjectId] = useState(null);

  useEffect(() => {
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

  return (
    <div className="phase-container animation-fade-in phase-four-container">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase4.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase4.subtitle')}</p>
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

      <div className="action-grid">
        <div className="action-card">
          <h4>{t(language, 'phases.phase4.clothing')}</h4>
          <textarea 
            className="action-textarea"
            placeholder={t(language, 'phases.phase4.clothingHolder')}
            value={activeSubject.properties?.clothing || ''}
            onChange={(e) => updateSubjectProperty('clothing', e.target.value)}
          />
        </div>

        <div className="action-card">
          <h4>{t(language, 'phases.phase4.action')}</h4>
          <textarea 
            className="action-textarea"
            placeholder={t(language, 'phases.phase4.actionHolder')}
            value={activeSubject.properties?.action || ''}
            onChange={(e) => updateSubjectProperty('action', e.target.value)}
          />
        </div>

        <div className="action-card">
          <h4>{t(language, 'phases.phase4.expression')}</h4>
          <textarea 
            className="action-textarea"
            placeholder={t(language, 'phases.phase4.expressionHolder')}
            value={activeSubject.properties?.expression || ''}
            onChange={(e) => updateSubjectProperty('expression', e.target.value)}
          />
        </div>

        {subjects.length > 1 && (
          <div className="action-card full-width interaction-card">
            <h4>{t(language, 'phases.phase4.interaction')}</h4>
            <textarea 
              className="action-textarea"
              placeholder={t(language, 'phases.phase4.interactionHolder')}
              value={activeSubject.properties?.interaction || ''}
              onChange={(e) => updateSubjectProperty('interaction', e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="phase-navigation" style={{ marginTop: '3rem' }}>
        <button className="btn-nav prev" onClick={prevPhase}>{t(language, 'nav.prev')}</button>
        <button className="btn-nav next" onClick={nextPhase}>{t(language, 'nav.next')}</button>
      </div>
    </div>
  );
}
