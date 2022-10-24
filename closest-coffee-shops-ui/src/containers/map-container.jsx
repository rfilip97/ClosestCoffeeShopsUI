import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CoffeeShop } from "../components/DrawCoffeeShopComponent";
import Pointer from "../components/DrawPointerComponent";
import Map from "../components/Map";
import { useSelectedPoint } from "../hooks/useSelectedPoint";
import { translateMouseCoordsAndCall } from "../utils/coordinates";

export function MapContainer(props) {
  const [selectedPoint, setSelectedPoint] = useState(null);

  useSelectedPoint(selectedPoint);

  const shops = useSelector((state) => state.shops.shops);

  const setCoords = (point) => {
    props.setCoordsCb(point);
  };

  return (
    <Map
      onMouseMove={translateMouseCoordsAndCall(setCoords)}
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
