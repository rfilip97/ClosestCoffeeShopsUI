import { useState, useEffect, useRef } from "react";
import coffeeShops from "../services/closestCoffeeShops/coffeeShopsComponents/coffeeShops";
import { NUMBER_OF_SHOPS_TO_HIGHLIGHT } from "../services/closestCoffeeShops/utils/config";

export function useCoffeeShops(point) {
  const [shops, setShops] = useState([]);
  const getClosestCoffeShops = useRef(null);

  useEffect(() => {
    const getInitialCoffeeShops = async () => {
      const coffeeshops = await coffeeShops();

      getClosestCoffeShops.current = coffeeshops.getCoffeeShops;

      setShops(getSortedShopsRelativeTo({ x: 0, y: 0 }));
    };

    getInitialCoffeeShops().catch(console.error);
  }, []);

  const getSortedShopsRelativeTo = (point) =>
    getClosestCoffeShops.current(point);

  const getHighlightedShops = (shops) => {
    if (Array.isArray(shops)) {
      const cshops = shops.map((item, index) => {
        const highlighted = point && index < NUMBER_OF_SHOPS_TO_HIGHLIGHT;

        return {
          ...item,
          highlighted,
        };
      });

      return cshops;
    }
  };

  const getHighlightedSortedShopsRelativeTo = (point) =>
    getHighlightedShops(getSortedShopsRelativeTo(point));

  useEffect(() => {
    if (typeof getClosestCoffeShops.current === "function" && point) {
      setShops(getHighlightedSortedShopsRelativeTo(point));
    }
  }, [point]);

  return shops;
}
