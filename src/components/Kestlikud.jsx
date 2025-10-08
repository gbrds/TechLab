import React from "react";
import { Link } from "react-router-dom";
import "./UX.css";

function Kestlikud() {
  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="popup-header">
        <div className="header-left">
          <Link to="/" className="back-button">Tagasi</Link>
          <div className="title-row">
            <span className="canvas-icon">🌱</span>
            <div className="popup-title">
              Kestlike Tehnoloogiate nooremspetsialist | Kestlik mõtlemine
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
            <h3>Eriala Kirjeldus</h3>
            <p>
              Kestlike tehnoloogiate spetsialist keskendub innovatiivsete ja 
              keskkonnasõbralike lahenduste väljatöötamisele, mis aitavad vähendada 
              ökoloogilist jalajälge ning toetavad rohepööret.
            </p>

            <h3>Missioon</h3>
            <p>
                Ülesande kirjeldus siia!
            </p>
          </div>
        </div>

        {/* Mäng */}
        <div className="game-section">
          <div className="game-placeholder">
            Mäng siia
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kestlikud;
