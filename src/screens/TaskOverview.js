import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useAppProvider } from "../data/AppProvider"
import { useNavigate } from "react-router-dom"
import DatePickerComponent from "../components/DatePickerComponent"
import Form from "react-bootstrap/Form"
import CalendarComponent from "../components/CalendarComponent"
import Modal from "react-bootstrap/Modal"
import { addNewEntry, updateEntry, deleteEntry } from "../firebase/firestore"
import Toast from "react-bootstrap/Toast"
import ToastContainer from "react-bootstrap/ToastContainer"

//Kalendář - nedošlo k refactoringu kvůli nedostatku času při odezvdávání

export default function TaskOverview() {
  const { appData, auth } = useAppProvider()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [newEvent, setNewEvent] = useState({})
  const [events, setEvents] = useState([])
  const [toastsVisible, setToastVisible] = useState({ success: { visible: false }, error: { visible: false } })
  const [selectedEvent, setSelectedEvent] = useState({})

  useEffect(() => {
    setEvents(appData)
  }, [appData])

  async function handleAddNewEntry() {
    if (newEvent.title && newEvent.start && newEvent.end && newEvent.start <= newEvent.end)
      await addNewEntry(newEvent, auth.email)
        .then(() => {
          setToastVisible({ ...toastsVisible, success: { visible: true } })
          setShow(false)
        })
        .catch(() => {
          setToastVisible({ ...toastsVisible, error: { visible: true } })
          setShow(false)
        })
  }

  async function handleDelete() {
    if (selectedEvent.title && selectedEvent.start && selectedEvent.end && selectedEvent.start <= selectedEvent.end)
      await deleteEntry(selectedEvent, auth.email)
        .then(() => {
          setToastVisible({ ...toastsVisible, success: { visible: true } })
          setSelectedEvent({ title: "", start: "", end: "" })
        })
        .catch(() => {
          setToastVisible({ ...toastsVisible, error: { visible: true } })
          setSelectedEvent({ title: "", start: "", end: "" })
        })
  }

  async function handleUpdate() {
    if (selectedEvent.title && selectedEvent.start && selectedEvent.end && selectedEvent.start <= selectedEvent.end)
      await updateEntry(selectedEvent, auth.email)
        .then(() => {
          setToastVisible({ ...toastsVisible, success: { visible: true } })
          setSelectedEvent({ title: "", start: "", end: "" })
        })
        .catch(() => {
          setToastVisible({ ...toastsVisible, error: { visible: true } })
          setSelectedEvent({ title: "", start: "", end: "" })
        })
  }

  function handlePropChange(prop, value) {
    const obj = newEvent
    obj[prop] = value
    setNewEvent({ ...newEvent, [prop]: value })
  }

  function selectedEventPropChange(prop, value) {
    const obj = selectedEvent
    obj[prop] = value
    setSelectedEvent({ ...selectedEvent, [prop]: value })
  }

  const handleClose = () => setShow(false)

  const newTask = () => (
    <Modal show={show} className="newTask" onHide={handleClose}>
      <Modal.Header>Nová událost</Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
          <DatePickerComponent dateObject={newEvent} prop={"start"} handlePropChange={handlePropChange} />
          <DatePickerComponent dateObject={newEvent} prop={"end"} handlePropChange={handlePropChange} />
        </div>
        <Form>
          <Form.Label>Popisek události</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Zadejte popisek události"
            onChange={(e) => handlePropChange("title", e.target.value)}
            style={{ width: "100%" }}
          ></Form.Control>
        </Form>
        <Button variant="dark" style={{ margin: 10 }} onClick={handleAddNewEntry}>
          Uložit událost
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Zavřít
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const actionModal = () => (
    <Modal
      show={selectedEvent.title && selectedEvent.start && selectedEvent.end}
      className="actionModal"
      onHide={() => setSelectedEvent({ title: "", start: "", end: "" })}
    >
      <Modal.Header>Úprava události</Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
          <DatePickerComponent dateObject={selectedEvent} prop={"start"} handlePropChange={selectedEventPropChange} />
          <DatePickerComponent dateObject={selectedEvent} prop={"end"} handlePropChange={selectedEventPropChange} />
        </div>
        <Form>
          <Form.Label>Popisek události</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Zadejte popisek události"
            onChange={(e) => selectedEventPropChange("title", e.target.value)}
            style={{ width: "100%" }}
          ></Form.Control>
        </Form>
        <Button variant="warning" style={{ margin: 10 }} onClick={() => handleUpdate()}>
          Upravit událost
        </Button>
        <Button variant="danger" style={{ margin: 10 }} onClick={() => handleDelete()}>
          Smazat událost
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setSelectedEvent({ title: "", start: "", end: "" })}>
          Zavřít
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const toastComponent = () => (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast
        bg="success"
        autohide
        onClose={() => setToastVisible({ ...toastsVisible, success: { visible: false } })}
        show={toastsVisible.success.visible}
      >
        <Toast.Header>
          <strong className="me-auto">Kalendář</strong>
        </Toast.Header>
        <Toast.Body>Akce byla úspěšná!</Toast.Body>
      </Toast>
      <Toast
        bg="danger"
        autohide
        onClose={() => setToastVisible({ ...toastsVisible, error: { visible: false } })}
        show={toastsVisible.error.visible}
      >
        <Toast.Header>
          <strong className="me-auto">Kalendář</strong>
        </Toast.Header>
        <Toast.Body>Akce nebyla úspěšná!</Toast.Body>
      </Toast>
    </ToastContainer>
  )

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column", width: "100%" }}>
      <Button
        variant="dark"
        style={{ margin: 10 }}
        onClick={() => {
          handlePropChange("start", new Date())
          handlePropChange("end", new Date())
          setShow(true)
        }}
      >
        Přidat novou událost
      </Button>
      {newTask()}
      {actionModal()}
      {CalendarComponent(events, setSelectedEvent)}
      {toastComponent()}
    </div>
  )
}
