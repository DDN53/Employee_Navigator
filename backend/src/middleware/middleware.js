
const { validateUser } = require("./authController");

const userValidationMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.token);

    const user = await validateUser(
      decodedToken.userName,
      decodedToken.password
    );

    if (user && user.valid) {
      req.userRole = user.role;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkPermissionMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (allowedRoles.includes(req.userRole)) {
      next();
    } else {
      res.status(403).json({ message: "Permission denied" });
    }
  };
};

module.exports = { userValidationMiddleware, checkPermissionMiddleware };
