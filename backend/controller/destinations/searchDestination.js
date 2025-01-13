const Destination = require("../../models/destinationModel");

async function searchDestination(req, res) {
  try {
    const { query } = req.query;
    if (!query) {
      return res.json({
        message: "Query needed for search functionality",
      });
    }
    const data = await Destination.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
        { region: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: "Searched Successfully",
      data: data,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
      error: true,
      success: false,
    });
  }
}

module.exports = searchDestination;
