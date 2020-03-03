import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { green } from "@material-ui/core/colors";
import SvgIcon from "@material-ui/core/SvgIcon";
import FullWidthGrid from "../Dashboard";
import API from "../../utils/API";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  }
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function InitiateChallenge(props) {
  const classes = useStyles();
  const [goToDashboardGrid, setGoToDashboardGrid] = useState(false);

  if (goToDashboardGrid === false) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            You haven't started your Challenge yet!
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {/* {props.challengeInfo.owner.username + " :"} */}
            {"Challenge name:  " + props.challengeInfo.name}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {"So far, this is the list of joined friends:  "}
            {props.challengeInfo.participants.map(participant=>{
              return (<Typography variant="h6" component="h6" gutterBottom>
                {participant.username}
              </Typography>)
            })}
            {/* {props} */}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            align="center"
            onClick={startChallengeFunc}
          >
            Start your Challenge NOW!
          </Button>
          <div className={classes.root}>
            <HomeIcon style={{ color: green[500] }} />
            <Typography variant="body1">
              <Link color="inherit" href="/">
                {" "}
                Maybe later?, you can head back to the Challenge-Me home page here.
              </Link>
            </Typography>
          </div>
        </Container>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">
              Our sticky footer can be found here.
            </Typography>
          </Container>
        </footer>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <FullWidthGrid />
      </React.Fragment>
    );
  }

  function startChallengeFunc() {
    console.log("Challenge that will be started: ", props.challengeInfo._id);
    API.startChallenge({ challengeId: props.challengeInfo._id }).then(() => {
      setGoToDashboardGrid(true);
    });
  }
}
