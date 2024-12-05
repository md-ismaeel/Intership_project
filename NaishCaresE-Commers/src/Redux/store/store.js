import { configureStore } from "@reduxjs/toolkit";
import { DataSlices } from "../slice/userSlice";

export const store = configureStore({
    reducer: {
        DataSlices
    }
})