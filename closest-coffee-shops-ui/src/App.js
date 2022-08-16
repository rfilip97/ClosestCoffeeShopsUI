import './App.css';

import coffeeShops from './services/closestCoffeeShops/coffeeShopsComponents/coffeeShops';
import { RETRIEVE_ALL_TOKEN } from './services/closestCoffeeShops/utils/utils'
import CoffeeShop from './components/DrawCoffeeShopcomponent';
import Map from "./components/CanvasComponent"
import React, { useState, useEffect } from 'react'
import { reverseTranslateMapCoordinates } from './utils/CoordinateConverter';

function App() {
  const [shops, setShops] = useState([]);
  const [point, setPoint] = useState(() => {
    return { x: 1, y: 1 };
  });

  useEffect(() => {
    const loadPost = async () => {
      const getClosestCoffeShops = await coffeeShops(point);
      const cshops = getClosestCoffeShops(RETRIEVE_ALL_TOKEN)
      for (let cs of cshops) {
        cs.highlighted = false;
      }
      setShops(cshops);
    }

    loadPost();
  }, [point]);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [shouldHighlight, setShouldHighlight] = useState(coords.x, coords.y);

  useEffect(() => {
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };

    const handleWindowMouseDown = event => {
      setPoint({ x: coords.x, y: coords.y });
      setShouldHighlight(true);
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mousedown', handleWindowMouseDown);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mousemove', handleWindowMouseDown);
    };
  }, []);

  const handleMouseMove = event => {
    const absX = event.clientX - event.target.offsetLeft;
    const absY = event.clientY - event.target.offsetTop;
    const [translatedX, translatedY] = reverseTranslateMapCoordinates(absX, absY);

    setCoords({
      x: translatedX,
      y: translatedY,
    });
  };

  const shouldBeHighlighted = (index) => {
    return (index < 3) && shouldHighlight;
  };

  return (
    <div className="App" style={{ padding: '2px', display: 'flex' }}>
      <div onMouseMove={handleMouseMove}>
        <Map />
        {shops.map((item, index) => {
          return <CoffeeShop key={`coffeshopitem-${item.name}`} x={item.x} y={item.y} highlighted={shouldBeHighlighted(index)} />
        })}
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
