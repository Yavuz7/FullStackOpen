const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");

const loginRouter = require("./controllers/login");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

module.exports = app;
