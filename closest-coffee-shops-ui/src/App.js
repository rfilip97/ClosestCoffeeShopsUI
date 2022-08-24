import "./App.css";

import coffeeShops from "./services/closestCoffeeShops/coffeeShopsComponents/coffeeShops";
import { NUMBER_OF_SHOPS_TO_HIGHLIGHT } from "./services/closestCoffeeShops/utils/config";
import { CoffeeShop } from "./components/DrawCoffeeShopcomponent";
import Pointer from "./components/DrawPointerComponent";
import Map from "./components/Map";
import React, { useState, useEffect, useRef } from "react";
import { reverseTranslateMapCoordinates } from "./utils/CoordinateConverter";

function App() {
  const [shops, setShops] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const getClosestCoffeShops = useRef(null);
  const mouseEventHandlers = getMouseEventHandlers();

  function getMouseEventHandlers() {
    const getMouseCoordinates = (event) => {
      const absX = event.clientX - event.target.offsetLeft;
      const absY = event.clientY - event.target.offsetTop;
      const [x, y] = reverseTranslateMapCoordinates(absX, absY);

      return { x, y };
    };

    const updateClickedPoint = (event) => {
      const newCoords = getMouseCoordinates(event);
      setSelectedPoint(newCoords);
    };

    const handleMouseMove = (event) => {
      const newCoords = getMouseCoordinates(event);
      setCoords({ newCoords });
    };

    return { updateClickedPoint, handleMouseMove };
  }

  useEffect(() => {
    const displayInitialCoffeeShops = async () => {
      const coffeeshops = await coffeeShops();
      getClosestCoffeShops.current = coffeeshops.getCoffeeShops;
      setShops(getClosestCoffeShops.current({ x: 0, y: 0 }));
    };

    displayInitialCoffeeShops().catch(console.error);
  }, []);

  const useCoffeeShops = () => {
    const determineHighlightedShops = (shops) => {
      if (shops) {
        const cshops = shops.map((item, index) => {
          if (selectedPoint && index < NUMBER_OF_SHOPS_TO_HIGHLIGHT) {
            return { ...item, highlighted: true };
          }

          return { ...item, highlighted: false };
        });

        setShops(cshops);
      }
    };

    useEffect(() => {
      if (getClosestCoffeShops.current) {
        determineHighlightedShops(getClosestCoffeShops.current(selectedPoint));
      }
    }, [selectedPoint]);

    return shops.map((item) => {
      return <CoffeeShop key={`coffeshopitem-${item.name}`} shop={item} />;
    });
  };

  return (
    <div className="app">
      <Map
        onMouseMove={mouseEventHandlers.handleMouseMove}
        onClick={mouseEventHandlers.updateClickedPoint}
      >
        {useCoffeeShops()}
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
