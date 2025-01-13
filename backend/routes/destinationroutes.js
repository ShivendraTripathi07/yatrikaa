const express = require("express");
const postdestination = require("../controller/destinations/postdestinationdetails");
const authToken = require("../middleware/authMiddleware");
const getAllDestinations = require("../controller/destinations/getAllDestinations");
const getOneDestination = require("../controller/destinations/getOneDestination");

const router = express.Router();

router.post("/postDestination", authToken, postdestination);
router.get("/getAllDestinations", authToken, getAllDestinations);
router.get("/getOneDestination/:destinationId", authToken, getOneDestination);

module.exports = router;
