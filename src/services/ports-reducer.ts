/**
 * Redux store for the Ports data.  Ports represent a geographical location
 * where a vessel may travel to
 */

import { AnyAction } from "redux"

export interface Port {
    uncode: string,
    name: string,
    lat: number,
    lon: number
}

interface PortsState {
    count: number,
    offset: number,
    ports: Port[]
}

const initialState: PortsState = {
    count: 0,
    offset: 0,
    ports: []
}

/**
 * TODO: implement the reducer function to manage the list of ports
 * within the redux store
 * @param state 
 * @param action 
 * @returns PortsState
 */
export function portsReducer(state = initialState, action: AnyAction): PortsState{

    return state
}

/**
 * TODO: implement the fetchPorts function to retrieve the ports data
 * from the API.  Note: the API returns at most 10 ports per API call
 * so you may need multiple calls to fetch all the data
 * @param offset: where to start pulling from
 */
export function fetchPorts(offset: number){}



