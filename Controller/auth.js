const User = require("../Models/User");

exports.register = async (req, res, next) => {
  // what we expect to get from client side
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    // We need to encrypt the password using middleware
    sendToken(user, 201, res);
    //res.status(201).json({ success: true, user: user, token: "6fdq51bvdf" });
  } catch (error) {
    res.json({ success: false, message: error });
    next();
  }
};
/**
 *  Any operation with DB needs async await
 */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // to Check if we get an empty values

  if (!email || !password) {
    // 400: bad request
    res
      .status(400)
      .json({ success: false, error: "Please provide E-mail and password" });
  }

  // to Check if the user exists in our DB
  try {
    // to get email and it's password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // 404: Not found
      res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(404).json({ success: false, error: "User not found" });
    }

    sendToken(user, 201, res);
    // res.status(200).json({ success: true, user: user, token: "dqfgbqd4b" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

function sendToken(user, statusCode, res) {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token: token });
}
