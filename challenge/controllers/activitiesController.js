const db = require("../models");
var moment = require("moment");

function overallWhile(res,challengeInfo,activitiesOwedInWeek){
    var overAllInfo = []
    challengeInfo.participants.map(function(participant,index){
        console.log("Nuevo participante: ",participant.username)
        console.log("--------------------------------------------")
        startingDate = moment(challengeInfo.startingDate)
        desiredDate = moment(Date.now())
        startOfWeek = startingDate.set({hour:0,minute:0,second:0,millisecond:0})
        endOfWeek = startOfWeek.clone().add(6,"days").set({hour:23,minute:59,second:59,millisecond:999})    
        activitiesOwedInWeek = 0
          do{
          db.Activities
          .find({creationDate: {$gte: startOfWeek.toDate(),$lte: endOfWeek.toDate()},status:"approved",owner: participant._id})
          .exec(function(err,activitiesInWeek){
            if(err){
              res.status(422).send("There was an error while trying to recover activities for the week")
            }
            else{
              console.log("****************************************")
              console.log("Nuevo loop de ",participant.username)
              console.log("startOfWeek: ",startOfWeek)
              console.log("endOfWeek: ",endOfWeek)
              activitiesOwedInWeek = activitiesOwedInWeek + (challengeInfo.qtyOfActPerWeek - activitiesInWeek.length)
              startOfWeek = startOfWeek.add(7,"days")
              endOfWeek = endOfWeek.add(7,"days")
              console.log("activitiesOwedInWeek resultante de loop: ",activitiesOwedInWeek)
              console.log("****************************************")
              if(desiredDate.isBefore(endOfWeek)){
                  var participantInfo = {
                    name: participant.username,
                    activitiesOwed: activitiesOwedInWeek,
                    owes: "$" + (activitiesOwedInWeek * challengeInfo.unitCost)
                  }
                  overAllInfo.push(participantInfo)
                  console.log("Results of overallInfo dentro del do while: ", overAllInfo)
                  console.log("index de do while: ",index)
                }
              }
            })
          }
          while(desiredDate.isAfter(endOfWeek))
        })
        console.log("overAllInfo justo antes de mandarlo en res.json: ",overAllInfo)     
        res.json({overallData: overAllInfo})
}

module.exports = {
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
          .findOne({_id:req.body.id}, function(err,activityInfo){
            if(err){
              res.status(422).send("The activity was not found")
            }
            else{
              db.Activities
                .update({_id: req.body.id},{$set: {status: req.body.status}},function(err,results){
                  if(err){
                    res.status(422).send("We were unable to update the activity's status")
                  }
                  else{
                    console.log("Results of running activityApproval: ", results)
                    res.send(results)
                  }
                })
            }
          })
      },
      unapproved: function(req,res){
        console.log("--------------------------------")
        console.log("Running unapproved!", req.body)
        db.Users
          .findOne({firebaseId: req.body.firebaseId},function(err,userInfo){
            if(err || userInfo === null){
              res.status(422).send("User not found!")
            }
            else{
              console.log("Si encontro usuario en unapproved: ",userInfo)
              db.Activities
                .find({challenge:req.body.challenges._id, status: "created",owner: {$ne: userInfo._id}},function(err,results){
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
      },
      approvedInPeriod: function(req,res){
        console.log("--------------------------------")
        console.log("Running approvedInPeriod!")
        if(req.params.challengeId===""){
          res.status(422).send("Empty request params!")
        }
        else{
          db.Challenges
            .findOne({_id: req.params.challengeId})
            .populate("participants")
            .exec(function(err,challengeInfo){
              if(err){
                res.status(422).send("The challenge was not found")
              }
              else{
                var startingDate = moment(challengeInfo.startingDate)
                var desiredDate = moment(Date.now())
                var startOfWeek = startingDate.set({hour:0,minute:0,second:0,millisecond:0})
                var endOfWeek = startOfWeek.clone().add(6,"days").set({hour:23,minute:59,second:59,millisecond:999})
                if(desiredDate.isBefore(startOfWeek)){
                  res.status(422).send("The desired date is before the starting date of the challenge")
                }
                else{
                  while(desiredDate.isAfter(endOfWeek)){
                    startOfWeek = startOfWeek.add(7,"days")
                    endOfWeek = endOfWeek.add(7,"days")
                  }
                  db.Activities
                    .find({creationDate: {$gte: startOfWeek.toDate(),$lte: endOfWeek.toDate()},status:"approved"})
                    .populate("owner")
                    .exec(function(err,results){
                      if(err){
                        res.status(422).send("The query for activities within the week of desired date returned an error")
                      }
                      else{
                        var thisWeekData = []
                        challengeInfo.participants.map(function(participant){
                          var thisCount = 0;               
                          results.map(function(activity){
                            if(activity.owner._id.toString() === participant._id.toString()){
                              thisCount++
                            }
                          })
                          var thisParticipant = {
                            name: participant.username,
                            units: thisCount,
                            owes: "$" + (challengeInfo.qtyOfActPerWeek - thisCount) * challengeInfo.unitCost
                          }
                          thisWeekData.push(thisParticipant)
                        })
                        console.log("Results of approvedInPeriod: ",{data: thisWeekData})
                        res.json({data: thisWeekData})
                      }
                    })
                }
              }
            })
        }
      },
      overAll: function(req, res){
        console.log("--------------------------------")
        console.log("Running overAll!")
        var overAllInfo = []
        if(req.params.challengeId===""){
          res.status(422).send("Empty request params!")
        }
        else{
          db.Challenges
            .findOne({_id: req.params.challengeId})
            .populate("participants")
            .exec(async function(err,challengeInfo){
              if(err){
                res.status(422).send("The challenge was not found")
              }
              else{
                var startingDate = moment(challengeInfo.startingDate)
                var desiredDate = moment(Date.now())
                var startOfWeek = startingDate.set({hour:0,minute:0,second:0,millisecond:0})
                var endOfWeek = startOfWeek.clone().add(6,"days").set({hour:23,minute:59,second:59,millisecond:999})
                var activitiesOwedInWeek = 0
                if(desiredDate.isBefore(startOfWeek)){
                  res.status(422).send("The desired date is before the starting date of the challenge")
                }
                else{
                    var whileInfo = await overallWhile(res,challengeInfo,activitiesOwedInWeek,overAllInfo)
                    // console.log("whileInfo: ",whileInfo)
                }
              }
            })
        }
      }
}