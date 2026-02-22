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

  return (
    <div>
      <h2>
        {monthNames[month]} {day}, {year}
      </h2>
      <p>Events for this day coming soon...</p>
    </div>
  );
}

export default DayView;
