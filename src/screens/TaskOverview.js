import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import { useAppProvider } from "../data/AppProvider"
import { useNavigate } from "react-router-dom"
import TaskList from "../components/tasks/TaskList"

export default function TaskOverview() {
  const { appData } = useAppProvider()
  const navigate = useNavigate()

  console.info(JSON.stringify(appData))

  const [tasks,setTasks]=useState([{taskId:1,desc:"Task structure",extra:[{attachment:"image uri"}],date:new Date(),done:false}])

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column" }}>
      <TaskList tasks={tasks} setTasks={setTasks}/>
    </div>
  )
}
