import React from "react";
import { useFetchData } from "../../../hooks/useCustomHook";
import { Loader } from "../../../components/common/Loader";
import { ShowError } from "../../../components/common/Error";
import { CustomCard } from "../../../components/ui/CustomCard";

const ViewAllBlogsPage = () => {
  // Fetch blogs dynamically
  const {
    data: blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useFetchData(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`);

  return (
    <>
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
                See All Blogs
              </h2>
            </div>
            <p className="text-gray-600">
              Stay updated with the latest trends and insights from our blog.
            </p>
            <p className="text-gray-600">
              Explore our diverse range of topics and find inspiration for your
              next project.
            </p>
          </div>

          {blogsLoading ? (
            <div className="text-center py-6 text-gray-500">
              <Loader />
            </div>
          ) : blogsError ? (
            <div className="text-center py-6 text-red-500">
              <ShowError error={blogsError} />
            </div>
          ) : blogs?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <CustomCard
                  key={blog._id}
                  image={blog.coverImageUrl || blog.image}
                  title={blog.title}
                  description={
                    (blog.excerpt || blog.content || "No content").slice(
                      0,
                      120
                    ) + "..."
                  }
                  meta={`${blog.readingTime || "1m"} read`}
                  buttonText="Read More"
                  onButtonClick={() =>
                    window.open(`/blogs/${blog._id}`, "_blank")
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No blogs found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ViewAllBlogsPage;
