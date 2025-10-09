import React from "react";
import StartIcon from "../svg/start.svg";
import "./StartOverlay.css";

const StartOverlay = ({ onStart }) => {
  return (
    <div className="start-overlay">
      <div className="button-container">
        <img 
          src={StartIcon} 
          alt="Start" 
          className="start-button" 
          onClick={onStart}
        />
      </div>
    </div>
  );
};

export default StartOverlay;
