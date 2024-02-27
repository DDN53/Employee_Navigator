const Liability = require("../models/Laibilities");
const { Custom400Error } = require("../middleware/errorHandlingMiddleware");

const liabilitiesController = {
  getLiabilities: async (req, res, next) => {
    try {
      const employeeNumber = req.employeeNumber;

      if (!employeeNumber) {
        throw new Custom400Error(
          "Bad Request: employeeNumber parameter is missing"
        );
      }

      const liabilities = await Liability.findAll({
        where: { employeeNumber },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt", "employeeNumber"],
        },
      });

      res.status(200).json({ data: liabilities });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = liabilitiesController;
