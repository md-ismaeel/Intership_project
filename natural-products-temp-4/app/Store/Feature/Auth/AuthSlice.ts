import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Flag {
  isAuthenticated: boolean;
}
const initialState: Flag = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
