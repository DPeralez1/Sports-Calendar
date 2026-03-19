import { useState } from "react";
import DayView from "./DayView";
import WeekView from "./WeekView";
import YearView from "./YearView";
import { getAllEvents, filterEventsByLeagues } from "../data/eventUtils";

function Calendar({ selectedLeagues }) {
  const [selectedView, setSelectedView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const emptyCells = Array.from({ length: startDay });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const totalCells = emptyCells.length + days.length;
  const trailingEmptyCells = Array.from({ length: 42 - totalCells });

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

      {/* MONTH VIEW */}
      {selectedView === "month" && (
        <>
          <div className="day-names-row">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thur</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="calendar-grid">
            {emptyCells.map((_, index) => {
              const dayNumber = prevMonthDays - emptyCells.length + index + 1;
              return (
                <div key={`prev-${index}`} className="date-cell other-month">
                  <div className="date-number">{dayNumber}</div>
                </div>
              );
            })}

            {days.map((day) => {
              const cellDate = new Date(year, month, day);
              const isToday =
                day === todayDate && month === todayMonth && year === todayYear;
              const isSelected =
                selectedDate &&
                cellDate.toDateString() === selectedDate.toDateString();

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(cellDate)}
                  className={`date-cell
                  ${isToday ? "today" : ""}
                  ${isSelected ? "selected" : ""}
                `}
                >
                  <div className="date-number">{day}</div>
                  <div className="events-container"></div>
                </div>
              );
            })}

            {trailingEmptyCells.map((_, index) => (
              <div key={`next-${index}`} className="date-cell other-month">
                <div className="date-number">{index + 1}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Year VIEW */}
      {selectedView === "year" && (
        <YearView currentDate={currentDate} events={filteredEvents} />
      )}

      {/* WEEK VIEW */}
      {selectedView === "week" && (
        <WeekView startOfWeek={startOfWeek} events={filteredEvents} />
      )}

      {/* DAY VIEW */}
      {selectedView === "day" && (
        <DayView date={currentDate} events={filteredEvents} />
      )}
    </div>
  );
}

export default Calendar;
