import React, { useEffect, useContext, useState } from "react"
import { authListener } from "../firebase/auth"

const AppContext = React.createContext()

export const useAppProvider = () => {
  const { appData, setAppData, auth, setAuth } = useContext(AppContext)
  return { appData, setAppData, auth, setAuth }
}

export default function AppProvider(props) {
  const [appData, setAppData] = useState({ temp: "tempData" })
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    const listener = async () => {
      await authListener(setAuth)
    }
    listener()
    return () => console.log("Unmounted AppProvider")
  }, [])
  return <AppContext.Provider value={{ appData, setAppData, auth, setAuth }}>{props.children}</AppContext.Provider>
}
