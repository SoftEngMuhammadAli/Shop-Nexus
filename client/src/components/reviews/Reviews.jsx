import { useState } from "react";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { submitReview } from "../../features/products/productSlice";
import { useDispatch } from "react-redux";

const Reviews = ({ productId, reviews = [] }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    dispatch(submitReview({ productId, rating, comment }));
    setRating(0);
    setComment("");
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-center mb-2">
                <div className="mr-4">
                  {review.user?.avatar ? (
                    <img
                      src={review.user.avatar}
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {review.user?.name || "Anonymous"}
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} className="text-yellow-400" />
                      ) : (
                        <FaRegStar key={i} className="text-yellow-400" />
                      )
                    )}
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {user ? (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Rating</label>
              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <label key={i}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        className="hidden"
                      />
                      <FaStar
                        className="text-2xl cursor-pointer"
                        color={
                          ratingValue <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                id="comment"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Share your thoughts about this product..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-8 p-4 bg-gray-50 rounded-md">
          <p className="text-gray-600">
            Please{" "}
            <a href="/login" className="text-primary hover:underline">
              sign in
            </a>{" "}
            to write a review.
          </p>
        </div>
      )}
    </div>
  );
};

export default Reviews;
