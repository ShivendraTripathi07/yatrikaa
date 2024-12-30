const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: String,
  bio: String,
  interests: [String],
  savedDestinations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
  ],
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin", "guide"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
