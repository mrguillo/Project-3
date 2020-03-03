const db = require("../models");
var moment = require("moment");

module.exports = {
    createChallenge: function(req,res){
        console.log("--------------------------------")
        console.log("Running createChallenge with: ",req.body)
        db.Users
          .findOne({firebaseId: req.body.data.firebaseId},function(err,userInfo){
            if(err){
              res.status(400).json(err)
            }
            else{
              console.log("userInfo consultada a DB: ", userInfo)
              var newChallenge = {
                name: req.body.data.name,
                status: "created",
                duration: req.body.data.duration,
                unitCost: req.body.data.unitCost,
                qtyOfActPerWeek: req.body.data.qtyOfActPerWeek,
                currency: req.body.data.currency,
                rules: req.body.data.rules,
                owner: userInfo._id,
                participants: [userInfo._id]
              }  
              db.Challenges
                .create(newChallenge)
                .then(dbModel => {
                  db.Users
                    .update({firebaseId: req.body.data.firebaseId},{$set:{challenges:dbModel._id, ownedChallenges: dbModel._id}})
                    .then(userModel =>{
                      res.json(dbModel)
                    })
                    .catch(err => res.status(422).json(err));
                })
            }
        })
    },
    joinChallenge: function(req,res){
        console.log("--------------------------------")
        console.log("Running joinChallenge")
        db.Users
          .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
            if(err){
              console.lof(err);
              res.status(422).send("User not found!")
            }
            db.Challenges
              .findOne({_id:req.body.invitationCode},function(err,challengeInfo){
                if(err){
                  console.lof(err);
                  res.status(422).send("Invalid invitation code")
                }
                else if(challengeInfo.status !== "created"){
                  console.log("Error: The challenge is already started")
                  res.status(422).send("The challenge is already started")
                }
                else{
                  db.Users
                    .update({_id:userInfo._id},{$set:{challenges:challengeInfo._id}})
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
                }
            })
        })
    },
      findChallenge: function(req,res){
        console.log("--------------------------------")
        console.log("Running findChallenge")
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
              res.status(422).send(err)
            }
            res.json(challenge)
          })
    },
    startChallenge: function(req,res){
        console.log("--------------------------------")
        console.log("Running startChallenge!")
        db.Challenges
              .findOne({_id:req.body.challengeId},function(err,challengeInfo){
                if(err){
                  res.status(422).send("Invalid challenge Id")
                }
                db.Challenges
                  .updateOne({_id:req.body.challengeId},{$set:{status: "started"},$currentDate:{startingDate: true}})
                  .then(nModified => {
                    console.log("Results of startChallenge: ",nModified)
                    res.send(nModified)
                  })
              })
    } 
}