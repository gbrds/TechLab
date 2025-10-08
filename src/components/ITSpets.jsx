import React from "react";
import { Link } from "react-router-dom";
import "./UX.css"; // UX stiili kasutamine

function ITSpetsialist() {
  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="popup-header">
        <div className="header-left">
          <Link to="/" className="back-button">Tagasi</Link>
          <div className="title-row">
            <span className="canvas-icon">💾</span>
            <div className="popup-title">
              IT-Süsteemide nooremspetsialist | Süsteemide haldus ja turvalisus
            </div>
          </div>
        </div>
        <div className="popup-timer">⏱ 00:00</div>
      </div>

      {/* MAIN CONTENT */}
      <div className="popup-content">
        {/* LEFT PANEL */}
        <div className="gray-rectangle">
          <div className="info-block">
            <h3>IT-Süsteemide nooremspetsialist</h3>
            <p>
              IT-süsteemide nooremspetsialist vastutab serverite, tööjaamade ja võrkude
              töökindluse ning turvalisuse eest. Tema ülesandeks on tagada süsteemide
              tõrgeteta toimimine ning rakendada küberturvalisuse põhimõtteid.
            </p>

            <h3>Missioon</h3>
            <p>
              Ülesande kirjeldus
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="game-section">
          <div className="game-placeholder">
            Mäng siia
          </div>
        </div>
      </div>
    </div>
  );
}

export default ITSpetsialist;
