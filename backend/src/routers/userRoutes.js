const { Router } = require("express");
const router = Router();
const { auth } = require("../middleware/authMiddleware");

const { permissionsData } = require("../controllers/permissionController");
const permissionController = require("../controllers/permissionController");
const userController = require("../controllers/userController");
const liabilityController = require("../controllers/laibilityController");
const financialDataContoller = require("../controllers/financialDataContoller");
const eventController = require("../controllers/eventController");

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: API endpoints for managing permissions
 */

/**
 * @swagger
 * /api/users/permissions/authnew:
 *   get:
 *     summary: Get permissions for authenticated user
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissions for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissions:
 *                   type: array
 *                   description: List of permissions
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/permissions/authnew", auth, async (req, res, next) => {
  const permissions = permissionController.permission(
    permissionsData[req.userRole]
  );
  res.send({ permissions });
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/profile", auth, async (req, res,next) => {
  userController.getRegisteredUserDetails(req, res, next);
});

/**
 * @swagger
 * /api/users/profile/picture:
 *   get:
 *     summary: Get user profile picture
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile picture
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/profile/picture", auth, async (req, res,next) => {
  userController.getRegisteredUserProfilePicture(req, res,next);
});


/**
 * @swagger
 * /api/users/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal Server Error
 *
*/
router.get("/events", async (req, res, next) => {
  eventController.getAllEvents(req, res, next);
});
router.post("/events-create", async (req, res, next) => {
  eventController.createEvent(req, res, next);
});

/**
 * @swagger
 * /api/users/liabilities:
 *   get:
 *     summary: Get liabilities information for authenticated user
 *     tags: [Liabilities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liabilities information for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Liabilities'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/liabilities", auth, async (req, res, next) => {
  liabilityController.getLiabilities(req, res, next);
});

/**
 * @swagger
 * /api/users/budget:
 *   get:
 *     summary: Get financial data for authenticated user
 *     tags: [Budget]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Financial data for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FinancialData'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/budget", auth, async (req, res, next) => {
  financialDataContoller.getFinanceData(req, res, next);
});



module.exports = router;
