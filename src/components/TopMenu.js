import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { LinkContainer } from "react-router-bootstrap"
import { Outlet } from "react-router-dom"
import { colors } from "../utils/theme"
import "./TopMenu.css"
import styled from "styled-components"
import Button from "react-bootstrap/esm/Button"
import { logOut } from "../firebase/auth"

const StyledDiv = styled.div`
  &:hover {
    color: ${colors.primary};
  }
`
export default function TopMenu() {
  function NavItem({ redirectTo, label }) {
    return (
      <LinkContainer to={redirectTo} activeStyle={{ color: colors.primary }}>
        <Nav.Link active={false} className="custom-link">
          <StyledDiv>{label}</StyledDiv>
        </Nav.Link>
      </LinkContainer>
    )
  }

  return (
    <div style={{ height: "100%", display: "flex", flexFlow: "column" }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/" activeClassName="selected">
            <Navbar.Brand>2DO</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <NavItem redirectTo="/tasks" label="Tasks" />
            <NavItem redirectTo="/userProfile" label="Profile" />
            <NavItem redirectTo="/about" label="About" />
          </Nav>
          <Button onClick={() => logOut()} variant="dark" style={{ alignSelf: "end" }}>
            Logout
          </Button>
        </Container>
      </Navbar>

      <div style={{ flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Outlet />
      </div>
    </div>
  )
}
