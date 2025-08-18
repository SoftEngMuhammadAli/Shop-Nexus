import Blog from "../models/Blog.js";
import redis from "../utils/redisClient.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";

// Cache keys
const BLOG_LIST_KEY = "blogs:list";
const BLOG_KEY = (id) => `blog:${id}`;

// Helpers
const invalidateList = async () => {
  await redis.del(BLOG_LIST_KEY);
};

// ============ CREATE ============
export const createBlog = catchAsyncHandler(async (req, res) => {
  if (!["admin", "super-admin"].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "You don't have permission to create blogs",
    });
  }

  const {
    title,
    slug,
    content,
    author,
    tags = [],
    coverImageUrl,
    status = "draft",
    readingTime = 0,
    publishedAt,
  } = req.body;

  // Validate required fields
  if (!title || !content || !author) {
    return res.status(400).json({
      success: false,
      message: "Title, content and author are required",
    });
  }

  const blog = await Blog.create({
    title,
    slug:
      slug ||
      title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    content,
    author,
    tags,
    coverImageUrl,
    status,
    readingTime,
    publishedAt: status === "published" ? publishedAt || new Date() : null,
    createdBy: req.user.id,
  });

  await invalidateList();

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

// ============ LIST ALL BLOGS ============
export const getBlogs = catchAsyncHandler(async (req, res) => {
  // Try cache first
  const cached = await redis.get(BLOG_LIST_KEY);
  if (cached) {
    return res.status(200).json({
      success: true,
      message: "Blogs retrieved successfully (cache)",
      data: JSON.parse(cached),
    });
  }

  const blogs = await Blog.find().sort({ createdAt: -1 });

  // Cache the list
  await redis.set(BLOG_LIST_KEY, JSON.stringify(blogs), { EX: 60 });

  res.status(200).json({
    success: true,
    message: "Blogs retrieved successfully",
    data: blogs,
  });
});

// ============ GET BY ID OR SLUG ============
export const getBlog = catchAsyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const isId = /^[a-f\d]{24}$/i.test(idOrSlug);

  if (isId) {
    const cached = await redis.get(BLOG_KEY(idOrSlug));
    if (cached) {
      return res.status(200).json({
        success: true,
        message: "Blog retrieved successfully (cache)",
        data: JSON.parse(cached),
      });
    }
  }

  const blog = isId
    ? await Blog.findById(idOrSlug)
    : await Blog.findOne({ slug: idOrSlug });

  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  if (isId) {
    await redis.set(BLOG_KEY(idOrSlug), JSON.stringify(blog), { EX: 120 });
  }

  res.status(200).json({
    success: true,
    message: "Blog retrieved successfully",
    data: blog,
  });
});

// ============ UPDATE ============
export const updateBlog = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.body.status === "published" && !req.body.publishedAt) {
    req.body.publishedAt = new Date();
  }

  const blog = await Blog.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  await redis.del(BLOG_KEY(id));
  await invalidateList();

  res.status(200).json({
    success: true,
    message: "Blog updated successfully",
    data: blog,
  });
});

// ============ DELETE ============
export const deleteBlog = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Blog.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }

  await redis.del(BLOG_KEY(id));
  await invalidateList();

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
  });
});
