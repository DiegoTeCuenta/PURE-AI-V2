import React, { useState } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import { Plus, Loader2 } from 'lucide-react';
import ExampleCarousel from '../components/ExampleCarousel';
import { translateText } from '../utils/translateUtil';
import './Phase2.css'; // Reusing phase 2 layout styles

const PHASE3_EXAMPLES = [
  { img: '/assets/icons/sunset.webp', desc: { es: 'esta comiendo en la cocina de su apartamento moderno en Nueva York.', en: 'is eating in the kitchen of their modern apartment in New York.' } },
  { img: '/assets/icons/day.webp', desc: { es: 'van caminando de la mano por una playa virgen al atardecer en Bali.', en: 'walking hand in hand through a pristine beach at sunset in Bali.' } },
  { img: '/assets/icons/night.webp', desc: { es: 'juegan sentadas en el pasto de un parque urbano bajo las luces de la ciudad.', en: 'playing sitting on the grass of an urban park under city lights.' } },
  { img: '/assets/locations/l2.webp', desc: { es: 'camina bajo la lluvia en la ciudad de Londres llevando un paraguas rojo.', en: 'walks under the rain in London city carrying a red umbrella.' } },
  { img: '/assets/locations/l3.webp', desc: { es: 'explora una cueva antigua y misteriosa iluminada con una antorcha.', en: 'explores an ancient and mysterious cave lit with a torch.' } },
  { img: '/assets/locations/l4.webp', desc: { es: 'trabaja en un laboratorio futurista rodeado de hologramas y pantallas táctiles.', en: 'works in a futuristic lab surrounded by holograms and touch screens.' } }
];

export default function Phase3() {
  const { actionLocation, setActionLocation, setPhotoboardEntries, language } = usePrompt();
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleAddAction = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    const translatedText = await translateText(inputText.trim(), 'es', 'en');
    
    // In this phase, we just update the global action string
    setActionLocation(translatedText);
    setInputText('');
    setIsTranslating(false);

    // Update photoboard at index 5 (Style + 4 subjects + Action)
    setPhotoboardEntries((prev) => {
      const newEntries = [...prev];
      newEntries[5] = { 
        img: '/assets/icons/i3.webp', 
        label: t(language, 'phases.phase3.title') 
      };
      return newEntries;
    });
  };

  return (
    <div className="phase-container animation-fade-in">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase3.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase3.subtitle')}</p>
      </div>

      <div className="instructions-container glass-container">
        <p>{t(language, 'phases.phase3.instructions')}</p>
      </div>

      <div className="input-section">
        <textarea 
          className="subject-textarea"
          placeholder={t(language, 'phases.phase3.placeholder')}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button 
          className="btn-add-floating" 
          onClick={handleAddAction}
          disabled={!inputText.trim() || isTranslating}
        >
          {isTranslating ? <Loader2 size={30} className="animation-spin" /> : <Plus size={40} />}
        </button>
      </div>

      {actionLocation && (
        <div className="subjects-counter">
          {t(language, 'phases.phase3.title')} Registrada
        </div>
      )}

      <div className="carousel-section">
        <ExampleCarousel examples={PHASE3_EXAMPLES} language={language} />
      </div>
    </div>
  );
}
