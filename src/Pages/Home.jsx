import React, { Component } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
class Home extends Component {
  state = {};
  render() {
    return (
      <div className="home-wrapper">
        <img src="" alt=" ini gambar " />
        <div className="home-tag">THIS IS MY WEBSITE</div>

        <div className="content-wrapper"></div>
      </div>
    );
  }
}

export default withRouter(Home);
