import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignalBoosterGame from "../games/signalBooster/signalBooster.jsx";
import StartOverlay from "./StartOverlay";
import GameCompleted from "./GameCompleted";
import "./UX.css"; 

function IKT() {
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
      completedGames.ICT = true;
      localStorage.setItem('completedGames', JSON.stringify(completedGames));
      
      // Don't auto-navigate, let user choose from completion modal
      // setTimeout(() => {
      //   // Navigate back to home with all games completed
      //   navigate('/');
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
                Tugevda signaali ja õpi IKT süsteemide põhimõtteid.
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
            <SignalBoosterGame onGameComplete={handleGameComplete} />
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

export default IKT;
