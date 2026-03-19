import { f1Events } from "./f1Events";

export function getEventsForDate(date, allEvents) {
  return allEvents.filter((event) => {
    const eventDate = new Date(event.date + "T12:00:00");
    return eventDate.toDateString() === date.toDateString();
  });
}

export function filterEventsByLeagues(allEvents, selectedLeagues) {
  return allEvents.filter((event) => selectedLeagues.includes(event.league));
}

export function getAllEvents() {
  return [
    ...f1Events,
    // ...mlsEvents,    ← uncomment when you add MLS
    // ...mlbEvents,    ← uncomment when you add MLB
  ];
}
