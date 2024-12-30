const express = require("express");
const userSignUpController = require("../controller/user/userSignUp");
const UserSignInController = require("../controller/user/userSignIn");
// const Router = express();

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", UserSignInController);

module.exports = router;
