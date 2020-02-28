import React, {useEffect, useState} from "react"
import firebase from "../firebase"
import CssBaseline from "@material-ui/core/CssBaseline"
import FullWidthGrid from "./Grid"
import GroupCreateOrSelect from "./GroupCreateOrSelect"
import API from "../../utils/API"
import {CircularProgress} from "@material-ui/core";


export default function Dashboard(props) {
  const { classes } = props;
  const [numOfChallenges, setNumOfChallenges] = useState(false)

  useEffect((props) =>{
    firebase.isInitialized().then(val => {
      API.getUserInfo(val.uid).then(results => {
        console.log("Resultado de getUserInfo: ", results)
        setNumOfChallenges(0)
        console.log("numOfChallenges: ",numOfChallenges)
      })
    })
  },[numOfChallenges])



  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please login first");
    props.history.replace("/login");
    return null;
  }

  if(numOfChallenges === false){
    return(
    <div id="loader">
      <CircularProgress />
    </div>
    )
  }
  else{

    if (numOfChallenges === 0) {
      return (
        <React.Fragment>
          <CssBaseline />
          <GroupCreateOrSelect/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <FullWidthGrid/>
        </React.Fragment>
      );
  
      async function logout() {
        await firebase.logout();
        //use for routing
        props.history.push("/");
      }
    } // parte del else
  }
}
