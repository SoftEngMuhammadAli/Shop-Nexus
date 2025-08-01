import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model("Wishlist", wishlistSchema);
