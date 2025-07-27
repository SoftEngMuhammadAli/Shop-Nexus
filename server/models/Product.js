import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    productDescription: {
      type: String,
      trim: true,
      default: "No description provided",
    },
    productPrice: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be at least 0"],
    },
    productQuantity: {
      type: Number,
      default: 1,
      min: [1, "Minimum quantity is 1"],
      max: [10, "Maximum quantity is 10"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
