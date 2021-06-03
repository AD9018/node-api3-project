const express = require("express");
const {
  logger,
  validateUserId,
  validatePost,
  validateUser,
} = require("../middleware/middleware");
const router = express.Router();
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

router.get("/", logger, (req, res, next) => {
  Users.get().then((users) => res.json(users));
  // RETURN AN ARRAY WITH ALL THE USERS
});

router.get("/:id", logger, validateUserId, (req, res) => {
console.log("GETwID",req.user)
  res.json(req.user);

  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
});

router.post("/", logger, validateUser, (req, res, next) => {
  Users.insert({ name: req.name })
    .then((newUser) => res.status(201).json(newUser))
    .catch(next);
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", logger, validateUserId, validateUser, (req, res, next) => {
  Users.update(req.params.id, { name: req.name })
    .then(() => {
      return Users.getById(req.params.id);
    })
    .then((updatedUsers) => res.json(updatedUsers))
    .catch(next);
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", logger, validateUserId, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    return res.json(req.user);
  } catch (err) {
    next(err);
  }
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", logger, validateUserId, async (req, res, next) => {
  try {
    const result = await Users.getUserPosts();
    res.json(result);
  } catch (err) {
    next(err);
  }

  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post(
  "/:id/posts",
  logger,
  validateUserId,
  validatePost,
  async (req, res, next) => {
    try {
      const result = await Posts.insert({
        userId: req.params.id,
        text: req.text,
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
  }
);

// do not forget to export the router
module.exports = router;
