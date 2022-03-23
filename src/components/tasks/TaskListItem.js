import React from "react";
import {colors} from "../../utils/theme"

export default function TaskListItem({task}){
    return <div>{JSON.stringify(task)}</div>
}