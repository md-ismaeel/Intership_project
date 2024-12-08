import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  data: [1, 2, 3, 45],
};

export const userSlice = createSlice({
  name: "Ecommers",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setAuthenticated, setData } = userSlice.actions;
export default userSlice.reducer;
