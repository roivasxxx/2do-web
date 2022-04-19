import React from "react"
import { colors } from "../../utils/theme"
import Card from "react-bootstrap/Card"
import format from "date-fns/format"

export default function TaskListItem(task) {
  return (
    <Card border="primary" style={{ marginBottom: 5 }} key={task?.id}>
      <Card.Header>
        {format(task?.start, "dd.MM.yyyy")} - {format(task?.end, "dd.MM.yyyy")}
      </Card.Header>
      <Card.Text>{task.title}</Card.Text>
    </Card>
  )
}
