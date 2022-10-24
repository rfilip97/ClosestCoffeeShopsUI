import { ofType } from "redux-observable";
import { map } from "rxjs/operators";
import { setShops } from "../slices/shopSlice";
import { store } from "../store";
import { getHighlightedSortedShopsRelativeTo } from "../utils/shops";

const updateShopsEpic = (action$) => {
  const newAction$ = action$.pipe(
    ofType("selectedPoint/setSelectedPoint"),
    map((action) => {
      const point = action.payload;
      const shops = store.getState().shops.shops;

      if (shops) {
        const updatedShops = getHighlightedSortedShopsRelativeTo(point, shops);
        store.dispatch(setShops(updatedShops));
      }

      action.type = "shops/setShopsComplete";

      return action;
    })
  );

  return newAction$;
};

export default updateShopsEpic;
