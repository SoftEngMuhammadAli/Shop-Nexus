// models/Blog.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [160, "Title must be at most 160 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    coverImageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
    readingTime: {
      type: Number, // minutes
      default: 0,
      min: 0,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// helpful compound index for common queries
blogSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Blog", blogSchema);
