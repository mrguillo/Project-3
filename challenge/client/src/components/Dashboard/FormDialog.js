import React, {useContext} from 'react';
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


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [firebaseInitialized,setFirebaseInitialized]=React.useState(false)

  const userContext = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  var activity = {
    "firebaseId": "KfR4OKBklqepA247awyGn630cSs2",
    "challengeId": "5e5878b608345c0687e673de",
    "description": "Activity..."
  }

  const handleClose = () => {
    API.createActivity(activity).then(results => {
      console.log("corriendo createActivity", results)
      
    })
    // setOpen(false);
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
        <GoalSelect />
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
