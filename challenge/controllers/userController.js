const db = require("../models");
var moment = require("moment");

module.exports = {
  createUser: function(req,res){
    console.log("--------------------------------")
    console.log("Running createUser")
    db.Users
      .create(req.body)
      .then(dbModel => {
        console.log("Resolved createUser with the following results: ")
        console.log(dbModel)
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findUser: function(req,res){
    console.log("--------------------------------")
    console.log("Running findUser")
    db.Users
      .findOne({firebaseId: req.params.firebaseId})
      .populate({
        path: "challenges",
        populate:{
          path: "participants owner"
        }
      })
      .exec(function(err,userInfo){
          if(err){
            res.status(400).json(err)
          }
          console.log("Result of findUser: ",userInfo)
          res.json(userInfo)
        }
      )
  }
};
