import { useEffect, useRef } from "react";
import Phaser from "phaser";
import CableConnectScene from "./Cable_Connect";

const Cable_Connect = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return; // prevent double init

    const config = {
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: 1000,
      height: 600,
      backgroundColor: "#0f0f1a",
      scene: [CableConnectScene],
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="phaser-container"
      style={{
        width: "1000px",
        height: "600px",
        margin: "auto",
        backgroundColor: "#0f0f1a",
      }}
    ></div>
  );
};

export default Cable_Connect;
