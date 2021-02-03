import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar as NavBar, Nav } from "react-bootstrap";
import "./Navbar.css";
const Navbar = () => {
  return (
    <NavBar className="navbar-dark" bg="dark" expand="lg">
      <NavBar.Brand className="brand">SYNCED</NavBar.Brand>
      <NavBar.Toggle aria-controls="basic-navbar-nav" />
      <NavBar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="navbar-item" to="/">
            HOME
          </NavLink>
          <NavLink className="navbar-item" to="/calculator">
            CALCULATOR
          </NavLink>
          <NavLink className="navbar-item" to="/tictactoe">
            TICTACTOE
          </NavLink>
          <NavLink className="navbar-item" to="/login">
            LOGIN
          </NavLink>
          <NavLink className="navbar-item" to="/register">
            REGISTER
          </NavLink>
        </Nav>
      </NavBar.Collapse>
    </NavBar>
  );
};

export default Navbar;
