const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  destinations: [
    {
      destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Destination",
      },
      startDate: Date,
      endDate: Date,
    },
  ],
  status: {
    type: String,
    enum: ["planned", "ongoing", "completed"],
    default: "planned",
  },
  budget: {
    amount: Number,
    currency: String,
  },
  notes: String,
  isPrivate: {
    type: Boolean,
    default: false,
  },
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
