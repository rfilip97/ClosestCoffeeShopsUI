import "./App.css";

import coffeeShops from "./services/closestCoffeeShops/coffeeShopsComponents/coffeeShops";
import { NUMBER_OF_SHOPS_TO_HIGHLIGHT } from "./services/closestCoffeeShops/utils/config";
import { CoffeeShop } from "./components/DrawCoffeeShopcomponent";
import Pointer from "./components/DrawPointerComponent";
import Map from "./components/Map";
import React, { useState, useEffect, useRef } from "react";
import { reverseTranslateMapCoordinates } from "./utils/CoordinateConverter";

const translateMouseCoordsToMapCoords = (event) => {
  const absX = event.clientX - event.target.offsetLeft;
  const absY = event.clientY - event.target.offsetTop;

  const [x, y] = reverseTranslateMapCoordinates(absX, absY);

  return { x, y };
};

const translateMouseCoordsAndCall = (cb) => (event) => {
  const { x, y } = translateMouseCoordsToMapCoords(event);

  cb({ x, y });
};

function App() {
  const [shops, setShops] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const getClosestCoffeShops = useRef(null);

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
      if (Array.isArray(shops)) {
        const cshops = shops.map((item, index) => {
          const highlighted =
            selectedPoint && index < NUMBER_OF_SHOPS_TO_HIGHLIGHT;

          return {
            ...item,
            highlighted,
          };
        });

        setShops(cshops);
      }
    };

    useEffect(() => {
      if (typeof getClosestCoffeShops.current === "function" && selectedPoint) {
        const orderedCoffeShops = getClosestCoffeShops.current(selectedPoint);

        determineHighlightedShops(orderedCoffeShops);
      }
    }, [selectedPoint]);
  };

  useCoffeeShops();

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
