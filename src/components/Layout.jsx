import React, { useEffect, useRef } from 'react';
import { usePrompt } from '../context/PromptContext';
import TopBar from './TopBar';
import WizardNavigation from './WizardNavigation';
import Photoboard from './Photoboard';
import './Layout.css';

export default function Layout({ children }) {
  const { currentPhase } = usePrompt();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentPhase]);

  return (
    <div className="layout-root">
      <TopBar />
      
      <main className="layout-main" ref={scrollRef}>
        <div className="layout-content">
          {children}
        </div>
        
        {/* Navigation is part of the layout flow but pushes content up */}
        <WizardNavigation />
      </main>

      {/* Photoboard is absolute bottom */}
      <Photoboard />
    </div>
  );
}
