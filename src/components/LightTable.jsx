import React from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import './LightTable.css';

export default function LightTable() {
  const { currentPhase, cameraStyle, subjects, environment, composition, language, globalAction } = usePrompt();

  // Compute the storyboard slides based on current state
  const buildStoryboard = () => {
    const slides = [];

    // Slide 1: Camera
    if (cameraStyle) {
      slides.push({
        id: 'cam',
        img: cameraStyle.img, // Phase 1 images
        label: t(language, `phases.phase1.styles.${cameraStyle.id}.label`),
        type: t(language, 'lightTable.types.camera')
      });
    }

    // Slides 2+: Subjects
    subjects.forEach((subj, idx) => {
      slides.push({
        id: `subj-${idx}`,
        img: `/assets/subjects/${subj.id}.webp`,
        label: subj.id.startsWith('custom-') ? subj.name : t(language, `phases.phase2.subjects.${subj.id}`),
        type: subj.isProtagonist ? t(language, 'lightTable.types.protagonist') : t(language, 'lightTable.types.subject')
      });
    });

    // DNA Concept Slide
    const hasDNA = subjects.some(s => s.properties?.customDNA || s.properties?.build || s.properties?.ethnicity);
    if (hasDNA) {
      slides.push({
        id: 'dna',
        img: '/assets/icons/i1.webp',
        label: t(language, 'lightTable.labels.dna'),
        type: t(language, 'lightTable.types.lab')
      });
    }

    // Action/Clothes Concept Slide
    const hasAction = subjects.some(s => s.properties?.clothing) || globalAction;
    if (hasAction) {
      slides.push({
        id: 'action',
        img: '/assets/icons/i2.webp',
        label: t(language, 'lightTable.labels.action'),
        type: t(language, 'lightTable.types.wardrobe')
      });
    }

    // Environment/Set Slide (Location)
    if (environment.location) {
      let envImg = '/assets/icons/i3.webp'; // Textbox fallback
      
      const predefinedLocations = {
        'Photography studio backdrop': '/assets/locations/l1.webp',
        'Neon lit cyberpunk street at night': '/assets/locations/l2.webp',
        'Deep ancient forest, lush vegetation': '/assets/locations/l3.webp',
        'Luxurious mansion interior, classical architecture': '/assets/locations/l4.webp',
        'Sci-fi spaceship corridor, metallic': '/assets/locations/l5.webp',
        'Solid color background, gradient backdrop': '/assets/locations/l6.webp'
      };

      if (predefinedLocations[environment.location]) {
        envImg = predefinedLocations[environment.location];
      }
      
      slides.push({
        id: 'loc',
        img: envImg,
        label: t(language, 'lightTable.labels.set'),
        type: t(language, 'lightTable.types.location')
      });
    }

    // Environment/Set Slide (Lighting)
    if (environment.lighting) {
      let lightImg = '/assets/icons/i4.webp'; // Textbox fallback
      
      const predefinedLighting = {
        'Broad daylight, bright natural light': '/assets/icons/day.webp',
        'Sunset golden hour, warm orange glow': '/assets/icons/sunset.webp',
        'Blue hour lighting, cool soft twilight': '/assets/icons/blue hour.webp',
        'Nighttime, dark cinematic lighting': '/assets/icons/night.webp',
        'Artificial studio lighting, dramatic setups': '/assets/icons/artificial.webp'
      };

      if (predefinedLighting[environment.lighting]) {
        lightImg = predefinedLighting[environment.lighting];
      }

      slides.push({
        id: 'light',
        img: lightImg,
        label: t(language, 'lightTable.labels.light'),
        type: t(language, 'lightTable.types.lighting')
      });
    }

    // Composition Slide: Framing
    if (composition.framing) {
      let frameImg = '/assets/icons/lens_slide.webp';
      if (composition.framing === 'Full Shot') frameImg = '/assets/composition/frame_full.webp';
      if (composition.framing === 'Medium Shot') frameImg = '/assets/composition/frame_medium.webp';
      if (composition.framing === 'Close-up') frameImg = '/assets/composition/frame_closeup.webp';
      if (composition.framing === 'Ultra Wide') frameImg = '/assets/composition/frame_wide.webp';

      slides.push({
        id: 'comp',
        img: frameImg,
        label: composition.framing,
        type: t(language, 'lightTable.types.framing')
      });
    }

    // Composition Slide: Angle
    if (composition.angle) {
      let angleImg = '/assets/icons/lens_slide.webp';
      if (composition.angle === 'Eye level') angleImg = '/assets/composition/angle_eye.webp';
      if (composition.angle === 'Low angle') angleImg = '/assets/composition/angle_low.webp';
      if (composition.angle === 'High angle') angleImg = '/assets/composition/angle_high.webp';
      if (composition.angle === 'Dutch Angle') angleImg = '/assets/composition/angle_dutch.webp';
      if (composition.angle === 'Aerial view') angleImg = '/assets/composition/angle_aerial.webp';

      slides.push({
        id: 'angle',
        img: angleImg,
        label: composition.angle,
        type: t(language, 'lightTable.types.angle')
      });
    }

    return slides;
  };

  const slides = buildStoryboard();

  return (
    <footer className="light-table">
      <div className="light-table-header">
        <h4>{t(language, 'lightTable.title')}</h4>
        <span className="count">{slides.length} {t(language, 'lightTable.slides')}</span>
      </div>
      <div className="polaroid-grid">
        {slides.map((slide) => (
          <div key={slide.id} className="polaroid-mini filled slide-anim" title={slide.type}>
            <div className="polaroid-img-placeholder">
              <img 
                src={slide.img} 
                alt={slide.label}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
                style={{width: '100%', height: '100%', objectFit: 'contain'}}
              />
              <div className="fallback-text" style={{display: 'none'}}>
                {slide.label.substring(0, 10)}
              </div>
            </div>
            <p>{slide.label}</p>
          </div>
        ))}
      </div>
    </footer>
  );
}
