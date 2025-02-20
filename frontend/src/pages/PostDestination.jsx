import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Api from "../common";
import Context from "../context";
import { PlusCircle, MinusCircle, ImagePlus, Trash2 } from "lucide-react";
import Header from "../components/Header";

import { MapPin, Globe, Star, DollarSign, Tags, Camera } from "lucide-react";
import { motion } from "framer-motion";
import uploadImage from "../common/cloudinary";
const PostDestination = () => {
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context);
  const [data, setData] = useState({
    name: "",
    country: "",
    region: "",
    description: "",
    highlights: [""],
    images: [],
    coordinates: {
      type: "Point",
      coordinates: ["", ""],
    },
    bestTimeToVisit: [""],
    averageCost: {
      budget: 1,
      currency: "INR",
    },
    categories: [""],
    rating: 4,
  });
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const uploadedImage = await uploadImage(file);

      setData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          {
            url: uploadedImage.url,
            caption: file.name,
          },
        ],
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = (e, field, index, subfield) => {
    const value = e.target.value;
    setData((prev) => {
      const newData = { ...prev };

      if (Array.isArray(newData[field])) {
        if (typeof newData[field][0] === "object") {
          newData[field][index][subfield] = value;
        } else {
          newData[field][index] = value;
        }
      } else if (field === "coordinates") {
        newData.coordinates.coordinates[index] = value;
      } else if (field === "averageCost") {
        newData.averageCost[subfield] = value;
      } else {
        newData[field] = value;
      }

      return newData;
    });
  };

  const addArrayField = (field) => {
    setData((prev) => {
      const newData = { ...prev };
      if (field === "images") {
        newData[field].push({ url: "", caption: "" });
      } else if (Array.isArray(newData[field])) {
        newData[field].push("");
      }
      return newData;
    });
  };

  const removeArrayField = (field, index) => {
    setData((prev) => {
      const newData = { ...prev };
      newData[field].splice(index, 1);
      return newData;
    });
  };

  const postDestination = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetch(Api.postDestination.url, {
        method: Api.postDestination.method,
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const response = await responseData.json();
      if (response.success) {
        toast.success("Destination posted successfully!");
        setData({
          name: "",
          country: "",
          region: "",
          description: "",
          highlights: [""],
          images: [{ url: "", caption: "" }],
          coordinates: { coordinates: ["", ""] },
          bestTimeToVisit: [""],
          averageCost: { budget: 1, currency: "INR" },
          categories: [""],
          rating: 4,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while posting the destination");
    }
  };

  useEffect(() => {}, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <p className="text-center text-gray-600">Please login to continue</p>
        </div>
      </div>
    );
  }

  const CATEGORY_OPTIONS = [
    "Beach",
    "Mountain",
    "City",
    "Cultural",
    "Adventure",
    "Wildlife",
  ];

  const CURRENCY_OPTIONS = ["USD", "EUR", "INR", "GBP", "AUD"];

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <div className=" bg-red-800">
        <Header />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl mb-8 p-8 border border-blue-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-900 mb-4 tracking-tight">
          Share Your Travel Experience
        </h1>
        <p className="text-center text-gray-600 text-lg">
          Hello,{" "}
          <span className="font-semibold text-blue-700">{user.username}</span>!
          Help others discover amazing destinations by sharing your journey.
        </p>
      </motion.div>

      <form onSubmit={postDestination} className="space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-blue-100"
        >
          {/* Basic Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="mr-2 text-blue-500" size={18} />
                Destination Name
              </label>
              <input
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={data.name}
                onChange={(e) => handleChange(e, "name")}
                placeholder="Enter destination name"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Globe className="mr-2 text-blue-500" size={18} />
                Country
              </label>
              <input
                required
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={data.country}
                onChange={(e) => handleChange(e, "country")}
                placeholder="Enter country"
              />
            </div>

            {/* New Region Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="mr-2 text-blue-500" size={18} />
                Region
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={data.region}
                onChange={(e) => handleChange(e, "region")}
                placeholder="Enter region/state"
              />
            </div>

            {/* Rating remains the same */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Star className="mr-2 text-blue-500" size={18} />
                Rating
              </label>
              <select
                className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={data.rating}
                onChange={(e) => handleChange(e, "rating")}
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              className="w-full px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-40"
              value={data.description}
              onChange={(e) => handleChange(e, "description")}
              placeholder="Share your unique travel experience..."
            />
          </div>

          {/* Coordinates and Cost Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="mr-2 text-blue-500" size={18} />
                Coordinates
              </label>
              <div className="flex gap-4">
                <input
                  required
                  type="number"
                  step="0.0001"
                  className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={data.coordinates.coordinates[0]}
                  onChange={(e) => handleChange(e, "coordinates", 0)}
                  placeholder="Longitude"
                />
                <input
                  required
                  type="number"
                  step="0.0001"
                  className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={data.coordinates.coordinates[1]}
                  onChange={(e) => handleChange(e, "coordinates", 1)}
                  placeholder="Latitude"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <DollarSign className="mr-2 text-blue-500" size={18} />
                Average Cost
              </label>
              <div className="flex gap-4">
                <input
                  required
                  type="number"
                  className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={data.averageCost.budget}
                  onChange={(e) => handleChange(e, "averageCost", 0, "budget")}
                  placeholder="Budget"
                />
                <select
                  className="w-32 px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={data.averageCost.currency}
                  onChange={(e) =>
                    handleChange(e, "averageCost", 0, "currency")
                  }
                >
                  {CURRENCY_OPTIONS.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Highlights Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-blue-100 mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Tags className="mr-2 text-blue-500" size={18} />
                Highlights
              </label>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                onClick={() => addArrayField("highlights")}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Highlight
              </button>
            </div>
            {data.highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <input
                  required
                  className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={highlight}
                  onChange={(e) => handleChange(e, "highlights", index)}
                  placeholder="Enter destination highlight"
                />
                {data.highlights.length > 1 && (
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-red-600 focus:outline-none"
                    onClick={() => removeArrayField("highlights", index)}
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
        {/* Images Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-blue-100 mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Camera className="mr-2 text-blue-500" size={18} />
                Images
              </label>
              <label
                htmlFor="image-upload"
                className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors cursor-pointer"
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                Upload Image
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* Image Preview Grid */}
            {data.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden shadow-md"
                  >
                    <img
                      src={image.url}
                      alt={image.caption || `Destination image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <button
                        onClick={() => removeImage(index)}
                        className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs truncate">
                      {image.caption}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isUploading && (
              <div className="flex justify-center items-center mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Best Time to Visit Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-blue-100 mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MapPin className="mr-2 text-blue-500" size={18} />
                Best Time to Visit
              </label>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                onClick={() => addArrayField("bestTimeToVisit")}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Time
              </button>
            </div>
            {data.bestTimeToVisit.map((time, index) => (
              <div key={index} className="flex gap-2">
                <input
                  required
                  className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={time}
                  onChange={(e) => handleChange(e, "bestTimeToVisit", index)}
                  placeholder="E.g., October to March"
                />
                {data.bestTimeToVisit.length > 1 && (
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-red-600 focus:outline-none"
                    onClick={() => removeArrayField("bestTimeToVisit", index)}
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Categories Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8 border border-blue-100 mt-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Tags className="mr-2 text-blue-500" size={18} />
                Categories
              </label>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                onClick={() => addArrayField("categories")}
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Category
              </button>
            </div>
            {data.categories.map((category, index) => (
              <div key={index} className="flex gap-2">
                <select
                  required
                  className="flex-1 px-4 py-3 border-2 border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={category}
                  onChange={(e) => handleChange(e, "categories", index)}
                >
                  <option value="">Select Category</option>
                  {[
                    "Beach",
                    "Mountain",
                    "City",
                    "Cultural",
                    "Adventure",
                    "Wildlife",
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {data.categories.length > 1 && (
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-red-600 focus:outline-none"
                    onClick={() => removeArrayField("categories", index)}
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-12 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all shadow-xl"
          >
            Share Your Destination
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default PostDestination;
