import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../../Redux/slices/usersSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration
const persistConfig = {
    key: "root", // The key used to store the Redux state in localStorage
    storage, // Using localStorage
    whitelist: ["cartItem", "wishList"], // Only persist cart and wishlist data
    debug: false, // Disable debug in production
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        Ecommers: persistedReducer, // Add persisted reducer
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