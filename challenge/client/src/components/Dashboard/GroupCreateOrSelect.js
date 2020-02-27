import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FullScreenDialog1 from "./TabCreateChallenge1";
import FullScreenDialog2 from "./TabCreateChallenge2";
import TextField from "@material-ui/core/TextField";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import firebase from "../firebase"
import API from "../../utils/API"

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  },
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Action() {
  const classes = useStyles();

  // const [fee, setFee] = React.useState("");
  const [sendInfoNewChallenge, setSendInfoNewChallenge] = React.useState({
    challenge: null,
    rules: null,
    duration: 4,
    fee: 10
  })

  const [sendInfoJoinChallenge, setSendInfoJoinChallenge] = React.useState({
    code: null,
  })

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

// Switch for grabbing user input data CREATE NEW CHALLENGE / handling state
  const handleChanges = event => {
    switch (event.target.name) {
      case 'challenge':
        console.log(event)
        setSendInfoNewChallenge({...sendInfoNewChallenge, challenge: event.target.value});
      break;
      case 'rules':
        setSendInfoNewChallenge({...sendInfoNewChallenge, rules: event.target.value});
      break;
      case 'duration':
        setSendInfoNewChallenge({...sendInfoNewChallenge, duration: event.target.value});
      break;
      case 'fee':
        setSendInfoNewChallenge({...sendInfoNewChallenge, fee: event.target.value});
      break;
      default:
        break;
    }
  };

// Grabbing user invitation code for JOINING EXISTING CHALLENGE / handling state
const handleChangesJoin = event => {
  setSendInfoJoinChallenge({...sendInfoJoinChallenge, code: event.target.value});
  console.log(event.target.value);
}

// FETCH UID (invitation code) from Mongoose

async function doit() {
  const fbId = firebase.getCurrentUserId();
  console.log("The fbId process is ready => " + fbId);
   
  const mongooseId = await API.getUserInfo(fbId);
  console.log("Ready with someTimeConsumingThing => " + mongooseId.data._id);
}
 
doit();

  return (

    <React.Fragment>
      <CssBaseline />

      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Choose your Challenge!
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Welcome to Challenge-Me. To get started, please create a new Challenge group or simply join an existing one.
        </Typography>
      </Container>
      {/* End hero unit */}

      {/* CREATE CHALLENGE OPTION CARD */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardHeader
                title="Create new Challenge"
                subheader="Start a Challenge. Invite your friends."
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <TextField
                    id="challengeName"
                    label="Challenge Name"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    name='challenge'
                    value={sendInfoNewChallenge.challenge}
                    variant="outlined"
                    onChange={handleChanges}
                  />
                </div>
                <div className={classes.cardPricing}>
                  <TextField
                    id="challengeRules"
                    fullWidth
                    style={{ margin: 8 }}
                    label="Challenge rules"
                    multiline
                    rows="3"
                    name="rules"
                    value={sendInfoNewChallenge.rules}
                    placeholder="ie. Run at least 25 miles per week"
                    variant="outlined"
                    onChange={handleChanges}
                  />
                </div>

                <div className={classes.cardPricing}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="Duration">
                      Duration
                    </InputLabel>
                    <Select
                      labelId="Challenge lenght"
                      id="duration"
                      value={sendInfoNewChallenge.duration}
                      onChange={handleChanges}
                      name='duration'
                    >
                      <MenuItem value="">
                        <em>Select:</em>
                      </MenuItem>
                      <MenuItem value={4}>4 weeks</MenuItem>
                      <MenuItem value={8}>8 weeks</MenuItem>
                      <MenuItem value={12}>12 weeks</MenuItem>
                    </Select>
                    <FormHelperText>Establish Challenge lenght</FormHelperText>
                  </FormControl>
                </div>
                <div className={classes.cardPricing}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Weekly Fee
                    </InputLabel>
                    <Select
                      labelId="weeklyFee"
                      id="fee"
                      value={sendInfoNewChallenge.fee}
                      onChange={handleChanges}
                      name='fee'
                    >
                      <MenuItem value="">
                        <em>Choose</em>
                      </MenuItem>
                      <MenuItem value={10}>$10 per week</MenuItem>
                      <MenuItem value={20}>$20 per week</MenuItem>
                      <MenuItem value={30}>$30 per week</MenuItem>
                    </Select>
                    <FormHelperText>Establish a rate per week</FormHelperText>
                  </FormControl>
                </div>
                <ul>
                  <Divider light />
                </ul>
              </CardContent>
              <CardActions>
                <FullScreenDialog1 data={sendInfoNewChallenge} />
              </CardActions>
            </Card>
          </Grid>
          
          {/* CARD #2 */}
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardHeader
                title="Join a Challenge"
                subheader="Join an already existing group."
                titleTypographyProps={{ align: "center" }}
                subheaderTypographyProps={{ align: "center" }}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <TextField
                    id="challengeCode"
                    label="Challenge Invitation Code"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined"
                    name= "code"
                    value={sendInfoJoinChallenge.code}
                    onChange={handleChangesJoin}
                  />
                </div>
                <ul></ul>
              </CardContent>
              <CardActions>
                <FullScreenDialog2 data={sendInfoJoinChallenge}/>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container></Container>
      {/* End footer */}
    </React.Fragment>
  );
}
