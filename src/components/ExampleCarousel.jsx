import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import './ExampleCarousel.css';

const ExampleCarousel = ({ examples, language, onCopy }) => {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const itemsPerSet = 3;
  const totalSets = Math.max(1, Math.ceil(examples.length / itemsPerSet));

  useEffect(() => {
    if (totalSets <= 1) return;
    const interval = setInterval(() => {
      setActiveSetIndex((prev) => (prev + 1) % totalSets);
    }, 8000); // 8 seconds for readability
    return () => clearInterval(interval);
  }, [totalSets]);

  const currentSet = examples.slice(
    activeSetIndex * itemsPerSet,
    (activeSetIndex + 1) * itemsPerSet
  );

  const handleCopyAction = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    if (onCopy) onCopy(text);
    
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="example-carousel banner-fade">
      <div className="carousel-grid">
        {currentSet.map((ex, idx) => {
          const globalIdx = activeSetIndex * itemsPerSet + idx;
          const isCopied = copiedIndex === globalIdx;
          
          return (
            <div key={`${activeSetIndex}-${idx}`} className="carousel-item animation-fade-in">
              <div className="example-img-container">
                <img src={ex.img} alt="example" />
                <button 
                  className={`btn-copy-overlay ${isCopied ? 'copied' : ''}`}
                  onClick={() => handleCopyAction(ex.desc[language] || ex.desc['es'], globalIdx)}
                  title="Copiar texto"
                >
                  {isCopied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <p className="example-desc">{ex.desc[language] || ex.desc['es']}</p>
            </div>
          );
        })}
      </div>
      {totalSets > 1 && (
        <div className="carousel-indicators">
          {Array.from({ length: totalSets }).map((_, i) => (
            <div key={i} className={`indicator-dot ${i === activeSetIndex ? 'active' : ''}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExampleCarousel;
