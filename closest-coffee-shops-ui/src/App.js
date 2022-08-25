import "./App.css";

import { CoffeeShop } from "./components/DrawCoffeeShopcomponent";
import Pointer from "./components/DrawPointerComponent";
import Map from "./components/Map";
import React, { useState } from "react";
import { translateMouseCoordsAndCall } from "./utils/CoordinateConverter";
import { useClosestCoffeeShops } from "./components/useCoffeeShops";

function App() {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const shops = useClosestCoffeeShops(selectedPoint);

  return (
    <div className="app">
      <Map
        onMouseMove={translateMouseCoordsAndCall(setCoords)}
        onClick={translateMouseCoordsAndCall(setSelectedPoint)}
      >
        {shops.map((item) => (
          <CoffeeShop key={`coffeshopitem-${item.name}`} shop={item} />
        ))}
        {selectedPoint && <Pointer x={selectedPoint.x} y={selectedPoint.y} />}
      </Map>

      <div className="coordinatesContainer">
        <h2>
          Coords: {coords.x} {coords.y}
        </h2>
      </div>
    </div>
  );
}

export default App;
