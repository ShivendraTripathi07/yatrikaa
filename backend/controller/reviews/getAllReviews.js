const Review = require("../../models/reviewModel");

async function getAllReviews(req, res) {
  try {
    //   const body = req.body;
    const data = await Review.find().populate("user").populate("destination");

    res.status(200).json({
      message: "Fetched All reviews succesfully",
      data: data,
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err,
      error: true,
      success: false,
    });
  }
}
module.exports = getAllReviews;
