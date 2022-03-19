import React, { useState, useEffect } from "react"
import { tempSquareData } from "../constants/utils"

export default function ArtBoard({ type }) {
  const [squares, setSquares] = useState([])

  useEffect(() => {
    setSquares(tempSquareData)
  }, [])

  const square = (el, row, column) => {
    return <div key={"square:" + row + column} style={{ backgroundColor: `rgb${el}`, height: 40, width: 40 }}></div>
  }

  const row = (rowElements, rowIndex) => {
    console.log("rowIndex: ", rowIndex, " rowelements:", rowElements)
    return (
      <div key={"row:" + rowIndex} style={{ display: "flex", flexDirection: "row" }}>
        {rowElements.map((el, columnIndex) => square(el, rowIndex, columnIndex))}
      </div>
    )
  }

  return <div>{squares.map((_row, index) => row(_row, index))}</div>
}
