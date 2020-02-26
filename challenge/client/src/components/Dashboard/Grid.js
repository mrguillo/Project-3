import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuAppBar from "./AppBar";
import UserCard from "./Card";
import ChartTable from "./ChartTable";
import MsgSnackbar from "./Snackbar";
import NewsFeed from "./NewsFeed";
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
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  const [userInfo, setUserInfo] = useState({})

  const classes = useStyles();
  console.log("grid: " + props.displayName)

  useEffect(() => {
    firebase.isInitialized().then(async val => {
      await setFirebaseInitialized(val)
        API.getUserInfo(firebaseInitialized.uid)
        .then(user => {
          setUserInfo({
            challenges: user.data.challenges,
            userId: user.data._id,
            username: user.data.username
          }).then(console.log(userInfo));

        })
      .catch(error => console.log("ERROR", error));
    });
  },[userInfo]);


  return (
    <React.Fragment>
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
                <UserCard displayName={props.displayName}/>
              </Grid>
              <Grid item xs={12} sm={8}>
                <ChartTable />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SimpleTabs />
              </Grid>
              <Grid item xs={12} sm={12}>
                <NewsFeed />
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
