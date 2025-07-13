import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/axios";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products");
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch single product
export const getProductDetails = createAsyncThunk(
  "products/getDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/products/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products/featured");
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// /submitReview
export const submitReview = createAsyncThunk(
  "products/submitReview",
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/products/${productId}/reviews`, {
        rating,
        comment,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    featuredProducts: [],
    productDetails: null,
    loading: false,
    error: null,
    reviewStatus: "idle",
    reviewError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get product details
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchFeaturedProducts
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })

      // Submit Review
      .addCase(submitReview.pending, (state) => {
        state.reviewStatus = "loading";
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.reviewStatus = "succeeded";
        // Update the product in your state if needed
        const productIndex = state.products.findIndex(
          (p) => p._id === action.payload.product._id
        );
        if (productIndex !== -1) {
          state.products[productIndex] = action.payload.product;
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.reviewStatus = "failed";
        state.reviewError = action.payload;
      });
  },
});

export default productSlice.reducer;
