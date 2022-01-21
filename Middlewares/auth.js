const jwt = require("jsonwebtoken");
const User = require("../Models/User");

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res
      .status(401)
      .json({ success: false, error: "Not athorized to access this route" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const user = User.findById(decode.findById);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "No user found with this id",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, error: "Not athorized to access this route" });
  }
};
