import React, { useState, useEffect } from 'react';
import { usePrompt } from '../context/PromptContext';
import { t } from '../translations';
import { Copy, RefreshCw } from 'lucide-react';
import './Phase5.css';

export default function Phase5() {
  const { 
    cameraStyle, subjects, actionLocation, composition, 
    resetAll, language 
  } = usePrompt();
  
  const [finalPrompt, setFinalPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Hidden keywords for realism
    const qualityKeywords = "RAW photo, highly detailed, 8k uhd, dslr, soft lighting, high quality, photorealistic";
    
    // Construct prompt components
    const stylePart = cameraStyle?.prompt || '';
    const subjectsPart = subjects.length > 0 ? `Subjects: ${subjects.join(', ')}` : '';
    const actionPart = actionLocation ? `${actionLocation}` : '';
    
    // Composition mapping
    const framingMap = {
      full: 'full body shot',
      medium: 'medium shot',
      close: 'close up',
      wide: 'ultra wide angle'
    };
    const angleMap = {
      eye: 'eye-level view',
      low: 'low angle view',
      high: 'high angle view',
      dutch: 'dutch angle'
    };

    const framingPart = composition?.framing ? framingMap[composition.framing] : '';
    const anglePart = composition?.angle ? angleMap[composition.angle] : '';
    
    const compPart = [framingPart, anglePart].filter(Boolean).join(', ');

    // Assemble components
    const assembled = [
      stylePart,
      subjectsPart,
      actionPart,
      compPart,
      qualityKeywords
    ].filter(Boolean).join('. ');

    setFinalPrompt(assembled);
  }, [cameraStyle, subjects, actionLocation, composition]);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="phase-container animation-fade-in output-container">
      <div className="phase-header">
        <h1 className="phase-title">{t(language, 'phases.phase5.title')}</h1>
        <p className="phase-subtitle">{t(language, 'phases.phase5.subtitle')}</p>
      </div>

      <div className="prompt-display glass-container">
        <textarea 
          className="final-prompt-area" 
          value={finalPrompt} 
          readOnly 
        />
        <div className="prompt-actions">
          <button className="btn-action copy" onClick={handleCopy}>
            <Copy size={20} />
            {copied ? t(language, 'sidebar.copied') : t(language, 'phases.phase5.copy')}
          </button>
          <button className="btn-action reset" onClick={resetAll}>
            <RefreshCw size={20} />
            {t(language, 'phases.phase5.reset')}
          </button>
        </div>
      </div>

      <div className="image-placeholder-frame">
        <div className="placeholder-content">
          <p>{t(language, 'phases.phase5.placeholder')}</p>
        </div>
      </div>
    </div>
  );
}
