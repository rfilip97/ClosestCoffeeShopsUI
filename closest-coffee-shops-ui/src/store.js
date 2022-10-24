import { configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import shopReducer from "./slices/shopSlice";
import updateShopsEpic from "./epics/updateShopsEpic";

const epicMiddleware = createEpicMiddleware();

export const rootEpic = combineEpics(updateShopsEpic);

export const store = configureStore({
  reducer: {
    shops: shopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);
