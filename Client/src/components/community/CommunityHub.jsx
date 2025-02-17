import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommunityHub.css";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/posts/questions");
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post("http://localhost:5500/api/posts/create", {
        userId: user._id,
        type: "question",
        content: newComment,
      });
      setNewComment("");
      fetchComments(); // Refresh UI
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };

  const handleReply = async (commentId) => {
    if (!newReply[commentId]?.trim()) return;
    try {
      await axios.post("http://localhost:5500/api/posts/create", {
        userId: user._id,
        type: "reply",
        parentId: commentId,
        content: newReply[commentId],
      });
      setNewReply({ ...newReply, [commentId]: "" });
      fetchComments(); // Refresh UI
    } catch (error) {
      console.error("Error posting reply", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5500/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  return (
    <div className="bestdiv" style={{backgroundColor: "#333", marginTop: "-10px" , marginBottom: "20px"}}>
    <div className="comment-container">
      <h1 className="heading">💬 Community Section</h1>
      <p style={{color: "white"}}>Logged in as: <strong style={{color: "white"}}>{user?.name || "Guest"}</strong></p>

      <div className="comment-box">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{color: "white"}}
        />
        <SendIcon onClick={handlePostComment} className="send"/>
      </div>

      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="single-comment">
            <p style={{color: "black"}}><strong>{comment.userId?.name}:&nbsp;&nbsp;</strong> {comment.content}</p>
            {/* Show delete button if user owns the comment */}
            {user?._id === comment.userId?._id && (
              // <button className="delete-btn" onClick={() => handleDelete(comment._id)}>Delete</button>
              <DeleteIcon onClick={() => handleDelete(comment._id)} className="delete"/>
            )}
            </div>

            {/* Replies Section */}
            <div className="replies">
              {comment.replies?.map((reply) => (
                <div key={reply._id} className="reply">
                  <p style={{color: "black"}}><strong>{reply.userId?.name}:&nbsp;&nbsp;</strong> {reply.content}</p>
                  {user?._id === reply.userId?._id && (
                  // <button className="delete-btn" onClick={() => handleDelete(comment._id)}>Delete</button>
                  <DeleteIcon onClick={() => handleDelete(reply._id)} className="delete"/>
                  )}
                </div>
              ))}
            </div> 

            {/* Reply Input */}
            <div className="reply-box">
              <input
                type="text"
                placeholder="Write a reply..."
                value={newReply[comment._id] || ""}
                onChange={(e) =>
                  setNewReply({ ...newReply, [comment._id]: e.target.value })
                }
                style={{color: "black"}}
              />
              <button onClick={() => handleReply(comment._id)} className="reply-btn">Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CommentSection;
