import { useEffect, useRef } from "react";
import Phaser from "phaser"
import CodeFinder from "./softDevGame"

export default function CodeFinderView() {
    const gameRef = useRef(null)

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1240,
            height: 600,
            backgroundColor: "#111",
            parent: gameRef.current,
            scene: [CodeFinder],
            dom: { createContainer: true }
        }

        const game = new Phaser.Game(config)
        return () => game.destroy(true)
    }, [])

    return <div ref={gameRef} style={{ width: "800px", height: "600px", margin: "0 auto" }}></div>
}