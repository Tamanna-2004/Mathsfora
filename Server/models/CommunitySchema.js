const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who posted
  type: { type: String, enum: ["question", "reply", "report"], required: true }, // Type of post
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: null }, // Null for questions, set for replies/reports
  content: { type: String, required: true }, // Question text, reply text, or report reason
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Array to store replies
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
