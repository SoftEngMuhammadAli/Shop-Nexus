import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userSlice,
  },
});
