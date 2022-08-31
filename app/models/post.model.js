const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    username: String,
    content: String,
    likes: Number,
    contComments: Number,
    createDate: Number,
    imgAvatar: String,
    imgContent:String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    userId: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  })
);

module.exports = Post;

