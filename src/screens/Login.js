import React, { useState, useEffect } from "react"
import { useAppProvider } from "../data/AppProvider"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import { login } from "../firebase/auth"

//login component

export default function Login() {
  const { auth } = useAppProvider()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const [userData, setUserData] = useState({ email: "", password: "" })

  function isButtonDisabled() {
    return (
      userData?.password.length < 6 ||
      !/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/.test(
        userData.email
      )
    )
  }

  async function handleClick() {
    await login(userData.email, userData.password)
      .then(() => navigate(from, { replace: true }))
      .catch(() => window.alert("Byly zadány špatné údaje!"))
  }

  function handlePropChange(propName, e) {
    setUserData({ ...userData, [propName]: e.target.value })
  }

  useEffect(() => {
    if (auth?.accessToken) {
      navigate(from, { replace: true })
    }
  }, [auth])

  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card border="primary" style={{ width: "30%" }} className="p-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Zadejte email"
              onChange={(e) => handlePropChange("email", e)}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Heslo</Form.Label>
            <Form.Control
              type="password"
              placeholder="Zadejte heslo"
              onChange={(e) => handlePropChange("password", e)}
              autoComplete="new-password"
            />
          </Form.Group>
          <Form.Group className="row mx-4">
            <Form.Text>Heslo musí mít alespoň 6 znaků</Form.Text>
            <Button variant="primary" onClick={() => handleClick()} disabled={isButtonDisabled()}>
              Přihlásit
            </Button>
            <Form.Text className="text-muted">
              Ještě nemáte účet?
              <Button variant="secondary" onClick={() => navigate("/register")} style={{ marginLeft: 5 }}>
                Zaregistrujte se
              </Button>
            </Form.Text>
          </Form.Group>
        </Form>
      </Card>
      <footer style={{ bottom: 0, position: "absolute" }}>Semestrální projekt - TNPW2 - Patrik Pahulák</footer>
    </div>
  )
}
