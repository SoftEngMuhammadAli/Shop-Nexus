// src/redux/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/apiServices";

// ✅ Fetch blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/blogs", data);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch blogs"
      );
    }
  }
);

// ✅ Create blog
export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/api/blogs/create-blog",
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      // If response.data exists, then response shape is { data: {...} }
      return response.data.data; // Access the actual payload inside "data"
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create blog"
      );
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBlogState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); // add new blog at top
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
