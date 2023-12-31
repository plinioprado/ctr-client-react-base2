import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ReactComponent as Logo } from "../../ctr_logo.svg";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Alert from "react-bootstrap/Alert";

import { SessionContext } from "../contexts/SessionContext";

function Header() {
  const { session, logout, alertHide } = useContext(SessionContext);

  const navigate = useNavigate();

  const handleMenu = (e: any) => {
    e.preventDefault();
    navigate(e.target.getAttribute("href").replace("#", ""));
  };

  const handleLogout = (e: any) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const access = session.auth_access && JSON.parse(session.auth_access);
  const showOp = (table: string) =>
    session.user_role === "super" || access[table];

  return (
    <header>
      <Navbar expand="md" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#/" onClick={handleMenu}>
            <Logo style={{ height: "1.5em" }} to="/" onClick={handleMenu} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {session.user_name && (
                <>
                  <NavDropdown title="Admin" id="basic-nav-dropdown">
                    {showOp("role") && (
                      <NavDropdown.Item href="#/role" onClick={handleMenu}>
                        Role
                      </NavDropdown.Item>
                    )}
                    {showOp("tenant") && (
                      <NavDropdown.Item href="#/tenant" onClick={handleMenu}>
                        Tenant
                      </NavDropdown.Item>
                    )}
                    {showOp("setting") && (
                      <NavDropdown.Item href="#/setting" onClick={handleMenu}>
                        Setting
                      </NavDropdown.Item>
                    )}
                    {showOp("user") && (
                      <NavDropdown.Item href="#/user" onClick={handleMenu}>
                        User
                      </NavDropdown.Item>
                    )}
                    {showOp("country") && (
                      <NavDropdown.Item href="#/country" onClick={handleMenu}>
                        Country
                      </NavDropdown.Item>
                    )}
                    {showOp("currency") && (
                      <NavDropdown.Item href="#/currency" onClick={handleMenu}>
                        Currency
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item href="#/session" onClick={handleMenu}>
                      Session
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    href="#/"
                    className="loginOption"
                    onClick={handleLogout}
                  >
                    {session.user_name && "Logout"}
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {session.alert && session.alert.message && (
        <Alert variant={session.alert.variant} dismissible onClose={alertHide}>
          {session.alert.message}
        </Alert>
      )}
    </header>
  );
}

export default Header;
