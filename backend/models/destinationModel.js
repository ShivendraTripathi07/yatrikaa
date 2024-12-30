const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
  region: String,
  description: {
    type: String,
    required: true,
  },
  highlights: [String],
  images: [
    {
      url: String,
      caption: String,
    },
  ],
  coordinates: {
    latitude: Number,
    longitude: Number,
  },
  bestTimeToVisit: [String],
  averageCost: {
    budget: Number,
    currency: String,
  },
  categories: [
    {
      type: String,
      enum: ["Beach", "Mountain", "City", "Cultural", "Adventure", "Wildlife"],
    },
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
