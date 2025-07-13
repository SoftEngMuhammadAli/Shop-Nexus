import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// Create order
export const createOrder = createAsyncThunk(
  "orders/create",
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/orders", order);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Get order details
export const getOrderDetails = createAsyncThunk(
  "orders/getDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/orders/${id}`);
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    orderReset: (state) => {
      state.order = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { orderReset } = orderSlice.actions;
export default orderSlice.reducer;
