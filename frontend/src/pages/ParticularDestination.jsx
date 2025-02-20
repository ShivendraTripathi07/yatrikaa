import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Info,
  Star,
  User,
  Clock,
  Send,
  Upload,
  Heart,
  Share2,
  X,
} from "lucide-react";
import Api from "../common";
import { useSelector } from "react-redux";
import Context from "../context";
import { toast } from "react-toastify";
import Header from "../components/Header";
import uploadImage from "../common/cloudinary";
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

const ParticularDestination = () => {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const users = useSelector((state) => state?.user?.user);
  const context = useContext(Context);

  // Review form state
  const [reviewInput, setReviewInput] = useState({
    title: "",
    content: "",
    rating: 5,
    images: [],
  });

  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setReviewInput((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setIsUploading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(Api.postReview.url, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          setReviewInput((prev) => ({
            ...prev,
            images: [
              ...prev.images,
              {
                url: data.url,
                caption: file.name,
              },
            ],
          }));
          alert("Image uploaded successfully!");
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setReviewInput((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(Api.postReview.url, {
        method: Api.postReview.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: users._id,
          destination: destinationId,
          title: reviewInput.title,
          content: reviewInput.content,
          rating: reviewInput.rating,
          images: reviewInput.images,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setShowReviewModal(false);
        setReviewInput({ title: "", content: "", rating: 5, images: [] });
        fetchReviews();
      }
    } catch (error) {
      console.error("Review submission error:", error);
      alert("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  // if (!showReviewModal) return null;

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${Api.getReview.url}/${destinationId}`, {
        method: Api.getReview.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const reviewData = await response.json();
      console.log(reviewData);
      if (reviewData.success) {
        setReviews(reviewData.data);
      } else {
        console.error("Failed to fetch reviews:", reviewData.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${Api.getOneDestination.url}/${destinationId}`,
          {
            method: Api.getOneDestination.method,
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();

        if (result.success && result.data) {
          setDestination(result.data);
        } else {
          setError(result.message || "Failed to fetch destination data");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("An error occurred while fetching the destination data");
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) {
      fetchDestination();
      fetchReviews();
    }
  }, [destinationId]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === (destination?.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (destination?.images?.length || 1) - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const {
    name,
    description,
    highlights,
    country,
    region,
    rating,
    averageCost,
    bestTimeToVisit,
    categories,
    images,
  } = destination;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-screen max-h-[85vh] overflow-hidden">
        {images && images.length > 0 && (
          <div className="relative h-full">
            <div className="absolute inset-0 transition-all duration-1000 ease-in-out transform">
              <img
                src={
                  images[currentImageIndex].url || "/api/placeholder/1920/1080"
                }
                alt={`${name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between px-8">
              <button
                onClick={prevImage}
                className="group p-3 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-blue-400" />
              </button>
              <button
                onClick={nextImage}
                className="group p-3 rounded-full bg-black/20 hover:bg-white/20 backdrop-blur-lg transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:text-blue-400" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute top-8 right-8 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black via-black/70 to-transparent">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-6xl font-bold mb-6 text-white tracking-tight animate-fade-up">
                  {name}
                </h1>
                <div className="flex items-center gap-6 text-lg text-white/90">
                  <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <MapPin className="w-5 h-5" />
                    <span>{country}</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                  <span>{region}</span>
                  {rating && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-white/50" />
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span>{rating.toFixed(1)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-16 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Heart className="w-5 h-5" />
              Save
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 className="w-5 h-5" />
              Share
            </button>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <Star className="w-5 h-5" />
            Write a Review
          </button>
        </div>

        {/* Overview Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {name}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            {averageCost && (
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Average Cost
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {averageCost.budget} {averageCost.currency}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {bestTimeToVisit && (
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Best Time to Visit
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {bestTimeToVisit.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Highlights Section */}
        {highlights && highlights.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center flex-shrink-0 font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-lg text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Reviews</h2>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-semibold">
                {rating?.toFixed(1) || 0}
              </span>
              <span className="text-gray-500">({reviews.length} reviews)</span>
            </div>
          </div>

          <div className="space-y-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border-b border-gray-100 pb-8 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-medium text-lg">
                      {review.user.username.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.user.username}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{review.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {review.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {review.content}
                </p>
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt={`Review image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Write a Review"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={reviewInput.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="focus:outline-none transform hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= reviewInput.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review
            </label>
            <textarea
              name="content"
              value={reviewInput.content}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={isUploading}
              />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-4">
              {reviewInput.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                {/* <div className="animate-spin">
                  <Loader className="w-5 h-5" />
                </div> */}
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5" />
                <span>Submit Review</span>
              </div>
            )}
          </button>
        </form>
      </Modal>

      {/* Success Toast
      {showSuccessToast && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 flex items-center gap-3 animate-slide-up">
          <div className="p-2 bg-green-100 rounded-full">
            <Check className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-gray-800">Review submitted successfully!</p>
        </div>
      )} */}

      {/* Image Preview Modal */}
      <Modal
        // isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        className="max-w-4xl"
      >
        {
          <div className="relative">
            <img
              src={images.url}
              alt={images.caption}
              className="w-full h-auto rounded-lg"
            />
            <button
              onClick={() => images(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        }
      </Modal>
    </div>
  );
};

export default ParticularDestination;
