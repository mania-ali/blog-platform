const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");

const { createPostValidation,updatePostValidation } = require("../validators/postValidator");
const {postIdValidation}=require("../validators/postValidator");
const { createPost, updatePost, getAllPublishedPosts, getPostsByUser, getPostById, deletePost } = require("../controllers/postController");


router.post(
    "/",
    authenticate,
    createPostValidation,
    createPost
);

router.put(
    "/:id",
    authenticate,
    postIdValidation,
    updatePostValidation,
    updatePost

);

router.get(
    "/",
    getAllPublishedPosts
);

router.get(
    "/:id",
    postIdValidation,
    getPostById
);

router.delete(
    "/:id",
    authenticate,
    postIdValidation,
    deletePost
);

module.exports = router;