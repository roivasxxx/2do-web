import React from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import cs from "date-fns/locale/cs/index"
import "react-big-calendar/lib/css/react-big-calendar.css"

/**
 * @param {Array} events
 * @param {Function} setSelectedEvent
 * Calendar component - obsahuje implementaci react-big-calendar + nastavování
 */
export default function CalendarComponent(events, setSelectedEvent) {
  const locales = { "cs-czech": cs }

  const lang = {
    cs: {
      date: "Datum",
      event: "Událost",
      time: "Čas",
      allDay: "Celý den",
      yesterday: "Včera",
      tomorrow: "Zítra",
      week: "Týden",
      work_week: "Pracovní týden",
      day: "Den",
      month: "Měsíc",
      previous: "Předchozí",
      next: "Následující",
      today: "Dnes",
      agenda: "Agenda",
      noEventsInRange: "Žádné události v daném časovém rozmezí!",
      showMore: (total) => `+${total} další`,
    },
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  const formats = {
    monthHeaderFormat: (date, culture, localizer) => format(new Date(), "MM/yyyy"),
  }

  return (
    <div>
      <Calendar
        defaultDate={new Date()}
        localizer={localizer}
        culture={"cs-czech"}
        messages={lang.cs}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        formats={formats}
        onSelectEvent={(event) => setSelectedEvent(event)}
      />
    </div>
  )
}
