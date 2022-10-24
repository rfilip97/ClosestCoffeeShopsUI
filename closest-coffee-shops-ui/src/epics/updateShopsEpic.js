import { ofType } from "redux-observable";
import { map } from "rxjs/operators";

const updateShopsEpic = (action$) => {
  const newAction$ = action$.pipe(
    ofType("shops/setShops"),
    map((st) => {
      /* use st.payload here */

      st.type = "shops/setShopsComplete";

      return st;
    })
  );

  return newAction$;
};

export default updateShopsEpic;
