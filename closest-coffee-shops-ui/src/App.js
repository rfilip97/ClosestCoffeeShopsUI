import './App.css';

import coffeeShops from './services/closestCoffeeShops/coffeeShopsComponents/coffeeShops';
import { RETRIEVE_ALL_TOKEN } from './services/closestCoffeeShops/utils/utils'
import { NUMBER_OF_SHOPS_TO_HIGHLIGHT } from './services/closestCoffeeShops/utils/config';
import CoffeeShop from './components/DrawCoffeeShopcomponent';
import Pointer from './components/DrawPointerComponent';
import Map from "./components/CanvasComponent"
import React, { useState, useEffect, useRef } from 'react'
import { reverseTranslateMapCoordinates } from './utils/CoordinateConverter';

function App() {
  const [shops, setShops] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState({ x: 1, y: 1 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const getClosestCoffeShops = useRef(null);

  async function displayInitialCoffeeShops() {
    getClosestCoffeShops.current = await coffeeShops();
    const cshops = updateCoffeeShops();
    setShops(cshops);
  }

  function handleMouseEvents(coords) {
    const handleWindowMouseDown = () => {
      setSelectedPoint({ x: coords.x, y: coords.y });
      setShouldHighlight(true);
    };
    window.addEventListener('mousedown', handleWindowMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleWindowMouseDown);
    };
  }

  const getMouseCoordinates = event => {
    const absX = event.clientX - event.target.offsetLeft;
    const absY = event.clientY - event.target.offsetTop;
    const [translatedX, translatedY] = reverseTranslateMapCoordinates(absX, absY);

    setCoords({
      x: translatedX,
      y: translatedY,
    });
  };

  const updateCoffeeShops = () => {
    if (getClosestCoffeShops.current) {
      const cshops = getClosestCoffeShops.current(RETRIEVE_ALL_TOKEN, selectedPoint)
      return cshops;
    }
  };

  const determineHighlightedShops = shops => {
    if(shops) {
      const cshops = shops.map((item, index) => {
        if (index < NUMBER_OF_SHOPS_TO_HIGHLIGHT && shouldHighlight) {
          return {...item, highlighted: true};
        }

        return {...item, highlighted: false};
      });

    setShops(cshops);
    }
  };

  useEffect(() => {
    displayInitialCoffeeShops().catch(console.error);
  }, [])

  useEffect(() => {
    handleMouseEvents(coords);
  }, [coords]);

  useEffect(() => {
    const cshops = updateCoffeeShops();
    determineHighlightedShops(cshops);
  }, [selectedPoint]);

  return (
    <div className="App">
      <div onMouseMove={getMouseCoordinates}>
        <Map />
        {shops.map((item) => {
          return <CoffeeShop key={`coffeshopitem-${item.name}`} shop={item} />
        })}
        <Pointer key={`pointer`} x={selectedPoint.x} y={selectedPoint.y} highlighted={shouldHighlight} />
        <Map invisible="true" />
      </div>
      <div className="CoordinatesContainer">
        <h2>
          Coords: {coords.x} {coords.y}
        </h2>
      </div>
    </div>
  );
}

export default App;
