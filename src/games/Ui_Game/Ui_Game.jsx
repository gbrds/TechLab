import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import Ui_GameScene from "./Ui_game.js";

const Ui_Game = () => {
  const gameContainer = useRef(null);
  const [score, setScore] = useState(0);
  const [phaserGame, setPhaserGame] = useState(null);

  // Initialize Phaser only once
useEffect(() => {
  if (gameContainer.current) {
    const config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      backgroundColor: "#0f0f1a",
      parent: gameContainer.current,
      scene: new Ui_GameScene(),
    };

    const game = new Phaser.Game(config);
    setPhaserGame(game);

    return () => {
      game.destroy(true);
    };
  }
}, []); // <-- empty array ensures it only runs once

  // Listen for score updates from Phaser
  useEffect(() => {
    const handleScoreUpdate = (event) => {
      setScore(event.detail);
    };
    window.addEventListener("updateScore", handleScoreUpdate);
    return () => window.removeEventListener("updateScore", handleScoreUpdate);
  }, []);

  // Button handler
  const handleCheckAnswers = () => {
    if (phaserGame && phaserGame.scene.keys["Ui_GameScene"]) {
      phaserGame.scene.keys["Ui_GameScene"].checkAnswers();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f0f1a] text-white">
      <div
        ref={gameContainer}
        className="border border-gray-600 rounded-lg shadow-lg"
        style={{ width: "1000px", height: "600px" }} // <-- Important fix
      />
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handleCheckAnswers}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded transition"
        >
          Check Answers
        </button>
        <span className="text-lg font-medium">{score}/15 correct</span>
      </div>
    </div>
  );
};

export default Ui_Game;