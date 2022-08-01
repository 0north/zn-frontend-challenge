import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import VoyagePlanner from './features/voyage-planner'
import { useAppSelector, useAppDispatch } from './services/hooks'
import { fetchPorts, addPorts } from './services/ports-reducer';
import { OFFSET_INCREASE } from './services/ports-reducer';

function App() {
  const ports = useAppSelector(state => state.ports)
  const voyage = useAppSelector(state => state.voyage)
  const dispatch = useAppDispatch()
  const [offset, setOffset] = useState(-1)

  const isMissingResults = useMemo(() => {
    const minNecessaryResults = Math.ceil(ports.count / OFFSET_INCREASE) * OFFSET_INCREASE - OFFSET_INCREASE
    return ports.offset > offset && ((ports.ports.length < minNecessaryResults) || ports.count === 0)
  }, [ports.ports, ports.count])

  useEffect(() => {
    async function fetchPortsData() {
      if (isMissingResults) {
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