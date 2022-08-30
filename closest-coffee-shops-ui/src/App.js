import "./App.css";

import MapContainer from "./containers/map-container";
import CoordinatesContainer from "./containers/coordinatesContainer";
import { useShopsLoading } from "./hooks/useShopsLoading";

function App() {
  useShopsLoading();

  return (
    <>
      <div className="app">
        <MapContainer />
        <CoordinatesContainer />
      </div>
    </>
  );
}

export default App;
