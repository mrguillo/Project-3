import React from "react"
import firebase from "../firebase"
import CssBaseline from "@material-ui/core/CssBaseline"
import FullWidthGrid from "./Grid"
import GroupCreateOrSelect from "./GroupCreateOrSelect"

export default function Dashboard(props) {
  const { classes } = props;
  console.log(props.displayName);

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert("Please login first");
    props.history.replace("/login");
    return null;
  }

  if (true) {
    return (
      <React.Fragment>
        <CssBaseline />
        <GroupCreateOrSelect displayName={props.displayName} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <CssBaseline />

        <FullWidthGrid displayName={props.displayName} />
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
