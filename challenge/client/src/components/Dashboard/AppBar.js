import React from "react";
import AppBarBase from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(
  theme => (
    console.log(theme),
    {
      menuButton: {
        marginLeft: "auto"
      },
      listItem: {
        textAlign: "center"
      },
      drawerPaper: {
        marginTop: theme.mixins.toolbar.minHeight
      },
      drawerModal: {
        zIndex: theme.zIndex.appBar
      }
    }
  )
);

const FullList = () => {
  const classes = useStyles();
  return (
    <List>
      <ListItem className={classes.listItem}>
        <ListItemText>Home</ListItemText>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText>Create group</ListItemText>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText>My Account</ListItemText>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText>Logout</ListItemText>
      </ListItem>
    </List>
  );
};

export default function AppBar() {
  const classes = useStyles();

  const [isOpen, setState] = React.useState(false);

  const toggleDrawer = open => event => {
    setState(open);
  };

  return (
    <React.Fragment>
      <AppBarBase position="relative" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Challenge Me
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            className={classes.menuButton}
            onClick={toggleDrawer(!isOpen)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBarBase>
      <Drawer
        variant="temporary"
        anchor="top"
        open={isOpen}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
          modal: classes.drawerModal
        }}
      >
        <FullList />
      </Drawer>
    </React.Fragment>
  );
}