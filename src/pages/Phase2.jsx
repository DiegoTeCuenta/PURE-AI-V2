import React, { useState } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase2.css';

const CATEGORIES = [
  { key: 'human', labelEs: 'Humanos' },
  { key: 'animal', labelEs: 'Animales' },
  { key: 'creature', labelEs: 'Criaturas' },
  { key: 'object', labelEs: 'Objetos' }
];

// Mocked subjects data for Phase 2
const SUBJECTS_DB = {
  'Humanos': [
    { id: 'h1', name: 'Hombre Joven', type: 'Humanos' },
    { id: 'h2', name: 'Mujer Joven', type: 'Humanos' },
    { id: 'h3', name: 'Hombre Mayor', type: 'Humanos' },
    { id: 'h4', name: 'Mujer Mayor', type: 'Humanos' },
    { id: 'h5', name: 'Niño', type: 'Humanos' },
    { id: 'h6', name: 'Niña', type: 'Humanos' },
  ],
  'Animales': [
    { id: 'a1', name: 'Perro', type: 'Animales' },
    { id: 'a2', name: 'Gato', type: 'Animales' },
    { id: 'a3', name: 'Caballo', type: 'Animales' },
  ],
  'Criaturas': [
    { id: 'c1', name: 'Alien', type: 'Criaturas' },
    { id: 'c2', name: 'Robot/Cyborg', type: 'Criaturas' },
    { id: 'c3', name: 'Elfo/Fantasía', type: 'Criaturas' },
  ],
  'Objetos': [
    { id: 'o1', name: 'Vehículo', type: 'Objetos' },
    { id: 'o2', name: 'Arma/Prop', type: 'Objetos' },
    { id: 'o3', name: 'Joya/Artefacto', type: 'Objetos' },
  ]
};

export default function Phase2() {
  const { subjects, setSubjects, nextPhase, prevPhase, language } = usePrompt();
  const [activeTab, setActiveTab] = useState('Humanos');
  const [customSubjectName, setCustomSubjectName] = useState('');
  const [localSubjectsDB, setLocalSubjectsDB] = useState(SUBJECTS_DB);

  const getSubjectName = (id, name) => {
    return id.startsWith('custom-') ? name : t(language, `phases.phase2.subjects.${id}`);
  };

  const addCustomSubject = () => {
    if (!customSubjectName.trim()) return;
    const newId = `custom-${Date.now()}`;
    const newSubject = { id: newId, name: customSubjectName.trim(), type: activeTab };
    
    setLocalSubjectsDB(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], newSubject]
    }));
    
    setCustomSubjectName('');
    toggleSubject(newSubject);
  };

  const toggleSubject = (subjectItem) => {
    const exists = subjects.find(s => s.id === subjectItem.id);
    if (exists) {
      setSubjects(subjects.filter(s => s.id !== subjectItem.id));
    } else {
      if (subjects.length < 4) {
        // Initialize with default empty properties for Phase 3
        setSubjects([...subjects, { ...subjectItem, isProtagonist: subjects.length === 0, properties: {} }]);
      } else {
        alert(t(language, 'phases.phase2.limitReached'));
      }
    }
  };

  const setProtagonist = (e, id) => {
    e.stopPropagation(); // Prevents toggling the card selection
    setSubjects(subjects.map(s => 
      s.id === id ? { ...s, isProtagonist: true } : { ...s, isProtagonist: false }
    ));
  };

  return (
    <div className="phase-container animation-fade-in">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase2.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase2.subtitle')}</p>
      </div>

      <div className="category-tabs">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.key} 
            className={`tab-btn ${activeTab === cat.labelEs ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.labelEs)}
          >
            {t(language, `phases.phase2.tabs.${cat.key}`)}
          </button>
        ))}
      </div>

      <div className="subjects-grid">
        {localSubjectsDB[activeTab].map(item => {
          const isSelected = subjects.find(s => s.id === item.id);
          const isProtagonist = isSelected?.isProtagonist;
          
          return (
            <div 
              key={item.id} 
              className={`subject-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleSubject(item)}
            >
              <div className="polaroid-img-wrapper">
                {/* Asumiendo que ahora las imágenes traen su propio marco tipo polaroid integrado */}
                <img 
                  src={`/assets/subjects/${item.id}.webp`} 
                  alt={item.name} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                  style={{width: '100%', height: '100%', objectFit: 'contain'}}
                />
                <div className="subject-img-placeholder" style={{display: 'none'}}>
                  <span className="placeholder-text">{getSubjectName(item.id, item.name)}</span>
                </div>

                {isSelected && (
                  <button 
                    className={`btn-protagonist ${isProtagonist ? 'active' : ''}`}
                    onClick={(e) => setProtagonist(e, item.id)}
                    title={t(language, 'phases.phase2.selectProtagonist')}
                  >
                    ★
                  </button>
                )}
              </div>
              <div className="polaroid-caption">
                <p>{getSubjectName(item.id, item.name)}</p>
              </div>
            </div>
          );
        })}

        {/* Caja para agregar un sujeto personalizado */}
        <div className="custom-subject-box">
          <input 
            type="text" 
            className="custom-subject-input"
            placeholder={`${t(language, 'phases.phase2.tabs.other')}...`}
            value={customSubjectName}
            onChange={(e) => setCustomSubjectName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === 'Enter' && addCustomSubject()}
          />
          <button className="btn-add-custom" onClick={addCustomSubject}>
            + 
          </button>
        </div>
      </div>

      <div className="phase-navigation">
        <button className="btn-nav prev" onClick={prevPhase}>{t(language, 'nav.prev')}</button>
        <button 
          className="btn-nav next" 
          onClick={nextPhase} 
          disabled={subjects.length === 0}
          style={{ opacity: subjects.length === 0 ? 0.5 : 1, cursor: subjects.length === 0 ? 'not-allowed' : 'pointer' }}
        >
          {t(language, 'nav.next')}
        </button>
      </div>
    </div>
  );
}
