import React, { Component } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <div>
          <p>INI TAMPILAN UTAMA...</p>
        </div>
      </>
    );
  }
}

export default withRouter(Home);
