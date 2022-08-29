import "./App.css";

import { useSelector } from "react-redux";
import ShopsLoader from "./containers/shops-loader";
import MapContainer from "./containers/map-container";

function App() {
  const coords = useSelector((state) => state.coords);

  return (
    <>
      <ShopsLoader />
      <div className="app">
        <MapContainer />
        <div className="coordinatesContainer">
          <h2>
            Coords: {coords.x} {coords.y}
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
