import { configureStore } from "@reduxjs/toolkit";

import {cryptoApi} from '../services/cryptoApi';
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    // ... other reducers
    [cryptoApi.reducerPath]: cryptoApi.reducer, // Add the RTK-Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware), // Add the RTK-Query middleware
});
setupListeners(store.dispatch);