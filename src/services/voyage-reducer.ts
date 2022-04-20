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

 
 export function voyageReducer(state = initialState, action: AnyAction){
 
     return state
 }

 export function addPort(port: Port){}
 export function removePort(port: Port){}
 export function movePort(port: Port, newPosition: number){}
 