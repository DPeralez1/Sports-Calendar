// src/data/f1Events.js

// Hardcoded F1 season data
// This is structured to be scalable when switching to API later.

export const f1Events = [
  {
    id: "f1-2026-bahrain-gp",
    sport: "F1",
    title: "Bahrain Grand Prix",
    start: "2026-03-08T15:00:00Z", // Always store in UTC
    end: "2026-03-08T17:00:00Z",
    location: "Bahrain International Circuit",
    season: 2026,
    color: "#e10600", // F1 red
    type: "race", // race | qualifying | practice (future flexibility)
  },

  {
    id: "f1-2026-saudi-gp",
    sport: "F1",
    title: "Saudi Arabian Grand Prix",
    start: "2026-03-22T18:00:00Z",
    end: "2026-03-22T20:00:00Z",
    location: "Jeddah Corniche Circuit",
    season: 2026,
    color: "#e10600",
    type: "race",
  },

  // Summer break example (no time needed)
  {
    id: "f1-2026-summer-break",
    sport: "F1",
    title: "Summer Break",
    start: "2026-08-01",
    end: "2026-08-31",
    location: null,
    season: 2026,
    color: "#999999",
    type: "break",
    allDay: true,
  },
];
