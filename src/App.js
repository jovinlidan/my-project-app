import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Calculator from "./Pages/Features/Calculator/Calculator";
import TicTacToe from "./Pages/Features/TicTacToe/TicTacToe";
import Weather from "./Pages/Features/Weather/Weather";

import Features from "./Pages/Features/Features";
import ScrollToTop from "./utils/ScrollToTop";

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="App">
            <Navbar />

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/features" exact component={Features} />
              <Route path="/features/calculator" exact component={Calculator} />
              <Route path="/features/tictactoe" exact component={TicTacToe} /><Route path="/features/weather" exact component={Weather} />
            </Switch>
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
