import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api from "../common";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getAllReview = async () => {
    try {
      const responseData = await fetch(Api.getAllReviews.url, {
        method: Api.getAllReviews.method,
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      const data = await responseData.json();
      if (data.success) {
        setReviews(data.data);
      } else {
        toast.error("Failed to fetch reviews");
      }
    } catch (error) {
      toast.error("An error occurred while fetching reviews");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllReview();
  }, []);

  const handleNext = () => {
    setCurrentStartIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 3));
  };

  const handlePrev = () => {
    setCurrentStartIndex((prev) =>
      prev - 3 < 0
        ? Math.max(0, reviews.length - (reviews.length % 3 || 3))
        : prev - 3
    );
  };

  const handleVisitDestination = (destinationId) => {
    navigate(`/destinations/${destinationId}`);
  };

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 text-center">
        <p className="text-gray-500">No reviews available</p>
      </section>
    );
  }

  const visibleReviews = reviews.slice(
    currentStartIndex,
    currentStartIndex + 3
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Traveler Reviews</h2>
        <p className="text-gray-600">Experiences shared by our adventurers</p>
      </div>

      <div className="relative">
        <div className="grid md:grid-cols-3 gap-6">
          {visibleReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-6 rounded-2xl shadow-lg relative"
            >
              {/* User Image */}
              <div className="absolute top-4 left-4">
                <img
                  src={
                    review.user?.profilePicture ||
                    "data:image/png;base64,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"
                  }
                  alt={review.user?.username || "Anonymous"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
              </div>

              {/* Review Content */}
              <div className="ml-24">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current"
                      size={20}
                    />
                  ))}
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {review.title}
                </h3>

                <p className="text-gray-700 mb-4 italic text-md line-clamp-3">
                  "{review.content}"
                </p>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-lg font-bold mb-1">
                    {review.destination?.name}
                  </h4>
                  <p className="text-gray-600 mb-4 text-sm">
                    {review.destination?.region}, {review.destination?.country}
                  </p>

                  <button
                    onClick={() =>
                      handleVisitDestination(review.destination?._id)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm -bottom-10 "
                  >
                    Visit Destination
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {reviews.length > 3 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-blue-50 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Review Counter */}
      {/* <div className="text-center mt-8 text-gray-500">
        {currentStartIndex + 1} - {currentStartIndex + visibleReviews.length} /{" "}
        {reviews.length} Reviews
      </div> */}
    </section>
  );
};

export default Reviews;
