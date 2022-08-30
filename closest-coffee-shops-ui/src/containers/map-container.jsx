import "../App.css";

import { CoffeeShop } from "../components/DrawCoffeeShopcomponent";
import Pointer from "../components/DrawPointerComponent";
import Map from "../components/Map";
import React, { useState } from "react";
import { translateMouseCoordsAndCall } from "../utils/coordinateConverter";
import { useClosestCoffeeShops } from "../hooks/useCoffeeShops";
import { useSelector } from "react-redux";
import { setCoords } from "../slices/coordsSlice";
import { useDispatch } from "react-redux";

function MapContainer() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  useClosestCoffeeShops(selectedPoint);

  const shops = useSelector((state) => state.shops.shops);
  const dispatch = useDispatch();

  const dispatchCoords = (point) => {
    dispatch(setCoords(point));
  };

  return (
    <Map
      onMouseMove={translateMouseCoordsAndCall(dispatchCoords)}
      onClick={translateMouseCoordsAndCall(setSelectedPoint)}
    >
      {shops.map((item) => (
        <CoffeeShop key={`coffeshopitem-${item.name}`} shop={item} />
      ))}
      {selectedPoint && <Pointer x={selectedPoint.x} y={selectedPoint.y} />}
    </Map>
  );
}

export default MapContainer;
