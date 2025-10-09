import { useEffect, useRef } from "react";
import Phaser from "phaser"
import CodeFinder from "./softDevGame"

export default function CodeFinderView({ onGameComplete }) {
    const gameRef = useRef(null)

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1150,
            height: 590,
            backgroundColor: "#0c101e",
            parent: gameRef.current,
            scene: [CodeFinder],
            dom: { createContainer: true }
        }

        const game = new Phaser.Game(config)
        
        // Listen for game completion events
        game.events.on('gameComplete', (score) => {
            if (onGameComplete) {
                onGameComplete(score);
            }
        });
        
        return () => game.destroy(true)
    }, [onGameComplete])

    return <div ref={gameRef} style={{ width: "100%", height: "100%", margin: "0 auto", justifyContent: "center", alignItems: "center", display: "flex" }}></div>
}