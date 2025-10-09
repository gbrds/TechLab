import React from "react";
import { Link } from "react-router-dom";
import Ui_Game from "../games/Ui_Game/Ui_Game.jsx";
import "./UX.css";

function UX() {
  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="popup-header">
        <div className="header-left">
          <Link to="/" className="back-button">Tagasi</Link>
          <div className="title-row">
            <span className="canvas-icon">🎨</span>
            <div className="popup-title">
              UX/UI disaineri nooremspetsialist | Disainimõtlemise mudel
            </div>
          </div>
        </div>
        <div className="popup-timer">⏱ 00:00</div>
      </div>

      {/* Sisu */}
      <div className="popup-content">
        {/* Info */}
        <div className="gray-rectangle">
          <div className="info-block">
            <h3>Eriala kirjeldus</h3>
            <p>
              UX/UI disainer vastutab digitaalsete toodete ja veebilehtede kasutajakogemuse (UX) ja kasutajaliidese (UI) eest. 
              See hõlmab kasutajate vajaduste kaardistamist, prototüüpide loomist, ning intuitiivsete ja atraktiivsete liideste disainimist.
            </p>
            <h3>Disainimõtlemise mudel</h3>
            <p>
              Disanmõtlemise meetod on kasutajakeskne lähenemisviis probleemide lahendamiseks. 
              See koosneb viiest etapist, mis aitavad luua paremaid lahendusi.
            </p>
            <h3>Missioon</h3>
            <p>
              Ülesande kirjeldus siia.
            </p>
          </div>
        </div>

        {/* Mängupaneel */}
        <div className="game-section">
          <Ui_Game />
        </div>
      </div>
    </div>
  );
}

export default UX;
