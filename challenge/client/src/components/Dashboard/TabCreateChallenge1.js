import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import firebase from "../firebase"
import API from "../../utils/API"
import CssBaseline from "@material-ui/core/CssBaseline"
import FullWidthGrid from "./Grid"

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog1(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [goToDashboardGrid,setGoToDashboardGrid] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const clickOnNew = ()=>{
    API.createChallenge(props)
       .then((results,err)=>{
         if(err){
           console.log(err)
         }
         else{
          //  setGoToDashboardGrid(true)
          //  setOpen(false);
          window.location.reload();
         }
       })
  }

  const handleClose = () =>{
    setOpen(false);
  }

  const data = API.getUserInfo();
  console.log("TCL: data", data)
  
  // FETCH UID (invitation code) from Mongoose





  if(goToDashboardGrid===false){
    return (
      <div>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        >
          Create new Challenge
        </Button>
  
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Please review
              </Typography>
              <Button autoFocus color="inherit" onClick={clickOnNew}>
                Confirm
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText
                secondary="Challenge Name"
                primary={props.data.name}
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary={props.data.rules}
                secondary="Rules of the Challenge"
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary={props.data.qtyOfActPerWeek}
                secondary="Quantity of necessary activities per week"
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary={props.data.duration + " weeks"}
                secondary="Challenge duration"
              />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary={"$ " + props.data.unitCost}
                secondary="Weekly unit cost"
              />
            </ListItem>
          </List>
        </Dialog>
      </div>
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
}

