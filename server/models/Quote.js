import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    author: { type: String, default: "Unknown" },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
