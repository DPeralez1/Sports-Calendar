// LEAGUE LIST COMPONENT
export default function LeagueList({
  activeSport,
  setSidebarLevel,
  selectedLeagues,
  setSelectedLeagues,
}) {
  // Only handle Racing for now
  const racingLeagues = ["F1", "F2", "F3", "F1 Academy", "NASCAR", "IndyCar"];

  // Toggle league selection
  const toggleLeague = (league) => {
    // If already selected, remove it
    if (selectedLeagues.includes(league)) {
      setSelectedLeagues(selectedLeagues.filter((l) => l !== league));
    }
    // Otherwise add it
    else {
      setSelectedLeagues([...selectedLeagues, league]);
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button onClick={() => setSidebarLevel("sports")}>← Back</button>

      <h3>{activeSport}</h3>

      {/* League Buttons */}
      {activeSport === "Racing" &&
        racingLeagues.map((league) => (
          <div
            key={league}
            onClick={() => toggleLeague(league)}
            style={{
              padding: "10px",
              marginBottom: "8px",
              cursor: "pointer",
              background: selectedLeagues.includes(league)
                ? "#444"
                : "transparent",
            }}
          >
            {league}
          </div>
        ))}
    </div>
  );
}
