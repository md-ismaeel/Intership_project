import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/app/Store/Feature/Cart/CartSlice";
import authSlice from "@/app/Store/Feature/Auth/AuthSlice";
import wishListSlice from "@/app/Store/Feature/WishList/WishListSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice,
      auth: authSlice,
      wish: wishListSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
