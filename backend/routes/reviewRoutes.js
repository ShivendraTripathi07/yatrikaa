const express = require("express");
const authToken = require("../middleware/authMiddleware");
const postReview = require("../controller/reviews/postReview");
const getAllReviews = require("../controller/reviews/getAllReviews");
const getReview = require("../controller/reviews/getOneReview");
const router = express.Router();

router.post("/postReview", authToken, postReview);
router.get("/getAllReviews", getAllReviews);
router.get("/getReview/:destinationId", authToken, getReview);

module.exports = router;
