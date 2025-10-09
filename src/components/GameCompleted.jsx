import React from "react";
import "./GameCompleted.css";

const GameCompleted = ({ onBackToGame, onTryAgain, description }) => {
  return (
    <div className="game-completed-overlay">
      <div className="game-completed-modal">
        {/* Stars */}
        <div className="stars-container">
          <div className="star">⭐</div>
          <div className="star">⭐</div>
          <div className="star">⭐</div>
          <div className="star">⭐</div>
          <div className="star">⭐</div>
        </div>

        {/* Title */}
        <h2 className="modal-title">Tubli töö!</h2>

        {/* Description */}
        <p className="modal-description">
          {description}
        </p>

        {/* Buttons */}
        <div className="buttons-container">
          <button className="back-button" onClick={onBackToGame}>
            Tagasi mängulauale
          </button>
          <button className="try-again-button" onClick={onTryAgain}>
            Soorita uuesti
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCompleted;
