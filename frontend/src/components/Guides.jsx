import React, { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const GuideCard = ({ name, location, experience, rating, image }) => (
  <div className="min-w-[320px] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 mx-3">
    <div className="relative h-52 overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white text-xl font-semibold">{name}</h3>
        <p className="text-white/90 text-sm">{location}</p>
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating}.0)</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {experience} years of experience
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
          Cultural Tours
        </span>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
          Adventure
        </span>
      </div>
    </div>
  </div>
);

const Guides = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const guides = [
    {
      name: "Rahul Sharma",
      location: "Delhi, India",
      experience: 8,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
    {
      name: "Priya Patel",
      location: "Jaipur, India",
      experience: 6,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
    {
      name: "Arun Kumar",
      location: "Kerala, India",
      experience: 10,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
    {
      name: "Maya Singh",
      location: "Agra, India",
      experience: 7,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
    {
      name: "Maya Singh",
      location: "Agra, India",
      experience: 7,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
    {
      name: "Maya Singh",
      location: "Agra, India",
      experience: 7,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
    {
      name: "Maya Singh",
      location: "Agra, India",
      experience: 7,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
    {
      name: "Maya Singh",
      location: "Agra, India",
      experience: 7,
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    },
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 340; // Width of card + margin

    if (container) {
      const newScrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Our Expert Guides</h2>
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-hidden scroll-smooth relative"
        >
          {guides.map((guide, index) => (
            <GuideCard key={index} {...guide} />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={() => scroll("left")}
            className={`-ml-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110 ${
              !showLeftArrow
                ? "opacity-0 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            disabled={!showLeftArrow}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={() => scroll("right")}
            className={`-mr-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110 ${
              !showRightArrow
                ? "opacity-0 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
            disabled={!showRightArrow}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Guides;
