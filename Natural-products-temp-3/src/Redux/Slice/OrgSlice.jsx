import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../../data";

const initialState = {
    isAuthenticated: false,
    data: PRODUCTS,
    originalData: PRODUCTS,
    cart: [],
    wishList: [],
    isOpenCart: false,
    selectedCategory: [],
    priceRange: [0, 1000], // Default price range
    stockAvailability: "", // Can be 'inStock', 'outOfStock', or ''
    productDetails: null,
    filteredProd: []
};

const OrgSlice = createSlice({
    name: "Org",
    initialState,
    reducers: {
        setUserAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        resetData: (state) => {
            state.data = state.originalData;
        },
        setProductDetails: (state, action) => {
            state.productDetails = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload
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
            const existingWishList = state.wishList.find(
                (item) => item.id === product.id
            );
            if (existingWishList) {
                state.wishList = state.wishList.filter(
                    (item) => item.id !== product.id
                );
            } else {
                state.wishList.push(product);
            }
        },
        setIsOpenCart: (state, action) => {
            state.isOpenCart = action.payload;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setStockAvailability: (state, action) => {
            state.stockAvailability = action.payload;
        },
        setFilteredProd: (state, action) => {
            state.filteredProd = action.payload
        }
    },
});

export const {
    setUserAuthenticated,
    setData,
    resetData,
    setSelectedCategory,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    setWishList,
    setProductDetails,
    toggleWishList,
    setIsOpenCart,
    setPriceRange,
    setStockAvailability,
    setFilteredProd
} = OrgSlice.actions;

export default OrgSlice.reducer;
