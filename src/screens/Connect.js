import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useAppProvider } from "../data/AppProvider"
import { useNavigate } from "react-router-dom"

export default function Connect() {
  const { appData } = useAppProvider()
  const navigate = useNavigate()

  console.info(JSON.stringify(appData))

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column" }}>
      <div></div>
    </div>
  )
}
