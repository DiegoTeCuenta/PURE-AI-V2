import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase4.css';

const FRAMING_OPTIONS = [
  { id: 'full', img: '/assets/composition/frame_full.webp' },
  { id: 'medium', img: '/assets/composition/frame_medium.webp' },
  { id: 'close', img: '/assets/composition/frame_closeup.webp' },
];

const ANGLE_OPTIONS = [
  { id: 'eye', img: '/assets/composition/angle_eye.webp' },
  { id: 'low', img: '/assets/composition/angle_low.webp' },
  { id: 'high', img: '/assets/composition/angle_high.webp' },
];

export default function Phase4() {
  const { composition, setComposition, setPhotoboardEntries, language } = usePrompt();

  const handleSelect = (type, item) => {
    const newComp = { ...composition, [type]: item.id };
    setComposition(newComp);

    // Update photoboard: Group Framing and Angle into index 6
    setPhotoboardEntries((prev) => {
      const newEntries = [...prev];
      
      // Get images for both
      const framingImg = type === 'framing' ? item.img : FRAMING_OPTIONS.find(f => f.id === composition?.framing)?.img;
      const angleImg = type === 'angle' ? item.img : ANGLE_OPTIONS.find(a => a.id === composition?.angle)?.img;
      
      const icons = [framingImg, angleImg].filter(Boolean);
      
      newEntries[6] = { 
        type: 'group',
        icons: icons,
        label: 'Composición' 
      };
      newEntries[7] = null; // Clean up old angle slot
      return newEntries;
    });
  };

  return (
    <div className="phase-container animation-fade-in">
      <div className="phase-header">
        <h1 className="phase-title">Composición</h1>
        <p className="phase-subtitle">Encuadre | Ángulo</p>
      </div>

      <div className="camera-grid">
        {/* Framing Options */}
        {FRAMING_OPTIONS.map((opt) => (
          <div 
            key={opt.id} 
            className={`camera-card polaroid-card ${composition?.framing === opt.id ? 'selected' : ''}`}
            onClick={() => handleSelect('framing', opt)}
          >
            <div className="camera-img-container">
              <img src={opt.img} alt={opt.id} />
            </div>
            <div className="camera-info">
              <h4>{t(language, `phases.phase4.framing.${opt.id}.label`)}</h4>
            </div>
          </div>
        ))}

        {/* Angle Options */}
        {ANGLE_OPTIONS.map((opt) => (
          <div 
            key={opt.id} 
            className={`camera-card polaroid-card ${composition?.angle === opt.id ? 'selected' : ''}`}
            onClick={() => handleSelect('angle', opt)}
          >
            <div className="camera-img-container">
              <img src={opt.img} alt={opt.id} />
            </div>
            <div className="camera-info">
              <h4>{t(language, `phases.phase4.angle.${opt.id}.label`)}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
