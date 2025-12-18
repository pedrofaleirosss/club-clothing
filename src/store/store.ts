import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import { thunk } from "redux-thunk";

// @ts-ignore
import storage from "redux-persist/lib/storage";
// @ts-ignore
import persistReducer from "redux-persist/es/persistReducer";
// @ts-ignore
import persistStore from "redux-persist/es/persistStore";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import rootReducer from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk);

    // Uncomment the next line to enable logging in development mode
    // middlewares.push(logger);

    return middlewares;
  },
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
