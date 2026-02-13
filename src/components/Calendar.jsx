import { useState } from "react";

function Calendar() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(3);
  const [selectedView, setSelectedView] = useState("month");
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
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function goToNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  function goToToday() {
    setYear(todayYear);
    setMonth(todayMonth);
  }
  console.log(emptyCells.length, days.length, trailingEmptyCells.length);
  return (
    <>
      {selectedView === "month" && (
        <>
          <div className="calendar-container">
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
              {/* Empty cells before day 1 */}
              {emptyCells.map((_, index) => {
                const dayNumber = prevMonthDays - emptyCells.length + index + 1;

                return (
                  <div key={`prev-${index}`} className="date-cell other-month">
                    <div className="date-number">{dayNumber}</div>
                  </div>
                );
              })}
              {/* Date cells */}
              {days.map((day) => {
                const isToday =
                  day === todayDate &&
                  month === todayMonth &&
                  year === todayYear;

                return (
                  <div
                    key={day}
                    className={`date-cell ${isToday ? "today" : ""}`}
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
        <div>
          <h2>Day View</h2>
          <p>Coming soon...</p>
        </div>
      )}
    </>
  );
}

export default Calendar;
