const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// DB
const User = require("../../models/user");


// AUTHENTICATION

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(500).json({error: true, message: "Unauthorized"});
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(500).json({error: true, message: "Unauthorized"});
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
