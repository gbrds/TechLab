// CatchBreachView.jsx
import { useEffect, useRef } from "react"
import Phaser from "phaser"
import CatchTheBreach from "./catchBreach"

export default function CatchBreachView({ onGameComplete }) {
    const gameRef = useRef(null)

    useEffect(() => {
        let gameLogic

        class CatchBreachScene extends Phaser.Scene {
            constructor() {
                super("CatchBreachScene")
                this.nodes = []
                this.lines = []
                this.nodeNames = ["cloud", "firewall", "server", "db", "router", "pc"]
                this.nodePositions = []
            }

            preload() {
                this.nodeNames.forEach(name => {
                    this.load.image(`${name}Def`, `/assets/${name}Def.png`)
                    this.load.image(`${name}Alert`, `/assets/${name}Alert.png`)
                    this.load.image(`${name}Fix`, `/assets/${name}Fix.png`)
                })
            }

            create() {
                const cols = 3, rows = 2
                const spacingX = 300, spacingY = 200
                const startX = 250, startY = 150

                // Compute node positions first
                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        let index
                        if (y === 0) index = x // top row left→right
                        else index = 5 - x // bottom row right→left
                        const posX = startX + x * spacingX
                        const posY = startY + y * spacingY
                        this.nodePositions[index] = { x: posX, y: posY }
                    }
                }

                // Default sizes
                const defSize = 80
                const alertSize = 99
                const fixSize = 70

                // Create nodes as images
                this.nodeNames.forEach((name, i) => {
                    const { x, y } = this.nodePositions[i]
                    const img = this.add.image(x, y, `${name}Def`)
                        .setDisplaySize(defSize, defSize)
                        .setDepth(1)
                        .setInteractive()

                    img.nodeIndex = i
                    img.nodeName = name
                    img.state = "Def"
                    img.baseY = y // store base Y to adjust alert

                    img.on("pointerdown", () => this.handleClick(i))
                    this.nodes.push(img)
                })

                // Dashed lines loop
                for (let i = 0; i < this.nodes.length; i++) {
                    const next = (i + 1) % this.nodes.length
                    const line = this.add.graphics()
                    line.lineStyle(2, 0xffffff, 0.5)
                        .setDepth(0)
                    this.drawDashedLine(line,
                        this.nodes[i].x, this.nodes[i].y,
                        this.nodes[next].x, this.nodes[next].y, 10)
                    this.lines.push(line)
                }

                // Score + timer
                this.scoreText = this.add.text(40, 20, "Score: 0", { font: "24px Arial", fill: "#fff" })
                this.timerText = this.add.text(1050, 20, "60s", { font: "24px Arial", fill: "#fff" })

                // Connect game logic
                gameLogic = new CatchTheBreach({
                    onBreachStart: ({ nodeIndex }) => {
                        const node = this.nodes[nodeIndex]
                        node.setTexture(`${node.nodeName}Alert`)
                        node.setDisplaySize(alertSize, alertSize)
                        node.y = node.baseY - (alertSize - 80)/2 // adjust Y
                        node.state = "Alert"
                    },
                    onBreachResolved: ({ nodeIndex }) => {
                        const node = this.nodes[nodeIndex]
                        node.setTexture(`${node.nodeName}Fix`)
                        node.setDisplaySize(fixSize, fixSize)
                        node.y = node.baseY // reset Y to base
                        node.state = "Fix"
                        this.time.delayedCall(500, () => {
                            node.setTexture(`${node.nodeName}Def`)
                            node.setDisplaySize(80, 80)
                            node.y = node.baseY
                        })
                    },
                    onBreachMissed: ({ nodeIndex }) => {
                        const node = this.nodes[nodeIndex]
                        node.setTexture(`${node.nodeName}Def`)
                        node.setDisplaySize(80, 80)
                        node.y = node.baseY
                        node.state = "Def"
                    },
                    onTick: (timeLeft) => {
                        this.timerText.setText(`${timeLeft}s`)
                    },
                    onGameOver: ({ finalScore }) => {
                        this.add.text(480, 280, `Game Over\nScore: ${finalScore}`, {
                            font: "48px Arial",
                            fill: "#fff",
                            align: "center"
                        })
                        
                        // Emit game completion event
                        if (onGameComplete) {
                            setTimeout(() => {
                                onGameComplete(finalScore);
                            }, 2000);
                        }
                    }
                })

                gameLogic.startGame()
            }

            handleClick(nodeIndex) {
                gameLogic.clickNode(nodeIndex)
            }

            drawDashedLine(graphics, x1, y1, x2, y2, dashLength = 5) {
                const deltaX = x2 - x1
                const deltaY = y2 - y1
                const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                const dashCount = Math.floor(dist / dashLength)
                const dashX = deltaX / dashCount
                const dashY = deltaY / dashCount
                for (let i = 0; i < dashCount; i += 2) {
                    graphics.moveTo(x1 + dashX * i, y1 + dashY * i)
                    graphics.lineTo(x1 + dashX * (i + 1), y1 + dashY * (i + 1))
                }
                graphics.strokePath()
            }
        }

        const config = {
            type: Phaser.AUTO,
            width: 1150,
            height: 580,
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
    }, [onGameComplete])

    return (
        <div
            ref={gameRef}
            style={{ width: "100%", height: "100%", margin: "0 auto", justifyContent: "center", alignItems: "center", display: "flex" }}
        ></div>
    )
}
