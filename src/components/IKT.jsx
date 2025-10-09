import React from "react";
import { Link } from "react-router-dom";
import SignalBoosterGame from "../games/signalBooster/signalBooster.jsx";
import "./UX.css"; 

function IKT() {
  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="popup-header">
        <div className="header-left">
          <Link to="/" className="back-button">Tagasi</Link>
          <div className="title-row">
            <span className="canvas-icon">📡</span>
            <div className="popup-title">
              Info- ja Kommunikatsioonitehnoloogia nooremspetsialist | Side ja võrgulahendused
            </div>
          </div>
        </div>
        <div className="popup-timer">⏱ 00:00</div>
      </div>

      {/* Sisu*/}
      <div className="popup-content">
        {/* Info */}
        <div className="gray-rectangle">
          <div className="info-block">
            <h3>Info- ja Kommunikatsioonitehnoloogia (IKT)</h3>
            <p>
              IKT nooremspetsialist tegeleb võrkude, side ja andmeside süsteemide
              ülesseadmise, hoolduse ja turvalisusega. Tema töö toetab tänapäevase
              digitaristu toimimist.
            </p>

            <h3>Missioon</h3>
            <p>
                Ülesande kirjeldus siia.
            </p>
          </div>
        </div>

        {/* Mäng */}
        <div className="game-section">
          <SignalBoosterGame />
        </div>
      </div>
    </div>
  );
}

export default IKT;
