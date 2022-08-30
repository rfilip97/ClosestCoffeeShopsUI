import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { setShops } from "../slices/shopSlice";
import fetchCoffeeShops from "../services/closestCoffeeShops/dataFetcher/dataFetcher";

export function useShopsLoading() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchCoffeeShops().then(([coffeeShops, responseCode]) => {
      if (responseCode >= 200 && responseCode < 300) {
        dispatch(setShops(coffeeShops));
      } else {
        alert("Error fetching the shops. ErrorCode: " + responseCode);
      }
    });
  }, []);
}
