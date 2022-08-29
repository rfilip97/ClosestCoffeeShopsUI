import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shops",
  initialState: { shops: [] },
  reducers: {
    setShops(state, action) {
      return { ...state, shops: action.payload };
    },
  },
});

export const { setShops } = shopSlice.actions;
export default shopSlice.reducer;
