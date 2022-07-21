import './App.css';

import { getNearestShops } from "./services/closestCoffeeShops/app.js";
import React, { useState, useEffect } from 'react'
import Map from "./components/CanvasComponent"

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      getNearestShops({ x: 1, y: 1 }).then(cshops => { setShops(cshops) });
    }
    loadPost();
  }, []);

  return (
    <div className="App">
      <div>
        <Map/>
      </div>
    </div>
  );
}

export default App;
