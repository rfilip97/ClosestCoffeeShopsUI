import { ofType } from "redux-observable";
import { map } from "rxjs/operators";
import { getHighlightedSortedShopsRelativeTo } from "../utils/shops";

const updateShopsEpic = (action$, state) => {
  const updateShopsAction = action$.pipe(
    ofType("selectedPoint/setSelectedPoint"),
    map((action) => {
      const point = action.payload;
      const shops = state.value.shops.shops;

      if (shops) {
        const updatedShops = getHighlightedSortedShopsRelativeTo(point, shops);

        action.payload = updatedShops;
        action.type = "shops/setShops";
      } else {
        action.type = "selectedPoint/setSelectedPointComplete";
      }

      return action;
    })
  );

  return updateShopsAction;
};

export default updateShopsEpic;
