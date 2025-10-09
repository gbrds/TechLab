import { useEffect, useRef } from "react";
import Phaser from "phaser";
import CodeFinder from "./games/softDevGame/softDevGame.js";
// PLACEHOLDER: Your teammates will import their game scenes here
// import UXGame from "./games/ux/UXGame";
// import SusGame from "./games/sus/SusGame";
// import ITGame from "./games/it/ITGame";
// import ICTGame from "./games/ict/ICTGame";

export default function GameFrame({ folderId, onGameComplete, onClose }) {
  const gameRef = useRef(null);
  const phaserGameRef = useRef(null);

  useEffect(() => {
    // Map folder IDs to game scenes
    const gameScenes = {
      1: SnakeGame,    // UX game (currently using Snake as placeholder)
      2: CodeFinder,   // Dev game - Code Finder
      3: SnakeGame,    // Sus game (placeholder)
      4: SnakeGame,    // IT game (placeholder)
      5: SnakeGame     // ICT game (placeholder)
    };

    const GameScene = gameScenes[folderId] || SnakeGame;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      scene: [GameScene],
      // Pass callbacks to game scenes via config
      callbacks: {
        preBoot: (game) => {
          // PLACEHOLDER: Your teammates need to listen for this event in their game scenes
          // When the game ends, they should emit: this.game.events.emit('gameComplete', score);
          game.events.on('gameComplete', (score) => {
            console.log(`Game ${folderId} completed with score:`, score);
            onGameComplete?.(folderId, score);
          });
        }
      }
    };

    phaserGameRef.current = new Phaser.Game(config);

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, [folderId, onGameComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          zIndex: 1001
        }}
      >
        ✕ Close
      </button>

      {/* Game container */}
      <div 
        ref={gameRef} 
        style={{
          border: '3px solid #00ff88',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      />

      {/* PLACEHOLDER: Instructions for your teammates */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        maxWidth: '600px',
        color: 'white',
        fontSize: '14px'
      }}>
        <strong>🎮 For Game Developers:</strong>
        <br />
        To complete the game and trigger dashboard updates, emit this event in your game scene:
        <pre style={{ 
          background: '#000', 
          padding: '10px', 
          borderRadius: '5px', 
          marginTop: '8px',
          overflow: 'auto'
        }}>
{`// In your game scene (when game ends):
this.game.events.emit('gameComplete', score);
// score should be 0-5 (need 4+ to unlock next folder)`}
        </pre>
      </div>
    </div>
  );
}