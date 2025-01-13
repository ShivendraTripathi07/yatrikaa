import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  IndianRupee,
  Star,
  Heart,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";

const DestinationCard = ({ destination, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {
    _id,
    name,
    region,
    description,
    images,
    bestTimeToVisit,
    averageCost,
    categories,
    rating,
  } = destination;

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  const handleLikeClick = (e) => {
    e.preventDefault(); // Prevent link navigation
    setIsLiked(!isLiked);
    // Add your like functionality here
  };

  const handleShareClick = (e) => {
    e.preventDefault(); // Prevent link navigation
    // Add your share functionality here
  };

  return (
    <Link to={`/destinations/${_id}`} className="block">
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
        onClick={onClick}
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={images[currentImageIndex]?.url || "/api/placeholder/400/300"}
            alt={images[currentImageIndex]?.caption || name}
            className="w-full h-full object-cover"
          />

          {/* Image Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Top Actions */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={handleLikeClick}
              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
            <button
              onClick={handleShareClick}
              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4" />
              <span>{region}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">
            {truncateText(description, 100)}
          </p>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{bestTimeToVisit[0]}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-900 font-medium">
              <IndianRupee className="w-4 h-4" />
              <span>{averageCost.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
