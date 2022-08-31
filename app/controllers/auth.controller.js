const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const UserDetails = db.userDetails;
const Role = db.role;
const ReferalCode = db.referalCode;
var fs = require('fs');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { userBoard } = require("./user.controller");


const base64_encode = (file) => {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

const generateRandomString = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1 = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result1;
}



exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });




  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save((err, userDB) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }



            const referal = new ReferalCode({
              contUse: 0,
              code: generateRandomString(8),
              user_id: req.body.userId,
              createDate: Date.now(),
            });

            console.log(referal)

            referal.save((err, referalDB) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }


              const userDetails = new UserDetails({
                userId: userDB._id,
                username: userDB.username,
                referalCode: referalDB.code,
                createDate: Date.now(),
                imgAvatarBase64: "data:image/png;base64," +  base64_encode("C:/Users/henry/OneDrive/Documentos/GitHub/bando-back/app/assets/default-img.jpg")
                
              });


              userDetails.save((err, userDetailsDB) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }

                res.send({ message: "User was registered successfully!" });

              })





            });






          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err, userDB) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

 
          const referal = new ReferalCode({
            contUse: 0,
            code: generateRandomString(8),
            user_id: req.body.userId,
            createDate: Date.now(),
          });

          console.log(referal)

          referal.save((err, referalDB) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            const userDetails = new UserDetails({
              userId: userDB._id,
              username: userDB.username,
              referalCode: referalDB.code,
              createDate: Date.now()
            });


            userDetails.save((err, userDetailsDB) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "User was registered successfully!" });

            })





          });



        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};
