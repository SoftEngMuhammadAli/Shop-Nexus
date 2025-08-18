import Blog from "../models/Blog.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = catchAsyncHandler(async (req, res) => {
  const blogs = await Blog.find({})
    .populate("author", "name email") // populate author name and email
    .sort({ createdAt: -1 }); // newest first

  res.status(200).json({
    success: true,
    count: blogs.length,
    data: blogs,
  });
});

// @desc    Get a single blog by ID
// @route   GET /api/blogs/:id
// @access  Public
export const getBlog = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate("author", "name email");

  if (!id || !blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Create a new blog
// @route   POST /api/blogs
// @access  Private
export const createBlog = catchAsyncHandler(async (req, res) => {
  const { title, content, tags, coverImageUrl, status, readingTime } = req.body;

  if ((!title, !content, !tags, !coverImageUrl, !status, !readingTime)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const blog = await Blog.create({
    title,
    content,
    tags,
    coverImageUrl,
    status,
    readingTime,
    author: req.user._id,
  });

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  const populatedBlog = await blog.populate("author", "name email");

  if (!populatedBlog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.status(201).json({
    success: true,
    data: populatedBlog,
  });
});

// @desc    Update a blog by ID
// @route   PUT /api/blogs/:id
// @access  Private
export const updateBlog = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  let blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  // Only the author or admin can update
  if (
    blog.author.toString() !== req.user._id.toString() &&
    req.user.userRole !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to update this blog",
    });
  }

  blog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate("author", "name email");

  res.status(200).json({
    success: true,
    data: blog,
  });
});

// @desc    Delete a blog by ID
// @route   DELETE /api/blogs/:id
// @access  Private
export const deleteBlog = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
    });
  }

  // Only the author or admin can delete
  if (
    blog.author.toString() !== req.user._id.toString() &&
    req.user.userRole !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this blog",
    });
  }

  await blog.remove();

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});
