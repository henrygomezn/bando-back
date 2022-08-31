const { authJwt } = require("../middlewares");
const controller = require("../controllers/post.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/post", controller.createPost);
  app.get("/api/posts", controller.getAll);
  app.get("/api/lastPost", controller.getLastPost);
  app.get("/api/postRanking", controller.getPostRanking);
  app.get("/api/userPost/:id", controller.getPostUser);
  app.delete("/api/post/:id", controller.deletePost);
  app.put("/api/postLike/:id", controller.addLike);
  app.get("/api/post/:id", controller.getPost);

};
