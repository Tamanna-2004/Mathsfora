const express = require("express");
const router = express.Router();
const CommunityController = require("../Controller/CommunityController");

// 🌟 Routes
router.post("/posts/create", CommunityController.createPost);
router.get("/posts/questions", CommunityController.getQuestions);
router.get("/posts/replies/:postId", CommunityController.getReplies);
router.patch("/posts/upvote/:postId", CommunityController.upvotePost);
router.patch("/posts/downvote/:postId", CommunityController.downvotePost);
router.delete("/posts/:postId", CommunityController.deletePost);

module.exports = router;
