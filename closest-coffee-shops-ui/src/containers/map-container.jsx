import "../App.css";

import { CoffeeShop } from "../components/DrawCoffeeShopcomponent";
import Pointer from "../components/DrawPointerComponent";
import Map from "../components/Map";
import React, { useState } from "react";
import { translateMouseCoordsAndCall } from "../utils/CoordinateConverter";
import { useClosestCoffeeShops } from "../components/useCoffeeShops";
import { useSelector } from "react-redux";
import { store } from "../store";
import { setCoords } from "../slices/coordsSlice";

function MapContainer() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  useClosestCoffeeShops(selectedPoint);

  const shops = useSelector((state) => state.shops.shops);

  const dispatchCoords = (point) => {
    store.dispatch(setCoords(point));
  };

  return (
    <>
      <Map
        onMouseMove={translateMouseCoordsAndCall(dispatchCoords)}
        onClick={translateMouseCoordsAndCall(setSelectedPoint)}
      >
        {shops.map((item) => (
          <CoffeeShop key={`coffeshopitem-${item.name}`} shop={item} />
        ))}
        {selectedPoint && <Pointer x={selectedPoint.x} y={selectedPoint.y} />}
      </Map>
    </>
  );
}

export default MapContainer;
