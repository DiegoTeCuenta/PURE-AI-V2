import React, { useState, useEffect } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import { Plus, Loader2 } from 'lucide-react';
import ExampleCarousel from '../components/ExampleCarousel';
import { translateText } from '../utils/translateUtil';
import './Phase2.css';

const PHASE2_EXAMPLES = [
  { img: '/assets/subjects/c1.webp', desc: { es: 'Un alienígena, delgado, de piel azulada, con grandes ojos negros y manos largas.', en: 'An alien, slim, with bluish skin, large black eyes, and long hands.' } },
  { img: '/assets/subjects/a2.webp', desc: { es: 'Un gato peludo, gordo, naranja con rayas blancas.', en: 'A furry, fat, orange cat with white stripes.' } },
  { img: '/assets/subjects/o3.webp', desc: { es: 'Una taza de café humeante, porcelana blanca fina, sobre una mesa de madera.', en: 'A steaming cup of coffee, fine white porcelain, on a wooden table.' } },
  { img: '/assets/subjects/h2.webp', desc: { es: 'Una mujer joven, estilo cyberpunk, con gafas neón y chaqueta de cuero metálica.', en: 'A young woman, cyberpunk style, with neon glasses and a metallic leather jacket.' } },
  { img: '/assets/subjects/a1.webp', desc: { es: 'Mujer, 22, Afrocaribeña, pelo largo, vestido corto de verano, sandalias blancas, lleva una canasta con flores y habla por teléfono', en: 'Woman, 22, Afro-Caribbean, long hair, short summer dress, white sandals, carrying a basket with flowers and talking on the phone' } },
  { img: '/assets/subjects/h1.webp', desc: { es: 'Dos niños, 6+, uno asiático y otro latino, visten casual veraniego llevan juguetes en las manos.', en: 'Two children, 6+, one Asian and one Latino, wearing summer casual clothes, carrying toys in their hands.' } }
];

export default function Phase2() {
  const { subjects, setSubjects, setPhotoboardEntries, language } = usePrompt();
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleAddSubject = async () => {
    if (!inputText.trim()) return;
    if (subjects.length >= 4) return;

    setIsTranslating(true);
    // Automatic translation to English for the global prompt
    const translatedText = await translateText(inputText.trim(), 'es', 'en');
    
    const newSubject = translatedText;
    const newSubjects = [...subjects, newSubject];
    setSubjects(newSubjects);
    setInputText('');
    setIsTranslating(false);

    // Update photoboard: Group all subjects into index 1
    setPhotoboardEntries((prev) => {
      const newEntries = [...prev];
      const subjectIcons = newSubjects.map((s, i) => `/assets/icons/i0${i + 1}.webp`);
      
      newEntries[1] = { 
        type: 'group',
        icons: subjectIcons,
        label: `${newSubjects.length} Sujetos`
      };
      return newEntries;
    });
  };

  return (
    <div className="phase-container animation-fade-in">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase2.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase2.subtitle')}</p>
      </div>

      <div className="instructions-container glass-container">
        <p>{t(language, 'phases.phase2.instructions')}</p>
      </div>

      <div className="input-section">
        <textarea 
          className="subject-textarea"
          placeholder={t(language, 'phases.phase2.placeholder')}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={subjects.length >= 4}
        />
        <button 
          className="btn-add-floating" 
          onClick={handleAddSubject}
          disabled={!inputText.trim() || subjects.length >= 4 || isTranslating}
        >
          {isTranslating ? <Loader2 size={30} className="animation-spin" /> : <Plus size={40} />}
        </button>
      </div>

      <div className="subjects-counter">
        {subjects.length} / 4 Sujetos
      </div>

      <div className="carousel-section">
        <ExampleCarousel 
          examples={PHASE2_EXAMPLES} 
          language={language} 
          onCopy={(text) => setInputText(text)}
        />
      </div>
    </div>
  );
}
