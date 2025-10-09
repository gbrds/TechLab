import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CableConnectScene from "../games/Cable_Connect/Cable_Connect.jsx";
import StartOverlay from "./StartOverlay";
import "./UX.css"; // UX stiili kasutamine

function ITSpetsialist() {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);


  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleGameComplete = (finalScore) => {
    setScore(finalScore);
    setGameCompleted(true);
    setGameStarted(false);
    
    // If score is 4 or higher, unlock next game after a delay
    if (finalScore >= 4) {
      setTimeout(() => {
        // Navigate to next game (IKT)
        navigate('/IKT');
      }, 2000);
    }
  };

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
              Ühenda kaablid õigesti ja õpi IT-süsteemide põhimõtteid.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="game-section">
          {!gameStarted && !gameCompleted && (
            <StartOverlay 
              onStart={handleStartGame}
            />
          )}
          
          {gameStarted && !gameCompleted && (
            <CableConnectScene onGameComplete={handleGameComplete} />
          )}
          
          {gameCompleted && (
            <div className="completion-message">
              <h2>Mäng lõpetatud!</h2>
              <p>Teie tulemus: {score}/5</p>
              {score >= 4 ? (
                <div className="success-message">
                  <p>✅ Suurepärane! Järgmine mäng on nüüd avatud.</p>
                  <p>Suunatakse järgmise mängu juurde...</p>
                </div>
              ) : (
                <div className="retry-message">
                  <p>❌ Proovige uuesti, et avada järgmine mäng.</p>
                  <button onClick={() => {
                    setGameCompleted(false);
                    setGameStarted(false);
                  }} className="retry-button">
                    Proovi uuesti
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ITSpetsialist;
