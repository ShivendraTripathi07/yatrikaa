import React from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy3QJFsKptxi0I3J3s8HON-yIfK7Ow034jnQ&s",
    location: "Mumbai",
    rating: 5,
    date: "February 2024",
    comment:
      "The trip to Munnar was breathtaking. The tea gardens and mountain views were exactly as promised. Our guide was exceptional.",
  },
  {
    id: 2,
    name: "Rahul Verma",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG4HTxMlFrL4q7kTMzSWCzhRCbdPz65eBEUw&s",
    location: "Delhi",
    rating: 5,
    date: "January 2024",
    comment:
      "Visiting the Red Fort was a highlight of our Delhi tour. The historical insights and organization were perfect.",
  },
  {
    id: 3,
    name: "Anjali Patel",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6afBUb1pRUHoIpHchx1yslDjVdpk8CqqxOw&s",
    location: "Bangalore",
    rating: 5,
    date: "March 2024",
    comment:
      "The Ayodhya trip was well-organized and spiritually enriching. Every detail was taken care of.",
  },
];

const Reviews = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Traveler Reviews</h2>
        <p className="text-gray-600">What our happy customers say about us</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
          >
            <Quote
              className="absolute top-6 right-6 text-blue-600 opacity-20"
              size={40}
            />

            <div className="flex items-start gap-4 mb-6">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {review.name}
                </h3>
                <p className="text-gray-500 text-sm">{review.location}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400 fill-current"
                  size={18}
                />
              ))}
            </div>

            <p className="text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem] italic">
              "{review.comment}"
            </p>

            <div className="text-sm font-medium text-gray-400">
              {review.date}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl">
          View All Reviews
        </button>
      </div>
    </section>
  );
};

export default Reviews;
