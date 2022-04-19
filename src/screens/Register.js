import React, { useState } from "react"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/Form"
import Card from "react-bootstrap/Card"
import { registerUser } from "../firebase/auth"

//register component

export default function Register() {
  const [userData, setUserData] = useState({ email: "", password: "" })

  async function handleClick() {
    await registerUser(userData.email, userData.password).catch(() =>
      window.alert("Účet s tímto emailem již existuje!")
    )
  }

  function handlePropChange(propName, e) {
    setUserData({ ...userData, [propName]: e.target.value })
  }

  function isButtonDisabled() {
    return (
      userData?.password.length < 6 ||
      !/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/.test(
        userData.email
      )
    )
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Card border="primary" style={{ width: "30%" }} className="p-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Zadejte email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => handlePropChange("email", e)}
              autoComplete="new-password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Zadejte heslo</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => handlePropChange("password", e)}
              autoComplete="new-password"
            />
            <Form.Text>Heslo musí mít alespoň 6 znaků</Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={() => handleClick()} disabled={isButtonDisabled()}>
            Registrovat
          </Button>
        </Form>
      </Card>
      <footer style={{ bottom: 0, position: "absolute" }}>Semestrální projekt - TNPW2 - Patrik Pahulák</footer>
    </div>
  )
}
