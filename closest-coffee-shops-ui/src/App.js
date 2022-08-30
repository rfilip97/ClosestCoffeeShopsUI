import "./App.css";

import { useSelector } from "react-redux";
import ShopsLoader from "./containers/shops-loader";
import MapContainer from "./containers/map-container";
import CoordinatesContainer from "./containers/coordinatesContainer";

function App() {
  const coords = useSelector((state) => state.coords);

  return (
    <>
      <ShopsLoader />
      <div className="app">
        <MapContainer />
        <CoordinatesContainer />
      </div>
    </>
  );
}

export default App;
