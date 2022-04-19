import React from "react"
import { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default function DatePickerComponent({ dateObject, prop, handlePropChange }) {
  const importedLocale = require(`date-fns/locale/cs/index.js`)
  registerLocale("locale", importedLocale)

  const Picker = require("react-datepicker").default

  return <Picker selected={dateObject[prop]} onChange={(date) => handlePropChange(prop, date)} locale="locale" inline />
}
