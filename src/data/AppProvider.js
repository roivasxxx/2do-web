import React, { useEffect, useContext, useState } from "react"
import { authListener, setAuthPersistence } from "../firebase/auth"
import { callendarOnSnapshot } from "../firebase/firestore"

const AppContext = React.createContext()

//custom hook pro přístup dat skrz celou aplikaci
export const useAppProvider = () => {
  const { appData, setAppData, auth, setAuth, unsub, setUnsub } = useContext(AppContext)
  return { appData, setAppData, auth, setAuth, unsub, setUnsub }
}

export default function AppProvider(props) {
  const [appData, setAppData] = useState([])
  const [auth, setAuth] = useState(undefined)
  const [unsub, setUnsub] = useState(() => () => {})

  useEffect(() => {
    const listener = () => {
      setAuthPersistence()
      authListener(setAuth)
    }
    listener()
    return () => {
      listener()
    }
  }, [])

  useEffect(() => {
    setAppData([])
    if (auth?.email) {
      callendarOnSnapshot(auth?.email, setAppData, setUnsub)
    }
  }, [auth])

  return (
    <AppContext.Provider value={{ appData, setAppData, auth, setAuth, unsub, setUnsub }}>
      {props.children}
    </AppContext.Provider>
  )
}
