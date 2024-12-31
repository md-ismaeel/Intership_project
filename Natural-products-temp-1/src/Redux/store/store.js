import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../Redux/slices/usersSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root", // The key used to store the Redux state in localStorage
    storage, // Using localStorage
    whitelist: ["isAuthenticated", "cartItem", "wishList"], // Only persist cart and wishlist data
    debug: false,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        Ecommers: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"], // Ignore persistence actions
                ignoredActionPaths: ["payload.register"], // Or a specific action path
            },
        }),
});

export const persistor = persistStore(store); // Create a persistor instance
