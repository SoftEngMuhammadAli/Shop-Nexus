// src/redux/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/apiServices";

// ✅ Fetch blogs (body instead of query params)
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (filters = {}, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/blogs/list", filters, {
        withCredentials: true,
      });
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
      const token = thunkAPI.getState().auth?.token;
      const response = await axiosInstance.post(
        "/api/blogs/create-blog",
        blogData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data.data;
    } catch (err) {
      let errorMessage = "Failed to create blog";

      if (err.response) {
        // Handle specific error messages from server
        errorMessage = err.response.data.message || errorMessage;

        // If 403, add more context
        if (err.response.status === 403) {
          errorMessage = "Permission denied: " + errorMessage;
        }
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ Update blog
export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, updates }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.token;

      const response = await axiosInstance.put(`/api/blogs/${id}`, updates, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });

      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update blog"
      );
    }
  }
);

// ✅ Delete blog
export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth?.token;

      await axiosInstance.delete(`/api/blogs/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
      });

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete blog"
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
        state.items.unshift(action.payload);
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.items = state.items.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        );
      })

      // Delete
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((blog) => blog._id !== action.payload);
      });
  },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
