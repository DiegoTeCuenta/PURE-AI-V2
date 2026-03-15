export const translations = {
  // Global Navigation
  nav: {
    next: { es: 'SIGUIENTE', en: 'NEXT' },
    prev: { es: 'ANTERIOR', en: 'PREVIOUS' },
    reset: { es: 'RESET', en: 'RESET' },
    finish: { es: 'GENERAR PROMPT FINAL', en: 'GENERATE FINAL PROMPT' },
    startOver: { es: 'INICIAR DE NUEVO', en: 'START OVER' }
  },

  // Layout & Global Components
  topBar: {
    title: { es: 'PURE AI REALITY', en: 'PURE AI REALITY' },
    phase: { es: 'FASE', en: 'PHASE' },
  },
  sidebar: {
    finalOutput: { es: 'Output Final', en: 'Final Output' },
    copyPrompt: { es: 'COPIAR PROMPT', en: 'COPY PROMPT' },
    copied: { es: '¡Prompt copiado al portapapeles!', en: 'Prompt copied to clipboard!' },
    building: { es: 'Prompt en Construcción', en: 'Building Prompt' },
    placeholder: { es: 'Tu prompt se construirá aquí...', en: 'Your prompt will be built here...' }
  },
  lightTable: {
    title: { es: 'Storyboard / Mesa de Luz', en: 'Storyboard / Light Table' },
    slides: { es: 'SLIDES', en: 'SLIDES' },
    types: {
      camera: { es: 'CÁMARA', en: 'CAMERA' },
      protagonist: { es: 'PROTAGONISTA', en: 'PROTAGONIST' },
      subject: { es: 'SUJETO', en: 'SUBJECT' },
      lab: { es: 'LABORATORIO', en: 'LABORATORY' },
      wardrobe: { es: 'VESTUARIO', en: 'WARDROBE' },
      location: { es: 'LOCACIÓN', en: 'LOCATION' },
      lighting: { es: 'ILUMINACIÓN', en: 'LIGHTING' },
      framing: { es: 'ENCUADRE', en: 'FRAMING' },
      angle: { es: 'ÁNGULO', en: 'ANGLE' }
    },
    labels: {
      dna: { es: 'Estructura ADN', en: 'DNA Structure' },
      action: { es: 'Acción y Ropa', en: 'Action & Clothes' },
      set: { es: 'Set', en: 'Set' },
      light: { es: 'Luz', en: 'Light' }
    }
  },

  // Phases
  phases: {
    phase1: {
      title: { es: 'Estilo de Fotografía', en: 'Photography Style' },
      subtitle: { es: 'Selecciona el estilo base de tu fotografía.', en: 'Select the base style for your photography.' },
      styles: {
        smartphone: {
          label: { es: 'Smartphone (Real)', en: 'Smartphone (Real)' },
          desc: { es: 'Look amateur, crudo, sin filtros.', en: 'Amateur look, raw, no filters.' }
        },
        selfieMirror: {
          label: { es: 'Smartphone (Espejo)', en: 'Smartphone (Mirror)' },
          desc: { es: 'Reflejo en un espejo con el brazo visible.', en: 'Reflection in a mirror with visible arm.' }
        },
        selfieFront: {
          label: { es: 'Smartphone (Selfie)', en: 'Smartphone (Selfie)' },
          desc: { es: 'Cámara frontal, perspectiva distorsionada leve.', en: 'Front camera, slight distorted perspective.' }
        },
        editorial: {
          label: { es: 'Editorial (DSLR)', en: 'Editorial (DSLR)' },
          desc: { es: 'Look de revista, iluminación de estudio perfecta.', en: 'Magazine look, perfect studio lighting.' }
        },
        cinematic: {
          label: { es: 'Cinematic Film Still', en: 'Cinematic Film Still' },
          desc: { es: 'Fotograma de película, anamórfico, color grading 35mm.', en: 'Movie still, anamorphic, 35mm color grading.' }
        },
        documentary: {
          label: { es: 'Documentary', en: 'Documentary' },
          desc: { es: 'Realismo crudo, fotoperiodismo.', en: 'Raw realism, photojournalism.' }
        }
      }
    },
    phase2: {
      title: { es: 'Sujetos', en: 'Subjects' },
      subtitle: { es: '¿Quién o quienes aparecen en la foto?', en: 'Who or what appear in the photo?' },
      instructions: {
        es: 'Describe a detalle cada personaje que sale en la fotografía. Puedes ser animales personajes fantásticos u objetos. Puedes incluir hasta un máximo de 4 personajes. te sugerimos la siguiente estructura: (persona, edad, características físicas, vestimenta). Los ejemplos de abajo pueden ayudarte y darte ideas. Debes presionar el botón \'+\' cuando termines la descripción de cada personaje.',
        en: 'Describe each character in the photograph in detail. They can be animals, fantastic characters, or objects. You can include up to 4 characters. We suggest the following structure: (person, age, physical characteristics, clothing). The examples below can help you and give you ideas. You must press the \'+\' button when you finish the description of each character.'
      },
      placeholder: { es: 'Describe aquí un sujeto...', en: 'Describe a subject here...' }
    },
    phase3: {
      title: { es: 'Acción/Lugar/Momento', en: 'Action/Place/Moment' },
      subtitle: { es: '¿Qué están haciendo los que aparecen en la foto, dónde y cuándo?', en: 'What are the people in the photo doing, where and when?' },
      instructions: {
        es: 'Describe la acción, cuéntame como interactúan los personajes que salen en la fotografía, y dónde ocurre la acción y en qué momento del día. te sugerimos la siguiente estructura: (acción, lugar, momento del día). Los ejemplos de abajo pueden ayudarte y darte ideas. Debes presionar el botón \'+\' cuando termines la descripción.',
        en: 'Describe the action, tell me how the characters in the photograph interact, and where the action takes place and at what time of day. We suggest the following structure: (action, place, time of day). The examples below can help you and give you ideas. You must press the \'+\' button when you finish the description.'
      },
      placeholder: { es: 'Describe aquí la acción...', en: 'Describe the action here...' }
    },
    phase4: {
      title: { es: 'Composición fotográfica', en: 'Photographic Composition' },
      subtitle: { es: 'Selecciona el encuadre y ángulo para tu toma final.', en: 'Select the framing and angle for your final shot.' },
      framing: {
        full: { label: { es: 'Full shot', en: 'Full shot' } },
        medium: { label: { es: 'Medium shot', en: 'Medium shot' } },
        close: { label: { es: 'Close-up', en: 'Close-up' } },
        wide: { label: { es: 'Ultra wide', en: 'Ultra wide' } }
      },
      angle: {
        eye: { label: { es: 'Eye Level', en: 'Eye Level' } },
        low: { label: { es: 'Low angle', en: 'Low angle' } },
        high: { label: { es: 'High angle', en: 'High angle' } },
        dutch: { label: { es: 'Dutch angle', en: 'Dutch angle' } }
      }
    },
    phase5: {
      title: { es: 'Output', en: 'Output' },
      subtitle: { es: 'Prompt Generado', en: 'Generated Prompt' },
      copy: { es: 'COPIAR PROMPT', en: 'COPY PROMPT' },
      reset: { es: 'RESET / EMPEZAR DE NUEVO', en: 'RESET / START OVER' },
      placeholder: { es: 'Generación de imagen próximamente...', en: 'Image generation coming soon...' }
    }
  }
};

export const t = (lang, path) => {
  const keys = path.split('.');
  let current = translations;
  for (const key of keys) {
    if (current[key] === undefined) return path;
    current = current[key];
  }
  return current[lang] || current['es'] || path;
};
