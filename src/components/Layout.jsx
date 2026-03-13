import React, { useEffect, useRef } from 'react';
import { usePrompt } from '../context/PromptContext';
import TopBar from './TopBar';
import LivePromptSidebar from './LivePromptSidebar';
import LightTable from './LightTable';
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
      
      {/* Main Content Area (Left side) */}
      <main className="layout-main">
          <TopBar />
          
          <div className="layout-content-scrollable" ref={scrollRef}>
            {children}
          </div>
          
        </main>
        
        {/* Right Sidebar (Always Visible) */}
        <div className="layout-sidebar">
          <LivePromptSidebar />
        </div>

      {/* Bottom Light Table (Always Visible) */}
      <LightTable />
    </div>
  );
}
