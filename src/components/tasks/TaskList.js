import React from "react"
import TaskListItem from "./TaskListItem"
import { colors } from "../../utils/theme"

export default function TaskList(tasks) {
  return tasks.map((task) => TaskListItem(task))
}
