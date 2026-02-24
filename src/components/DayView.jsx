function DayView({ date }) {

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="day-view">
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
