import React from 'react'
import { Port } from '../../services/ports-reducer'

interface VoyagePortParams {
    port: Port,
    eta: number | Date
}

function VoyagePort({ port, eta }: VoyagePortParams) {
    return (
        <li className="voyage-port__container">
            <p key={port.uncode + port.name}>{port.name}<br/>
            <small>{`ETA: ${eta}`}</small>
            </p>
        </li>
    )
}
export default VoyagePort
