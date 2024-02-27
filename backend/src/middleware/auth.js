const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Custom500Error, Custom401Error } = require("./errorHandlingMiddleware");

const checkToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    throw new Custom401Error("Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    throw new Custom401Error("Unauthorized: Invalid token");
  }
};

module.exports = { checkToken };
