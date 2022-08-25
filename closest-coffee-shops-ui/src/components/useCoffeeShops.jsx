import { useState, useEffect, useRef } from "react";
import coffeeShops from "../services/closestCoffeeShops/coffeeShopsComponents/coffeeShops";
import { getHighlightedShops } from "../utils/shops";

export function useCoffeeShops(point) {
  const [shops, setShops] = useState([]);
  const getClosestCoffeShops = useRef(null);

  useEffect(() => {
    const getInitialCoffeeShops = async () => {
      const coffeeshops = await coffeeShops();

      getClosestCoffeShops.current = coffeeshops.getCoffeeShops;

      setShops(getClosestCoffeShops.current({ x: 0, y: 0 }));
    };

    getInitialCoffeeShops().catch(console.error);
  }, []);

  const getHighlightedSortedShopsRelativeTo = (point) =>
    getHighlightedShops(getClosestCoffeShops.current(point), point);

  useEffect(() => {
    if (typeof getClosestCoffeShops.current === "function" && point) {
      setShops(getHighlightedSortedShopsRelativeTo(point));
    }
  }, [point]);

  return shops;
}
