import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CodeFiderView from "../games/softDevGame/softDevGame.jsx"
import StartOverlay from "./StartOverlay";
import "./UX.css"; // UX stiili kasutamine

function Tarkvara() {
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
        // Navigate to next game (Kestlikud)
        navigate('/kestlikud');
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
            <span className="canvas-icon">💻</span>
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
                Lahenda programmeerimise ülesandeid ja õpi tarkvaraarenduse põhimõtteid.
            </p>
          </div>
        </div>

        {/* Mänguala */}
        <div className="game-section">
          {!gameStarted && !gameCompleted && (
            <StartOverlay 
              onStart={handleStartGame}
            />
          )}
          
          {gameStarted && !gameCompleted && (
            <CodeFiderView onGameComplete={handleGameComplete} />
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

export default Tarkvara;
