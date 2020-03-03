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
  const [activitiesInPeriod, setActivitiesInPeriod] = useState(
    [{
      "name":"",
      "units":""
    }
    ]
  )
  const [overallInfo, setOverallInfo] = useState(
    [{
      "name":"",
      "activitiesOwed:":"",
      "owes":""
    }]
  )

  const [activitiesState, setActivitiesState] = useState(
    []
  )

  useEffect(()=>{
    firebase.isInitialized().then(val => {
      API.getUserInfo(val.uid).then(userInfoResults => {
        console.log("userInfoResults: ",userInfoResults)
        setUserInfoState(userInfoResults.data)
        if(userInfoResults.data.challenges._id.length > 0){
          API.approvedInPeriod(userInfoResults.data.challenges._id).then(approvedInPresults =>{
            setActivitiesInPeriod(approvedInPresults.data.data)
            API.overall(userInfoResults.data.challenges._id).then(overallResults =>{
              console.log("overallResults: ",overallResults)
              setOverallInfo(overallResults.data.overallData)
              API.unapprovedActivities(userInfoResults.data).then(res => {
              setActivitiesState(res.data)
              })
            })
          })
        }
      })
    })
  },[])

  const addActivity = id => {
    firebase.isInitialized().then(val => {
      API.getUserInfo(val.uid).then(results => {
        setUserInfoState(results.data)
        console.log("results.data dentro de addActivity: ",results.data)
          API.unapprovedActivities(results.data).then(res => {
            console.log("res de unapproved dentro de addActivity: ",res)
          setActivitiesState(res.data)
        })
      })
    })
  }

  const approveActivity = (id,status) => {
    API.approveActivity({id,status}).then(approvalResults => {
      API.unapprovedActivities(userInfoState).then(res => {
        setActivitiesState(res.data)
        window.location.reload();
      })
    })

    firebase.isInitialized().then(val => {
      API.getUserInfo(val.uid).then(results => {
        setUserInfoState(results.data)
          API.unapprovedActivities(results.data).then(res => {
          setActivitiesState(res.data)
        })
      })
    })
  };

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

              <Grid item xs={12} sm={4}>
                <UserCard username={userInfoState.username} genObj={userInfoState} addActivity={addActivity}/>
              </Grid>
              <Grid item xs={12} sm={8}>
                <ChartTable data={activitiesInPeriod} overall={overallInfo}/>
              </Grid>
              <Grid item xs={12} sm={12}>
                <SimpleTabs />
              </Grid>
              <Grid item xs={12} sm={12}>
                {/* <NewsFeed /> */}
                {activitiesState.map(activity => (
                  <NewsFeed2
                  approveActivity={approveActivity}
                  _id={activity._id}
                  status={activity.status}
                  username={activity.owner}
                  description={activity.description}
                  creationDate={activity.creationDate}
                  />
                ))}
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
