const express = require("express");
const router = express.Router();

const { getPostsByUser } = require("../controllers/postController");
const { getUserPostsValidation } = require("../validators/userValidator");

router.get(
    "/:userId/posts",
    getUserPostsValidation,
    getPostsByUser
);

module.exports = router;