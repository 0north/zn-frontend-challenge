import React, { useMemo } from 'react'
import RouteMap from "./route-map"
import "./voyage-planner.css"
import { useAppDispatch } from '../services/hooks'
import { Port } from '../services/ports-reducer';
import Typeahead from '../components/Typeahead/typeahead';
import { addPort } from '../services/voyage-reducer'
import VoyagePort from '../components/VoyagePort/voyage-port';
import { calculateEtaToNextPort } from '../helpers/maps';
import { formatTime } from '../helpers/time'

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
        return ports.filter((port: Port) => !voyage.ports.includes(port)).map(port => {
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

    const duration = useMemo(() => {
        const durationInMs = voyage.duration * 60 * 60 * 1000
        return formatTime(durationInMs)
    }, [voyage.duration])

    return (
        <div className="voyage-planner-container">
            <div className="voyage-route-container">
                <h2>Route Planner</h2>
                <div className="port-locator">
                    <Typeahead options={portOptions} selectOption={selectPort}/>
                </div>
                <div className="voyage-listing">
                    <h2>Voyage</h2>
                    <p>Total travel duration: {duration}</p>
                    <ol className="port-list">
                        {
                            voyage.ports.map((port: Port) => 
                                <VoyagePort port={port} eta={calculateEtaToNextPort(voyage.ports, port)}/>
                            )
                        }
                    </ol>
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
