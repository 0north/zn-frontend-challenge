import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    fetch("http://api.zeronorth.app/api/v1/ports?page=1&size=100")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-[200px]">
        <div className="flex">
          <select defaultValue="" className="w-[200px]">
            <option value="" disabled>
              Select a port
            </option>
          </select>
          <button className="px-2 py-1 rounded-md">+</button>
        </div>
        <h2>Voyage:</h2>
      </div>
      <div className="w-full">
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultZoom={3}
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
          />
        </APIProvider>
      </div>
    </div>
  );
}

export default App;
