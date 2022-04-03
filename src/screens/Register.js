import React, { useRef } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/Form"
import { registerUser } from "../firebase/auth"

export default function Register() {
  const navigate = useNavigate()
  const userData = useRef({ email: "", password: "" })

  async function handleClick() {
    registerUser(userData.current.email, userData.current.password)
  }

  function handlePropChange(propName, e) {
    const curr = userData.current
    curr[propName] = e.target.value
    userData.current = curr
  }

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => handlePropChange("email", e)} />
          <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => handlePropChange("password", e)} />
        </Form.Group>
        <Button variant="primary" onClick={() => handleClick()}>
          Register
        </Button>
      </Form>
    </div>
  )
}
