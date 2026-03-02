import { MdOutlineSportsMotorsports } from "react-icons/md";
import { FaFutbol, FaFootballBall } from "react-icons/fa";

export default function SportsGrid({ setSidebarLevel, setActiveSport }) {
  // When user clicks Racing
  const handleRacingClick = () => {
    setActiveSport("Racing");
    setSidebarLevel("leagues");
  };

  return (
    <div className="sport-grid">
      {/* Racing Icon */}
      <div className="sport-icon" onClick={handleRacingClick}>
        <MdOutlineSportsMotorsports size={32} />
      </div>

      {/* Future Sports */}
      <div className="sport-icon">
        <FaFutbol size={32} />
      </div>

      <div className="sport-icon">
        <FaFootballBall size={32} />
      </div>
    </div>
  );
}
