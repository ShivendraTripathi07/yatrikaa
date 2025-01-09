import React from "react";
import { Shield, Clock, Compass, Globe, Map, Headphones } from "lucide-react";

const featureBoxes = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Safe Travel",
    description: "Verified accommodations and guided tours for your safety",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your travel needs",
  },
  {
    icon: <Compass className="w-8 h-8" />,
    title: "Expert Guides",
    description: "Local experts to enhance your travel experience",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Best Deals",
    description: "Competitive prices with our price match guarantee",
  },
  {
    icon: <Map className="w-8 h-8" />,
    title: "Custom Tours",
    description: "Personalized itineraries tailored to your preferences",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Quick Response",
    description: "Immediate assistance for urgent travel queries",
  },
];

const Boxes = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Why Choose Us</h2>
        <p className="text-gray-600">
          Experience the difference with our premium services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureBoxes.map((box, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-4 rounded-full mb-4 text-blue-600">
                {box.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{box.title}</h3>
              <p className="text-gray-600">{box.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Boxes;
