const jwt = require("jsonwebtoken");

const signRefreshToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
      issuer: "nideesh",
      audience: String(userId)
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        return reject(err);
      }
      resolve(token);
    });
  });
};

module.exports = {
    signRefreshToken,
};
