import React from 'react';
import ThreeBackground from './components/ThreeBackground';
import ChatPanel from './components/ChatPanel';

function App() {
  return (
    <>
      <ThreeBackground />
      <div id="app-container">
        <ChatPanel />
      </div>
    </>
  );
}

export default App;
