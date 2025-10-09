import React from "react";
import { Link } from "react-router-dom";
import CodeFiderView from "../games/softDevGame/softDevGame.jsx"
import "./UX.css"; // UX stiili kasutamine

function Tarkvara() {
  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="popup-header">
        <div className="header-left">
          <Link to="/" className="back-button">Tagasi</Link>
          <div className="title-row">
            <span className="canvas-icon">🎨</span>
            <div className="popup-title">
              Tarkvaraarendaja nooremspetsialist | Arendusmõtlemise mudel
            </div>
          </div>
        </div>
        <div className="popup-timer">⏱ 00:00</div>
      </div>

      {/* Sisu */}
      <div className="popup-content">
        {/* Infopaneel */}
        <div className="gray-rectangle">
          <div className="info-block">
            <h3>Eriala Kirjeldus</h3>
            <p>
              Noorem tarkvaraarendaja õppekaval omandad oskused veebilehtede ja rakenduste loomiseks, 
              kasutades kaasaegseid programmeerimiskeeli ja arendusvahendeid.
            </p>
            <p>
                Õpingute käigus õpid töötama meeskonnas, järgima arendus-protsessi põhimõtteid
                ning looma praktilisi lahendusi erinevatele ettevõtetele ja klientidele.
            </p>
            <h3>Missioon</h3>
            <p>
                Ülesande kirjeldus siia.
            </p>
          </div>
        </div>

        {/* Mänguala */}
        <div className="game-section">
          <CodeFiderView />
        </div>
      </div>
    </div>
  );
}

export default Tarkvara;
