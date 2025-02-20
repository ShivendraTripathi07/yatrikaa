const Review = require("../../models/reviewModel");

async function getReview(req, res) {
  try {
    const { destinationId } = req.params;

    const reviews = await Review.find({ destination: destinationId })
      .populate({
        path: "user",
        select: "username email", // Add whatever user fields you want to include
      })
      .sort({ createdAt: -1 }); // Sort by newest first

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({
        data: [],
        success: true,
        error: false,
        message: "No reviews found",
      });
    }

    res.status(200).json({
      data: reviews,
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({
      message: "Error fetching reviews",
      error: true,
      success: false,
    });
  }
}

module.exports = getReview;
