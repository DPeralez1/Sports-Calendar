function DayView({ selectedDate }) {
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

  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const day = selectedDate.getDate();

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="day-view">
      <h2>
        {monthNames[month]} {day}, {year}
      </h2>

      <div className="day-timeline">
        {hours.map((hour) => {
          const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

          const ampm = hour >= 12 ? "PM" : "AM";

          return (
            <div key={hour} className="time-slot">
              <div className="time-label">
                {displayHour}:00 {ampm}
              </div>
              <div className="time-content"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DayView;
