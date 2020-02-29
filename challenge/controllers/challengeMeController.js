const db = require("../models");

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
  },
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
          res.status(422).send("User not found!")
        }
        db.Challenges
          .findOne({_id:req.body.invitationCode},function(err,challengeInfo){
            if(err){
              res.status(422).send("Invalid invitation code")
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
  createActivity: function(req,res){
    console.log("--------------------------------")
    console.log("Running createActivity!: ")
    console.log("req.body.firebaseId", req.body.firebaseId)
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        console.log("userInfo", userInfo)
        // console.log("userInfo", userInfo)
        if(err){
          res.status(422).send("User not found!")
        }
        else{
          if(userInfo.challenges._id.toString() !== req.body.challengeId.toString()){
            res.status(422).send("The challenge that was specified is not part of the user's challenges array")
          }
          else{
            db.Challenges
              .findOne({_id: req.body.challengeId},function(err,challengeInfo){
                if(err){
                  res.status(422).send("Challenge not found!")
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
                    res.status(422).send("The user that was specified is not part of the challenge participants array")
                  }
                  else{
                    if(challengeInfo.status === "created"){
                      res.status(422).send("The challenge has not yet been created")
                    }
                    else{
                      var newActivity = {
                        description: req.body.description,
                        owner: userInfo._id,
                        approved: false,
                        challenge: challengeInfo._id
                      }
                      db.Activities
                        .create(newActivity)
                        .then(dbActivity=>{
                          console.log("Results of createActivity: ", dbActivity)
                          res.json(dbActivity)
                        })
                    }
                  }
                }
              })
          }
        }
      })
  },
  activityApproval: function(req,res){
    console.log("--------------------------------")
    console.log("Running activityApproval!")
    db.Activities
      .findOne({_id:req.body.activityId}, function(err,activityInfo){
        if(err){
          res.status(422).send("The activity was not found")
        }
        else{
          db.Activities
            .update({_id: req.body.activityId},{$set: {status: req.body.status}},function(err,results){
              if(err){
                res.status(422).send("We were unable to update the activity's status")
              }
              else{
                res.send(results)
              }
            })
        }
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
        },
  unapproved: function(req,res){
    console.log("--------------------------------")
    console.log("Running unapproved!")
    db.Users
      .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
        if(err || userInfo === null){
          res.status(422).send("User not found!")
        }
        else{
          db.Activities
            // .find({challenge:req.body.challengeId, status: "created",owner: {$ne: userInfo._id}},function(err,results){
              //Temporalmente se comento la linea de arriba para probar en el front pero es la definitiva
            .find({challenge:req.body.challengeId, status: "created"},function(err,results){
              if(err){
                res.status(422).send("An error ocurred while querying the Database for all challenges with created status")
              }
              else{
                console.log("Results of unapproved: ",results)
                res.send(results)
              }
            })
        }
      })
  }
};
