import SportsGrid from "./SportsGrid";
import LeagueList from "./LeagueList";

export default function Sidebar({
  sidebarLevel,
  setSidebarLevel,
  activeSport,
  setActiveSport,
  selectedLeagues,
  setSelectedLeagues,
}) {
  // If we are at the sport selection level
  if (sidebarLevel === "sports") {
    return (
      <div className="sidebar-content">
        <SportsGrid
          setSidebarLevel={setSidebarLevel}
          setActiveSport={setActiveSport}
        />
      </div>
    );
  }

  // If we are at the league selection level
  if (sidebarLevel === "leagues") {
    return (
      <div className="sidebar-content">
        <LeagueList
          activeSport={activeSport}
          setSidebarLevel={setSidebarLevel}
          selectedLeagues={selectedLeagues}
          setSelectedLeagues={setSelectedLeagues}
        />
      </div>
    );
  }

  return null
}
