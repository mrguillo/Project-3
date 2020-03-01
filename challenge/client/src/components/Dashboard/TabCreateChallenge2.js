import React from "react";
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
import API from "../../utils/API"

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

export default function FullScreenDialog2(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  console.log("Esto es props: " + JSON.stringify(props));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clickOnJoin = ()=>{
    API.joinChallenge(props)
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Join an existing Challenge
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
            <Button autoFocus color="inherit" onClick={clickOnJoin}>
              Confirm
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary={props.data.invitationCode} secondary="Invitation code" />
          </ListItem>
          <Divider />
          {/* <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Challenge name"
            />
          </ListItem> */}
        </List>
      </Dialog>
    </div>
  );
}

