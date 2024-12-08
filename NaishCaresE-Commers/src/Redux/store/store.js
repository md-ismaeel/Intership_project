import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/usersSlice"
// import { authSlice } from "../slices/AuthSlice";

export const store = configureStore({
    reducer: {
        Ecommers: userSlice
    }
})