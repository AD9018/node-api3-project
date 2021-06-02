const Users = require("../users/users-model");

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${timestamp}] ${method} request to ${url} endpoint!`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  try {
    if (!name || !name.trim()) {
      res.status(400).json({ message: "missing required name field" });
    } else {
      req.name = name.trim();
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  try {
    if (!text || !text.trim()) {
      res.status(400).json({ message: "missing required text feild" });
    } else {
      req.text = text.trim();
      next();
    }
  } catch (err) {
    next(err);
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validatePost, validateUser };
