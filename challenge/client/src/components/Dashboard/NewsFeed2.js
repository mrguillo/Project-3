import React from 'react';
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

export default function NewsFeed() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Luis"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Run 3.5 miles or more
              </Typography>
              {" — Posted on Apr 28, 2020 at 7:58am"}
            </React.Fragment>
          }
        /><ApproveBtn />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
