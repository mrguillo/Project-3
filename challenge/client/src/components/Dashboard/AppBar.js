import React from "react";
import AppBarBase from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  MenuItem,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  MenuList
} from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  
});

const FullList = () => {
  const classes = useStyles();
  return (
    <MenuList>
      <MenuItem component={Link} to="/">
        HOME
      </MenuItem>
      <MenuItem component={Link} to="/logout">
        LOGOUT
      </MenuItem>
    </MenuList>
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
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            className={classes.menuButton}
            onClick={toggleDrawer(!isOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Challenge Me
          </Typography>
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
