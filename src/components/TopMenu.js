import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import { Outlet } from "react-router-dom"

export default function TopMenu() {
  function NavItem({ redirectTo, label }) {
    return (
      <LinkContainer to={redirectTo} style={{ textDecoration: "none" }}>
        <Nav.Link active={false}>{label}</Nav.Link>
      </LinkContainer>
    )
  }
  return (
    <div style={{ height: "100%", display: "flex", flexFlow: "column" }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/" activeClassName="selected">
            <Navbar.Brand>NftArt</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <NavItem redirectTo="/about" label="About" />
            <NavItem redirectTo="/connect" label="Connect" />
            <NavItem redirectTo="/userProfile" label="Profile" />
          </Nav>
        </Container>
      </Navbar>
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Outlet />
      </div>
    </div>
  )
}
