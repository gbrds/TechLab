import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import SignalBooster from "./signalBooster.js";

const SignalBoosterGame = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 800,          // Canvas width
        height: 800,         // Canvas height
        backgroundColor: "#1a1a1a",
        parent: "phaser-container",
        scene: [SignalBooster],
      };

      gameRef.current = new Phaser.Game(config);
    }

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="phaser-container" style={{ margin: "0 auto" }} />;
};

export default SignalBoosterGame;