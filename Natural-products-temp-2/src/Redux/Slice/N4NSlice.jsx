import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../../data";

const initialState = {
    userAuthenticated: false,
    data: PRODUCTS,
    originalData: PRODUCTS,
    productDetails: null,
    selectedCategory: null,
    isOpenCart: false,
    cart: [],
    wishList: [],
};

const N4NSlice = createSlice({
    name: "N4N",
    initialState,
    reducers: {
        setUserAuthenticated: (state, action) => {
            state.userAuthenticated = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        resetData: (state) => {
            state.data = state.originalData;
        },
        setSelectedCategory: (state, action) => {
            // Fixed parameter name
            state.selectedCategory = action.payload;
        },
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        },
        addToCart: (state, action) => {
            const product = action.payload;
            const existingProduct = state.cart.find((item) => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: Number(1) });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter((item) => item.id !== productId);
        },
        updateCart: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cart.find((item) => item.id === id);
            if (item) item.quantity = quantity;
        },
        clearCart: (state) => {
            state.cart = [];
        },
        setWishList: (state, action) => {
            state.wishList = action.payload;
        },
        toggleWishList: (state, action) => {
            const product = action.payload;
            const existingWishList = state.wishList.find((item) => item.id === product.id);
            if (existingWishList) {
                state.wishList = state.wishList.filter((item) => item.id !== product.id);
            } else {
                state.wishList.push(product);
            }
        },
        setIsOpenCart: (state, action) => {
            state.isOpenCart = action.payload
        }
    },
});

export const { setUserAuthenticated, setData, resetData, setSelectedCategory, addToCart, removeFromCart, updateCart, clearCart, setWishList, setProductDetails, toggleWishList, setIsOpenCart } = N4NSlice.actions;

export default N4NSlice.reducer;
