import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CustomizedRatings from "./Rating";
import FormDialog from "./FormDialog";
import Divider from "@material-ui/core/Divider";
import firebase from "../firebase";

import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1000
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function UserCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [firebaseInitialized, setFirebaseInitialized] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // React.useEffect(() => {
  //   firebase.isInitialized().then(val => {
  //     setFirebaseInitialized(val);
  //   });
  // });

  const avatarLetter = String(props.displayName);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {avatarLetter[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.displayName}
        subheader="This week position: #1"
      />
      <CustomizedRatings />
      <Box textAlign="justify" m={1}>
        Your balance: +$100
      </Box>
      <Divider variant="middle" />

      <CardContent>
        <FormDialog />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ></IconButton>
      </CardActions>
    </Card>
  );
}
