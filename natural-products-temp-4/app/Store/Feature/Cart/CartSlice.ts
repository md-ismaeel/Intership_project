import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "@/app/Type/Type";

interface CartState {
  cart: product[];
  isOpenCart: boolean;
}

const initialState: CartState = {
  cart: [],
  isOpenCart: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsOpenCart: (state, action: PayloadAction<boolean>) => {
      state.isOpenCart = action.payload;
    },
    addToCart: (state, actions) => {
      const product = actions.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: Number(1) });
      }
    },
    removeFromCart: (state, actions) => {
      const prodId = actions.payload;
      state.cart = state.cart.filter((prod) => prod.id !== prodId);
    },
    updateCart: (state, actions) => {
      const { id, quantity } = actions.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setIsOpenCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
