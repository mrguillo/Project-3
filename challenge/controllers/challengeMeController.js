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
      .findOne({firebaseId: req.params.firebaseId})
      .populate({
        path: "challenges",
        populate:{
          path: "participants owner"
        }
      })
      .exec(function(err,userInfo){
          if(err){
            throw err
          }
          res.json(userInfo)
        }
      )
  },
  createChallenge: function(req,res){
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err){
          res.send("User not found!")
        }
        var newChallenge = {
          name: req.body.name,
          status: "created",
          duration: req.body.duration,
          unitCost: req.body.unitCost,
          currency: req.body.currency,
          rules: req.body.rules,
          owner: userInfo._id,
          participants: [userInfo._id]
        }  
        db.Challenges
          .create(newChallenge)
          .then(dbModel => {
            db.Users
              .update({firebaseId: req.body.firebaseId},{$push:{challenges:dbModel._id, ownedChallenges: dbModel._id}})
              .then(userModel =>{
                res.json(dbModel)
              })
          })
        })
  },
  joinChallenge: function(req,res){
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err){
          res.send("User not found!")
        }
        db.Challenges
          .findOne({_id:req.body.invitationCode},function(err,challengeInfo){
            if(err){
              res.send("Invalid invitation code")
            }
            db.Users
              .update({_id:userInfo._id},{$push:{challenges:challengeInfo._id}})
              .then(updateUserResult =>{
                db.Challenges
                  .update({_id:challengeInfo._id},{$push:{participants:userInfo._id}})
                  .then(updateChallengeResult =>{
                    res.json(
                      {
                        userUpdate: updateUserResult,
                        challengeUpdate: updateChallengeResult
                      }
                    )
                  })
              }
              )
          })
      })
  },
  findChallenge: function(req,res){
    db.Challenges
      .findOne({_id:req.params.challengeId})
      .populate({
        path: "participants",
        populate:{
          path: "challenges"
        }
      })
      .populate("owner")
      .exec(function(err,challenge){
        if(err){
          res.send(err)
        }
        res.json(challenge)
      })
  },
  createActivity: function(req,res){
    res.send("Activity creation route")
  },
  activityApproval: function(req,res){
    res.send("Activity approval route")
  }
};
