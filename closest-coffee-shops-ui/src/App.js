import "./App.css";

import coffeeShops from "./services/closestCoffeeShops/coffeeShopsComponents/coffeeShops";
import { NUMBER_OF_SHOPS_TO_HIGHLIGHT } from "./services/closestCoffeeShops/utils/config";
import { expandCoffeeShops } from "./components/DrawCoffeeShopcomponent";
import Pointer from "./components/DrawPointerComponent";
import Map from "./components/Map";
import React, { useState, useEffect, useRef } from "react";
import { reverseTranslateMapCoordinates } from "./utils/CoordinateConverter";

function App() {
  const [shops, setShops] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const getClosestCoffeShops = useRef(null);

  async function displayInitialCoffeeShops() {
    const coffeeshops = await coffeeShops();
    getClosestCoffeShops.current = coffeeshops.getNClosestCoffeShops;
    setShops(updateCoffeeShops());
  }

  const updateClickedPoint = (event) => {
    const newCoords = getMouseCoordinates(event);
    setSelectedPoint({ x: newCoords.x, y: newCoords.y });
  };

  const handleMouseMove = (event) => {
    const newCoords = getMouseCoordinates(event);
    setCoords({
      x: newCoords.x,
      y: newCoords.y,
    });
  };

  const getMouseCoordinates = (event) => {
    const absX = event.clientX - event.target.offsetLeft;
    const absY = event.clientY - event.target.offsetTop;
    const [x, y] = reverseTranslateMapCoordinates(absX, absY);

    return { x, y };
  };

  const updateCoffeeShops = () => {
    if (getClosestCoffeShops.current) {
      const cshops = getClosestCoffeShops.current(
        Number.MAX_SAFE_INTEGER,
        selectedPoint
      );
      return cshops;
    }
  };

  const determineHighlightedShops = (shops) => {
    if (shops) {
      const cshops = shops.map((item, index) => {
        if (index < NUMBER_OF_SHOPS_TO_HIGHLIGHT && selectedPoint) {
          return { ...item, highlighted: true };
        }

        return { ...item, highlighted: false };
      });

      setShops(cshops);
    }
  };

  useEffect(() => {
    displayInitialCoffeeShops().catch(console.error);
  }, []);

  useEffect(() => {
    const cshops = updateCoffeeShops();
    determineHighlightedShops(cshops);
  }, [selectedPoint]);

  return (
    <div className="app">
      <Map onMouseMove={handleMouseMove} onClick={updateClickedPoint}>
        {expandCoffeeShops(shops)}
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
