import { useEffect, useRef } from "react";
import { store } from "../store";
import { useSelector } from "react-redux";
import { getHighlightedSortedShopsRelativeTo } from "../utils/shops";

import { setShops } from "../slices/shopSlice";

export function useClosestCoffeeShops(point) {
  const shops = useSelector((state) => state.shops.shops);

  const dispatchShops = (shops) => {
    store.dispatch(setShops(shops));
  };

  useEffect(() => {
    if (point) {
      dispatchShops(getHighlightedSortedShopsRelativeTo(point, shops));
    }
  }, [point]);
}
