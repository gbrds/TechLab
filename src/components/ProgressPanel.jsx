import './ProgressPanel.css';
import StateCritical from '../svg/State=Critical.svg';
import FoldersOpened from '../svg/Folders0.svg';
import StarsCollected from '../svg/stars collected.svg';
import Progressbar0 from '../svg/State=Progressbar 0.svg';

function ProgressPanel() {
  return (
    <div className="progress-panel">
      <div className="progress-title">VOCO TECHLAB TAASTAMISE PROTSESS</div>
      <div className="progress-states">
        <img src={StateCritical} alt="Critical" draggable={false} />
        <img src={FoldersOpened} alt="Folders Opened" draggable={false} />
        <img src={StarsCollected} alt="Stars Collected" draggable={false} />
      </div>
      <div className="progressbar-wrap">
        <div className="progressbar-title">PROTSESSIRIBA</div>
        <img className="progressbar-img" src={Progressbar0} alt="Progress bar" draggable={false} />
        <div className="progress-bottom-text">Alusta: UX/UI disaini nooremspetsialist</div>
      </div>
    </div>
  );
}

export default ProgressPanel;