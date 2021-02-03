import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Calculator from "./Pages/Calculator/Calculator";
import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/calculator" exact component={Calculator} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
