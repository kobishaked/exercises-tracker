import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem, Form, Button, NavDropdown, FormControl } from 'react-bootstrap';

function MyNavbar() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Exercise Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <NavDropdown title="users" id="basic-nav-dropdown">
              <NavDropdown.Item href="/createUser">add new user</NavDropdown.Item>
              <NavDropdown.Item href="/manageUsers">manage users</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="exercises" id="basic-nav-dropdown">
              <NavDropdown.Item href="/createExercise">add new exercise</NavDropdown.Item>
              <NavDropdown.Item href="/ManageExercises">manage user's exercises</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default MyNavbar




