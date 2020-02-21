const db = require("../models");

// Defining methods for the booksController
module.exports = {
  createUser: function(req,res){
    db.Users
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUser: function(req,res){
    db.Users
      .findOne({firebaseId: req.body.firebaseId}, function(err,userInfo){
        if(err){
          throw err
        }
        res.json(userInfo)
      })
  },
  createChallenge: function(req,res){
    console.log("hit backend controller")
    // db.Users
    //   .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
    //     var newChallenge = {
    //       name: req.body.name,
    //       status: "created",
    //       duration: req.body.duration,
    //       unitCost: req.body.unitCost,
    //       currency: req.body.currency,
    //       rules: req.body.rules,
    //       // owner: userInfo._id,
    //       owner: "MZikI2bpb5cUhC20GkN8YoOu5Kr1",
    //       // participants: [userInfo._id]
    //       participants: ["MZikI2bpb5cUhC20GkN8YoOu5Kr1"]
    //     }  
    //     db.Challenges
    //       .create(newChallenge)
    //       .then(dbModel => {
    //         res.json(dbModel)
    //       })
    //     })
  },
  joinChallenge: function(req,res){
    db.Users
    .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
      db.Challenges
        .update(
          {_id:req.body.invitationCode},
          {$push: {participants: userInfo._id}}
        )
        .then(dbModel => {
          res.json(dbModel)
        })
    })
  },
  findChallenge: function(req,res){
    db.Challenges
      .findOne({_id:req.body.challengeId})
      // .populate("owner")
      // .populate("participants")
      .exec(function(err,challenge){
        if(err){
          res.send(err)
        }
        res.json(challenge)
      })
  }
};
