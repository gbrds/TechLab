import { useEffect, useRef } from "react";
import Phaser from "phaser";
import CableConnectScene from "./Cable_Connect";

const Cable_Connect = ({ onGameComplete }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return; // prevent double init

    const config = {
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: 1150,
      height: 590,
      backgroundColor: "#0f0f1a",
      scene: [CableConnectScene],
    };

    gameRef.current = new Phaser.Game(config);
    
    // Listen for game completion events
    gameRef.current.events.on('gameComplete', (score) => {
      if (onGameComplete) {
        onGameComplete(score);
      }
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [onGameComplete]);

  return (
    <div
      id="phaser-container"
      style={{ width: "100%", height: "100%", margin: "0 auto", justifyContent: "center", alignItems: "center", display: "flex" }}
    ></div>
  );
};

export default Cable_Connect;
