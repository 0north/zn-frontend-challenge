import React, { useEffect, useState } from 'react';
import './App.css';
import VoyagePlanner from './features/voyage-planner'
import { useAppSelector, useAppDispatch } from './services/hooks'
import { fetchPorts, addPorts } from './services/ports-reducer';

function App() {
  const ports = useAppSelector(state => state.ports)
  const voyage = useAppSelector(state => state.voyage)
  const dispatch = useAppDispatch()
  const [offset, setOffset] = useState(-1)

  useEffect(() => {
    async function fetchPortsData() {
      if (ports.offset !== offset) {
        setOffset(ports.offset)
        await fetchPorts(ports.offset)
          .then(response => dispatch(addPorts(response)))
          .catch(err => console.log(err))
      }
    }
    fetchPortsData()
  }, [ports.offset, dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <img src={"/zero_north_logo_green.png"} className="App-logo" alt="ZeroNorth" />
      </header>
      <VoyagePlanner ports={ports.ports} voyage={voyage}/>
    </div>
  );
}

export default App;