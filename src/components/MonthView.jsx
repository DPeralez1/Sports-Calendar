import { getEventsForDate } from "../data/eventUtils";

function MonthView({
  currentDate,
  today,
  selectedDate,
  filteredEvents,
  onDateClick,
  onDayDoubleClick,
  onEventClick,
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  // Array of empty slots for the leading "previous month" cells
  const emptyCells = Array.from({ length: startDay });
  // Last day of current month — trick: day 0 of next month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Last day of previous month — for showing overflow day numbers
  const prevMonthDays = new Date(year, month, 0).getDate();
  // Array of day numbers for current month [1, 2, 3 ... daysInMonth]
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
  // How many trailing cells to fill the 6x7 = 42 cell grid
  const totalCells = emptyCells.length + days.length;
  const trailingEmptyCells = Array.from({ length: 42 - totalCells });
  // ── WEEKDAY COLUMN HEADERS ──
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return (
    <>
      {/* ── WEEKDAY HEADER ROW ── */}
      <div className="day-names-row">
        {dayNames.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>

      {/* ── 6x7 CALENDAR GRID ── */}
      <div className="calendar-grid">
        {/* LEADING CELLS — overflow days from previous month */}
        {emptyCells.map((_, index) => {
          const dayNumber = prevMonthDays - emptyCells.length + index + 1;
          return (
            <div key={`prev-${index}`} className="date-cell other-month">
              <div className="date-number">{dayNumber}</div>
            </div>
          );
        })}

        {/* CURRENT MONTH CELLS */}
        {days.map((day) => {
          const cellDate = new Date(year, month, day);

          // Is this cell today?
          const isToday =
            day === todayDate && month === todayMonth && year === todayYear;

          // Is this cell the selected date?
          const isSelected =
            selectedDate &&
            cellDate.toDateString() === selectedDate.toDateString();

          // Get events that fall on this specific date
          const eventsOnDay = getEventsForDate(cellDate, filteredEvents);

          return (
            <div
              key={day}
              onClick={() => onDateClick(cellDate)}
              onDoubleClick={() => onDayDoubleClick(cellDate)}
              className={`date-cell
                ${isToday ? "today" : ""}
                ${isSelected ? "selected" : ""}
              `}
            >
              <div className="date-number">{day}</div>

              <div className="events-container">
                {eventsOnDay.map((event) => (
                  <div
                    key={event.id}
                    className="month-event-pill"
                    style={{ backgroundColor: event.color }}
                    title={event.title}
                    onClick={(e) => {
                      // stopPropagation prevents this click from
                      // bubbling up to the parent cell's onClick,
                      // which would also fire onDateClick
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* TRAILING CELLS — overflow days from next month */}
        {trailingEmptyCells.map((_, index) => (
          <div key={`next-${index}`} className="date-cell other-month">
            <div className="date-number">{index + 1}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MonthView;
