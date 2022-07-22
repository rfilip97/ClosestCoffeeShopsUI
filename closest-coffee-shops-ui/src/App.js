import './App.css';

import { getNearestShops } from "./services/closestCoffeeShops/app/app.js";
import { RETRIEVE_ALL_TOKEN } from './services/closestCoffeeShops/utils/utils'
import CoffeeShop from './components/DrawCoffeeShopcomponent';
import Map from "./components/CanvasComponent"
import React, { useState, useEffect } from 'react'
import { reverseTranslateMapCoordinates } from './utils/CoordinateConverter';

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const loadPost = () => {
      getNearestShops({ x: 1, y: 1 }, RETRIEVE_ALL_TOKEN).then(setShops);
    }
    loadPost();
  }, []);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [, setGlobalCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = event => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
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

  return (
    <div className="App" style={{padding: '2px', display: 'flex'}}>
      <div onMouseMove={handleMouseMove}>
        <Map />
        {shops.map(item => {
          return <CoffeeShop key={`coffeshopitem-${item.name}`} x={item.x} y={item.y} />
        })}
      </div>
      <div style={{padding: '25px', fontSize: '50px'}}>
      <h2>
        Coords: {coords.x} {coords.y}
      </h2>
      </div>
    </div>
  );
}

export default App;
