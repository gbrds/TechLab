import React from "react";
import "./GameCompleted.css";

const GameCompleted = ({ onBackToGame, onTryAgain }) => {
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
        <h2 className="modal-title">Tubli töö vms!</h2>

        {/* Description */}
        <p className="modal-description">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet.
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
