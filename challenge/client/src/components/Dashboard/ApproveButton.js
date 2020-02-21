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

export default function ApprovedBtn() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Button variant="outlined" color="primary" href="#contained-buttons">
        Approve this activity
      </Button>

        <IconButton aria-label="delete" className={classes.margin}>
          <DeleteIcon fontSize="small" />
        </IconButton>
    </div>
  );
}

