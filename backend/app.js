"use strict";

/** Express app for jobly. */

const express = require("express");
const cors = require("cors");

const { NotFoundError, ExpressError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/jobs", jobsRoutes);

// Add error-handling middleware
app.use((err, req, res, next) => {
  if (err instanceof ExpressError) {
    return res.status(err.status).json({ error: { message: err.message } });
  }

  console.error(err); // Log the error for debugging purposes
  return res.status(500).json({ error: { message: "Internal Server Error" } });
});

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

module.exports = app;
