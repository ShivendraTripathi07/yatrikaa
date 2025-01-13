const Destination = require("../../models/destinationModel");
const Review = require("../../models/reviewModel");

async function postReview(req, res) {
  try {
    const body = req.body;
    if (!body.destination) {
      throw new Error("Please provide review for a particular destination");
    }
    if (!body.user) {
      throw new Error(
        "Only a user can post a review for a particular destination"
      );
    }
    if (!body.rating) {
      throw new Error("Please provide a rating for the destination");
    }
    if (body.rating > 5 || body.rating < 1) {
      throw new Error("Please provide rating in the range 1-5");
    }

    const sameReviewerForDestination = await Review.findOne({
      user: body.user,
      destination: body.destination,
    });

    if (sameReviewerForDestination) {
      throw new Error(
        "Same user cannot post a review for the same destination"
      );
    }

    // Save the review
    const review = new Review(body);
    const savedReview = await review.save();

    // Update the destination with the new review
    const updatedDestination = await Destination.findOneAndUpdate(
      { _id: body.destination },
      { $push: { reviews: savedReview._id } },
      { new: true }
    );

    if (!updatedDestination) {
      throw new Error("Destination not found");
    }

    res.status(201).json({
      data: savedReview,
      message: "Review added Successfully",
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}
module.exports = postReview;
