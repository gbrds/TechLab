import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CableConnectScene from "../games/Cable_Connect/Cable_Connect.jsx";
import StartOverlay from "./StartOverlay";
import GameCompleted from "./GameCompleted";
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
    
    // Update the main app state for folder progression
    if (finalScore >= 4) {
      // Store completion in localStorage to persist across page reloads
      const completedGames = JSON.parse(localStorage.getItem('completedGames') || '{}');
      completedGames.IT = true;
      localStorage.setItem('completedGames', JSON.stringify(completedGames));
      
      // Don't auto-navigate, let user choose from completion modal
      // setTimeout(() => {
      //   // Navigate to next game (IKT)
      //   navigate('/IKT');
      // }, 5000);
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
            <GameCompleted 
              description="Õiged kaablid ühendatud ja arvuti on töökorras."
              onBackToGame={() => {
                setGameCompleted(false);
                setGameStarted(false);
                // Navigate to next game (IKT) if score is high enough
                if (score >= 4) {
                  navigate('/IKT');
                }
              }}
              onTryAgain={() => {
                setGameCompleted(false);
                setGameStarted(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ITSpetsialist;
