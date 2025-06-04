const jwt  = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      // decode { id: … }  ← your login code signs with { id: user._id }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user    = await User.findById(decoded.id).select("-password");
      req.userId  = decoded.id;                 // <— so controllers can use it

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      return next();
    } catch (err) {
      console.error("Token error:", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

module.exports = protect;   // exports ONE function
