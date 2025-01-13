const Destination = require("../../models/destinationModel");

const getAllDestinations = async (req, res) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page) || 1; // Page number (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Limit per page (default: 10)

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get all destinations with pagination
    const destinations = await Destination.find()
      .skip(skip)
      .limit(limit)
      .populate("reviews"); // Populate reviews field with review data

    // Get total count for pagination
    const total = await Destination.countDocuments();

    // Send response with destinations and pagination details
    res.status(200).json({
      destinations,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
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
