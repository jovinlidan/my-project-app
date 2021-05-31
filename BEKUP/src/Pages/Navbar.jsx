import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar as NavBar, Nav } from "react-bootstrap";
import { useAuth } from "./../contexts/AuthContext";
import "./Navbar.css";
const Navbar = () => {
  const { currentUser, logout } = useAuth();
  return (
    <NavBar className="navbar-dark" bg="dark" expand="lg">
      <NavBar.Brand className="brand">ANONYMOUS</NavBar.Brand>
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
              <NavLink className="navbar-item" to="/" onClick={logout}>
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
