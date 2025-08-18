import React, { useState } from "react";
import { FaUpload, FaPenFancy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../../features/blogSlice";
import { Loader } from "../../../components/common/Loader";
import { ShowError } from "../../../components/common/Error";

export const CreateBlogPage = () => {
  const { loading, error } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    author: "",
    tags: "",
    coverImageUrl: "",
    status: "draft",
    readingTime: 0,
    publishedAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    dispatch(createBlog(blogData));
    console.log("Blog Data:", formData);

    // Reset form
    setFormData({
      title: "",
      slug: "",
      content: "",
      author: "",
      tags: "",
      coverImageUrl: "",
      status: "draft",
      readingTime: 0,
      publishedAt: "",
    });
  };

  if (loading) return <Loader />;
  if (error) return <ShowError error={error} />;

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
          {/* Blog Title + Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="example-blog-slug"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
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

          {/* Author + Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="tech, react, javascript"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
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
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reading Time (mins)
              </label>
              <input
                type="number"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
          </div>

          {/* Publish Date */}
          {formData.status === "published" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publish Date
              </label>
              <input
                type="datetime-local"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
          )}

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 shadow-md transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "⏳ Publishing..." : "🚀 Publish Blog"}
            </button>
          </div>

          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};
