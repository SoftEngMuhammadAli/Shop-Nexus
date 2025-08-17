import React, { useState } from "react";
import { FaUpload, FaPenFancy } from "react-icons/fa";

export const CreateBlogPage = () => {
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
    console.log("Blog Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaPenFancy className="text-indigo-600 text-2xl" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create New Blog
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Blog Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>

            {/* Slug */}
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
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Blog Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              placeholder="Write your blog content here..."
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              required
            ></textarea>
          </div>

          {/* Author + Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
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
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <div className="flex items-center gap-3">
              <FaUpload className="text-gray-500 text-lg" />
              <input
                type="url"
                name="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="flex-1 rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
            {formData.coverImageUrl && (
              <div className="mt-4">
                <img
                  src={formData.coverImageUrl}
                  alt="Cover Preview"
                  className="w-full max-h-64 object-cover rounded-xl shadow-md border"
                />
              </div>
            )}
          </div>

          {/* Status + Reading Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
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
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
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
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
              />
            </div>
          )}

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-indigo-700 shadow-md transition-all duration-200"
            >
              🚀 Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
