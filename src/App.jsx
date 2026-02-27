import "./App.css";
import Calendar from "./components/Calendar";
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
></link>;

function App() {
  return (
    <>
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Sporting Calendar</h1>
        </div>
        <div className="sidebar-content">
          {/* Future:
              - Sport selector
              - Team selector
              - Color picker
          */}
        </div>
      </aside>

      {/* RIGHT MAIN AREA */}
      <div className="main-area">
        <Calendar />
      </div>
    </>
  );
}

export default App;
