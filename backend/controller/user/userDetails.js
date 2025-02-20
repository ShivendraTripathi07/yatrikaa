const User = require("./../../models/userModel");

async function userDetail(req, res) {
  try {
    const user = await User.findById(req.userId);
    // console.log(user);
    res.status(200).json({
      message: "User detail",
      data: user,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}
module.exports = userDetail;
