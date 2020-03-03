import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ApprovedByChip from './ApprovedChip';
import ApproveBtn from './ApproveButton';
import API from "../../utils/API"
var moment = require("moment");

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 100%,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));






export default function NewsFeed(props) {
  const classes = useStyles();


  const [userName, setName] = useState(
    ""
    )

  API.getUserDetails(props.username).then(results => {
    setName(results.data.username)
  })


  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar aria-label="recipe">
            {userName[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={userName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.description}
              </Typography>
              {" — Posted on " + moment(props.creationDate).format("DD/MM/YYYY - HH:mm:ss")}
            </React.Fragment>
          }
        />
        <ApproveBtn approveActivity={props.approveActivity} _id={props._id} status={props.status}/>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
