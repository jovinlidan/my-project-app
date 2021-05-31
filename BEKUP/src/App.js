import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import Calculator from "./Pages/Features/Calculator/Calculator";
import TicTacToe from "./Pages/Features/TicTacToe/TicTacToe";
import Weather from "./Pages/Features/Weather/Weather";
import Features from "./Pages/Features/Features";
import ScrollToTop from "./utils/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <ScrollToTop>
        <div className="App">
          <Navbar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/features" exact component={Features} />
            {!currentUser && (
              <>
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route
                  path="/forgotpassword"
                  exact
                  component={ForgotPassword}
                />
              </>
            )}
            <PrivateRoute path="/profile" exact component={Profile} />
            <Route path="/features/calculator" exact component={Calculator} />
            <Route path="/features/tictactoe" exact component={TicTacToe} />
            <Route path="/features/weather" exact component={Weather} />
          </Switch>
        </div>
      </ScrollToTop>
    </Router>
  );
};

export default App;
