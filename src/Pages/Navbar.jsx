import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar as NavBar, Nav } from "react-bootstrap";
import { useAuth } from "./../contexts/AuthContext";
import { database } from "./../services/FirebaseService";
import "./Navbar.css";
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [username, setUsername] = useState();
  const history = useHistory();
  useEffect(() => {
    getCurrentUsername().then((username) => {
      if (
        !username ||
        username === "" ||
        username === "undefined" ||
        username === null
      )
        setUsername("ANONYMOUS");
      else setUsername(username);
      localStorage.setItem("username", username);
    });
  }, []);
  async function getCurrentUsername() {
    try {
      let snap = await database
        .ref("users/" + currentUser?.uid + "/username")
        .once("value");
      return snap.val();
    } catch (err) {}
  }
  const onLogout = () => {
    localStorage.removeItem("username");
    history.go(0);
    history.push("/");
    logout();
  };
  return (
    <NavBar className="navbar-dark" bg="dark" expand="lg">
      <NavBar.Brand className="brand">{username}</NavBar.Brand>
      <NavBar.Toggle aria-controls="basic-navbar-nav" />
      <NavBar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="navbar-item" to="/">
            HOME
          </NavLink>
          <NavLink className="navbar-item" to="/features">
            FEATURES
          </NavLink>
          {!currentUser && (
            <>
              <NavLink className="navbar-item" to="/login">
                LOGIN
              </NavLink>
              <NavLink className="navbar-item" to="/register">
                REGISTER
              </NavLink>
            </>
          )}

          {currentUser && (
            <>
              <NavLink className="navbar-item" to="/profile">
                PROFILE
              </NavLink>
              <NavLink className="navbar-item" to="/" onClick={onLogout}>
                LOGOUT
              </NavLink>
            </>
          )}
        </Nav>
      </NavBar.Collapse>
    </NavBar>
  );
};

export default Navbar;
