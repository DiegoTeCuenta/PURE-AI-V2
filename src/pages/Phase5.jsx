import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './Phase5.css';

const LOCATIONS = [
  { id: 'l1', prompt: 'Photography studio backdrop', img: '/assets/locations/l1.webp' },
  { id: 'l2', prompt: 'Neon lit cyberpunk street at night', img: '/assets/locations/l2.webp' },
  { id: 'l3', prompt: 'Deep ancient forest, lush vegetation', img: '/assets/locations/l3.webp' },
  { id: 'l4', prompt: 'Luxurious mansion interior, classical architecture', img: '/assets/locations/l4.webp' },
  { id: 'l5', prompt: 'Sci-fi spaceship corridor, metallic', img: '/assets/locations/l5.webp' },
  { id: 'l6', prompt: 'Solid color background, gradient backdrop', img: '/assets/locations/l6.webp' },
];

const LIGHTING = [
  { id: 'day', prompt: 'Broad daylight, bright natural light', img: '/assets/icons/day.webp' },
  { id: 'sunset', prompt: 'Sunset golden hour, warm orange glow', img: '/assets/icons/sunset.webp' },
  { id: 'blueHour', prompt: 'Blue hour lighting, cool soft twilight', img: '/assets/icons/blue hour.webp' },
  { id: 'night', prompt: 'Nighttime, dark cinematic lighting', img: '/assets/icons/night.webp' },
  { id: 'artificial', prompt: 'Artificial studio lighting, dramatic setups', img: '/assets/icons/artificial.webp' },
];
const EXTRAS = [
  { id: 'fog', prompt: 'Volumetric Fog' },
  { id: 'rain', prompt: 'Heavy Rain' },
  { id: 'dust', prompt: 'Floating Dust/Particles' },
  { id: 'lens', prompt: 'Lens Flares' },
  { id: 'smoke', prompt: 'Subtle Smoke' }
];

export default function Phase5() {
  const { environment, setEnvironment, nextPhase, prevPhase, language } = usePrompt();

  const handleLocation = (loc) => setEnvironment({ ...environment, location: loc.prompt });
  
  const toggleLighting = (lightObj) => {
    setEnvironment({ 
      ...environment, 
      lighting: environment.lighting === lightObj.prompt ? null : lightObj.prompt 
    });
  };

  const toggleExtra = (extraId) => {
    const currentExtras = environment.extras || [];
    if (currentExtras.includes(extraId)) {
      setEnvironment({ ...environment, extras: currentExtras.filter(e => e !== extraId) });
    } else {
      setEnvironment({ ...environment, extras: [...currentExtras, extraId] });
    }
  };

  return (
    <div className="phase-container animation-fade-in env-container">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase5.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase5.subtitle')}</p>
      </div>

      <div className="env-grid">
        
        {/* Locaciones */}
        <div className="env-section">
          <h3>{t(language, 'phases.phase5.locTitle')}</h3>
          <div className="env-slider-grid">
            {LOCATIONS.map(loc => {
              const isSelected = environment.location === loc.prompt;
              return (
                <div 
                  key={loc.id} 
                  className={`visual-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleLocation(loc)}
                >
                  <img src={loc.img} alt={loc.id} className="visual-img" />
                  <div className="visual-label">{t(language, `phases.phase5.locations.${loc.id}`)}</div>
                  {isSelected && <div className="scanner-line"></div>}
                </div>
              );
            })}
          </div>
          <textarea 
            className="env-textarea mt-3"
            placeholder={t(language, 'phases.phase5.locHolder')}
            value={environment.location || ''}
            onChange={(e) => setEnvironment({ ...environment, location: e.target.value })}
          />
        </div>

        {/* Iluminación y Extras */}
        <div className="env-section right-col">
          
          <div className="env-box">
            <h3>{t(language, 'phases.phase5.lightTitle')}</h3>
            <div className="env-slider-grid light-grid">
              {LIGHTING.map(light => {
                const isActive = environment.lighting === light.prompt;
                return (
                  <div 
                    key={light.id} 
                    className={`visual-card small ${isActive ? 'selected' : ''}`}
                    onClick={() => toggleLighting(light)}
                  >
                    <img src={light.img} alt={light.id} className="visual-img" />
                    <div className="visual-label">{t(language, `phases.phase5.lighting.${light.id}`)}</div>
                    {isActive && <div className="scanner-line"></div>}
                  </div>
                );
              })}
            </div>
            <input 
              type="text" 
              className="env-input mt-2" 
              placeholder={t(language, 'phases.phase5.lightHolder')}
              value={environment.lightingDetails || ''}
              onChange={(e) => setEnvironment({ ...environment, lightingDetails: e.target.value })}
            />
          </div>

          <div className="env-box mt-4">
            <h3>{t(language, 'phases.phase5.extraTitle')}</h3>
            <div className="tags-container">
              {EXTRAS.map(extra => {
                const isActive = (environment.extras || []).includes(extra.id);
                return (
                  <button 
                    key={extra.id} 
                    className={`env-tag ${isActive ? 'active' : ''}`}
                    onClick={() => toggleExtra(extra.id)}
                  >
                    {t(language, `phases.phase5.extras.${extra.id}`)}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <div className="phase-navigation" style={{ marginTop: '3rem' }}>
        <button className="btn-nav prev" onClick={prevPhase}>{t(language, 'nav.prev')}</button>
        <button className="btn-nav next" onClick={nextPhase}>{t(language, 'nav.next')}</button>
      </div>
    </div>
  );
}
