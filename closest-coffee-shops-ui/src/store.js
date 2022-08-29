import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./slices/shopSlice";
import coordsReducer from "./slices/coordsSlice";

export const store = configureStore({
  reducer: {
    shops: shopReducer,
    coords: coordsReducer,
  },
});
