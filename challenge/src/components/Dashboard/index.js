import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Button
} from "@material-ui/core";
import VerifiedUserOutlined from "@material-ui/icons/VerifiedUserOutlined";
import withStyles from "@material-ui/core/styles/withStyles";
import firebase from "../firebase";
import { withRouter } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import FullWidthGrid from "./Grid";

export default function Dashboard() {
  return (
    <React.Fragment>
      <CssBaseline />

        <FullWidthGrid />

    </React.Fragment>
  );
}
