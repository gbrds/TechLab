import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import SignalBooster from "./signalBooster.js";

const SignalBoosterGame = ({ onGameComplete }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 1150,          // Canvas width
        height: 590,         // Canvas height
        backgroundColor: "#1a1a1a",
        parent: "phaser-container",
        scene: [SignalBooster],
      };

      gameRef.current = new Phaser.Game(config);
      
      // Listen for game completion events
      gameRef.current.events.on('gameComplete', (score) => {
        if (onGameComplete) {
          onGameComplete(score);
        }
      });
    }

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onGameComplete]);

  return <div id="phaser-container" style={{ width: "100%", height: "100%", margin: "0 auto", justifyContent: "center", alignItems: "center", display: "flex" }} />;
};

export default SignalBoosterGame;