import React, { createContext, useContext, useState } from 'react';

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
  // Global state across Phase 0 to 6
  const [currentPhase, setCurrentPhase] = useState(0);
  const [language, setLanguage] = useState(null); // 'en' | 'es'
  const [cameraStyle, setCameraStyle] = useState(null); // Now stores the entire camera object {id, label, prompt, img}
  const [subjects, setSubjects] = useState([]); // { id, name, type, isProtagonist, properties: {} }
  const [environment, setEnvironment] = useState({});
  const [composition, setComposition] = useState({});

  const nextPhase = () => setCurrentPhase((p) => Math.min(p + 1, 7));
  const prevPhase = () => setCurrentPhase((p) => Math.max(p - 1, 1));
  
  const resetAll = () => {
    setCurrentPhase(0);
    setLanguage(null);
    setCameraStyle(null);
    setSubjects([]);
    setEnvironment({});
    setComposition({});
  };

  const value = {
    currentPhase, nextPhase, prevPhase, resetAll,
    language, setLanguage,
    cameraStyle, setCameraStyle,
    subjects, setSubjects,
    environment, setEnvironment,
    composition, setComposition
  };

  return (
    <PromptContext.Provider value={value}>
      {children}
    </PromptContext.Provider>
  );
};
