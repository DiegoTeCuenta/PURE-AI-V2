import React, { createContext, useContext, useState } from 'react';

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
  // Global state across Phase 0 to 5
  const [currentPhase, setCurrentPhase] = useState(0);
  const [language, setLanguage] = useState(null); // 'en' | 'es'
  const [cameraStyle, setCameraStyle] = useState(null); // Phase 1: Style
  const [subjects, setSubjects] = useState([]); // Phase 2: Subjects array (max 4)
  const [actionLocation, setActionLocation] = useState(''); // Phase 3: Action/Location
  const [composition, setComposition] = useState(null); // Phase 4: Composition
  const [photoboardEntries, setPhotoboardEntries] = useState(new Array(8).fill(null)); // Fixed length 8

  const nextPhase = () => {
    setCurrentPhase((p) => Math.min(p + 1, 5));
    window.scrollTo(0, 0);
  };
  
  const prevPhase = () => {
    setCurrentPhase((p) => Math.max(p - 1, 1));
    window.scrollTo(0, 0);
  };
  
  const resetAll = () => {
    setCurrentPhase(0);
    setLanguage(null);
    setCameraStyle(null);
    setSubjects([]);
    setActionLocation('');
    setComposition(null);
    setPhotoboardEntries(new Array(8).fill(null));
  };

  const value = {
    currentPhase, nextPhase, prevPhase, resetAll, setCurrentPhase,
    language, setLanguage,
    cameraStyle, setCameraStyle,
    subjects, setSubjects,
    actionLocation, setActionLocation,
    composition, setComposition,
    photoboardEntries, setPhotoboardEntries
  };

  return (
    <PromptContext.Provider value={value}>
      {children}
    </PromptContext.Provider>
  );
};
