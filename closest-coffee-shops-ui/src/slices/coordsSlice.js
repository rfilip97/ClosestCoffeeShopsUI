import { createSlice } from "@reduxjs/toolkit";

const coordsSlice = createSlice({
  name: "coords",
  initialState: { x: 0, y: 0 },
  reducers: {
    setCoords(state, action) {
      return { x: action.payload.x, y: action.payload.y };
    },
  },
});

export const { setCoords } = coordsSlice.actions;
export default coordsSlice.reducer;
