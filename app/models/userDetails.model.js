const mongoose = require("mongoose");

const UserDetails = mongoose.model(
  "UserDetails",
  new mongoose.Schema({
      userId: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
      createDate: Number,
      username: String,
      referalCode: String,
      imgAvatarBase64: String,
     friends: [
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
       }
     ],
     posts: [
      {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Post"
      }
    ]

  })
);

module.exports = UserDetails;
