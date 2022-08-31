import "../scss//app/_app.scss";

import { useState } from "react";
import CoordinatesContainer from "../containers/coordinatesContainer";
import MapContainer from "../containers/map-container";
import { useShopsLoading } from "../hooks/useShopsLoading";

function AppWrapper() {
  useShopsLoading();

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <div className="app">
      <MapContainer setCoordsCb={setCoords} />
      <CoordinatesContainer coords={coords} />
    </div>
  );
}

export default AppWrapper;
