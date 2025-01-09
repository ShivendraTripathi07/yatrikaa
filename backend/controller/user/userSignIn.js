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

    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      throw new Error("User not exists");
    }

    // Use await for the password comparison since bcrypt.compare is asynchronous
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });

      // Set the cookie options
      const tokenOption = {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Use secure cookies only in production
        secure: true,
        sameSite: "None", // Use 'None' for cross-site cookies
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
