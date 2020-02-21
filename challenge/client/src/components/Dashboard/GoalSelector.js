import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 520,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function GoalSelect() {
  const classes = useStyles();
  const [goal, setGoal] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, []);

  const handleChange = event => {
    setGoal(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select your accomplished goal</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={goal}
          onChange={handleChange}
        >
          <MenuItem value={10}>Run 3.5 miles or more</MenuItem>
          <MenuItem value={20}>Bike 25 miles or more</MenuItem>
          <MenuItem value={30}>Swim 1 mile or more</MenuItem>
          <MenuItem value={40}>90 min soccer or basketball game</MenuItem>
          <MenuItem value={50}>One hour spinning</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
