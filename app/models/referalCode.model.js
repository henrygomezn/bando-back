const mongoose = require("mongoose");

const ReferalCode = mongoose.model(
  "ReferalCode",
  new mongoose.Schema({
   
    createDate: String,
    code: String,
    contUse: Number,
    user_id:     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
  
  })
);

module.exports = ReferalCode;
