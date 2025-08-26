import React, { useState } from "react";
import HeroSection from "../../components/user/HeroSection";
import { categories } from "../../data/products";
import { useFetchData } from "../../hooks/useCustomHook";
import { Loader } from "../../components/common/Loader";
import NewsLetterSubscription from "../../components/user/NewsLetterSubscription";
import { CustomCard } from "../../components/ui/CustomCard";
import { ShowError } from "../../components/common/Error";
import { toast } from "react-toastify";

const HomePage = () => {
  // Fetch products dynamically
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetchData(`${import.meta.env.VITE_API_BASE_URL}/api/products/all`);

  // Fetch blogs dynamically
  const {
    data: blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useFetchData(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Explore our diverse range of products tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-2 m-10 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() =>
                (window.location.href = `/products?category=${category.name}`)
              }
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <h3 className="text-lg font-semibold text-gray-800 truncate w-full">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1 flex-1 line-clamp-2">
                  {category.description || "Explore products in this category."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Uploaded Products */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
                Latest Uploaded Products
              </h2>
              <button
                className="text-blue-500 font-medium hover:underline transition-colors"
                onClick={() => {
                  toast.info("Redirecting to all products...");
                  setTimeout(() => {
                    window.location.href = "/products";
                  }, 2000);
                }}
              >
                View All
              </button>
            </div>

            <p className="text-gray-600 mb-2">
              Check out the newest additions to our store, carefully selected
              for quality and style.
            </p>
            <p className="text-gray-600">
              Discover trending products, innovative gadgets, and everyday
              essentials that meet your needs.
            </p>
          </div>

          {productsLoading && (
            <div className="text-center py-6 text-gray-500">
              <Loader />
            </div>
          )}

          {productsError && (
            <div className="text-center py-6 text-red-500">
              <ShowError error={productsError} />
            </div>
          )}

          {!productsLoading && !productsError && productsData?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsData
                .slice(0, 8) // show latest 8 products
                .map((product) => (
                  <CustomCard
                    key={product._id}
                    image={product.image || product.imageUrl}
                    title={product.name}
                    description={product.description || "No description"}
                    meta={`$${product.price}`}
                    buttonText="View Details"
                    onButtonClick={() => {
                      toast.info("Redirecting to product details...");
                    }}
                  />
                ))}
            </div>
          )}

          {!productsLoading && !productsError && productsData?.length === 0 && (
            <p className="text-gray-500 text-center py-6">No products found.</p>
          )}
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 sm:mb-0">
                Latest Blogs
              </h2>
              <button
                className="text-blue-500 font-medium hover:underline transition-colors"
                onClick={() => {
                  toast.info("Redirecting to all blogs...");
                  setTimeout(() => {
                    window.location.href = "/blogs";
                  }, 2000);
                }}
              >
                View All
              </button>
            </div>

            <p className="text-gray-600">
              Stay updated with the latest trends and insights from our blog.
            </p>
            <p className="text-gray-600">
              Explore our diverse range of topics and find inspiration for your
              next project.
            </p>
          </div>

          {blogsLoading && (
            <div className="text-center py-6 text-gray-500">
              <Loader />
            </div>
          )}

          {blogsError && (
            <div className="text-center py-6 text-red-500">
              <ShowError error={blogsError} />
            </div>
          )}

          {!blogsLoading && !blogsError && blogs?.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogs.slice(0, 6).map((blog) => (
                <CustomCard
                  key={blog._id}
                  image={blog.coverImageUrl || blog.image}
                  title={blog.title}
                  description={blog.excerpt || blog.content || "No content"}
                  meta={`${blog.readingTime || "1m"} read`}
                  buttonText="Read More"
                  onButtonClick={() =>
                    window.open(`/blogs/${blog._id}`, "_blank")
                  }
                />
              ))}
            </div>
          )}

          {!blogsLoading && !blogsError && blogs?.length === 0 && (
            <p className="text-gray-500 text-center py-6">No blogs found.</p>
          )}
        </div>
      </section>

      {/* News Letter Subscription */}
      <NewsLetterSubscription />
    </>
  );
};

export default HomePage;
