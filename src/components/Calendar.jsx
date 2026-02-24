import { useState } from "react";
import DayView from "./DayView";
import WeekView from "./WeekView";

function Calendar() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const [selectedView, setSelectedView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
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
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const emptyCells = Array.from({ length: startDay });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  const totalCells = emptyCells.length + days.length;
  const trailingEmptyCells = Array.from({ length: 42 - totalCells });
  const startOfWeek = getStartOfWeek(currentDate);

  function getStartOfWeek(currentDate) {
    const start = new Date(currentDate);
    // getDay() gives us weekday index (0–6)
    const dayOfWeek = start.getDay();

    // Subtract weekday index to go back to Sunday
    start.setDate(start.getDate() - dayOfWeek);

    // Return calculated Sunday
    return start;
  }

  function goToPrev() {
    const newDate = new Date(currentDate);

    if (selectedView === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    if (selectedView === "week") {
      newDate.setDate(newDate.getDate() - 7);
    }

    if (selectedView === "day") {
      newDate.setDate(newDate.getDate() - 1);
    }

    if (selectedView === "year") {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }

    setCurrentDate(newDate);
  }

  function goToNext() {
    const newDate = new Date(currentDate);

    if (selectedView === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    }

    if (selectedView === "week") {
      newDate.setDate(newDate.getDate() + 7);
    }

    if (selectedView === "day") {
      newDate.setDate(newDate.getDate() + 1);
    }

    if (selectedView === "year") {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }

    setCurrentDate(newDate);
  }

  function goToToday() {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now);
  }

  function getHeaderTitle() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (selectedView === "month") {
      return `${monthNames[month]} ${year}`;
    }

    if (selectedView === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    }
    if (selectedView === "day") {
      return currentDate.toDateString();
    }
    if (selectedView === "year") {
      return `${year}`;
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
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
          >
            <option value="year">Year</option>
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

      {/* WEEK VIEW */}
      {selectedView === "week" && <WeekView startOfWeek={startOfWeek} />}

      {/* DAY VIEW */}
      {selectedView === "day" && <DayView date={currentDate} />}
    </div>
  );
}

export default Calendar;
