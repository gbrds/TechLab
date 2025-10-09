import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Ui_Game from "../games/Ui_Game/Ui_Game.jsx";
import StartOverlay from "./StartOverlay";
import GameCompleted from "./GameCompleted";
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
    
    // Update the main app state for folder progression
    if (finalScore >= 4) {
      // Store completion in localStorage to persist across page reloads
      const completedGames = JSON.parse(localStorage.getItem('completedGames') || '{}');
      completedGames.UX = true;
      localStorage.setItem('completedGames', JSON.stringify(completedGames));
      
      // Don't auto-navigate, let user choose from completion modal
      // setTimeout(() => {
      //   // Navigate to next game (Tarkvara)
      //   navigate('/tarkvara');
      // }, 5000);
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

export default UX;
