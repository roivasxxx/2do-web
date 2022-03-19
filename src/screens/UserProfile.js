import React from "react"
import { useAppProvider } from "../data/AppProvider"
import Blockie from "../components/Blockie"

export default function UserProfile() {
  const { appData } = useAppProvider()

  return (
    <div>
      <p>{appData?.address || "Your address"}</p>
      <Blockie />
    </div>
  )
}
