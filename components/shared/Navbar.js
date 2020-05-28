import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

const AppLink = ({ children, className, href }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);

const AppNavbar = () => {
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <Navbar.Brand className="mr-3 font-weight-bold">
          <AppLink href="/" className="h4 text-white navbar-brand">
            <img
              src="/logo.png"
              alt="Personal Brand Logo"
              style={{
                width: "120px",
                borderRadius: "10px",
                marginRight: "10px",
                marginTop: 10,
                boxShadow: "1px 0px 24px 10px rgba(119, 160, 118, 0.15)",
              }}
            />
          </AppLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink href="/portfolios" className="text-center nav-link">
              Portfolios
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
