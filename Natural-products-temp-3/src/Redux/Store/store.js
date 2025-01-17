import { configureStore } from "@reduxjs/toolkit";
import OrgSlice from "../../Redux/Slice/OrgSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root", // The key used to store the Redux state in localStorage
    storage, // Using localStorage
    whitelist: ["isAuthenticated", "cart", "wishList"], // Only persist cart and wishlist data
    debug: false,
};

const persistedReducer = persistReducer(persistConfig, OrgSlice);

export const store = configureStore({
    reducer: {
        Org: persistedReducer,
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