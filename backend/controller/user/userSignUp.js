const User = require("../../models/userModel");

const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { username, email, password, bio, interests } = req.body;
    if (!email) {
      throw new Error("Please provide the email");
    }
    if (!password) {
      throw new Error("Please provide the password");
    }
    if (!username) {
      throw new Error("Please provide the username");
    }

    const { user } = User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const data = {
      ...req.body,
      password: hashedPassword,
    };

    const userData = new User(data);
    const saveUser = await userData.save();

    res.status(200).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Succesfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
