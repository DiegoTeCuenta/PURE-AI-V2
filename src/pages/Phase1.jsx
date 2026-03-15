import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase1.css';

const CAMERA_STYLES = [
  { id: 'smartphone', prompt: 'Shot on iPhone 15 Pro, amateur photography, raw photo', img: '/assets/phase1/001_smartphone.webp' },
  { id: 'selfieMirror', prompt: 'Mirror selfie, holding smartphone, bathroom lighting, instagram aesthetic', img: '/assets/phase1/001_selfie_mirror.webp' },
  { id: 'selfieFront', prompt: 'Front-facing camera perspective, POV selfie, Shot on iPhone 15 Pro Max, wide-angle lens distorted, close up on face.', img: '/assets/phase1/001_selfie_pov.webp' },
  { id: 'editorial', prompt: 'Editorial photography, shot on 85mm lens, f/1.8, high-end fashion magazine look', img: '/assets/phase1/001_editorial.webp' },
  { id: 'cinematic', prompt: 'Cinematic film still, anamorphic lens, 35mm film, dramatic lighting', img: '/assets/phase1/001_cinema.webp' },
  { id: 'documentary', prompt: 'Documentary photography, photojournalism, gritty realism', img: '/assets/phase1/001_documentary.webp' },
];

export default function Phase1() {
  const { cameraStyle, setCameraStyle, setPhotoboardEntries, language } = usePrompt();

  const handleSelect = (style) => {
    setCameraStyle(style);
    // Add/Update index 0 of photoboard
    setPhotoboardEntries((prev) => {
      const newEntries = [...prev];
      newEntries[0] = { img: style.img, label: t(language, `phases.phase1.styles.${style.id}.label`) };
      return newEntries;
    });
  };

  return (
    <div className="phase-container animation-fade-in">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase1.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase1.subtitle')}</p>
      </div>

      <div className="camera-grid">
        {CAMERA_STYLES.map((style) => {
          const isSelected = cameraStyle && cameraStyle.id === style.id;
          return (
            <div 
              key={style.id} 
              className={`camera-card polaroid-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(style)}
            >
              <div className="camera-img-container">
                <img src={style.img} alt={style.id} />
              </div>
              <div className="camera-info">
                <h4>{t(language, `phases.phase1.styles.${style.id}.label`)}</h4>
                <p>{t(language, `phases.phase1.styles.${style.id}.desc`)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
