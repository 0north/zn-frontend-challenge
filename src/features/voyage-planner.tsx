import React from 'react'
import RouteMap from "./route-map"
import "./voyage-planner.css"

interface VoyagePlannerParams{

}

function VoyagePlanner(params: VoyagePlannerParams){

    return (
        <div className="voyage-planner-container">
            <div className="voyage-route-container">
                <h2>Route Planner</h2>
                <div className="port-locator">
                    <select id="port-select"/> <button>+</button>
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
