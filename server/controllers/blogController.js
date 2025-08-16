// controllers/blogController.js
import Blog from "../models/Blog.js";
import redis from "../utils/redisClient.js";
import { catchAsyncHandler } from "../middlewares/errorHandler.js";

// Cache keys
const BLOG_LIST_KEY = "blogs:list"; // list cache (basic)
const BLOG_KEY = (id) => `blog:${id}`;

// Helpers
const invalidateList = async () => {
  await redis.del(BLOG_LIST_KEY);
};

// ============ CREATE ============
export const createBlog = catchAsyncHandler(async (req, res) => {
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

  const blog = await Blog.create({
    title,
    slug,
    content,
    author,
    tags,
    coverImageUrl,
    status,
    readingTime,
    publishedAt: status === "published" ? publishedAt || new Date() : null,
  });

  await invalidateList();

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
});

// ============ LIST (with basic filters + pagination) ============
export const getBlogs = catchAsyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status, tag, search } = req.query;

  // Only cache simplest case (first page with no filters) to keep cache logic simple.
  const canUseListCache =
    Number(page) === 1 && Number(limit) === 10 && !status && !tag && !search;

  if (canUseListCache) {
    const cached = await redis.get(BLOG_LIST_KEY);
    if (cached) {
      return res.status(200).json({
        success: true,
        message: "Blogs retrieved successfully (cache)",
        data: cached,
      });
    }
  }

  const query = {};
  if (status) query.status = status;
  if (tag) query.tags = tag;
  if (search) {
    // simple text search on title/content
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Blog.countDocuments(query),
  ]);

  const payload = {
    items,
    page: Number(page),
    limit: Number(limit),
    total,
    totalPages: Math.ceil(total / Number(limit || 1)),
  };

  if (canUseListCache) {
    await redis.set(BLOG_LIST_KEY, JSON.stringify(payload), { EX: 60 }); // 60s TTL
  }

  res.status(200).json({
    success: true,
    message: "Blogs retrieved successfully",
    data: payload,
  });
});

// ============ GET BY ID OR SLUG ============
export const getBlog = catchAsyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  // Cache only when it's a MongoId-looking id (to avoid cache explosion on arbitrary slugs).
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
