import { MdOutlineSportsMotorsports } from "react-icons/md";
import { FaFutbol, FaFootballBall } from "react-icons/fa";
import { FaBaseballBall } from "react-icons/fa";

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
        <MdOutlineSportsMotorsports size={36} />
      </div>

      {/* Future Sports */}
      <div className="sport-icon">
        <FaFutbol size={30} />
      </div>

      <div className="sport-icon">
        <FaFootballBall size={30} />
      </div>
      <div className="sport-icon">
        <FaBaseballBall size={30} />
      </div>
    </div>
  );
}
