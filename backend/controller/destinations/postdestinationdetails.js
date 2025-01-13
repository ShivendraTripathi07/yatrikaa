const Destination = require("../../models/destinationModel");

async function postdestination(req, res) {
  try {
    const body = req.body;
    //   console.log(body);
    console.log(body.name);
    if (!body.name) {
      throw new Error("Please provide name of the destinaion");
    }
    if (!body.country) {
      throw new Error("Please provide name of the country");
    }
    if (!body.region) {
      throw new Error("Please provide name of the region");
    }
    const destName = await Destination.findOne({ name: body.name });

    if (destName) {
      throw new Error("Destination already exists");
    }
    const destination = new Destination(body);
    const savedDestination = await destination.save();

    res.status(201).json({
      data: savedDestination,
      message: "destination saved successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}
module.exports = postdestination;
