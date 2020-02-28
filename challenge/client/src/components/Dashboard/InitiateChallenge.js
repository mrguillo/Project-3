import React, {useEffect, useState} from "react"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { Divider, makeStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import API from '../../utils/API';
import { Link, withRouter } from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline"
import FullWidthGrid from "./Grid"
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const InitiateChallenge = (props) => {
  const [goToDashboardGrid, setGoToDashboardGrid] = useState(false)

  if(goToDashboardGrid===false){
    return (
      <Container>
        <Grid item xs={2} sm={2}></Grid>
        <Grid item xs={8} sm={8}>
          <Card width="400px">
            <CardHeader title={props.challengeInfo.name} align="center"/>
            <Divider variant="middle" />
            <CardContent>
              <Typography align="center">
                Your challenge hasn't been  started
              </Typography>
              <div>
                <Typography align="center">Jero</Typography>
                <Typography align="center">Sync notes</Typography>
                <Typography align="center">Set deadline</Typography>
              </div>
            </CardContent>
            <Divider variant="middle" />
            <CardActions>
              <Grid></Grid>
              <Grid>
                <Button 
                variant="contained"
                color="primary"
                align="center"
                onClick={startChallengeFunc}
                >
                  Start!
                </Button>
              </Grid>
              <Grid></Grid>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={2} sm={2}></Grid>  
      </Container>
    );
  }
  else{
    return(
    <React.Fragment>
    <CssBaseline />
      <FullWidthGrid/>
    </React.Fragment>
    )
}

  function startChallengeFunc(){
    console.log("Challenge that will be started: ",props.challengeInfo._id)
    API.startChallenge({challengeId: props.challengeInfo._id})
       .then(()=>{
         setGoToDashboardGrid(true)
       })
  }
  
};

export default withRouter(InitiateChallenge);