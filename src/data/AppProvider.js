import React, { useEffect, useContext, useState } from "react"

const AppContext = React.createContext()

export const useAppProvider = () => {
  const { appData, setAppData, auth, setAuth } = useContext(AppContext)
  return { appData, setAppData, auth, setAuth }
}

export default function AppProvider(props) {
  const [appData, setAppData] = useState({ temp: "tempData" })
  const [auth, setAuth] = useState({ userLogged: false })
  return <AppContext.Provider value={{ appData, setAppData, auth, setAuth }}>{props.children}</AppContext.Provider>
}
