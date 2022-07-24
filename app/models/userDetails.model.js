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
     friends: [
       {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
       }
     ]
  })
);

module.exports = UserDetails;
