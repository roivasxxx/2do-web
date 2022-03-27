import React from "react"
import TaskListItem from "./TaskListItem"
import {colors} from "../../utils/theme"

export default function TaskList({tasks,setTasks}){
    return tasks.map((task)=><TaskListItem task={task}/>)
}