import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ui_Game from "../games/Ui_Game/Ui_Game.jsx";
import StartOverlay from "./StartOverlay";
import "./UX.css";

function UX() {
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
        // Navigate to next game (Tarkvara)
        navigate('/tarkvara');
      }, 2000);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

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
              Lohista UX/UI mõisted õigetesse etappidesse. Igasse etappi sobitub täpselt kolm mõistet.
            </p>
          </div>
        </div>

        {/* Mängupaneel */}
        <div className="game-section">
          {!gameStarted && !gameCompleted && (
            <StartOverlay 
              onStart={handleStartGame}
            />
          )}
          
          {gameStarted && !gameCompleted && (
            <Ui_Game onGameComplete={handleGameComplete} />
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

export default UX;
