import { AnyAction } from "redux"
import { Port } from "./ports-reducer"
import { calculateDistance } from '../helpers/maps'
import { round } from '../helpers/numbers'
/**
 * This file controls the state of the "voyage" data.  A voyage consists of 0 or more
 * stops in a port.  You should calculate the total duration of the voyage as ports
 * are added by using the lat/lon of the port location and the VESSEL_SPEED_KNPH constant
 * for speed.  For the purpose of calculating distance, assume that the vessel can travel
 * in a straight line between ports (pretend it is a blimp).
 */


//Vessel speed in natical miles per hour
export const VESSEL_SPEED_KNPH = 10.0

interface VoyageState {
    //The total duration of the voyage in milliseconds
    duration: number,

    //ordered list of ports the vessel will stop at
    ports: Port[]
}

 
const initialState: VoyageState = {
    duration: 0,
    ports: []
 }

 
 export function voyageReducer(state = initialState, action: AnyAction){
    const { type, payload } = action
    switch(type) {
        case 'ADD_PORT':
            return {
                ...state,
                ports: [...state.ports, payload.port ],
                duration: state.duration + payload.duration
            }
        default:
            return state
    }
 }

 export function addPort(port: Port, ports: Port[]){
    let duration = 0
    if (ports.length > 0) {
        const lastPort = ports[ports.length - 1];
        const previous_position = {
            lat: lastPort.lat,
            lng: lastPort.lng
        }
        const next_position = {
            lat: port.lat,
            lng: port.lng
        }
        const distance = lastPort ? calculateDistance(previous_position, next_position) : 0;
        const exactDuration = distance / VESSEL_SPEED_KNPH;
        duration = round(exactDuration, 3)
    }
    return { type: 'ADD_PORT', payload: {
        duration,
        port
    }}
 }
 export function removePort(port: Port){}
 export function movePort(port: Port, newPosition: number){}
 