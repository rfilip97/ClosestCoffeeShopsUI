import './App.css';

import coffeeShops from './services/closestCoffeeShops/coffeeShopsComponents/coffeeShops';
import { RETRIEVE_ALL_TOKEN } from './services/closestCoffeeShops/utils/utils'
import CoffeeShop from './components/DrawCoffeeShopcomponent';
import Pointer from './components/DrawPointerComponent';
import Map from "./components/CanvasComponent"
import React, { useState, useEffect, useRef } from 'react'
import { reverseTranslateMapCoordinates } from './utils/CoordinateConverter';

function App() {
  const [shops, setShops] = useState([]);
  const [selectedPoint, setPoint] = useState(() => ({ x: 1, y: 1 }));
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const getClosestCoffeShops = useRef(null);

  async function init() {
    getClosestCoffeShops.current = await coffeeShops();
    updateCoffeeShops();
  }

  function handleMouseEvents(coords) {
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    const handleWindowMouseDown = () => {
      setPoint({ x: coords.x, y: coords.y });
      setShouldHighlight(true);
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mousedown', handleWindowMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
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
    if (getClosestCoffeShops.current === null) {
      return;
    }
    const cshops = getClosestCoffeShops.current(RETRIEVE_ALL_TOKEN, selectedPoint)
    setShops(cshops);
  };

  const shouldBeHighlighted = (index) => {
    return (index < 3) && shouldHighlight;
  };

  const determineHighlightedShops = () => {
    shops.map((item, index) => {
      if (index < 3 && shouldHighlight) {
        item.highlighted = true;
      } else {
        item.highlighted = false;
      }
    });
  };

  useEffect(() => {
    const initShops = async () => {
      await init();
    }
    initShops().catch(console.error);
  }, [])

  useEffect(() => {
    handleMouseEvents(coords);
  }, [coords]);

  useEffect(() => {
    determineHighlightedShops();
    updateCoffeeShops();
  }, [selectedPoint]);

  return (
    <div className="App" style={{ padding: '2px', display: 'flex' }}>
      <div onMouseMove={getMouseCoordinates}>
        <Map />
        {shops.map((item, index) => {
          return <CoffeeShop key={`coffeshopitem-${item.name}`} shop={item} />
        })}
        <Pointer key={`pointer`} x={selectedPoint.x} y={selectedPoint.y} highlighted={shouldHighlight} />
        <Map invisible="true" />
      </div>
      <div style={{ padding: '25px', fontSize: '50px' }}>
        <h2>
          Coords: {coords.x} {coords.y}
        </h2>
      </div>
    </div>
  );
}

export default App;
