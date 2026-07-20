const prisma = require("../config/db");
const { validationResult } = require("express-validator");

async function createPost(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, body } = req.body;
        const authorId = req.user.userId;   // pulled from verified JWT, not the client

        const newPost = await prisma.post.create({
            data: {
                title,
                body,
                authorId
            }
        });

        res.status(201).json({
            message: "Post created",
            post: newPost
        });
    }
    catch (err) {
        if (err.code === "P2002") {
            return res.status(409).json({ message: "You've already created a post with this title." });
        }
        next(err);
    }
}


async function updatePost(req, res, next) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const authorId = req.user.userId;

        const existingPost = await prisma.post.findUnique({
            where: { id: Number(id) }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post not found." });
        }

        if (existingPost.authorId !== authorId) {
            return res.status(403).json({ message: "You can only update your own posts." });
        }

        const { title, body, published } = req.body;   // pull out whatever was sent

        const updatedPost = await prisma.post.update({
            where: { id: Number(id) },
            data: { title, body, published }            // data is a SIBLING of where, not nested inside it
        });

        res.status(200).json({
            message: "Post updated",
            post: updatedPost
        });
    }

    catch (err) {
    if (err.code === "P2002") {
        return res.status(409).json({ message: "You've already created a post with this title." });
    }
    next(err);
}
}

async function getAllPublishedPosts(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const publishedPosts = await prisma.post.findMany({
            where: { published: true },
            skip: skip,
            take: limit
        });

        const totalPosts = await prisma.post.count({
            where: { published: true }
        });

        res.status(200).json({
            posts: publishedPosts
        });
    }
    catch (err) {
        next(err);
    }
}

async function getPostsByUser(req, res, next) {
    try {
        const errors = validationResult(req);
     if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
     }
        const { userId } = req.params;

        const userExists = await prisma.user.findUnique({
            where: { id: Number(userId) }
        });

        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }

        const posts = await prisma.post.findMany({
            where: { authorId: Number(userId) }
        });

        res.status(200).json({
            posts: posts
        });
    }
    catch (err) {
        next(err);
    }
}

async function getPostById(req, res, next) {
    try {
        const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id: Number(id) }
        });

        if (!post) {
            return res.status(404).json({ message: "Post with this id doesn't exist" });
        }

        res.status(200).json({
            post: post
        });
    }
    catch (err) {
        next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
        const { id } = req.params;
        const authorId = req.user.userId;

        const existingPost = await prisma.post.findUnique({
            where: { id: Number(id) }
        });

        if (!existingPost) {
            return res.status(404).json({ message: "Post with this id doesn't exist" });
        }

        if (existingPost.authorId !== authorId) {
            return res.status(403).json({ message: "You can only delete your own posts." });
        }

        const deletedPost = await prisma.post.delete({
            where: { id: Number(id) }
        });

        
        const remainingPosts = await prisma.post.findMany({ where: { authorId } });
        res.status(200).json({ message: "Post deleted", remainingPosts });
    }
    catch (err) {
        next(err);
    }
}

module.exports = { createPost, updatePost, getAllPublishedPosts, getPostsByUser, getPostById, deletePost };


