import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GoalSelect from './GoalSelector';
import firebase from '../firebase'
import UserContext from "../../utils/UserContext"
import API from "../../utils/API"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: "95%"
    },
  },
}));


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [firebaseInitialized,setFirebaseInitialized]=React.useState(false)
  const [activityState, setActivity] = useState({
    firebaseId: "",
    challengeId: "",
    description: ""
  });

  const userContext = useContext(UserContext);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  // var activity = {
  //   "firebaseId": "KfR4OKBklqepA247awyGn630cSs2",
  //   "challengeId": "5e5878b608345c0687e673de",
  //   "description": "Activity..."
  // }

  const handleClose = () => {
    console.log("activityState", activityState)
    API.createActivity(activityState).then(results => {
      console.log("Resultados de createActivity", results)
      props.addActivity()
    })
    setOpen(false);
  };

  const handleInputChange = event => {
    // alert(event.target.value)
    // setActivity({ ...activityState, firebaseId: event.target.value })
    // setActivity({ ...activityState, challengeId: event.target.value })
    setActivity({ firebaseId: props.genObj.firebaseId, challengeId: props.genObj.ownedChallenges, description: event.target.value })
    // console.log(activityState)
    console.log(props.genObj.ownedChallenges)
  };

  const handleTest = () => {
    console.log("click");
    console.log(firebaseInitialized);
    
  };

  React.useEffect(()=>{

    firebase.isInitialized().then(val=>{
        setFirebaseInitialized(val)
    })
})

  return (
    <div>
      <Button variant="outlined" color="success" onClick={handleClickOpen}>
        Submit activity
      </Button>
      {/* <Button variant="outlined" color="success" onClick={handleTest}>
        Test
      </Button> */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Submit an activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select your achieved goal. After submitting, ask any of your teammates to approve your activity.
          </DialogContentText>
        {/* <GoalSelect handleInputChange={handleInputChange}/> */}
        <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Your activity"
          variant="outlined"
          onChange={handleInputChange}
        />
      </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit for approval
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
