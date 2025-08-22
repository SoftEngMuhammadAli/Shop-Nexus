import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/apiServices";

export const getAllUsers = createAsyncThunk(
  "users/FetchAllUsers",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/users/all", data);
      console.log("Fetched users:", response.data);

      return response.data;
    } catch (error) {
      console.error(error);

      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Registration Failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    error: null,
    loading: false,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.data;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
