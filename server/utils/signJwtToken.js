const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_PASSWORD, {
    expiresIn: "1d",
  });
};
