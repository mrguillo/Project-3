const db = require("../models");

module.exports = {
  createUser: function(req,res){
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
  },
  createChallenge: function(req,res){
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err){
          res.send("User not found!")
        }
        console.log("userInfo: ",userInfo)
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
              .update({firebaseId: req.body.firebaseId},{$set:{challenges:dbModel._id, ownedChallenges: dbModel._id}})
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
    console.log("Running createActivity!")
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err){
          res.end("User not found!")
        }
        else{
          var challengeInUser = false
          for(i=0;i<userInfo.challenges.length;i++){
            console.log("userInfo.challenges[i]._id.toString()", userInfo.challenges[i]._id.toString())
            console.log("req.body.challengeId.toString()", req.body.challengeId.toString())

            if(userInfo.challenges[i]._id.toString() === req.body.challengeId.toString()){
              challengeInUser = true
              break
            }
          }
          if(challengeInUser===false){
            res.end("The challenge that was specified is not part of the user's challenges array")
          }
          else{
            db.Challenges
              .findOne({_id: req.body.challengeId},function(err,challengeInfo){
                if(err){
                  res.end("Challenge not found!")
                }
                else{
                  var userInChallenge = false
                  for(i=0;i<challengeInfo.participants.length;i++){
                    if(challengeInfo.participants[i]._id.toString() === userInfo._id.toString()){
                      userInChallenge = true
                      break
                    }
                  }
                  if(userInChallenge===false){
                    res.end("The user that was specified is not part of the challenge participants array")
                  }
                  else{
                    var newActivity = {
                      description: req.body.description,
                      owner: userInfo._id,
                      challenge: req.body.challengeId
                    }
                    db.Activities
                      .create(newActivity)
                      .then(dbActivity=>{
                        res.json(dbActivity)
                      })
                  }
                }
              })
          }
        }
      })
  },
  activityApproval: function(req,res){
    console.log("Running activityApproval!")
    db.Activities
      .findOne({_id:req.body.activityId}, function(err,activityInfo){
        if(err){
          res.end("The activity was not found")
        }
        else{
          if(req.body.approved === true && req.body.rejected === false){
            db.Activities
              .update({_id: req.body.activityId},{$set: {approved: true}})
              .then(nModified => res.send(nModified))
          }
          else if(req.body.approved === false && req.body.rejected === true){
            db.Activities
              .update({_id: req.body.activityId},{$set: {rejected: true}})
              .then(nModified => res.send(nModified))
          }
          else res.end("The activity could not be updated!")
        }
      })
  },
  startChallenge: function(req,res){
    console.log("Running startChallenge!")
    db.Challenges
          .findOne({_id:req.body.challengeId},function(err,challengeInfo){
            if(err){
              res.send("Invalid challenge Id")
            }
            db.Challenges
              .updateOne({_id:req.body.challengeId},{$set:{status: "started"},$currentDate:{startingDate: true}})
              .then(nModified => {
                console.log("Results of startChallenge: ",nModified)
                res.send(nModified)
              })
          })
        }
};
