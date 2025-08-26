import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../features/blogSlice";
import SearchBar from "../../../components/common/SearchBar";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ManageBlogsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // 🔍 filtering blogs locally
  const filteredBlogs = items.filter((blog) => {
    const searchLower = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.content.toLowerCase().includes(searchLower) ||
      blog.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <h1 className="text-3xl font-bold text-blue-700 drop-shadow-sm">
          📚 Manage Blogs{" "}
        </h1>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search blogs... (title, content, tags)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={() => {}}
        />
      </div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-gray-500 animate-pulse">Loading blogs...</p>
      )}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {!loading &&
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="relative bg-white/60 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1 transition duration-300 ease-in-out"
            >
              {/* Cover Image */}
              <img
                src={
                  blog.coverImageUrl ||
                  "https://via.placeholder.com/600x300?text=No+Image"
                }
                alt={blog.title}
                className="w-full h-44 object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {blog.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {blog.tags?.length > 0 ? (
                    blog.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No tags</span>
                  )}
                </div>

                {/* Date + Status */}
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                      blog.status === "Published"
                        ? "bg-green-100 text-green-600"
                        : blog.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {blog.status || "Draft"}
                  </span>
                </div>
              </div>

              {/* Floating Action Bar */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => {
                    navigate(`/admin/blogs/edit/${blog._id}`);
                  }}
                  className="p-2 bg-white/80 rounded-full shadow hover:bg-blue-50 transition"
                >
                  <FiEdit2 className="text-blue-600" />
                </button>
                <button
                  onClick={() => toast.info("Delete feature coming soon!")}
                  className="p-2 bg-white/80 rounded-full shadow hover:bg-red-50 transition"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
