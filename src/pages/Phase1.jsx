import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase1.css';

const CAMERA_STYLES = [
  { id: 'smartphone', prompt: 'Shot on iPhone 15 Pro, amateur photography, raw photo', img: '/assets/phase1/001_smartphone.webp' },
  { id: 'selfieMirror', prompt: 'Mirror selfie, holding smartphone, bathroom lighting, instagram aesthetic', img: '/assets/phase1/001_selfie_mirror.webp' },
  { id: 'selfieFront', prompt: 'Front-facing camera perspective, POV selfie, Shot on iPhone 15 Pro Max, .HEIC, IMG_FRONTAL_SELFIE.HEIC, slightly wide-angle lens distorted perspective, no arm visible, casual authentic feel, Instagram export compression quality, close up on face and upper body.', img: '/assets/phase1/001_selfie_pov.webp' },
  { id: 'editorial', prompt: 'Editorial photography, shot on 85mm lens, f/1.8, high-end fashion magazine look', img: '/assets/phase1/001_editorial.webp' },
  { id: 'cinematic', prompt: 'Cinematic film still, anamorphic lens, 35mm film, dramatic lighting, movie scene', img: '/assets/phase1/001_cinema.webp' },
  { id: 'documentary', prompt: 'Documentary photography, photojournalism, high contrast, gritty realism', img: '/assets/phase1/001_documentary.webp' },
];

export default function Phase1() {
  const { cameraStyle, setCameraStyle, nextPhase, language } = usePrompt();

  const handleSelect = (style) => {
    setCameraStyle(style);
  };

  return (
    <div className="phase-container animation-fade-in">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase1.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase1.subtitle')}</p>
      </div>

      <div className="camera-grid">
        {CAMERA_STYLES.map((style) => {
          const isSelected = cameraStyle && cameraStyle.prompt === style.prompt;
          return (
            <div 
              key={style.id} 
              className={`camera-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(style)}
            >
              <div className="camera-img-placeholder">
                <img src={style.img} alt={style.label} />
              </div>
              <div className="camera-info">
                <h4>{t(language, `phases.phase1.styles.${style.id}.label`)}</h4>
                <p>{t(language, `phases.phase1.styles.${style.id}.desc`)}</p>
              </div>
              {isSelected && <div className="scanner-line"></div>}
            </div>
          );
        })}
      </div>

      <div className="phase-navigation" style={{justifyContent: 'flex-end'}}>
        <button 
          className="btn-nav next" 
          onClick={nextPhase} 
          disabled={!cameraStyle}
          style={{ opacity: !cameraStyle ? 0.5 : 1, cursor: !cameraStyle ? 'not-allowed' : 'pointer' }}
        >
          {t(language, 'nav.next')}
        </button>
      </div>
    </div>
  );
}
