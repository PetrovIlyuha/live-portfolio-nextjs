import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import styles from "./Navbar.module.css";
import AppLink from "../utils/AppLink";

const AppNavbar = () => {
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <Navbar.Brand className="mr-3 font-weight-bold">
          <AppLink href="/" className="h4 text-white navbar-brand">
            <img
              src="/logo.png"
              alt="Personal Brand Logo"
              className={styles.logo__img}
            />
          </AppLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/projects" className="text-center nav-link">
              Projects
            </AppLink>
            <AppLink href="/forum/categories" className="text-center nav-link">
              Forum
            </AppLink>
            <AppLink href="#" className="text-center nav-link">
              CV
            </AppLink>
          </Nav>
          <Nav>
            <AppLink href="/login" className="text-center nav-link">
              Login
            </AppLink>
            <AppLink
              href="/register"
              className="text-center btn btn-success bg-dark mx-auto pl-3 pr-3"
            >
              Register
            </AppLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
