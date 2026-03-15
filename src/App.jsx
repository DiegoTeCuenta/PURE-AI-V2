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

function AppRouter() {
  const { currentPhase } = usePrompt();
  
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
