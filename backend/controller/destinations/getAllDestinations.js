const Destination = require("../../models/destinationModel");

const getAllDestinations = async (req, res) => {
  try {
    // Get all destinations with pagination
    const destinations = await Destination.find().populate("reviews"); // Populate reviews field with review data

    // Get total count for pagination
    const total = await Destination.countDocuments();

    // Send response with destinations and pagination details
    res.status(200).json({
      destinations,
      totalDestinations: total,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

module.exports = getAllDestinations;
