import React from 'react';
import './App.css';
import VoyagePlanner from './features/voyage-planner'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={"/zero_north_logo_green.png"} className="App-logo" alt="ZeroNorth" />
      </header>
      <VoyagePlanner/>
    </div>
  );
}

export default App;
