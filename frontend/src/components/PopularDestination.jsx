import React from "react";
import { Star, MapPin, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PopularDestination = ({ title, subtitle, destinations }) => {
  const navigate = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <Link
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
          // onClick={navigate("/destinations")}
          to={"/destinations"}
        >
          View all <ChevronRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                <div className="flex items-center text-white">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm font-medium">{dest.location}</span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg h-14 mb-2 line-clamp-2">
                {dest.name}
              </h3>
              <p className="text-gray-600 text-sm h-10 mb-4 line-clamp-2">
                {dest.description}
              </p>

              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 fill-current" size={16} />
                <span className="ml-1 font-medium">{dest.rating}</span>
                <span className="text-gray-500 text-sm ml-2">
                  ({dest.reviews.toLocaleString()} reviews)
                </span>
              </div>

              <Link
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                to={"/destinations"}
              >
                Explore Destination
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestination;
