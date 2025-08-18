import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../features/blogSlice";

export const ManageBlogsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.blogs);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs({}));
  }, [dispatch]);

  const handleSearch = () => {
    if (search.trim()) {
      dispatch(fetchBlogs({ search }));
    } else {
      dispatch(fetchBlogs({}));
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <h1 className="text-3xl font-bold text-blue-700 drop-shadow-sm">
          📚 Manage Blogs
        </h1>

        {/* Search Bar */}
        <div className="flex w-full md:w-1/2 items-center bg-white shadow rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-full outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <p className="text-gray-500 animate-pulse">Loading blogs...</p>
      )}
      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading &&
          items.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 ease-in-out"
            >
              {/* Blog Image */}
              <img
                src={
                  blog.coverImageUrl ||
                  "https://via.placeholder.com/600x300?text=No+Image"
                }
                alt={blog.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {blog.tags?.length > 0 ? (
                    blog.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">No tags</span>
                  )}
                </div>

                {/* Date */}
                <div className="mt-4 text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
