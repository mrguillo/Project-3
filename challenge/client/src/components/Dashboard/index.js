import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import FullWidthGrid from "./Grid";

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})



export default function Dashboard(props) {

    const { classes } = props
console.log(props.displayName);
    if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
    }


  return (
    <React.Fragment>
      <CssBaseline />

        <FullWidthGrid displayName={props.displayName}/>

    </React.Fragment>
  );

  async function logout() {
    await firebase.logout()
    //use for routing
    props.history.push('/')
    //
    //
}

}
