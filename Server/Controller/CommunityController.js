const Post = require('../models/CommunitySchema');
const User = require('../models/UserSchema')


// 📌 Create a post (Question, Reply, or Report)
exports.createPost = async (req, res) => {
  try {
    const { userId, type, parentId, content } = req.body;

    if (!userId || !type || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPost = new Post({ userId, type, parentId, content });

    // Save post
    await newPost.save();

    // If it's a reply, update the parent post's replies array
    if (type === "reply" && parentId) {
      await Post.findByIdAndUpdate(parentId, {
        $push: { replies: newPost._id },
      });
    }

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating post", details: error });
  }
};

// 📌 Get all questions with replies populated
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Post.find({ type: "question" })
      .populate("userId", "name") // Fetch user name
      .sort({ createdAt: -1 }) // Newest first
      .populate({
        path: "replies",
        populate: { path: "userId", select: "name" }, // Populate user details in replies
      });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching questions" });
  }
};

// 📌 Get replies for a specific post
exports.getReplies = async (req, res) => {
  try {
    const { postId } = req.params;

    const replies = await Post.find({ parentId: postId })
      .populate("userId", "name") // Fetch user details
      .sort({ createdAt: 1 });

    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching replies" });
  }
};

// 📌 Upvote a post
exports.upvotePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error upvoting post" });
  }
};

// 📌 Downvote a post
exports.downvotePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { downvotes: 1 } },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Error downvoting post" });
  }
};

// // 📌 Delete a post (Only if it has no replies)
// exports.deletePost = async (req, res) => {
//   try {
//     const { postId } = req.params;
//     const post = await Post.findById(postId);

//     if (!post) return res.status(404).json({ error: "Post not found" });

//     if (post.replies.length > 0) {
//       return res.status(400).json({ error: "Cannot delete a post with replies" });
//     }

//     await Post.findByIdAndDelete(postId);
//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting post" });
//   }
// };

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // 🔹 If it's a comment, delete all replies first
    if (post.type === "comment") {
      await Post.deleteMany({ parentId: postId }); // Delete all replies linked to this comment
    }

    // 🔹 If it's a reply, remove it from the parent's replies array
    if (post.type === "reply" && post.parentId) {
      await Post.findByIdAndUpdate(post.parentId, { $pull: { replies: post._id } });
    }

    // 🔹 Delete the post itself
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
};

// exports.deletePost = async (req, res) => {
//   try {
//     const { userId } = req.body; // Logged-in user
//     const post = await Post.findById(req.params.id);

//     if (!post) return res.status(404).json({ error: "Post not found" });
//     if (post.userId.toString() !== userId) return res.status(403).json({ error: "Unauthorized" });

//     await Post.findByIdAndDelete(req.params.id);

//     // If it's a reply, remove it from the parent's replies array
//     if (post.parentId) {
//       await Post.findByIdAndUpdate(post.parentId, { $pull: { replies: post._id } });
//     }

//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete post" });
//   }
// };
