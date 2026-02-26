import { useState, useEffect } from "react";

function DayView({ date }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const [now, setNow] = useState(new Date());
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const topOffset = currentHour * 60 + currentMinute;

  return (
    <div className="day-view">
      <div className="day-timeline">
        {hours.map((hour) => {
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

          const ampm = hour >= 12 ? "PM" : "AM";

          return (
            <div key={hour} className="time-slot">
              <div className="time-label">
                <span>
                  {displayHour}:00 {ampm}
                </span>
              </div>
              <div className="time-content"></div>
            </div>
          );
        })}
        {/* Current Time Line */}
        {isToday && (
          <div
            className="current-time-line"
            style={{
              top: `${topOffset}px`,
              left: "80px",
              right: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default DayView;
