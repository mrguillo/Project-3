import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ApprovedBtn(props) {
  const classes = useStyles();


  return (
    <div className={classes.root}>

      {/* Set status="approved" */}

      <Button variant="outlined" color="primary" _id={props._id} status={props.status} onClick={() => props.approveActivity(props._id,"approved")}>
        Approve
      </Button>

      <Button variant="outlined" color="secondary" _id={props._id} status={props.status} onClick={() => props.approveActivity(props._id,"rejected")}>
        Reject
      </Button>
    </div>
  );
}

