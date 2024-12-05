import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: true,
};

export const DataSlices = createSlice({
  name: "Ecommers",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = DataSlices.actions;
export default DataSlices.reducer;
