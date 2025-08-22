import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/apiServices";
import axios from "axios";

// Register User THUNK
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
      console.log("Registration successful:", response.data);
      return response.data;
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Registration Failed"
      );
    }
  }
);

// Login User THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", data);
      console.log("Login successful:", response.data);

      const { token, user } = response.data;
      console.log("User data:", user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("User data stored in localStorage:", user);

      return { user };
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log("Login success:", action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
