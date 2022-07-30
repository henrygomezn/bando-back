const config = require("../config/auth.config");
const db = require("../models");
const Comment = db.comment;
const Post = db.post;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createComment = (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    username: req.body.username,
    postId: req.body.postId,
    createDate: Date.now(),
    likes: 0
  });

  comment.save((err, commentDB) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Post.findOneAndUpdate({ _id: commentDB.postId},{ $push: { comments: commentDB } },{new: true}, (err,postDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err: "Error al procesar la petición"
          });
      }

      res.json({
        ok: true,
        comment: commentDB
    });

  })

  


  });
};

exports.deleteComment = (req, res) => {
  let id = req.params.id;


  Comment.findOneAndDelete({ _id: id}, (err,commentDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err: "Error al procesar la petición"
          });
      }

          res.json({
              ok: true,
              msg: "eliminado con exito"
          });

  })

}
