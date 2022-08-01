import React, { useMemo } from 'react'
import RouteMap from "./route-map"
import "./voyage-planner.css"
import { useAppDispatch } from '../services/hooks'
import { Port } from '../services/ports-reducer';
import Typeahead from '../components/typeahead';
import { addPort } from '../services/voyage-reducer'

interface VoyagePlannerParams{
    ports: Port[],
    voyage: {
        ports: Port[],
        duration: number
    }
}

function VoyagePlanner({ports, voyage}: VoyagePlannerParams){
    const dispatch = useAppDispatch()

    const portOptions = useMemo(() => {
        return ports.map(port => {
            return {
                value: port.uncode,
                name: port.name
        }
    })
    }, [ports])

    const selectPort = (value: string) => {
        const port = ports.find((port: Port) => port.uncode === value)
        if (port) {
            dispatch(addPort(port, voyage.ports))
        }
    }

    return (
        <div className="voyage-planner-container">
            <div className="voyage-route-container">
                <h2>Route Planner</h2>
                <div className="port-locator">
                    <Typeahead options={portOptions} selectOption={selectPort}/>
                </div>
                <div className="voyage-listing">
                        <h2>Voyage</h2>
                        {
                            voyage.ports.map((port: Port) => 
                                <p key={port.uncode+port.name}>{port.name}</p>
                            )
                        }
                </div>
            </div>
            <div className="voyage-map-container">
                <h2>Route Map</h2>
                <RouteMap ports={voyage.ports}/>
            </div>

        </div>
    )
}
export default VoyagePlanner
