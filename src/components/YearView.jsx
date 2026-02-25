function YearView({ currentDate }) {
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

          if (i < startDay) {
            dayNumber = daysInPrevMonth - startDay + i + 1;
            isCurrentMonth = false;
          } else if (i >= startDay + daysInMonth) {
            dayNumber = i - (startDay + daysInMonth) + 1;
            isCurrentMonth = false;
          } else {
            dayNumber = i - startDay + 1;
          }
          // Check if this cell is today
          const isToday =
            dayNumber === today.getDate() &&
            monthIndex === today.getMonth() &&
            year === today.getFullYear() &&
            isCurrentMonth;
          cells.push(
            <div
              key={i}
              className={`year-cell ${!isCurrentMonth ? "other-month" : ""}`}
            >
              <div className={`year-day-number ${isToday ? "today" : ""}`}>
                {dayNumber}
              </div>
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
