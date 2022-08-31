const config = require("../config/auth.config");
const db = require("../models");
const Post = db.post;
const UserDetails = db.userDetails;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.createPost = (req, res) => {
  const post = new Post({
    content: req.body.content,
    username: req.body.username,
    userId: req.body.userId,
    imgAvatar: req.body.imgAvatar,
    imgContent: req.body.imgContent,
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

    UserDetails.findOneAndUpdate({ userId: postDB.userId},{ $push: { posts: postDB } },{new: true}, (err,userDetailsDB) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err: "Error al procesar la petición"
          });
      }

      res.json({
        ok: true,
        post: postDB
    });
     

  })

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

exports.getLastPost =  (req, res) => {
    Post.find({})
        .sort({ createDate: -1 })
        .limit(10)
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
  


exports.getPost =  (req, res) => {

  let id = req.params.id;

  Post.findOne({_id: id}).populate("comments").exec((err, postDB) => {
          if (err) {
              return res.status(400).json({
                  ok: false,
                  err: "Error al procesar la petición"
              });
          }
          res.json(postDB);
      });
};


exports.addLike =  (req, res) => {

  let id = req.params.id;


  Post.findOne({ _id: id},  (err, originalPost) => {
      if (err) {
          return res.status(400).json({
              ok: false,
              err: "Error al procesar la petición1"
          });
      }


      Post.findOneAndUpdate({ _id: id},{likes: originalPost.likes+1 },{new: true},  (err,postDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: "Error al procesar la petición2"
            });
        }
    
            res.json({
                ok: true,
                msg: "add like!"
            });
    
    })

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


exports.getPostRanking =  (req, res) => {

  Post.find({})
      .sort({ likes: -1 })
      .limit(3)
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