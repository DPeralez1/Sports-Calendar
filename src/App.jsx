import "./App.css";
import { useState } from "react";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  // LEVEL STATE (controls sidebar screen)
  // -------------------------------
  // "sports" -> show sport icons
  // "leagues" -> show leagues inside selected sport
  const [sidebarLevel, setSidebarLevel] = useState("sports");
  // ACTIVE SPORT (Racing, Soccer, etc.)
  // -------------------------------
  const [activeSport, setActiveSport] = useState(null);
  // SELECTED LEAGUES (ARRAY because we want multiple active later)
  // -------------------------------
  const [selectedLeagues, setSelectedLeagues] = useState([]);

  return (
    <>
      {/* BRAND HEADER */}
      <header className="brand-header">
        <div className="brand-inner">
          {/* Small wordmark lockup — left aligned like Google Calendar / PagePact */}
          <div className="brand-lockup">
            <span className="brand-sporting">Sporting</span>
            <span className="brand-calendar">calendar</span>
          </div>
        </div>
      </header>
      {/* BODY LAYOUT */}
      <div className="app-body">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <Sidebar
            sidebarLevel={sidebarLevel}
            setSidebarLevel={setSidebarLevel}
            activeSport={activeSport}
            setActiveSport={setActiveSport}
            selectedLeagues={selectedLeagues}
            setSelectedLeagues={setSelectedLeagues}
          />
        </aside>

        <div className="main-area">
          <Calendar selectedLeagues={selectedLeagues} />
        </div>
      </div>
    </>
  );
}

export default App;
