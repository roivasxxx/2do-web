import React, { useState } from "react"
import { useAppProvider } from "../data/AppProvider"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { changePassword } from "../firebase/auth"

//uživatelský profil

export default function UserProfile() {
  const { auth } = useAppProvider()
  const [password, setPassword] = useState("")
  const [modalData, setModalData] = useState({ text: "" })

  async function handlePasswordChange() {
    await changePassword(password)
      .then(() => {
        setModalData({ text: "Heslo úspěšně změněno!", title: "Úspěch" })
        setPassword("")
      })
      .catch(() => setModalData({ text: "Při změně hesla nastala chyba", title: "Chyba" }))
  }

  const modal = () => (
    <Modal
      show={modalData.text}
      onHide={() => setModalData({ text: "" })}
      border={modalData?.title === "Úspěch" ? "success" : "danger"}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalData.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{modalData.text}</Modal.Body>
    </Modal>
  )

  return (
    <div style={{ height: "100%", width: "100%", alignItems: "center", flexDirection: "column", display: "flex" }}>
      {modal()}
      <Card style={{ width: "40%", marginTop: 20 }} className="p-4">
        <Card.Text>{auth?.email}</Card.Text>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Nové heslo</Form.Label>
            <Form.Control
              autoComplete="new-password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Button variant="primary" disabled={password.length < 6} onClick={() => handlePasswordChange()}>
            Změnit heslo
          </Button>
        </Form>
      </Card>
    </div>
  )
}
