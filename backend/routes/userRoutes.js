const express = require("express");
const userSignUpController = require("../controller/user/userSignUp");
const UserSignInController = require("../controller/user/userSignIn");
const authToken = require("../middleware/authMiddleware");
const userDetail = require("../controller/user/userDetails");
const userLogout = require("./../controller/user/userLogout");
// const Router = express();

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", UserSignInController);
router.get("/user-detail", authToken, userDetail);
router.post("/logout-user", authToken, userLogout);

module.exports = router;
