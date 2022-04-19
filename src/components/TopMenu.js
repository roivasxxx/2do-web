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
import { useAppProvider } from "../data/AppProvider"

const StyledDiv = styled.div`
  &:hover {
    color: ${colors.primary};
  }
`

/**
 *
 * Navigace - zajištěna pomocí react-router-dom
 */
export default function TopMenu() {
  const { unsub, setUnsub } = useAppProvider()
  function NavItem({ redirectTo, label }) {
    return (
      <LinkContainer to={redirectTo} activeStyle={{ color: colors.primary }}>
        <Nav.Link active={false} className="custom-link">
          <StyledDiv>{label}</StyledDiv>
        </Nav.Link>
      </LinkContainer>
    )
  }

  function handleLogout() {
    unsub()
    setUnsub(() => () => {})
    logOut()
  }

  return (
    <div style={{ height: "100%", display: "flex", flexFlow: "column" }}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/" activeClassName="selected">
            <Navbar.Brand>Kalendář</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <NavItem redirectTo="/tasks" label="Kalendář" />
            <NavItem redirectTo="/userProfile" label="Profil" />
          </Nav>
          <Button onClick={() => handleLogout()} variant="dark" style={{ alignSelf: "end" }}>
            Odhlásit
          </Button>
        </Container>
      </Navbar>

      <div style={{ flex: 1, justifyContent: "center", alignItems: "center", display: "flex" }}>
        <Outlet />
      </div>
      <footer>Semestrální projekt - TNPW2 - Patrik Pahulák</footer>
    </div>
  )
}
