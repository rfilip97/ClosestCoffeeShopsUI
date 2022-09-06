import { configureStore, createSlice } from "@reduxjs/toolkit";

export const createShopsStore = (initialShops) => {
  const shopSlice = createSlice({
    name: "shops",
    initialState: { shops: initialShops },
    reducers: {
      setShops(state, action) {
        return { ...state, shops: action.payload };
      },
    },
  });

  const store = configureStore({
    reducer: {
      shops: shopSlice.reducer,
    },
  });

  return store;
};
