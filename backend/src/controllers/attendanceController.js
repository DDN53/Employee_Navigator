const Attendance = require("../models/Attendance");
const {
  Custom400Error,
} = require("../middleware/errorHandlingMiddleware");

const attendanceController = {
  getAttendance: async (req, res, next) => {
    try {
    
      const employeeNumber = req.employeeNumber;
      console.log(employeeNumber);
      if (!employeeNumber) {
        throw new Custom400Error(
          "Bad Request: employeeNumber parameter is missing"
        );
      }

      const attendanceRecords = await Attendance.findAll({
        where: { employeeNumber },
        attributes: ["Date", "InTime", "OutTime"],
      });

      res.status(200).json({ data: attendanceRecords });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = attendanceController;




