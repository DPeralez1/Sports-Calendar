import { getEventsForDate } from "../data/eventUtils";

function YearView({ currentDate, events, onDayDoubleClick }) {
  const year = currentDate.getFullYear();
  const today = new Date();
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
  const weekdayLetters = ["S", "M", "T", "W", "TH", "F", "S"];
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="year-view">
      {months.map((monthIndex) => {
        const firstDay = new Date(year, monthIndex, 1);
        const startDay = firstDay.getDay();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();
        const totalCells = 42;
        const cells = [];

        // loop through 42 grid position
        for (let i = 0; i < totalCells; i++) {
          let dayNumber;
          let isCurrentMonth = true;
          let cellDate;

          if (i < startDay) {
            dayNumber = daysInPrevMonth - startDay + i + 1;
            isCurrentMonth = false;
            cellDate = new Date(year, monthIndex - 1, dayNumber);
          } else if (i >= startDay + daysInMonth) {
            dayNumber = i - (startDay + daysInMonth) + 1;
            isCurrentMonth = false;
            cellDate = new Date(year, monthIndex + 1, dayNumber);
          } else {
            dayNumber = i - startDay + 1;
            cellDate = new Date(year, monthIndex, dayNumber);
          }
          // Check if this cell is today
          const isToday =
            isCurrentMonth &&
            dayNumber === today.getDate() &&
            monthIndex === today.getMonth() &&
            year === today.getFullYear();
          const eventsOnDay = isCurrentMonth
            ? getEventsForDate(cellDate, events)
            : [];

          cells.push(
            <div
              key={i}
              className={`year-cell ${!isCurrentMonth ? "other-month" : ""}`}
              onDoubleClick={() => isCurrentMonth && onDayDoubleClick(cellDate)}
            >
              <div className={`year-day-number ${isToday ? "today" : ""}`}>
                {dayNumber}
              </div>
              {eventsOnDay.length > 0 && (
                <div className="season-indicators">
                  {eventsOnDay.map((event) => (
                    <div
                      key={event.id}
                      className="season-dot"
                      style={{
                        backgroundColor: event.color,
                      }}
                      title={event.title}
                    />
                  ))}
                </div>
              )}
            </div>,
          );
        }

        return (
          <div key={monthIndex} className="year-month">
            {/* Month Name */}
            <div className="year-month-title">{monthNames[monthIndex]}</div>
            {/* Weekday Headers */}
            <div className="year-weekdays">
              {weekdayLetters.map((letter, index) => (
                <div key={index} className="year-weekday">
                  {letter}
                </div>
              ))}
            </div>
            {/* 6x7 Grid */}
            <div className="year-month-grid">{cells}</div>
          </div>
        );
      })}
    </div>
  );
}

export default YearView;
