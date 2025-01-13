// filterController.js

const Destination = require("../../models/destinationModel");

async function filterDestinations(req, res) {
  try {
    const { country, region, categories, minRating, maxCost, near, radius } =
      req.query;

    // Build the query object dynamically
    const query = {};

    // Filter by country
    if (country) query.country = { $regex: country, $options: "i" };

    // Filter by region
    if (region) query.region = { $regex: region, $options: "i" };

    // Filter by categories (comma-separated)
    if (categories) {
      query.categories = { $in: categories.split(",") };
    }

    // Filter by minimum rating
    if (minRating) query.rating = { $gte: Number(minRating) };

    // Filter by maximum cost
    if (maxCost) {
      query["averageCost.budget"] = { $lte: Number(maxCost) };
    }

    // Geospatial filtering (nearby locations)
    if (near) {
      const [longitude, latitude] = near.split(",").map(Number);
      const distance = radius ? Number(radius) * 1000 : 5000; // Default radius: 5km

      query.coordinates = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: distance, // Radius in meters
        },
      };
    }

    // Execute the query
    const results = await Destination.find(query);

    res.status(200).json({
      length: results.length,
      message: "Filtered Successfully",
      data: results,
      error: false,
      success: true,
    });
  } catch (err) {
    console.error("Error during filtering:", err);
    res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = filterDestinations;
