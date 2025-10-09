import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CatchBreachScene from "../games/catchBreach/catchBreach.jsx";
import StartOverlay from "./StartOverlay";
import GameCompleted from "./GameCompleted";
import "./UX.css";

function Kestlikud() {
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
      completedGames.Sus = true;
      localStorage.setItem('completedGames', JSON.stringify(completedGames));
      
      // Don't auto-navigate, let user choose from completion modal
      // setTimeout(() => {
      //   // Navigate to next game (ITSpetsialist)
      //   navigate('/ITSpetsialist');
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
                Kaitse süsteeme turvalisuse vastu ja õpi kestlike tehnoloogiate põhimõtteid.
            </p>
          </div>
        </div>

        {/* Mäng */}
        <div className="game-section">
          {!gameStarted && !gameCompleted && (
            <StartOverlay 
              onStart={handleStartGame}
            />
          )}
          
          {gameStarted && !gameCompleted && (
            <CatchBreachScene onGameComplete={handleGameComplete} />
          )}
          
          {gameCompleted && (
            <GameCompleted 
              onBackToGame={() => {
                setGameCompleted(false);
                setGameStarted(false);
                navigate('/');
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

export default Kestlikud;
