// catchBreach.jsx
import { useEffect, useRef } from "react"
import Phaser from "phaser"
import CatchTheBreach from "./catchBreach"

export default function CatchBreachView() {
    const gameRef = useRef(null)

    useEffect(() => {
        let gameLogic

        class CatchBreachScene extends Phaser.Scene {
            constructor() {
                super("CatchBreachScene")
                this.nodes = []
            }

            preload() {}

            create() {
                const cols = 3, rows = 2
                const spacingX = 300, spacingY = 200
                const startX = 250, startY = 150

                // Create clickable grid
                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        const rect = this.add.rectangle(
                            startX + x * spacingX,
                            startY + y * spacingY,
                            200,
                            100,
                            0x222222
                        ).setStrokeStyle(2, 0x555555).setInteractive()
                        rect.index = y * cols + x
                        rect.on("pointerdown", () => this.handleClick(rect.index))
                        this.nodes.push(rect)
                    }
                }

                // Add score + timer text
                this.scoreText = this.add.text(40, 20, "Score: 0", { font: "24px Arial", fill: "#fff" })
                this.timerText = this.add.text(1050, 20, "60s", { font: "24px Arial", fill: "#fff" })

                // Connect game logic
                gameLogic = new CatchTheBreach({
                    onBreachStart: ({ nodeIndex }) => {
                        const node = this.nodes[nodeIndex]
                        node.setFillStyle(0xff3333)
                    },
                    onBreachResolved: ({ nodeIndex }) => {
                        const node = this.nodes[nodeIndex]
                        node.setFillStyle(0x22aa22)
                        this.time.delayedCall(300, () => node.setFillStyle(0x222222))
                    },
                    onBreachMissed: ({ nodeIndex }) => {
                        const node = this.nodes[nodeIndex]
                        node.setFillStyle(0x555555)
                        this.time.delayedCall(300, () => node.setFillStyle(0x222222))
                    },
                    onTick: (timeLeft) => {
                        this.timerText.setText(`${timeLeft}s`)
                    },
                    onScoreUpdate: (score) => {
                        this.scoreText.setText(`Score: ${score}`)
                    },
                    onGameOver: ({ finalScore }) => {
                        this.add.text(480, 280, `Game Over\nScore: ${finalScore}`, {
                            font: "48px Arial",
                            fill: "#fff",
                            align: "center"
                        })
                    }
                })

                gameLogic.startGame()
            }

            handleClick(nodeIndex) {
                gameLogic.clickNode(nodeIndex)
            }
        }

        const config = {
            type: Phaser.AUTO,
            width: 1240,
            height: 600,
            backgroundColor: "#111",
            parent: gameRef.current,
            scene: [CatchBreachScene],
            dom: { createContainer: true },
        }

        const game = new Phaser.Game(config)
        return () => {
            game.destroy(true)
            gameLogic?.stopGame()
        }
    }, [])

    return (
        <div
            ref={gameRef}
            style={{ width: "800px", height: "600px", margin: "0 auto" }}
        ></div>
    )
}