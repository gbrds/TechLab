import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import Ui_GameScene from "./Ui_game.js";

const Ui_Game = () => {
  const gameRef = useRef(null);
  const [score, setScore] = useState(0);
  const phaserGameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 1150,
        height: 590,
        backgroundColor: "#0f0f1a",
        parent: gameRef.current,
        scene: Ui_GameScene,
      };

      const game = new Phaser.Game(config);
      phaserGameRef.current = game;

      // --- Wait until the scene is fully created
      const checkSceneReady = setInterval(() => {
        const scene = game.scene.keys["Ui_GameScene"];
        if (scene) {
          scene.events.on("updateScore", (newScore) => {
            setScore(newScore);
          });
          clearInterval(checkSceneReady);
        }
      }, 50);

      return () => {
        clearInterval(checkSceneReady);
        game.destroy(true);
      };
    }
  }, []);

  return (
    <div
      ref={gameRef}
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
};

export default Ui_Game;