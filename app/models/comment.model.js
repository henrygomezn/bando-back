const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    content: String,
    likes: Number,
    username: String,
    createDate: Number,
    postId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
  
  })
);

module.exports = Comment;
