import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CatchBreachScene from "../games/catchBreach/catchBreach.jsx";
import StartOverlay from "./StartOverlay";
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
    
    // If score is 4 or higher, unlock next game after a delay
    if (finalScore >= 4) {
      setTimeout(() => {
        // Navigate to next game (ITSpetsialist)
        navigate('/ITSpetsialist');
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

export default Kestlikud;
