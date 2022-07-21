import './App.css';

import { getNearestShops } from "./services/closestCoffeeShops/app.js";
import React, { useState, useEffect } from 'react'

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const loadPost = () => {
      getNearestShops({ x: 1, y: 1 }).then(setShops);
    }
    loadPost();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Coffee shops:
        </p>
        <ul>
          {shops.map(item => {
            return <li>{item.name}</li>;
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
