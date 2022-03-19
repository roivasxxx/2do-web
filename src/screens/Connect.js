import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useAppProvider } from "../data/AppProvider"
import { useNavigate } from "react-router-dom"

export default function Connect() {
  const metamaskIcon = require("../assets/metamask-logo.png")
  const [toastVisible, setToastVisible] = useState(false)
  const { appData } = useAppProvider()
  const navigate = useNavigate()

  console.info(JSON.stringify(appData))

  async function handlePress() {
    setToastVisible(false)
    try {
      if (window?.ethereum) {
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => console.log(result))
          .catch((error) => {
            if (error.code === 4001) {
              setToastVisible(true)
              setTimeout(() => {
                setToastVisible(false)
              }, 5000)
            }
          })
      } else {
        console.info("Metamask either not installed or your browser doesn't support it")
      }
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column" }}>
      <div style={{ visibility: toastVisible ? "visible" : "hidden" }}>Connecting wallet failed</div>
      <div>
        <Button variant="dark" style={{ height: 60, marginTop: 5 }} onClick={() => handlePress()}>
          <p style={{ fontWeight: "500" }}>
            Connect your Metamask wallet
            <img src={metamaskIcon} alt="metamask-logo" style={{ height: 50, width: 50 }} />
          </p>
        </Button>
      </div>
    </div>
  )
}
