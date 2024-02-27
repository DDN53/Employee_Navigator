const { auth } = require("../middleware/authMiddleware");
const { Router } = require("express");
const leavesController = require("../controllers/leavesController");
const attendanceController = require("../controllers/attendanceController");


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Leaves
 *   description: Leaves management
 */

/**
 * @swagger
 * /api/users/leaves:
 *   get:
 *     summary: Get leaves information for authenticated user
 *     tags: [Leaves]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leaves information for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Leaves'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.get("/leaves", auth, (req, res, next) => {
  leavesController.getLeaves(req, res, next);
});

/**
 * @swagger
 * /api/users/attendance:
 *   get:
 *     summary: Get attendance records for the authenticated user
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval of attendance records
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
const getAttendanceRoute = "/attendance";

router.get(getAttendanceRoute, auth, (req, res, next) => {
  attendanceController.getAttendance(req, res, next);
});

module.exports = {
  getAttendanceRoute,
};


module.exports = router;
