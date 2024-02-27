const { Router } = require("express");
const router = Router();
const {
  login,
  logout,
  forgotPassword,
  resetPassword,
  submitVerificationCode,
} = require("../controllers/authController");
const { uploadImage } = require("../middleware/uploadImage");
const { checkToken } = require("../middleware/auth");
const userController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               employeeNumber:
 *                 type: integer
 *               email:
 *                 type: string
 *               nicNumber:
 *                 type: string
 *               password:
 *                 type: string
 *               userImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Registration successful
 *       '500':
 *         description: Internal Server Error
 */
router.post("/register", uploadImage, (req, res, next) => {
  userController.registerUser(req, res, next);
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: integer
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '500':
 *         description: Internal Server Error
 */
router.post("/login", login, (req, res, next) => {
  res.json({ message: "Login successful" });
});

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '500':
 *         description: Internal Server Error
 */
router.post("/logout", logout, (req, res, next) => {
  res.json({ message: "Logout successful" });
});

/**
 * @swagger
 * /api/users/sendVerificationCode:
 *   post:
 *     summary: Send verification code for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeNumber:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Verification code sent successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post("/sendVerificationCode", forgotPassword, (req, res, next) => {
  res.json({ message: "forgot password successful" });
});

/**
 * @swagger
 * /api/users/submitVerificationCode:
 *   post:
 *     summary: Submit verification code for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeNumber:
 *                 type: integer
 *                 required: true
 *                 description: User's employeeNumber
 *               verificationCode:
 *                 type: integer
 *                 required: true
 *                 description: Verification code received via email
 *     responses:
 *       '200':
 *         description: Verification code verified successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post(
  "/submitVerificationCode",
  submitVerificationCode,
  (req, res, next) => {
    res.json({ message: "verification code verified successful" });
  }
);

/**
 * @swagger
 * /api/users/resetPassword:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeNumber:
 *                 type: integer
 *               password:
 *                 type: string
 *                 required: true
 *                 description: User's new password
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '500':
 *         description: Internal Server Error
 */
router.post("/resetPassword", resetPassword, (req, res, next) => {
  res.json({ message: "resetPassword password successful" });
});

router.get("/auth", checkToken, (req, res, next) => {
  res.render("home");
});

module.exports = router;
