import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import FullScreenDialog1 from "./TabCreateChallenge1";
import FullScreenDialog2 from "./TabCreateChallenge1";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Footer from "./Footer";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

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

  const [fee, setFee] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleChange = event => {
    setFee(event.target.value);
  };

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
          Welcome to Challenge-Me. To get started, please select weather you
          like to create a new Challenge group or simply join an existing one.
        </Typography>
      </Container>
      {/* End hero unit */}
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
                    variant="outlined"
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
                    placeholder="ie. Run at least 25 miles per week"
                    variant="outlined"
                  />
                </div>

                <div className={classes.cardPricing}>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel id="Fees">
                      Duration
                    </InputLabel>
                    <Select
                      labelId="Challenge lenght"
                      id="fees"
                      value={fee}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select:</em>
                      </MenuItem>
                      <MenuItem value={10}>4 weeks</MenuItem>
                      <MenuItem value={20}>8 weeks</MenuItem>
                      <MenuItem value={30}>12 weeks</MenuItem>
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
                      value={fee}
                      onChange={handleChange}
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
                <FullScreenDialog1 />
              </CardActions>
            </Card>
          </Grid>

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
                  />
                </div>
                <ul></ul>
              </CardContent>
              <CardActions>
                <FullScreenDialog2 />
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
