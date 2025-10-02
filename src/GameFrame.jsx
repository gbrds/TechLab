import { useEffect, useRef } from "react";
import Phaser from "phaser";
import SnakeGame from "./games/snake/SnakeGame";

export default function GameFrame() {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      scene: [SnakeGame],
    };

    const game = new Phaser.Game(config);

    return () => game.destroy(true);
  }, []);

  return <div ref={gameRef}></div>;
}