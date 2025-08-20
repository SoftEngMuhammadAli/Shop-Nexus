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
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    coverImageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1752503650851-cbc3f8b00679?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "published", "draft"],
      default: "draft",
      index: true,
    },
    readingTime: {
      type: Number,
      default: 0,
      min: 1,
      max: 60,
      required: true,
    },
  },
  { timestamps: true }
);

// helpful compound index for common queries
blogSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("Blog", blogSchema);
