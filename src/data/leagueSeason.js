// leagueSeasons.js
// This file holds all season metadata.
// Later this could come from an API.
// For now it's static.

export const leagueSeasons = {
  F1: {
    color: "#FE5F00",
    start: "2026-03-01",
    end: "2026-11-22",
    breaks: [
      { start: "2026-08-01", end: "2026-08-28" } // summer break
    ]
  },

  MLS: {
    color: "#988F2A",
    start: "2026-02-20",
    end: "2026-10-18",
    breaks: []
  },

  MLB: {
    color: "#6a5837",
    start: "2026-03-30",
    end: "2026-10-01",
    breaks: []
  }
};
