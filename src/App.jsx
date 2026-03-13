import React from 'react';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import { usePrompt } from './context/PromptContext';
import Phase1 from './pages/Phase1';
import Phase2 from './pages/Phase2';
import Phase3 from './pages/Phase3';
import Phase4 from './pages/Phase4';
import Phase5 from './pages/Phase5';
import Phase6 from './pages/Phase6';

// Placeholder for other phases until they are built
const PhasePlaceholder = () => {
  const { currentPhase, nextPhase, prevPhase } = usePrompt();
  return (
    <div>
      <h2 style={{color: 'white', fontFamily: 'Outfit'}}>Fase {currentPhase} en construcción...</h2>
      <div className="phase-navigation">
        <button className="btn-nav prev" onClick={prevPhase}>ANTERIOR</button>
        <button className="btn-nav next" onClick={nextPhase}>SIGUIENTE</button>
      </div>
    </div>
  );
};

// Internal wrapper to access context correctly for routing
import { t } from './translations';

function AppRouter() {
  const { currentPhase, language } = usePrompt();
  
  if (currentPhase === 0) {
    return <Welcome />;
  }

  return (
    <Layout>
      {currentPhase === 1 && <Phase1 />}
      {currentPhase === 2 && <Phase2 />}
      {currentPhase === 3 && <Phase3 />}
      {currentPhase === 4 && <Phase4 />}
      {currentPhase === 5 && <Phase5 />}
      {currentPhase === 6 && <Phase6 />}
      {currentPhase >= 7 && (
        <div className="phase-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <h1 style={{color: 'var(--neon-blue)', fontSize: '3rem', fontFamily: 'Outfit', textShadow: '0 0 20px var(--neon-blue)', marginBottom: '1rem'}}>
            {t(language, 'phases.success.title')}
          </h1>
          <p style={{color: '#a0aec0', fontSize: '1.2rem'}}>{t(language, 'phases.success.subtitle')}</p>
          <button 
            className="btn-nav prev" 
            style={{marginTop: '3rem', padding: '10px 30px'}}
            onClick={() => window.location.reload()}
          >
            {t(language, 'nav.startOver')}
          </button>
        </div>
      )}
    </Layout>
  );
}

// Ensure context is available for AppRouter
import { PromptProvider } from './context/PromptContext';
function App() {
  return (
    <PromptProvider>
      <AppRouter />
    </PromptProvider>
  );
}

export default App;
