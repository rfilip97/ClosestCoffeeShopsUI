import { useEffect } from "react";
import fetchCoffeeShops from "../services/closestCoffeeShops/dataFetcher/dataFetcher";
import { store } from "../store";
import { setShops } from "../slices/shopSlice";

function ShopsLoader() {
  useEffect(() => {
    fetchCoffeeShops().then(([coffeeShops, responseCode]) => {
      if (responseCode >= 200 && responseCode < 300) {
        store.dispatch(setShops(coffeeShops));
      } else {
        alert("Error fetching the shops. ErrorCode: " + responseCode);
      }
    });
  }, []);

  return null;
}

export default ShopsLoader;
