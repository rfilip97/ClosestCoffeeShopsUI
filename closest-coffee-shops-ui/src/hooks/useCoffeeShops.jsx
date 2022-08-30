import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getHighlightedSortedShopsRelativeTo } from "../utils/shops";
import { useDispatch } from "react-redux";

import { setShops } from "../slices/shopSlice";

export function useClosestCoffeeShops(point) {
  const shops = useSelector((state) => state.shops.shops);
  const dispatch = useDispatch();

  const dispatchShops = (shops) => {
    dispatch(setShops(shops));
  };

  useEffect(() => {
    if (point) {
      dispatchShops(getHighlightedSortedShopsRelativeTo(point, shops));
    }
  }, [point]);
}
