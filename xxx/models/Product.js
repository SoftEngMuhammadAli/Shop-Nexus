import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
      max: 10,
    },
    price: {
      type: Number,
      default: 0,
      min: 1,
      max: 1000,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
