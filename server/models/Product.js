import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "No description provided",
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be at least 0"],
    },
    quantity: {
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
