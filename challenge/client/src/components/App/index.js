import React, { useState, useEffect } from "react";
import HomePage from "../HomePage";
import Dashboard from "../Dashboard";
import Register from "../Register";
import Login from "../Login";
import Exercises from "../Exercises";
import NotFound from "../NotFound";
// import Challenges from "../../pages/Challenges";
// import Challenges from "../Dashboard/Challenges";
// import CreateChallenge from "../../pages/CreateChallenge";
// import CreateChallenge from "../CreateChallenge";

import firebase from "../firebase";

/*components required to use material-ui*/
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline, CircularProgress } from "@material-ui/core";

/*required components for routing*/
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { auth } from "firebase";
import Logout from "../Logout";

/*default material-ui theme generation*/
const theme = createMuiTheme();

/*It is created as a component function in the react hooks.*/
function App(props) {
  const PrivateRoute = ({ auth, component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          auth ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
        }
      />
    );
  };

  //Let's use the useState object to keep the firebase state
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  function initApp() {

      if (firebaseInitialized) {
        // User is signed in.
        var displayName = firebaseInitialized.displayName;
        var email = firebaseInitialized.email;
        var photoURL = firebaseInitialized.photoURL;
        var uid = firebaseInitialized.uid;
        console.log(
          displayName,
          email,
          photoURL,
          uid
        );
      } else {
        // User is signed out.
        // ...
        console.log("user is signed out");
      }
  }
  initApp();

  //Let's use useEffect to run the isInitialized function before the page loads.
  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val);
    });
  });

  //Process of displaying components according to firebase connection result
  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          {/* Routing according to the path entered */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/logout" component={Logout} />
          <Route exact component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  ) : (
    <div id="loader">
      <CircularProgress />
    </div>
  );
}

export default App; /*export to access from other files.*/
