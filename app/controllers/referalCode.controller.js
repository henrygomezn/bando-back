const config = require("../config/auth.config");
const db = require("../models");
const ReferalCode = db.referalCode;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var fs = require('fs');





const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

exports.createReferalCode = (req, res) => {

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
  
  
        res.json({
          ok: true,
          referalCode: referalDB
      });
       
  
 
  
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

exports.getReferalCode =  (req, res) => {
  
  let id = req.params.id;
    console.log(id)
  
  
    ReferalCode.find({code : id})
        .exec((err, codeDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err: "Error al procesar la petición"
                });
            }
            res.json(codeDB);
        });



  };
  