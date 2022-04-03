import React, { useRef, useEffect } from "react"
import { useAppProvider } from "../data/AppProvider"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"
import Form from "react-bootstrap/Form"
import { login } from "../firebase/auth"

export default function Login() {
  const { auth, setAuth } = useAppProvider()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const userData = useRef({ email: "", password: "" })

  async function handleClick() {
    login(userData.current.email, userData.current.password)
    navigate(from, { replace: true })
  }

  function handlePropChange(propName, e) {
    const curr = userData.current
    curr[propName] = e.target.value
    userData.current = curr
  }

  useEffect(() => {
    if (auth.accessToken) navigate(from, { replace: true })
  }, [auth])

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
          Submit
        </Button>
      </Form>
    </div>
  )
}
