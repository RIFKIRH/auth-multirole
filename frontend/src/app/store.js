import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; // sesuaikan path-nya

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});
