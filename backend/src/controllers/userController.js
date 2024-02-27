const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const PasswordHistory = require("../models/Password");
const {
  Custom500Error,
  Custom201Error,
} = require("../middleware/errorHandlingMiddleware");

const userController = {
  registerUser: async (req, res, next) => {
    try {
      const {
        name,
        employeeNumber,
        email,
        mobile,
        nicNumber,
        password,
        imagePath,
        imageMimetype,
      } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        employeeNumber,
        email,
        mobile,
        nicNumber,
        password: hashedPassword,
        imagePath,
        imageMimetype,
      });

      await PasswordHistory.create({
        password: hashedPassword,
        userId: newUser.id,
      });

      return res.status(201).json({
        message: "User successfully created",
        newUser,
      });
    } catch (error) {
      next(new Custom500Error(error.message));
    }
  },

  getRegisteredUserProfilePicture: async (req, res, next) => {
    try {
      const userProfilePicture = await User.findByPk(req.userId, {
        attributes: ["imagePath", "imageMimetype"],
      });

      const fileURL = path.join(
        __dirname,
        "../../uploads",
        userProfilePicture.imagePath
      );
      var file = fs.createReadStream(fileURL);
      var stat = fs.statSync(fileURL);
      res.setHeader("Content-Length", stat.size);
      res.setHeader("Content-Type", userProfilePicture.imageMimetype);
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + userProfilePicture.imagePath
      );
      file.pipe(res);
    } catch (error) {
      next(new Custom500Error(error.message));
    }
  },

  getRegisteredUserDetails: async (req, res, next) => {
    try {
      const userDetails = await User.findByPk(req.userId, {
        attributes: ["name", "employeeNumber", "mobile", "nicNumber", "email"],
      });

      res.status(200).json({ data: userDetails });
    } catch (error) {
      next(new Custom500Error(error.message));
    }
  },
};

module.exports = userController;
