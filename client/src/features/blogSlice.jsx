// src/redux/blogSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/apiServices";

// ✅ Fetch blogs (body instead of query params)
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/blogs", data, {
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
  async (blogData, { rejectWithValue }) => {
    console.log("📡 Sending createBlog request with:", blogData);
    try {
      const res = await axiosInstance.post("/api/blogs/create-blog", blogData, {
        withCredentials: true,
      });
      console.log("✅ Server response:", res.data);
      return res.data.data;
    } catch (err) {
      console.error("❌ API error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to create blog"
      );
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

      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.creating = true;
        state.createError = null;
        state.createdBlog = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.creating = false;
        state.createdBlog = action.payload;
        state.items.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
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
