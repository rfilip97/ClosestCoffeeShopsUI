import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getHighlightedSortedShopsRelativeTo } from "../utils/shops";
import { useDispatch } from "react-redux";

import { setShops } from "../slices/shopSlice";
import { setSelectedPoint } from "../slices/selectedPointSlice";

export function useClosestCoffeeShops(point) {
  const shops = useSelector((state) => state.shops.shops);
  const selectedPoint = useSelector((state) => state.selectedPoint.selectedPoint);

  const dispatch = useDispatch();

  const dispatchShops = (shops) => {
    dispatch(setShops(shops));
  };

  const dispatchSelectedPoint = (point) => {
    dispatch(setSelectedPoint(point));
  };

  useEffect(() => {
    if (point) {
      dispatchShops(getHighlightedSortedShopsRelativeTo(point, shops));
      dispatchSelectedPoint(point);
    }
  }, [point]);
}
