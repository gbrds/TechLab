import './AlertBanner.css';

function AlertBanner() {
  return (
    <div className="alerts-container">
      <div className="alert-box critical">
        <div className="alert-title critical">
          <span>⚠️</span>
          CRITICAL SYSTEM FAILURE
          <span>⚠️</span>
        </div>
        <p className="alert-text">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. 
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula 
          consectetur, ultrices mauris. Maecenas vitae mattis tellus.
        </p>
      </div>

      <div className="alert-box mission">
        <div className="alert-title mission">
          <span>🎯</span>
          MISSIOON
          <span>🎯</span>
        </div>
        <p className="alert-text">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. 
          Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula 
          consectetur, ultrices mauris. Maecenas vitae mattis tellus
        </p>
      </div>
    </div>
  );
}

export default AlertBanner;