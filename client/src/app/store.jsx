import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userSlice from "../features/userSlice";
import productReducer from "../features/productSlice";
import blogReducer from "../features/blogSlice";
import newsletterReducer from "../features/newsLetterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userSlice,
    products: productReducer,
    blogs: blogReducer,
    newsletter: newsletterReducer,
  },
});
