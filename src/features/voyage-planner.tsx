import React, { useEffect } from 'react'
import RouteMap from "./route-map"
import "./voyage-planner.css"
import { useAppSelector, useAppDispatch } from '../services/hooks'
import { fetchPorts } from '../services/ports-reducer';

interface VoyagePlannerParams{

}


function VoyagePlanner(params: VoyagePlannerParams){
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.ports)

    useEffect(() => {
        async function fetchPortsData() {
            if (state.ports.length <= state.count) {
                const response = fetchPorts(state.offset)
                const data = JSON.parse(response)
                data && dispatch({ type: 'ADD_PORTS', payload: data })
            }
        }
        fetchPortsData()
    }, [state, dispatch])

    return (
        <div className="voyage-planner-container">
            <div className="voyage-route-container">
                <h2>Route Planner</h2>
                <div className="port-locator">
                    <select id="port-select">
                    {
                        state.ports.map((port) => (
                            <option value={port.uncode}>{port.name}</option>
                        ))
                    }
                    </select>
                    <button>+</button>
                </div>
                <div className="voyage-listing">
                    <h2>Voyage</h2>
                </div>
            </div>
            <div className="voyage-map-container">
                <h2>Route Map</h2>
                <RouteMap ports={[]}/>
            </div>

        </div>
    )
}
export default VoyagePlanner
