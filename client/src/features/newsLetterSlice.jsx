import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Subscribe user to newsletter
export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/newsletter/subscribe`,
        { email }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to subscribe"
      );
    }
  }
);

// Fetch all subscribers (admin only)
export const fetchSubscribers = createAsyncThunk(
  "newsletter/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Assuming you have auth token in state.auth.user.token
      const { auth } = getState();
      const token = auth?.user?.token;

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/newsletter/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.subscribers;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscribers"
      );
    }
  }
);

// Slice
const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    loading: false,
    error: null,
    success: null,
    subscribers: [],
  },
  reducers: {
    clearNewsletterState: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Subscribe
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch subscribers
      .addCase(fetchSubscribers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscribers.fulfilled, (state, action) => {
        state.loading = false;
        state.subscribers = action.payload;
      })
      .addCase(fetchSubscribers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearNewsletterState } = newsletterSlice.actions;

export default newsletterSlice.reducer;
