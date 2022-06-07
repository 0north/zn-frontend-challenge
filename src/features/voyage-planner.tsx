import React, { useEffect, useState } from "react";
import RouteMap from "./route-map";
import "./voyage-planner.css";
import { fetchPorts, setPorts, Port } from "../services/ports-reducer";
import { addPorts } from "../services/voyage-reducer";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import store, { RootState } from "../services/store";

interface VoyagePlannerParams {}

function VoyagePlanner(params: VoyagePlannerParams) {
  const [selectedPort, setSelectedPort] = useState("");
  const [addedPorts, setAddedPorts] = useState<Port[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPorts(0).then((resp: any) => {
      dispatch(setPorts(resp));
      setSelectedPort(resp[0].name);
    });
  }, []);

  const handleChange = (e: any) => {
    setSelectedPort(e.target.value);
  };

  const addVoyage = () => {
    const portTobeAdded = store
      .getState()
      .ports.ports.filter((el) => el.name === selectedPort);
    dispatch(addPorts(portTobeAdded[0]));
    setAddedPorts(store.getState().voyage.ports);
  };
  return (
    <div className="voyage-planner-container">
      <div className="voyage-route-container">
        <h2>Route Planner</h2>
        <div className="port-locator">
          <select id="port-select" value={selectedPort} onChange={handleChange}>
            {store.getState().ports.ports &&
              store.getState().ports.ports.map((item: Port, key: number) => {
                return (
                  <option id={key.toString()} key={key} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <button onClick={addVoyage}>+</button>
        </div>
        <div className="voyage-listing">
          <h2>Voyage</h2>
          {addedPorts &&
            addedPorts.map((item, key) => {
              return <div key={key}>{item.name}</div>;
            })}
        </div>
      </div>
      <div className="voyage-map-container">
        <h2>Route Map</h2>
        <RouteMap ports={addedPorts} />
      </div>
    </div>
  );
}
export default VoyagePlanner;
