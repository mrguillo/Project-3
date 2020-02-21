import React, { Component, Fragment } from "react";
import AppBar from "../Dashboard/AppBar";
import Footer from "../Dashboard/Footer";
import Checkout from "./Form";

export default class extends Component {
  render() {
    return (
      <Fragment>
        <AppBar />

        <Checkout />

        <Footer />
      </Fragment>
    );
  }
}
