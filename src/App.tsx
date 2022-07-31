import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VoyagePlanner from './features/voyage-planner'
import { useAppSelector, useAppDispatch } from './services/hooks'
import { fetchPorts, Port } from './services/ports-reducer';

function App() {
  const state = useAppSelector(state => state.ports)

  return (
    <div className="App">
      <header className="App-header">
        <img src={"/zero_north_logo_green.png"} className="App-logo" alt="ZeroNorth" />
      </header>
      <VoyagePlanner ports={state.ports}/>
    </div>
  );
}

export default App;