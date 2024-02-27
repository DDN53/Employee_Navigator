const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./configuration/db.config");
const userRoutes = require("./src/routers/userRoutes");
const authRoutes = require("./src/routers/authRoutes");
const leavesRouters = require("./src/routers/Leaves and Attendance");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const http = require("http");

const {
  errorHandlingMiddleware,
} = require("./src/middleware/errorHandlingMiddleware");
const { initializeSocket } = require("./src/shoket/loginCount"); 
const port = 5000;

app.use(errorHandlingMiddleware);
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cookieParser());
const server = http.createServer(app);
app.use(express.static(__dirname));
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", leavesRouters);



sequelize
  .sync()
  .then(() => {
    console.log("Database is synced");
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

const apiRoutesPath = path.join(__dirname, "routers");

const loadRoutes = (app, routesPath) => {
  const routes = fs.readdirSync(routesPath);

  routes.forEach((file) => {
    const filePath = path.join(routesPath, file);
    const route = require(filePath);
    if (file.endsWith(".js")) {
      app.use("/api/users", route);
    }
  });
};

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "API Documentation",
      description: "API documentation for Navigator with node.js",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Navigator API Documentation",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routers/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  const token = req.headers.authorization || "";
  req.headers.authorization = `Bearer ${token}`;
  next();
});
const io = initializeSocket(server, {
  cors: {
    origin: "*",
  },
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
