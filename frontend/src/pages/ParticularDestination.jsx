import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Info,
} from "lucide-react";
import Api from "../common";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; // Import the necessary Google Maps components

const ParticularDestination = () => {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-pulse text-lg">
          Loading destination details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
        <p>No destination found</p>
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
    coordinates, // Coordinates will be used here
  } = destination;

  const center = coordinates
    ? { lat: coordinates.latitude, lng: coordinates.longitude }
    : { lat: 0, lng: 0 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {images && images.length > 0 && (
          <div className="relative h-full">
            <div className="absolute inset-0 transition-opacity duration-500">
              <img
                src={
                  images[currentImageIndex].url || "/api/placeholder/1920/1080"
                }
                alt={
                  images[currentImageIndex].alt ||
                  `${name} - Image ${currentImageIndex + 1}`
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={prevImage}
                className="p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all transform hover:scale-110"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all transform hover:scale-110"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">{name}</h1>
                <div className="flex items-center gap-4 text-lg">
                  <MapPin className="w-6 h-6" />
                  <span>{country}</span>
                  <span>•</span>
                  <span>{region}</span>
                  {rating && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        ⭐ {rating.toFixed(1)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900">
              About the Destination
            </h2>
            <p className="text-gray-600">
              {country}, {region}
            </p>
          </div>
          <p className="text-lg leading-relaxed text-gray-700">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Highlights</h2>
              </div>
              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Essential Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Essential Information
            </h2>
            <div className="space-y-6">
              {/* Best Time to Visit */}
              {bestTimeToVisit && bestTimeToVisit.length > 0 && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">
                      Best Time to Visit
                    </h3>
                  </div>
                  <p className="text-gray-700">{bestTimeToVisit.join(", ")}</p>
                </div>
              )}

              {/* Average Cost */}
              {averageCost && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">
                      Average Cost
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {averageCost.budget} {averageCost.currency}
                  </p>
                </div>
              )}

              {/* Categories */}
              {categories && categories.length > 0 && (
                <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50">
                  <div className="flex items-center gap-3 mb-3">
                    <Tag className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-gray-900">Categories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 hover:from-yellow-200 hover:to-amber-200 transition-colors cursor-default"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Map Section */}
        {coordinates && (
          <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Location</h2>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                {" "}
                {/* Add your API Key */}
                <GoogleMap
                  center={center}
                  zoom={10}
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticularDestination;
