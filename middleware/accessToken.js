const jwt = require("jsonwebtoken");

const signAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "1hs",
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
  signAccessToken,
};
