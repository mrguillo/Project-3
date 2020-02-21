import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Set Group Goals
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="goal1"
            label="Goal 1"
            helperText="Be specific about the training type and goal to be achieved"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id="goal2" label="Goal 2" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id="goal3" label="Goal 3" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField id="goal4" label="Goal 4" fullWidth />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
