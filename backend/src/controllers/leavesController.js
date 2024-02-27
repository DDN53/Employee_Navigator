const Leaves = require("../models/Leaves");
const {
  Custom500Error,
  Custom201Error,
  Custom401Error,
} = require("../middleware/errorHandlingMiddleware");

const leavesController = {
  addLeaves: async (req, res, next) => {
    try {
      const { LeaveType, Total, employeeNumber } = req.body;

      if (!employeeNumber) {
        throw new Custom401Error(error.message);
      }

      const newLeaves = await Leaves.create({
        LeaveType,
        Total,
        employeeNumber,
      });

      throw new Custom201Error({ data: newLeaves });
    } catch (error) {
      next(new Custom500Error(error.message));
    }
  },

  getLeaves: async (req, res, next) => {
    try {
      const employeeNumber = req.employeeNumber;
      const LeavesRecords = await Leaves.findAll({
        where: { employeeNumber },
        attributes: ["Type", "Total", "Date"],
      });

      res.json({ data: LeavesRecords });
    } catch (error) {
      next(new Custom500Error(error.message));
    }
  },
};

module.exports = leavesController;
