const config = require("../config/auth.config");
const db = require("../models");
const Post = db.post;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createPost = (req, res) => {
  const post = new Post({
    content: req.body.content,
    username: req.body.username,
    userId: req.body.userId,
    createDate: Date.now(),
    likes: 0,
    contComments: 0
  });

  console.log(post)

  post.save((err, postDB) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.json({
      ok: true,
      post: postDB
  });


  });
};

exports.deletePost = (req, res) => {
  let id = req.params.id;


  Post.findOneAndDelete({ _id: id}, (err,postDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err: "Error al procesar la petición"
          });
      }

          res.json({
              ok: true,
              msg: "POST Eliminado con exito"
          });

  })

}

exports.getAll =  (req, res) => {
  Post.find({})
      .sort({ createDate: -1 })
      .exec((err, postsDB) => {
          if (err) {
              return res.status(400).json({
                  ok: false,
                  err: "Error al procesar la petición"
              });
          }
          res.json(postsDB);
      });
};

exports.getPostUser =  (req, res) => {
  let id = req.params.id;


  Post.find({userId : id})
      .sort({ createDate: -1 })
      .exec((err, postsDB) => {
          if (err) {
              return res.status(400).json({
                  ok: false,
                  err: "Error al procesar la petición"
              });
          }
          res.json(postsDB);
      });
};
