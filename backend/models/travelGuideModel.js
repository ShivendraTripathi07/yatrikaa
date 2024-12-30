const mongoose = require("mongoose");
const travelGuideSchema = new mongoose.Schema({
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Transportation",
      "Accommodation",
      "Food",
      "Culture",
      "Safety",
      "Budget",
    ],
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Guide = mongoose.model("Guide", travelGuideSchema);
module.exports = Guide;
