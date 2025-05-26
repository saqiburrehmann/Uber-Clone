import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import authReducer from "../features/auth/authSliceToken";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(authApi.middleware);
  },
});
