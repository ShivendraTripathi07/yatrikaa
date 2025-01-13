const express = require("express");
const authToken = require("../middleware/authMiddleware");
const postReview = require("../controller/reviews/postReview");
const router = express.Router();

router.post("/postReview",authToken,postReview)

module.exports = router;
