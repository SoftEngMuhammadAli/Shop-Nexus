import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/apiServices";

// Async thunk: Fetch blogs with filters/pagination
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async ({ page = 1, limit = 10, status, tag, search } = {}, thunkAPI) => {
    try {
      const params = { page, limit };
      if (status) params.status = status;
      if (tag) params.tag = tag;
      if (search) params.search = search;

      const response = await axiosInstance.get("/api/blogs", { params });
      return response.data.data; // payload structure { items, page, limit, total, totalPages }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
