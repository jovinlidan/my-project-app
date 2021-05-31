import React from "react";
import { withRouter } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import "./Home.css";

const Home = () => {
  const { currentUser } = useAuth();
  return (
    <div className="home-wrapper">
      {currentUser && (
        <h1> Your Email is {JSON.stringify(currentUser.email)}</h1>
      )}
      {!currentUser && (
        <h1> You are not logged in , please register and login now!</h1>
      )}
    </div>
  );
};

export default withRouter(Home);
