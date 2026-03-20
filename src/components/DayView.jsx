import { useState, useEffect } from "react";
import { getEventsForDate } from "../data/eventUtils";

function DayView({ date, events }) {
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

  const eventsOnDay = getEventsForDate(date, events);
  function getEventStyle(event) {
    const timeString = event.time || "09:00";
    const [hourStr, minuteStr] = timeString.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    const top = hour * 60 + minute;
    const height = event.duration || 60;

    return { top, height };
  }

  // ── FORMAT TIME FOR DISPLAY ──
  // Converts "15:00" to "3:00 PM" for human-readable display
  function formatTime(timeString) {
    if (!timeString) return "";
    const [hourStr, minuteStr] = timeString.split(":");
    const hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minute} ${ampm}`;
  }
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
              <div className="time-content" />
            </div>
          );
        })}
        {eventsOnDay.map((event) => {
          const { top, height } = getEventStyle(event);

          return (
            <div
              key={event.id}
              className="day-event-block"
              style={{
                backgroundColor: event.color,
                position: "absolute",
                top: `${top}px`,
                height: `${height}px`,
                left: "80px",
                right: "8px",
              }}
            >
              <span className="day-event-title">{event.title}</span>
              <span className="day-event-time">
                {formatTime(event.time)}
                {event.duration && ` · ${event.duration} min`}
              </span>
              {event.location && (
                <span className="day-event-location">{event.location}</span>
              )}
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
