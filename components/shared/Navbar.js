import { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import styles from "./Navbar.module.css";
import AppLink from "../utils/AppLink";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "../../apollo/actions";

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);
  if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
    if (!hasResponse) setHasResponse(true);
  }
  const checkPermissions = () =>
    user.role === "admin" || user.role === "instructor";
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className={styles.custom_navbar}>
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
            <AppLink
              href="/projects"
              className="text-center nav-link scale_up"
              style={{ color: "white !important" }}
            >
              Projects
            </AppLink>
            <AppLink
              href="/forum/categories"
              className="text-center nav-link scale_up"
            >
              Forum
            </AppLink>
            <AppLink href="#" className="text-center nav-link scale_up">
              CV
            </AppLink>
          </Nav>
          {hasResponse && (
            <Nav>
              {user ? (
                <div className="user_personal_navbar">
                  <div className="user_greeting">
                    <span className="nav-link mr-4">
                      Weclome{" "}
                      <span style={{ color: "yellow" }}>{user.username}</span>
                    </span>

                    <img
                      src={user.avatar}
                      alt="User's Profile Photo Avatar"
                      className="avatar_rounded"
                    />
                  </div>
                  <NavDropdown
                    className="nav-link mr-3"
                    title="Manage"
                    id="basic-nav-dropdown"
                  >
                    {checkPermissions && (
                      <AppLink href="/projects/new" className="dropdown-item">
                        Create Project
                      </AppLink>
                    )}
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                  </NavDropdown>
                  <AppLink
                    href="/logout"
                    className="text-center sign_out_link btn btn-danger"
                  >
                    Sign Out
                  </AppLink>
                </div>
              ) : (
                <>
                  <AppLink href="/login" className="text-center nav-link">
                    Login
                  </AppLink>
                  <AppLink
                    href="/register"
                    className="text-center btn btn-success bg-dark mx-auto pl-3 pr-3"
                  >
                    Register
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withApollo(AppNavbar);
