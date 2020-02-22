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
    // res.send("hit backend controller")
    // db.Users
    //   .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
    //     var newChallenge = {
    //       name: req.body.name,
    //       status: "created",
    //       duration: req.body.duration,
    //       unitCost: req.body.unitCost,
    //       currency: req.body.currency,
    //       rules: req.body.rules,
    //       owner: userInfo._id,
    //       participants: [userInfo._id]
    //     }  
    //     db.Challenges
    //       .create(newChallenge)
    //       .then(dbModel => {
    //         res.json(dbModel)
    //       })
    //     })
    console.log(req.body.name);
    console.log(req.body.duration);
    console.log(req.body.unitCost);
    console.log(req.body.currency);
    console.log(req.body.rules);
    console.log(req.body.owner);

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
