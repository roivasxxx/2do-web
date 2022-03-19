import React, { useEffect, useContext, useState } from "react"

const AppContext = React.createContext()

export const useAppProvider = () => {
  const { appData, setAppData } = useContext(AppContext)

  return { appData, setAppData }
}

export default function AppProvider(props) {
  const [appData, setAppData] = useState({ temp: "tempData" })

  return <AppContext.Provider value={{ appData, setAppData }}>{props.children}</AppContext.Provider>
}
