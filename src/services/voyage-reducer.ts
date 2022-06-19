import { AnyAction } from "redux"
import { Port } from "./ports-reducer"
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

export interface AddPortAction {
    type: 'ADDPORTACTION'
    port: Port
}
export interface movePortAction {
    type: 'MOVEPORTACTION'
    port: Port
    newPosition: number
}

export const addPorts = (port: Port): AddPortAction => {
    return { type: 'ADDPORTACTION', port }
}
export const movePorts = (port: Port, newPosition: number): movePortAction => {
    return { type: 'MOVEPORTACTION', port, newPosition }
}

export function voyageReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case 'ADDPORTACTION':
            const currentPorts = state.ports;
            return { ...state, ports: [...currentPorts, action.port] }
        case 'MOVEPORTACTION':
            return { ...state, ports: state.ports, newPosition: action.port }
        default:
            return { ...state }
    }
}


export function addPort(port: Port) { }
export function removePort(port: Port) { }
export function movePort(port: Port, newPosition: number) { }
