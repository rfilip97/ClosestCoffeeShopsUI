import "./App.css";

import { useState } from "react";
import CoordinatesContainer from "./containers/coordinatesContainer";
import MapContainer from "./containers/map-container";
import { useShopsLoading } from "./hooks/useShopsLoading";

function App() {
  useShopsLoading();

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <div className="app">
      <MapContainer setCoordsCb={setCoords} />
      <CoordinatesContainer coords={coords} />
    </div>
  );
}

export default App;
