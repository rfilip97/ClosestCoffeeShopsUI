import './App.css';

import { getNearestShops } from "./services/closestCoffeeShops/app/app.js";
import CoffeeShop from './components/DrawCoffeeShopcomponent';
import Map from "./components/CanvasComponent"
import React, { useState, useEffect } from 'react'

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const loadPost = () => {
      getNearestShops({ x: 1, y: 1 }, -1).then(setShops);
    }
    loadPost();
  }, []);

  return (
    <div className="App">
      <div>
        <Map/>
          {shops.map(item => {
            return <CoffeeShop key={`coffeshopitem-${item.name}`} x={item.x} y={item.y}/>
          })}
      </div>
    </div>
  );
}

export default App;
