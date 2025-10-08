import './ProgressPanel.css';
import StateCritical from '../svg/State=Critical.svg';
import StatePartiallyRestored from '../svg/State=Partially restored.svg';
import StateFullyRestored from '../svg/State=Fully Restored.svg';
import Folders0 from '../svg/Folders0.svg';
import Folders1 from '../svg/Folders1.svg';
import Folders2 from '../svg/Folders2.svg';
import Folders3 from '../svg/Folders3.svg';
import Folders4 from '../svg/Folders4.svg';
import Folders5 from '../svg/Folders5.svg';
import StarsCollected from '../svg/stars collected.svg';
import StarsCollected8 from '../svg/stars collected 8.svg';
import StarsCollected13 from '../svg/stars collected 13.svg';
import Progressbar0 from '../svg/State=Progressbar 0.svg';
import Progressbar1 from '../svg/State=Progressbar 1.svg';
import Progressbar2 from '../svg/State=Progressbar 2.svg';
import Progressbar3 from '../svg/State=Progressbar 3.svg';
import Progressbar4 from '../svg/State=Progressbar 4.svg';
import Progressbar5 from '../svg/State=Progressbar 5.svg';

function ProgressPanel({ completedCount = 0 }) {
  // Dynamic state selection based on completed games
  const getStateImage = () => {
    if (completedCount === 0) return StateCritical;
    if (completedCount === 5) return StateFullyRestored;
    return StatePartiallyRestored;
  };

  const getFoldersImage = () => {
    const foldersImages = [Folders0, Folders1, Folders2, Folders3, Folders4, Folders5];
    return foldersImages[Math.min(completedCount, 5)];
  };

  const getStarsImage = () => {
    if (completedCount === 0) return StarsCollected;
    if (completedCount === 1) return StarsCollected; // Still 0 stars after UX
    if (completedCount === 2) return StarsCollected8; // 8 stars after Dev
    return StarsCollected13; // 13 stars after Sus, IT, and ICT
  };

  const getProgressbarImage = () => {
    const progressbarImages = [Progressbar0, Progressbar1, Progressbar2, Progressbar3, Progressbar4, Progressbar5];
    return progressbarImages[Math.min(completedCount, 5)];
  };

  const getBottomText = () => {
    if (completedCount === 0) return "Alusta: UX/UI disaini nooremspetsialist";
    if (completedCount === 1) return "Edu: UX/UI disaini nooremspetsialist lõpetatud";
    if (completedCount === 2) return "Edu: Arendaja roll lõpetatud";
    if (completedCount === 3) return "Edu: Süsteemihaldur roll lõpetatud";
    if (completedCount === 4) return "Edu: IT-spetsialist roll lõpetatud";
    if (completedCount === 5) return "Kõik rollid lõpetatud! VOCO TechLab on taastatud!";
    return `Progress: ${completedCount}/5 rollid lõpetatud`;
  };

  return (
    <div className="progress-panel">
      <div className="progress-title">VOCO TECHLAB TAASTAMISE PROTSESS</div>
      <div className="progress-states">
        <img src={getStateImage()} alt="System State" draggable={false} />
        <img src={getFoldersImage()} alt="Folders Opened" draggable={false} />
        <img src={getStarsImage()} alt="Stars Collected" draggable={false} />
      </div>
      <div className="progressbar-wrap">
        <div className="progressbar-title">PROTSESSIRIBA</div>
        <img className="progressbar-img" src={getProgressbarImage()} alt="Progress bar" draggable={false} />
        <div className="progress-bottom-text">{getBottomText()}</div>
      </div>
    </div>
  );
}

export default ProgressPanel;