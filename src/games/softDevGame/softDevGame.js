export default class CodeFinder extends Phaser.Scene {
    constructor() {
        super({ key: "CodeFinder" })
        this.currentIndex = 0
        this.score = 0
    }

    preload() {
        this.load.json("snippets", "/softDevGame.json")
    }

    create() {
        this.snippets = this.cache.json.get("snippets")
        this.displayArea = this.add.text(50, 50, "", {
            fontFamily: "monospace",
            fontSize: "20px",
            color: "#00ff00",
            lineSpacing: "10",
        })
        this.inputArea = this.add.dom(400, 500, "input", {
            type: "text",
            placeholder: "Example: Code: AB12",
            style: "width: 200px; font-size: 18px; padding: 5px;"
        })
        this.submitBtn = this.add.text(640, 500, "Submit", {
            fontFamily: "monospace",
            fontSize: "20px",
            color: "#00ff00",
            backgroundColor: "#222"
        }).setInteractive().on("pointerdown", () => this.answer())

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.enterKey.on('down', () => {
            this.answer()
        })

        this.loadSnippet()
    }

    loadSnippet() {
        const snippet = this.snippets[this.currentIndex].snippet
        this.displayArea.setText("")
        this.typingIndex = 0

        this.time.addEvent({
            delay: 25,
            repeat: snippet.length - 1,
            callback: () => {
                this.displayArea.text += snippet[this.typingIndex++]
            }
        })
    }

    answer() {
        const input = this.inputArea.node.value.trim()
        const correct = this.snippets[this.currentIndex].answer
        if (input === correct) {
            this.score++
            this.showFeedback("✅ Correct!")
        } else {
            this.showFeedback("❌ Incorrect")
        }

        this.currentIndex++
        if (this.currentIndex < this.snippets.length) {
            this.loadSnippet()
            this.inputArea.node.value = ""
        } else {
            this.showFinalScore()
        }
    }

    showFeedback(text) {
        const feedback = this.add.text(400, 350, text, {
            fontFamily: "monospace",
            fontSize: "24px",
            color: "#ffffff",
            backgroundColor: "#000"
        }).setOrigin(0.5)
        this.time.delayedCall(1000, () => feedback.destroy())
    }

    showFinalScore() {
        this.add.text(400, 300, `Final Score: ${this.score}/${this.snippets.length}`, {
            fontFamily: "monospace",
            fontSize: "28px",
            color: "#00ff00"
        }).setOrigin(0.5)
        this.inputArea.destroy()
        this.submitBtn.destroy()
    }
}