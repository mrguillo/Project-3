import React, {useEffect, useState} from "react"
import firebase from "../firebase"
import CssBaseline from "@material-ui/core/CssBaseline"
import FullWidthGrid from "./Grid"
import GroupCreateOrSelect from "./GroupCreateOrSelect"
import API from "../../utils/API"
import {CircularProgress} from "@material-ui/core";
import InitiateChallenge from "./InitiateChallenge"
import ChallengeNotInitiated from "./ChallengeNotInitiated"


export default function Dashboard(props) {
  const { classes } = props;
  const [userInfoState, setUserInfoState] = useState(
      {
        "challenges": "",
        "ownedChallenges": [],
        "_id": "",
        "username": "",
        "email": "",
        "firebaseId": "",
        "creationDate": ""
    }
  )

  useEffect(()=>{
    firebase.isInitialized().then(val => {
      API.getUserInfo(val.uid).then(results => {
        setUserInfoState(results.data)
      })
    })
  },[])

  // const unapprovedActivities = (challengeId) => {
  //   console.log("Running unapproved activities with challengeId: ", challengeId._id)
  //   API.unapprovedActivities(userInfoState.challenges._id)
  //       .then(function(results){
  //         console.log("results of unapproved: ", results)
  //       })
  // }


  var challengeCondition = false
  if(!firebase.getCurrentUsername()){
    challengeCondition = "Not logged in firebase"
  }
  else if(userInfoState._id === ""){
    challengeCondition = "userInfoState has not yet been set"
  }
  else if(!userInfoState.challenges || userInfoState.challenges.length === 0){
    challengeCondition = "The user does not have challenges"
  }
  else if(userInfoState.challenges.status === "started" || userInfoState.challenges.status === "ended"){
    challengeCondition = "Challenge's status is started or ended"
  }
  else if(userInfoState.challenges.status === "created" && userInfoState.challenges.owner.firebaseId === userInfoState.firebaseId){
    challengeCondition = "Challenge's status is created and he is the owner"
  }
  else if(userInfoState.challenges.status === "created" && userInfoState.challenges.owner.firebaseId !== userInfoState.firebaseId){
    challengeCondition = "Challenges's state is created and he is not the owner"
  }
  else{
    challengeCondition = false
  }

  switch(challengeCondition){
    case "Not logged in firebase":
      alert("Please login first");
      props.history.replace("/login");
      return null;
    case "userInfoState has not yet been set":
      return(
        <div id="loader">
          <CircularProgress/>
        </div>
        )
    case "The user does not have challenges":
      return (
        <React.Fragment>
          <CssBaseline />
          <GroupCreateOrSelect firebaseId={userInfoState.firebaseId}/>
        </React.Fragment>
      );
    case "Challenge's status is started or ended":
      return (
        <React.Fragment>
        {/* {unapprovedActivities(userInfoState.challenges)} */}
          <CssBaseline />
          <FullWidthGrid/>
        </React.Fragment>
      );
    case "Challenge's status is created and he is the owner":
      return (
        <React.Fragment>
          <CssBaseline />
          <InitiateChallenge challengeInfo={userInfoState.challenges}/>
        </React.Fragment>
      );
    case "Challenges's state is created and he is not the owner":
      return (
        <React.Fragment>
          <CssBaseline />
          <ChallengeNotInitiated/>
        </React.Fragment>
      );
    default:
      return null
  }

  async function logout() {
    await firebase.logout();
    //use for routing
    props.history.push("/");
  }
    
}
