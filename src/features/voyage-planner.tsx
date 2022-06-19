import React, { useEffect, useState } from "react";
import RouteMap from "./route-map";
import "./voyage-planner.css";
import { fetchPorts, setPorts, Port } from "../services/ports-reducer";
import { addPorts, VESSEL_SPEED_KNPH } from "../services/voyage-reducer";
import { useAppDispatch, useAppSelector } from "../services/hooks";
import store, { RootState } from "../services/store";

interface VoyagePlannerParams {}

function VoyagePlanner(params: VoyagePlannerParams) {
  const [selectedPort, setSelectedPort] = useState("");
  const [rerender, setRerender] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [offset, setOffset] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchPorts(offset).then((resp: any) => {
      dispatch(setPorts(resp));
      setOffset(offset + resp.length);
      setSelectedPort(store.getState().ports.ports[0].name);
    });
  }, [offset]);

  useEffect(() => {
    if (store.getState().voyage.ports && store.getState().voyage.ports.length) {
      const ports: any[] = store.getState().voyage.ports;
      let dist: number = 0;
      ports.forEach((port: any, index: number) => {
        if (index < ports.length - 1) {
          dist += getDistance(port, ports[index + 1]);
          dist = Math.round((dist + Number.EPSILON) * 100) / 100;
        }
      });
      setDistance(dist);
      const time: number =
        Math.round((dist / VESSEL_SPEED_KNPH + Number.EPSILON) * 100) / 100;
      setTime(time);
    }
  }, [store.getState().voyage.ports, store.getState().voyage.ports.length]);

  const getDistance = (port1: any, port2: any) => {
    const val: number = Math.PI / 180;
    let lat1: number = port1.lat * val;
    let long1: number = port1.lng * val;
    let lat2: number = port2.lat * val;
    let long2: number = port2.lng * val;

    let dist: number = Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(long1 - long2)
    );
    //assuming ellipse is sphere
    dist = dist * (180 / Math.PI) * 60;
    return dist;
  };

  const handleChange = (e: any) => {
    setSelectedPort(e.target.value);
    setRerender(false);
  };

  const addVoyage = () => {
    const portTobeAdded =
      store.getState().ports.ports &&
      store
        .getState()
        .ports.ports.filter((item: Port) => item.name === selectedPort);
    dispatch(addPorts(portTobeAdded[0]));
    setRerender(true);
  };
  return (
    <div className='voyage-planner-container'>
      <div className='voyage-route-container'>
        <h2>Route Planner</h2>
        <div className='port-locator'>
          <select id='port-select' value={selectedPort} onChange={handleChange}>
            {store.getState().ports.ports &&
              store.getState().ports.ports.map((item: Port, key: number) => {
                return (
                  <option id={key.toString()} key={key} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
          </select>
          <button onClick={addVoyage}>Add</button>
        </div>
        <div className='voyage-listing'>
          <h2>Voyage</h2>
          {store.getState().voyage.ports &&
            store.getState().voyage.ports.map((item, key) => {
              return <li key={key}>{item.name}</li>;
            })}
        </div>
        <div className='distance-time'>
          <h4>
            Distance: <span>{distance}</span>
          </h4>
          <h4>
            Estimated Time:
            <span>{time}</span>
          </h4>
        </div>
      </div>
      <div className='voyage-map-container'>
        <h2>Route Map</h2>
        <RouteMap ports={store.getState().voyage.ports} />
      </div>
    </div>
  );
}
export default VoyagePlanner;
