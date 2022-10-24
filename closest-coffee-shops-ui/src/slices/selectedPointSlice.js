import { createSlice } from "@reduxjs/toolkit";

const selectedPointSlice = createSlice({
  name: "selectedPoint",
  initialState: { selectedPoint: { x: "0", y: "0" } },
  reducers: {
    setSelectedPoint(state, action) {
      return { ...state, selectedPoint: action.payload };
    },
  },
});

export const { setSelectedPoint } = selectedPointSlice.actions;
export default selectedPointSlice.reducer;
