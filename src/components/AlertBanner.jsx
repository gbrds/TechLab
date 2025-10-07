import './AlertBanner.css';
import AlertDefault from '../svg/AlertDefault.svg';
import AlertRestored from '../svg/AlertRestored.svg';
import MissionDefault from '../svg/MissionDefault.svg';
import MissionCompleted from '../svg/MissionCompleted.svg';

function AlertBanner({ allCompleted = false }) {
  const criticalSrc = allCompleted ? AlertRestored : AlertDefault;
  const missionSrc = allCompleted ? MissionCompleted : MissionDefault;

  return (
    <div className="alerts-container">
      <img className="alert-svg" src={criticalSrc} alt="Critical/Mission Status" draggable={false} />
      <img className="alert-svg" src={missionSrc} alt="Mission" draggable={false} />
    </div>
  );
}

export default AlertBanner;