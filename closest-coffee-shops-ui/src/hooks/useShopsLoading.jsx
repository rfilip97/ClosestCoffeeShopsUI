import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import fetchCoffeeShops from "../services/closestCoffeeShops/dataFetcher/dataFetcher";
import { setShops } from "../slices/shopSlice";
import { isSuccessfullResponse } from "../utils/responseCodes";

export function useShopsLoading() {
  let [respCode, setRespCode] = useState(200);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchCoffeeShops().then(([coffeeShops, responseCode]) => {
      setRespCode(responseCode);
      if (isSuccessfullResponse(responseCode)) {
        dispatch(setShops(coffeeShops));
      }
    });
  }, []);

  return respCode;
}
