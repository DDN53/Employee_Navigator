const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Custom401Error } = require("./errorHandlingMiddleware");

exports.auth = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  if (token) {
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, decodedToken) => {
      if (err) {
         console.error(err);
         next(
           new Custom401Error(`Unauthorized: Invalid token - ${err.message}`)
         );
      } else {
        req.userId = decodedToken.userId;
        req.userRole = decodedToken.userRole;
        req.employeeNumber = decodedToken.username;
        next();
      }
    });
  } else {
    next(new Custom401Error("Unauthorized: No token provided"));
  }
};
