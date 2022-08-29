import { useEffect, useRef } from "react";
import coffeeShops from "../services/closestCoffeeShops/coffeeShopsComponents/coffeeShops";
import { getHighlightedShops } from "../utils/shops";
import { store } from "../store";
import { setShops } from "../slices/shopSlice";

export function useClosestCoffeeShops(point) {
  const getClosestCoffeShops = useRef(null);

  useEffect(() => {
    const getInitialCoffeeShops = async () => {
      const coffeeshops = await coffeeShops();

      getClosestCoffeShops.current = coffeeshops.getCoffeeShops;

      dispatchShops(getClosestCoffeShops.current({ x: 0, y: 0 }));
    };

    getInitialCoffeeShops().catch(console.error);
  }, []);

  const getHighlightedSortedShopsRelativeTo = (point) =>
    getHighlightedShops(getClosestCoffeShops.current(point), point);

  const dispatchShops = (shops) => {
    store.dispatch(setShops(shops)); //
  };

  useEffect(() => {
    if (typeof getClosestCoffeShops.current === "function" && point) {
      dispatchShops(getHighlightedSortedShopsRelativeTo(point));
    }
  }, [point]);
}
