const Destination = require("../../models/destinationModel");

async function getOneDestination(req, res) {
  try {
    const { destinationId } = req.params;
    const destination = await Destination.findById(destinationId);
    if (!destination) {
      throw new Error("No Destination found");
    }
    res.status(200).json({
      data: destination,
      message: "Ok",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      // data: destination,
      message: err.message || "error",
      success: false,
      error: true,
    });
  }
}

module.exports = getOneDestination;
