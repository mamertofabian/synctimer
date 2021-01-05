import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

import { logout } from "../actions/userActions";
import { Fragment } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (userInfo && userInfo.loggedOut) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            SyncTimer <span className="badge badge-info">beta</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/*<LinkContainer to="/">
                <Nav.Link>
                  <i className="fas fa-home"></i> Home
                </Nav.Link>
                </LinkContainer> */}
              <Nav.Link
                href="https://codefrost.io/how-to-use-synctimer/"
                target="codefrost"
              >
                <i className="fas fa-question-circle"></i> How to Use
              </Nav.Link>
              {userInfo && userInfo.name ? (
                <Fragment>
                  <Nav.Link>Welcome, {userInfo.name}</Nav.Link>
                  <Nav.Link onClick={handleLogout}>
                    <i className="fas fa-user"></i> Sign Out
                  </Nav.Link>
                </Fragment>
              ) : (
                <Fragment>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fas fa-user-plus"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
