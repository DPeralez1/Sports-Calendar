import { useState, useEffect } from "react";

function WeekView({ startOfWeek }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const today = new Date();

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const isCurrentWeek = today >= startOfWeek && today < endOfWeek;

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const topOffset = currentHour * 60 + currentMinute;

  // Create an array of 7 consecutive days
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return day;
  });
  // Generate 24 hours for each day column
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const currentDayIndex = weekDays.findIndex(
    (day) => day.toDateString() === now.toDateString(),
  );

  return (
    <div className="week-view">
      {/* Top row showing the 7 day names */}
      <div className="week-header-row">
        <div className="week-header-spacer"></div>
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
                <span>
                  {displayHour}:00 {ampm}
                </span>
              </div>

              {/* 7 day columns for that hour */}
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`week-cell ${
                    day.toDateString() === today.toDateString()
                      ? "today-column"
                      : ""
                  }`}
                ></div>
              ))}
            </div>
          );
        })}
        {isCurrentWeek && currentDayIndex !== -1 && (
          <div
            className="current-time-line"
            style={{
              top: `${topOffset}px`,
              left: `calc(80px + ${currentDayIndex} * (100% - 80px) / 7)`,
              width: `calc((100% - 80px) / 7)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default WeekView;
