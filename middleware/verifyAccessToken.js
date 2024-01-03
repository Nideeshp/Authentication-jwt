const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(401).json({ message: "No token provided" });
    }

    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.payload = payload;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      console.error(err.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
};

module.exports = {
  verifyToken,
};
