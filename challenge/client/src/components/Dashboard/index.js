import React, {useEffect, useState} from "react"
import firebase from "../firebase"
import CssBaseline from "@material-ui/core/CssBaseline"
import FullWidthGrid from "./Grid"
import GroupCreateOrSelect from "./GroupCreateOrSelect"
import API from "../../utils/API"
import {CircularProgress} from "@material-ui/core";


export default function Dashboard(props) {
  const { classes } = props;
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [userInfoState, setUserInfoState] = useState(false)

  useEffect(() =>{
    firebase.isInitialized().then(async val => {
      await setFirebaseInitialized(val)
      API.getUserInfo(firebaseInitialized.uid).then(results => {
        console.log("Exito: ", results)
        setUserInfoState(results)
      })
    })
  },[firebaseInitialized])

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please login first");
    props.history.replace("/login");
    return null;
  }

  if(userInfoState === false){
    return(
    <div id="loader">
      <CircularProgress />
    </div>
    )
  }
  else{
    if (userInfoState.challenges.length === 0) {
      return (
        <React.Fragment>
          <CssBaseline />
          <GroupCreateOrSelect displayName={props.displayName}/>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <FullWidthGrid displayName={props.displayName}/>
        </React.Fragment>
      );
  
      async function logout() {
        await firebase.logout();
        //use for routing
        props.history.push("/");
        //
        //
      }
    } // parte del else
  }
}
