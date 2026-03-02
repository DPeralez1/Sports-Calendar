import "./App.css";
import Calendar from "./components/Calendar";
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
></link>;
<link
  href="https://api.fontshare.com/v2/css?f[]=general-sans@700i&display=swap"
  rel="stylesheet"
/>;

<link
  href="https://api.fontshare.com/v2/css?f[]=satoshi@500&display=swap"
  rel="stylesheet"
/>

function App() {
  return (
    <>
      {/* TOP BRAND HEADER */}
      <header className="brand-header">
        <div className="brand-inner">
          <h1 className="brand-title">
            <span className="brand-sporting">SPORTING</span>
            <span className="brand-calendar">calendar</span>
          </h1>
        </div>
      </header>

      {/* BODY LAYOUT */}
      <div className="app-body">
        <aside className="sidebar">
          <div className="sidebar-content">{/* Future controls */}</div>
        </aside>

        <div className="main-area">
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default App;
