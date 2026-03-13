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
    success: {
      title: { es: '¡PROMPT GENERADO!', en: 'PROMPT GENERATED!' },
      subtitle: { es: 'Copia y pega tu prompt desde la barra lateral.', en: 'Copy and paste your prompt from the sidebar.' }
    },
    phase1: {
      title: { es: 'Cámara y Estilo', en: 'Camera & Style' },
      subtitle: { es: 'Selecciona el estilo base de tu fotografía.', en: 'Select the base style for your photography.' },
      styles: {
        smartphone: {
          label: { es: 'Smartphone (Real)', en: 'Smartphone (Real)' },
          desc: { es: 'Look amateur, crudo, sin filtros.', en: 'Amateur look, raw, no filters.' }
        },
        selfieMirror: {
          label: { es: 'Selfie (Espejo)', en: 'Selfie (Mirror)' },
          desc: { es: 'Reflejo en un espejo con el brazo visible.', en: 'Reflection in a mirror with visible arm.' }
        },
        selfieFront: {
          label: { es: 'Selfie (Cámara Frontal)', en: 'Selfie (Front Camera)' },
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
      subtitle: { es: 'Elige quién o qué aparecerá en escena (Máx 4).', en: 'Choose who or what will appear in the scene (Max 4).' },
      tabs: {
        human: { es: 'HUMANOS', en: 'HUMANS' },
        animal: { es: 'ANIMALES', en: 'ANIMALS' },
        creature: { es: 'CRIATURAS', en: 'CREATURES' },
        object: { es: 'OBJETOS', en: 'OBJECTS' },
        other: { es: 'OTROS', en: 'OTHERS' }
      },
      selectProtagonist: { es: '★ MARCAR COMO PROTAGONISTA', en: '★ MARK AS PROTAGONIST' },
      isProtagonist: { es: 'PROTAGONISTA PRINCIPAL', en: 'MAIN PROTAGONIST' },
      limitReached: { es: 'Has alcanzado el límite de 4 sujetos.', en: 'You have reached the limit of 4 subjects.' },
      subjects: {
        h1: { es: 'Hombre Joven', en: 'Young Man' },
        h2: { es: 'Mujer Joven', en: 'Young Woman' },
        h3: { es: 'Hombre Mayor', en: 'Older Man' },
        h4: { es: 'Mujer Mayor', en: 'Older Woman' },
        h5: { es: 'Niño', en: 'Boy' },
        h6: { es: 'Niña', en: 'Girl' },
        a1: { es: 'Perro', en: 'Dog' },
        a2: { es: 'Gato', en: 'Cat' },
        a3: { es: 'Caballo', en: 'Horse' },
        c1: { es: 'Alien', en: 'Alien' },
        c2: { es: 'Robot/Cyborg', en: 'Robot/Cyborg' },
        c3: { es: 'Elfo/Fantasía', en: 'Elf/Fantasy' },
        o1: { es: 'Vehículo', en: 'Vehicle' },
        o2: { es: 'Arma/Prop', en: 'Weapon/Prop' },
        o3: { es: 'Joya/Artefacto', en: 'Jewel/Artifact' }
      }
    },
    phase3: {
      title: { es: 'Laboratorio ADN', en: 'DNA Laboratory' },
      subtitle: { es: 'Modifica la estructura física y genética de tus sujetos.', en: 'Modify the physical and genetic structure of your subjects.' },
      noSubjects: { es: 'Vuelve a la Fase 2 y selecciona al menos un sujeto.', en: 'Go back to Phase 2 and select at least one subject.' },
      nonHumanPlaceholder: { es: 'Describe los detalles visuales de este elemento...', en: 'Describe the visual details of this element...' },
      build: { es: 'COMPLEXIÓN / BUILD', en: 'COMPLEXION / BUILD' },
      ethnicity: { es: 'ETNIA / ETHNICITY', en: 'ETHNICITY' },
      eyes: { es: 'OJOS / EYES', en: 'EYES' },
      hair: { es: 'CABELLO / HAIR', en: 'HAIR' },
      customDNA: { es: 'ADN Personalizado / Custom DNA', en: 'Custom DNA' },
      customHolder: { es: 'Ej: Pecas rojas, cicatriz en el ojo...', en: 'Ex: Red freckles, scar on eye...' },
      builds: {
        slim: { es: 'Delgado', en: 'Slim' },
        athletic: { es: 'Atlético', en: 'Athletic' },
        muscular: { es: 'Musculoso', en: 'Muscular' },
        curvy: { es: 'Curvy', en: 'Curvy' },
        plusSize: { es: 'Plus Size', en: 'Plus Size' }
      },
      ethnicities: {
        caucasian: { es: 'Caucásico', en: 'Caucasian' },
        afro: { es: 'Afro', en: 'Afro' },
        asian: { es: 'Asiático', en: 'Asian' },
        latino: { es: 'Latino', en: 'Latino' },
        pale: { es: 'Pálido', en: 'Pale' },
        tanned: { es: 'Bronceado', en: 'Tanned' }
      }
    },
    phase4: {
      title: { es: 'Acción y Vestuario', en: 'Action & Wardrobe' },
      subtitle: { es: 'Viste a tus sujetos y dales vida.', en: 'Dress your subjects and bring them to life.' },
      interaction: { es: 'INTERACCIÓN GLOBAL', en: 'GLOBAL INTERACTION' },
      interactionHolder: { es: 'Ej: Sujeto 1 está abrazando al Sujeto 2...', en: 'Ex: Subject 1 is hugging Subject 2...' },
      clothing: { es: 'ROPA / CLOTHING', en: 'WARDROBE / CLOTHING' },
      clothingHolder: { es: 'Ej: Abrigo cyberpunk de cuero negro...', en: 'Ex: Black leather cyberpunk jacket...' },
      action: { es: 'ACCIÓN / ACTION', en: 'ACTION' },
      actionHolder: { es: 'Ej: Bebiendo café mirando a la cámara...', en: 'Ex: Drinking coffee looking at camera...' },
      expression: { es: 'EXPRESIÓN / EXPRESSION', en: 'EXPRESSION' },
      expressionHolder: { es: 'Ej: Sonrisa melancólica...', en: 'Ex: Melancholic smile...' }
    },
    phase5: {
      title: { es: 'Set y Ambiente', en: 'Set & Environment' },
      subtitle: { es: 'Construye el mundo a su alrededor: Locación, Luz y Clima.', en: 'Build the world around them: Location, Light & Weather.' },
      locTitle: { es: '1. Locación Base', en: '1. Base Location' },
      locHolder: { es: 'O escribe tu propia locación detallada...', en: 'Or write your own detailed location...' },
      lightTitle: { es: '2. Iluminación', en: '2. Lighting' },
      lightHolder: { es: 'Ej: Intensidad alta, luz cenital dura...', en: 'Ex: High intensity, hard overhead light...' },
      extraTitle: { es: '3. Extras y Clima (Opcional)', en: '3. Extras & Weather (Optional)' },
      locations: {
        l1: { es: 'Estudio Fotográfico', en: 'Photography Studio' },
        l2: { es: 'Calle Neón / Cyberpunk', en: 'Neon Street / Cyberpunk' },
        l3: { es: 'Bosque Profundo', en: 'Deep Forest' },
        l4: { es: 'Mansión Lujosa', en: 'Luxurious Mansion' },
        l5: { es: 'Nave Espacial', en: 'Spaceship' },
        l6: { es: 'Fondo Neutro', en: 'Neutral Background' }
      },
      lighting: {
        day: { es: 'Día Natural', en: 'Natural Day' },
        sunset: { es: 'Atardecer (Sunset)', en: 'Sunset' },
        blueHour: { es: 'Blue Hour', en: 'Blue Hour' },
        night: { es: 'Noche', en: 'Night' },
        artificial: { es: 'Luz Artificial', en: 'Artificial Light' }
      },
      extras: {
        fog: { es: 'Niebla Volumétrica', en: 'Volumetric Fog' },
        rain: { es: 'Lluvia Fuerte', en: 'Heavy Rain' },
        dust: { es: 'Polvo/Partículas Flotando', en: 'Floating Dust/Particles' },
        lens: { es: 'Destellos de Lente (Lens Flare)', en: 'Lens Flares' },
        smoke: { es: 'Humo Sutil', en: 'Subtle Smoke' }
      }
    },
    phase6: {
      title: { es: 'Composición y Fotografía', en: 'Composition & Photography' },
      subtitle: { es: 'Selecciona el encuadre y ángulo para tu toma final.', en: 'Select the framing and angle for your final shot.' },
      framing: { es: 'Encuadre', en: 'Framing' },
      angle: { es: 'Ángulo', en: 'Angle' },
      advanced: { es: 'Fotografía Avanzada (Opcional)', en: 'Advanced Photography (Optional)' },
      advHolder: { es: 'Ej: Lente 85mm, f/1.8, grain película 35mm ISO 400...', en: 'Ex: 85mm lens, f/1.8, 35mm film grain ISO 400...' }
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
