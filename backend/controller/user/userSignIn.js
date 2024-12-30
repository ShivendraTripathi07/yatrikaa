const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function UserSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    const user = await User.findOne({ email: email }); // dont destructure user here
    // console.log(user);
    if (!user) {
      throw new Error("User not exists");
    }
    const checkPassword = bcrypt.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      res.cookie("token", token, tokenOption).json({
        message: "Login Successful",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Password Not Matched");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}
module.exports = UserSignInController;
