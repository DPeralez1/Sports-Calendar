import { useState } from "react";
import DayView from "./DayView";
import WeekView from "./WeekView";
import YearView from "./YearView";
import MonthView from "./MonthView";
import {
  getAllEvents,
  filterEventsByLeagues,
  getEventsForDate,
} from "../data/eventUtils";

function Calendar({ selectedLeagues }) {
  const [selectedView, setSelectedView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [popupEvent, setPopupEvent] = useState(null);
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const filteredEvents = filterEventsByLeagues(getAllEvents(), selectedLeagues);
  const startOfWeek = getStartOfWeek(currentDate);

  function getStartOfWeek(date) {
    const start = new Date(date);
    const dayOfWeek = start.getDay(); // 0 = Sun, 1 = Mon, ...
    start.setDate(start.getDate() - dayOfWeek); // Go back to Sunday
    return start;
  }

  function handleDayDoubleClick(date) {
    setCurrentDate(date);
    setSelectedDate(date);
    setSelectedView("day");
  }

  function goToPrev() {
    const newDate = new Date(currentDate);
    if (selectedView === "month") newDate.setMonth(newDate.getMonth() - 1);
    if (selectedView === "week") newDate.setDate(newDate.getDate() - 7);
    if (selectedView === "day") newDate.setDate(newDate.getDate() - 1);
    if (selectedView === "year") newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  }

  function goToNext() {
    const newDate = new Date(currentDate);
    if (selectedView === "month") newDate.setMonth(newDate.getMonth() + 1);
    if (selectedView === "week") newDate.setDate(newDate.getDate() + 7);
    if (selectedView === "day") newDate.setDate(newDate.getDate() + 1);
    if (selectedView === "year") newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  }

  function goToToday() {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  }

  function getHeaderTitle() {
    if (selectedView === "month") return `${monthNames[month]} ${year}`;
    if (selectedView === "year") return `${year}`;
    if (selectedView === "day") return currentDate.toDateString();
    if (selectedView === "week") {
      const start = getStartOfWeek(currentDate);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`;
    }
  }

  return (
    <div className="calendar-container">
      {/* TOPBAR — ALWAYS VISIBLE */}
      <div className="calendar-topbar">
        <div className="calendar-left-controls">
          <button onClick={goToPrev}>{"<"}</button>
          <button onClick={goToNext}>{">"}</button>
          <button onClick={goToToday}>Today</button>
          <div className="month-title">{getHeaderTitle()}</div>
        </div>

        <div className="calendar-right-controls">
          <div className="view-toggle">
            {["year", "month", "week", "day"].map((v) => (
              <button
                key={v}
                className={selectedView === v ? "active" : ""}
                onClick={() => setSelectedView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* YEAR VIEW */}
      {selectedView === "year" && (
        <YearView
          currentDate={currentDate}
          events={filteredEvents}
          onDayDoubleClick={handleDayDoubleClick}
        />
      )}

      {/* MONTH VIEW */}
      {selectedView === "month" && (
        <MonthView
          currentDate={currentDate}
          today={today}
          selectedDate={selectedDate}
          filteredEvents={filteredEvents}
          onDateClick={setSelectedDate}
          onDayDoubleClick={handleDayDoubleClick}
          onEventClick={setPopupEvent}
        />
      )}

      {/* WEEK VIEW */}
      {selectedView === "week" && (
        <WeekView startOfWeek={startOfWeek} events={filteredEvents} />
      )}

      {/* DAY VIEW */}
      {selectedView === "day" && (
        <DayView date={currentDate} events={filteredEvents} />
      )}
      {popupEvent && (
        <div className="popup-overlay" onClick={() => setPopupEvent(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <div
              className="popup-accent"
              style={{ backgroundColor: popupEvent.color }}
            />
            <button className="popup-close" onClick={() => setPopupEvent(null)}>
              ✕
            </button>
            <div className="popup-body">
              <div className="popup-league">{popupEvent.league}</div>
              <div className="popup-title">{popupEvent.title}</div>
              <div className="popup-detail">
                📅{" "}
                {new Date(popupEvent.date + "T12:00:00").toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </div>
              {popupEvent.location && (
                <div className="popup-detail">📍 {popupEvent.location}</div>
              )}
              {popupEvent.type && (
                <div className="popup-type">{popupEvent.type}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
