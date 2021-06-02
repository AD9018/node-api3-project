const express = require("express");
const usersRouter = require("./users/users-router");
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use("/api/users", usersRouter);

// global middlewares and the user's router need to be connected here

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    note: "Error located in the User Router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
