import React, { useState, useEffect } from "react";
import { FaUpload, FaPenFancy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, resetBlogState } from "../../../features/blogSlice";
import { toast } from "react-toastify";

export const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const { creating, createError, createdBlog } = useSelector(
    (state) => state.blogs
  );

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    coverImageUrl: "",
    status: "Pending",
    readingTime: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      coverImageUrl: formData.coverImageUrl.trim(),
      status: formData.status.toLocaleLowerCase(),
      readingTime: Number(formData.readingTime),
    };

    console.log("📤 Submitting payload:", payload);

    if (
      !payload.title ||
      !payload.content ||
      payload.tags.length === 0 ||
      !payload.coverImageUrl ||
      !payload.status ||
      !payload.readingTime
    ) {
      toast.error(
        "Please fill title, content, at least one tag, cover image URL, status, and reading time."
      );
      console.log("❌ Validation failed", payload);
      return;
    }

    try {
      const result = await dispatch(createBlog(payload)).unwrap();
      console.log("✅ Blog created response:", result);
      toast.success("🎉 Blog created successfully!");
      setFormData({
        title: "",
        content: "",
        tags: "",
        coverImageUrl: "",
        status: "Pending",
        readingTime: 1,
      });
      dispatch(resetBlogState());
    } catch (err) {
      console.error("🔥 Blog creation failed:", err);
    }
  };

  useEffect(() => {
    if (createError) toast.error(createError);
  }, [createError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <FaPenFancy className="text-indigo-600 text-3xl" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create Blog Post
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              placeholder="Write your blog content here..."
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              required
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma separated) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tech, react, javascript"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              required
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <FaUpload className="text-gray-500 text-lg" />
              <input
                type="url"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>
            {formData.coverImageUrl && (
              <div className="mt-4">
                <img
                  src={formData.coverImageUrl}
                  alt="Cover Preview"
                  className="w-full max-h-72 object-cover rounded-lg shadow-md border"
                />
              </div>
            )}
          </div>

          {/* Status + Reading Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reading Time (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                min="1"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={creating}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {creating ? "⏳ Publishing..." : "🚀 Publish Blog"}
            </button>
          </div>

          {createError && <p className="text-red-600 mt-4">{createError}</p>}
        </form>
      </div>
    </div>
  );
};
