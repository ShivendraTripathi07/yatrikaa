const express = require("express");
const postdestination = require("../controller/destinations/postdestinationdetails");
const authToken = require("../middleware/authMiddleware");
const getAllDestinations = require("../controller/destinations/getAllDestinations");
const getOneDestination = require("../controller/destinations/getOneDestination");
const searchDestination = require("../controller/destinations/searchDestination");
const filterDestinations = require("../controller/destinations/filterDestination");

const router = express.Router();

router.post("/postDestination", authToken, postdestination);
router.get("/getAllDestinations", authToken, getAllDestinations);
router.get("/getOneDestination/:destinationId", authToken, getOneDestination);
router.get("/searchDestination", authToken, searchDestination);
router.get("/filterDestinations", authToken, filterDestinations);
module.exports = router;
