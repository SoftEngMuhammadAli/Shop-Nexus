import React, { useState } from "react";
import { FiTrash2, FiFileText } from "react-icons/fi";

const DeleteBlogPage = () => {
  // Dummy blogs (replace with API later)
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Understanding Microservices",
      author: "Ali Raza",
      date: "2025-08-10",
    },
    {
      id: 2,
      title: "React vs Next.js",
      author: "Sara Khan",
      date: "2025-08-20",
    },
    {
      id: 3,
      title: "Mastering Node.js APIs",
      author: "John Doe",
      date: "2025-08-25",
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 flex items-center gap-2">
          <FiFileText /> Delete Blogs
        </h1>

        {blogs.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-orange-100 text-left">
                <th className="p-3 font-semibold">Title</th>
                <th className="p-3 font-semibold">Author</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="p-3">{blog.title}</td>
                  <td className="p-3">{blog.author}</td>
                  <td className="p-3">{blog.date}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition flex items-center gap-2 mx-auto"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default DeleteBlogPage;
