import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuAppBar from "./AppBar";
import UserCard from "./Card";
import ChartTable from "./ChartTable";
import MsgSnackbar from "./Snackbar";
// import NewsFeed from "./NewsFeed";
import NewsFeed2 from "./NewsFeed2";
import SimpleTabs from "./Tab";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Footer from "./Footer";
import firebase from "../firebase";
import API from "../../utils/API"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();
  // const [firebaseState, setFirebaseState] = useState(false)
  const [userInfoState, setUserInfoState] = useState(
      {
        "challenges": [],
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
        console.log("corriendo el useEffect de getUserInfo adentro de Grid", results.data)
        setUserInfoState(results.data)
        
      })
      // setFirebaseState(val.uid)
      // console.log("val.uid en  useEffect: ",val.uid)
    })
  },[])

  // useEffect(() => {
  // },[firebaseState]);

  return (
    <React.Fragment>
      {/* {console.log("userInfoState: ",userInfoState.username)} */}
      <CssBaseline />
      <Container>
        <Typography component="div" style={{ backgroundColor: "#cfe8fc" }} />
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MenuAppBar />
              </Grid>
              <Grid item xs={12}>
                <MsgSnackbar />
              </Grid>
              <Grid item xs={12} sm={4}>
                <UserCard username={userInfoState.username} genObj={userInfoState}/>
              </Grid>
              <Grid item xs={12} sm={8}>
                <ChartTable />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SimpleTabs />
              </Grid>
              <Grid item xs={12} sm={12}>
                {/* <NewsFeed /> */}
                <NewsFeed2 />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Footer />
              </Grid>
            </Grid>
          </div>
      </Container>
    </React.Fragment>
  );
}
