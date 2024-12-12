import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../../ProductsData";

const initialState = {
  isAuthenticated: true,
  data: PRODUCTS,
  productDetails: null,
  cartItem: [],
  wishList: [],
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
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItem.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItem.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload.id;
      state.cartItem = state.cartItem.filter((item) => item.id !== productId);
    },
    updateCartItem: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItem.find((item) => item.id === id);
      if (item) item.quantity = quantity;
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existsInWishlist = state.wishList.find((item) => item.id === product.id);
      if (existsInWishlist) {
        state.wishList = state.wishList.filter((item) => item.id !== product.id);
      } else {
        state.wishList.push(product);
      }
    },
  },
});

export const { setAuthenticated, setData, setProductDetails, addToCart, removeFromCart, updateCartItem, clearCart, setWishList, toggleWishlist } = userSlice.actions;

export default userSlice.reducer;

