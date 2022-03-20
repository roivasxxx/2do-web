import React from "react"
import { useAppProvider } from "../data/AppProvider"
import { Link, useNavigate, useLocation } from "react-router-dom"
import Button from "react-bootstrap/esm/Button"

export default function Login() {
  const { auth, setAuth } = useAppProvider()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  function handleNavigation() {
    setAuth({ userLogged: true })
    navigate(from, { replace: true })
  }
  return (
    <div>
      test test<Button onClick={() => handleNavigation()}></Button>
    </div>
  )
}
