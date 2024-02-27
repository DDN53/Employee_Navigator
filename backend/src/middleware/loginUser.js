const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.TOKEN_KEY;
const {
  Custom401Error,
  errorHandlingMiddleware,
} = require("../middleware/errorHandlingMiddleware");

async function loginUser(req, res, next) {
  const { employeeNumber, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ where: { employeeNumber } });

    if (!user) {
      throw new Custom401Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Custom401Error("Invalid credentials");
    }

    const expiresIn = rememberMe ? "7d" : "1h";
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn });

    res.locals.token = token;
    res.locals.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = loginUser;
