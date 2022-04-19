import React, { useEffect, useState } from "react"
import { useAppProvider } from "../data/AppProvider"
import * as dateFns from "date-fns"
import TaskList from "../components/tasks/TaskList"

//hlavní komponenta, na kterou je uživatel přesměrován po loginu/registraci

export default function Dashboard() {
  const { auth, appData } = useAppProvider()
  const today = new Date()
  const startOfWeek = dateFns.startOfWeek(today, { weekStartsOn: 1 })
  const endOfWeek = dateFns.endOfWeek(today, { weekStartsOn: 1 })
  const [weekAgenda, setWeekAgenda] = useState([])

  useEffect(() => {
    if (appData) {
      setWeekAgenda(
        appData
          .filter((el) => startOfWeek <= el.start && el.start <= endOfWeek)
          .map((el) => {
            return { ...el, end: endOfWeek }
          })
      )
    }
  }, [appData])

  return (
    <div style={{ flexDirection: "column", display: "flex", height: "100%" }}>
      <h1>Vítejte, {auth?.email}</h1>
      <h2>{"Dnes je " + today.getDate() + "." + today.getMonth() + "." + today.getFullYear()}</h2>
      <h3>Tento týden vás čekají tyto události: </h3>
      {TaskList(weekAgenda)}
    </div>
  )
}
