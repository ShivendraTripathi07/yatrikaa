import React from "react";
import { Star, MapPin, ChevronRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "The Red Fort, New Delhi",
    image:
      "https://hblimg.mmtcdn.com/content/hubble/img/delhi/mmt/activities/m_activities_delhi_red_fort_l_341_817.jpg",
    description: "Historic red sandstone monument, UNESCO World Heritage site",
    rating: 4.9,
    reviews: 2156,
    location: "New Delhi, India",
  },
  {
    id: 2,
    name: "Tea Garden, Munnar",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/e9/52/a2/sunset-at-tata-tea-gardens.jpg?w=900&h=500&s=1",
    description: "Sprawling tea plantations with misty mountain views",
    rating: 4.8,
    reviews: 1893,
    location: "Kerala, India",
  },
  {
    id: 3,
    name: "Valley of Flowers",
    image:
      "https://static.toiimg.com/thumb/msid-92089121,width-748,height-499,resizemode-4,imgsize-139308/Most-beautiful-places-to-visit-in-India-for-first-timers.jpg",
    description: "National park known for endemic alpine flowers",
    rating: 4.9,
    reviews: 1654,
    location: "Uttarakhand, India",
  },
  {
    id: 4,
    name: "Ram Mandir, Ayodhya",
    image:
      "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202402/ram-mandir-090538288-16x9_0.jpg?VersionId=ElGADlohi3BhirOA1bSwXDf4P8_F90a7",
    description: "Magnificent temple complex of cultural significance",
    rating: 4.8,
    reviews: 1432,
    location: "Uttar Pradesh, India",
  },
];

const PopularDestination = ({ title, subtitle }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
          View all <ChevronRight size={20} />
        </button>
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

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center font-medium">
                Explore Destination
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularDestination;
