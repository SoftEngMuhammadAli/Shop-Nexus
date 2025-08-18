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

// ============ LIST (no pagination) ============
export const getBlogs = catchAsyncHandler(async (req, res) => {
  const { status, tag, search } = req.query;

  const canUseCache = !status && !tag && !search;

  if (canUseCache) {
    const cached = await redis.get(BLOG_LIST_KEY);
    if (cached) {
      return res.status(200).json({
        success: true,
        message: "Blogs retrieved successfully (cache)",
        data: JSON.parse(cached),
      });
    }
  }

  const query = {};
  if (status) query.status = status;
  if (tag) query.tags = tag;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const blogs = await Blog.find(query).sort({ createdAt: -1 });

  if (canUseCache) {
    await redis.set(BLOG_LIST_KEY, JSON.stringify(blogs), { EX: 60 });
  }

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

// // controllers/blogController.js
// import Blog from "../models/Blog.js";
// import redis from "../utils/redisClient.js";
// import { catchAsyncHandler } from "../middlewares/errorHandler.js";

// // Cache keys
// const BLOG_LIST_KEY = "blogs:list";
// const BLOG_KEY = (id) => `blog:${id}`;

// // Helpers
// const invalidateList = async () => {
//   await redis.del(BLOG_LIST_KEY);
// };

// // ============ CREATE ============
// export const createBlog = catchAsyncHandler(async (req, res) => {
//   const {
//     title,
//     slug,
//     content,
//     author,
//     tags = [],
//     coverImageUrl,
//     status = "draft",
//     readingTime = 0,
//     publishedAt,
//   } = req.body;

//   const blog = await Blog.create({
//     title,
//     slug,
//     content,
//     author,
//     tags,
//     coverImageUrl,
//     status,
//     readingTime,
//     publishedAt: status === "published" ? publishedAt || new Date() : null,
//   });

//   await invalidateList();

//   res.status(201).json({
//     success: true,
//     message: "Blog created successfully",
//     data: blog,
//   });
// });

// // ============ LIST (no pagination) ============
// export const getBlogs = catchAsyncHandler(async (req, res) => {
//   const { status, tag, search } = req.query;

//   const canUseCache = !status && !tag && !search;

//   if (canUseCache) {
//     const cached = await redis.get(BLOG_LIST_KEY);
//     if (cached) {
//       return res.status(200).json({
//         success: true,
//         message: "Blogs retrieved successfully (cache)",
//         data: JSON.parse(cached),
//       });
//     }
//   }

//   const query = {};
//   if (status) query.status = status;
//   if (tag) query.tags = tag;
//   if (search) {
//     query.$or = [
//       { title: { $regex: search, $options: "i" } },
//       { content: { $regex: search, $options: "i" } },
//     ];
//   }

//   const blogs = await Blog.find(query).sort({ createdAt: -1 });

//   if (canUseCache) {
//     await redis.set(BLOG_LIST_KEY, JSON.stringify(blogs), { EX: 60 });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Blogs retrieved successfully",
//     data: blogs,
//   });
// });

// // ============ GET BY ID OR SLUG ============
// export const getBlog = catchAsyncHandler(async (req, res) => {
//   const { idOrSlug } = req.params;
//   const isId = /^[a-f\d]{24}$/i.test(idOrSlug);

//   if (isId) {
//     const cached = await redis.get(BLOG_KEY(idOrSlug));
//     if (cached) {
//       return res.status(200).json({
//         success: true,
//         message: "Blog retrieved successfully (cache)",
//         data: JSON.parse(cached),
//       });
//     }
//   }

//   const blog = isId
//     ? await Blog.findById(idOrSlug)
//     : await Blog.findOne({ slug: idOrSlug });

//   if (!blog) {
//     return res.status(404).json({ success: false, message: "Blog not found" });
//   }

//   if (isId) {
//     await redis.set(BLOG_KEY(idOrSlug), JSON.stringify(blog), { EX: 120 });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Blog retrieved successfully",
//     data: blog,
//   });
// });

// // ============ UPDATE ============
// export const updateBlog = catchAsyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // If status changes to published and no publishedAt exists, set it
//   if (req.body.status === "published" && !req.body.publishedAt) {
//     req.body.publishedAt = new Date();
//   }

//   const blog = await Blog.findByIdAndUpdate(id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!blog) {
//     return res.status(404).json({ success: false, message: "Blog not found" });
//   }

//   await redis.del(BLOG_KEY(id));
//   await invalidateList();

//   res.status(200).json({
//     success: true,
//     message: "Blog updated successfully",
//     data: blog,
//   });
// });

// // ============ DELETE ============
// export const deleteBlog = catchAsyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const deleted = await Blog.findByIdAndDelete(id);
//   if (!deleted) {
//     return res.status(404).json({ success: false, message: "Blog not found" });
//   }

//   await redis.del(BLOG_KEY(id));
//   await invalidateList();

//   res.status(200).json({
//     success: true,
//     message: "Blog deleted successfully",
//   });
// });
