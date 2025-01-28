import { product } from "@/app/Type/Type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListState {
  wishList: product[];
}
const initialState: WishListState = {
  wishList: [],
};

export const wishListSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    toggleWishList: (state, action) => {
      const product = action.payload;
      const isExistingProduct = state.wishList.find((item) => item.id === product.id);
      if (isExistingProduct) {
        state.wishList = state.wishList.filter((item) => item.id !== product.id);
      } else {
        state.wishList.push(product);
      }
    },
    removeFromWishList: (state, action: PayloadAction<string | number>) => {
      state.wishList = state.wishList.filter((item) => item.id !== action.payload);
    },
    clearWishList: (state) => {
      state.wishList = [];
    },
  },
});

export const { toggleWishList, removeFromWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;