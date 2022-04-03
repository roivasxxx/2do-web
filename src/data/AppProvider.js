import React, { useEffect, useContext, useState } from "react"
import { authListener, setAuthPersistence } from "../firebase/auth"

const AppContext = React.createContext()

export const useAppProvider = () => {
  const { appData, setAppData, auth, setAuth } = useContext(AppContext)
  return { appData, setAppData, auth, setAuth }
}

export default function AppProvider(props) {
  const [appData, setAppData] = useState({ temp: "tempData" })
  const [auth, setAuth] = useState(undefined)

  useEffect(() => {
    console.log("AppProvider mounted")
    const listener = () => {
      setAuthPersistence()
      authListener(setAuth)
    }
    listener()
    return () => {
      listener()
      console.log("Unmounted AppProvider")
    }
  }, [])

  return <AppContext.Provider value={{ appData, setAppData, auth, setAuth }}>{props.children}</AppContext.Provider>
}
