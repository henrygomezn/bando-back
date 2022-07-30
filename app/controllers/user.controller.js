const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const UserDetails = db.userDetails;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

 exports.getAll =  (req, res) => {
  User.find({})
      .sort({ username: 1 })
      .exec((err, usersDB) => {
          if (err) {
              return res.status(400).json({
                  ok: false,
                  err: "Error al procesar la petición"
              });
          }
          res.json(usersDB);
      });
};


exports.getUserDetails =  (req, res) => {
  let id = req.params.id;
  UserDetails.findOne({userId : id})
  .populate("posts")
      .exec((err, userDB) => {
          if (err) {
              return res.status(400).json({
                  ok: false,
                  err: "Error al procesar la petición"
              });
          }
          res.json(userDB).status(200);
      });
};

exports.addFriend = (req, res) => {
 

  let id = req.params.id;
  let body = req.body.friend_id;
  console.log(id)
  console.log(body)


 UserDetails.findOneAndUpdate({userId: id},{ $push: { friends: body } }, { new: true } ).exec((err, userDetailsDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err: "Error al procesar la petición"
          });
      }
   
      res.json(userDetailsDB);
  })

};

