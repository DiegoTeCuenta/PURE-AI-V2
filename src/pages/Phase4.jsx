import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase4.css';

const FRAMING_OPTIONS = [
  { id: 'full', img: '/assets/composition/frame_full.webp' },
  { id: 'medium', img: '/assets/composition/frame_medium.webp' },
  { id: 'close', img: '/assets/composition/frame_closeup.webp' },
  { id: 'wide', img: '/assets/composition/frame_wide.webp' },
];

const ANGLE_OPTIONS = [
  { id: 'eye', img: '/assets/composition/angle_eye.webp' },
  { id: 'low', img: '/assets/composition/angle_low.webp' },
  { id: 'high', img: '/assets/composition/angle_high.webp' },
  { id: 'dutch', img: '/assets/composition/angle_dutch.webp' },
];

export default function Phase4() {
  const { composition, setComposition, setPhotoboardEntries, language } = usePrompt();

  const handleSelect = (type, item) => {
    const newComp = { ...composition, [type]: item.id };
    setComposition(newComp);

    // Update photoboard
    setPhotoboardEntries((prev) => {
      const newEntries = [...prev];
      const index = type === 'framing' ? 6 : 7;
      newEntries[index] = { 
        img: item.img, 
        label: t(language, `phases.phase4.${type}.${item.id}.label`) 
      };
      return newEntries;
    });
  };

  return (
    <div className="phase-container animation-fade-in">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase4.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase4.subtitle')}</p>
      </div>

      <div className="composition-section">
        <h3 className="section-title">{t(language, 'lightTable.types.framing')}</h3>
        <div className="comp-grid">
          {FRAMING_OPTIONS.map((opt) => (
            <div 
              key={opt.id} 
              className={`comp-card polaroid-card ${composition?.framing === opt.id ? 'selected' : ''}`}
              onClick={() => handleSelect('framing', opt)}
            >
              <div className="comp-img-container">
                <img src={opt.img} alt={opt.id} />
              </div>
              <div className="comp-info">
                <h4>{t(language, `phases.phase4.framing.${opt.id}.label`)}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="composition-section">
        <h3 className="section-title">{t(language, 'lightTable.types.angle')}</h3>
        <div className="comp-grid">
          {ANGLE_OPTIONS.map((opt) => (
            <div 
              key={opt.id} 
              className={`comp-card polaroid-card ${composition?.angle === opt.id ? 'selected' : ''}`}
              onClick={() => handleSelect('angle', opt)}
            >
              <div className="comp-img-container">
                <img src={opt.img} alt={opt.id} />
              </div>
              <div className="comp-info">
                <h4>{t(language, `phases.phase4.angle.${opt.id}.label`)}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
