function WeekView({ startOfWeek }) {
  // Create an array of 7 consecutive days
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return day;
  });
  // Generate 24 hours for each day column
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="week-view">
      {/* Top row showing the 7 day names */}
      <div className="week-header-row">
        {weekDays.map((day, index) => {
          // Get short weekday name (Sun, Mon, Tue...)
          const weekday = day.toLocaleDateString("en-US", {
            weekday: "short",
          });

          // Get numeric month/day
          const monthDay = day.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          });

          return (
            <div key={index} className="week-header-cell">
              <div className="weekday-name">{weekday}</div>
              <div className="month-day">{monthDay}</div>
            </div>
          );
        })}
      </div>
      {/* Time grid */}
      <div className="week-grid">
        {hours.map((hour) => {
          // Convert 24-hour time to 12-hour format
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          const ampm = hour >= 12 ? "PM" : "AM";

          return (
            <div key={hour} className="week-row">
              {/* Time label column */}
              <div className="week-time-label">
                {displayHour}:00 {ampm}
              </div>

              {/* 7 day columns for that hour */}
              {weekDays.map((_, index) => (
                <div key={index} className="week-cell"></div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeekView;
