import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeNewsletter,
  clearNewsletterState,
} from "../../features/newsLetterSlice";
import { toast } from "react-toastify";

const NewsLetterSubscription = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newsletter);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email");
      return;
    }
    dispatch(subscribeNewsletter(email));
  };

  // handle success & error feedback
  useEffect(() => {
    if (success) {
      toast.success(success);
      setEmail("");
      dispatch(clearNewsletterState());
    }
    if (error) {
      toast.error(error);
      dispatch(clearNewsletterState());
    }
  }, [success, error, dispatch]);

  return (
    <section className="relative py-16 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white overflow-hidden">
      {/* Decorative Floating Blobs */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
          Stay Updated! 🚀
        </h2>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Subscribe to get the latest updates on products, deals, and blogs
          delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-full border border-gray-300 w-full sm:w-1/2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            } text-indigo-900 px-8 py-4 rounded-full font-semibold shadow-lg transform hover:scale-105 transition`}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <p className="mt-4 text-sm text-white/70">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default NewsLetterSubscription;
