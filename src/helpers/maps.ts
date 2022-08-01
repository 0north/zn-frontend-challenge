interface Position { 
    lat: number,
    lng: number
}
export function calculateDistance (mk1: Position, mk2: Position): number {
    // calculates distance in miles between two points on the map
    // assumes that both parameters are objects of type
    // { lat: number, lng: numnber }
    const MILES_TO_NAUTICAL_MILES = 0.8689762
    const R = 3958.8; // Radius of the Earth in miles
    const rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    const rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    const difflat = rlat2-rlat1; // Radian difference (latitudes)
    const difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d * MILES_TO_NAUTICAL_MILES;
}