import { useState } from "react";
import DayView from "./DayView";

function Calendar() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const [selectedView, setSelectedView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
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
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const emptyCells = Array.from({ length: startDay });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const totalCells = emptyCells.length + days.length;
  const trailingEmptyCells = Array.from({ length: 42 - totalCells });

  function goToPrevMonth() {
    const prev = new Date(selectedDate);
    prev.setMonth(prev.getMonth() - 1);
    setSelectedDate(prev);
  }

  function goToNextMonth() {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() + 1);
    setSelectedDate(next);
  }

  function goToToday() {
    setSelectedDate(new Date());
  }

  return (
    <div className="calendar-container">
      {/* TOPBAR — ALWAYS VISIBLE */}
      <div className="calendar-topbar">
        <div className="calendar-left-controls">
          <button onClick={goToPrevMonth}>{"<"}</button>
          <button onClick={goToNextMonth}>{">"}</button>
          <button onClick={goToToday}>Today</button>

          <div className="month-title">
            {monthNames[month]} {year}
          </div>
        </div>

        <div className="calendar-right-controls">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
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
              const currentDate = new Date(year, month, day);

              const isToday =
                day === todayDate && month === todayMonth && year === todayYear;

              const isSelected =
                selectedDate &&
                currentDate.toDateString() === selectedDate.toDateString();

              return (
                <div
                  key={day}
                  onClick={() => setSelectedDate(currentDate)}
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

      {/* WEEK VIEW */}
      {selectedView === "week" && (
        <div>
          <h2>Week View</h2>
          <p>Coming soon...</p>
        </div>
      )}

      {/* DAY VIEW */}
      {selectedView === "day" && (
        <DayView selectedDate={selectedDate}/>
      )}
    </div>
  );
}

export default Calendar;
