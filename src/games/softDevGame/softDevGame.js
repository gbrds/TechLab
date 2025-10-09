// CodeFinder.js
import Phaser from "phaser";

export default class CodeFinder extends Phaser.Scene {
  constructor() {
    super({ key: "CodeFinder" });
    this.currentIndex = 0;
    this.score = 0;
  }

  preload() {
    this.load.json("snippets", "/softDevGame.json");
  }

  create() {
    this.snippets = this.cache.json.get("snippets");

    // === Snippet background box ===
    const snippetBoxX = 400;
    const snippetBoxY = 300;
    const snippetBoxWidth = 720;
    const snippetBoxHeight = 400;

    this.snippetBg = this.add.rectangle(snippetBoxX, snippetBoxY, snippetBoxWidth, snippetBoxHeight, 0x0c101e)
      .setOrigin(0.5)
      .setStrokeStyle(1, 0x0c101e)
      .setDepth(9);

    // === Display area for code ===
    this.displayArea = this.add.text(50, snippetBoxY - snippetBoxHeight / 2 + 10, "", {
      fontFamily: "monospace",
      fontSize: "16px",
      lineSpacing: 10,
      color: "#00d492",
      wordWrap: { width: snippetBoxWidth - 20 },
    }).setDepth(10);

    this.snippetBox = {
      top: snippetBoxY - snippetBoxHeight / 2 + 10,
      bottom: snippetBoxY + snippetBoxHeight / 2 - 10
    };

    // === Input field ===
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.placeholder = "Example: Code: AB12";
    Object.assign(inputEl.style, {
      width: "360px",
      height: "35px",
      fontSize: "20px",
      fontFamily: "monospace",
      color: "#ffffff",
      padding: "8px 12px",
      border: "1px solid #3e4d62",
      backgroundColor: "#0c101e",
      borderRadius: "8px",
      outline: "none",
    });
    this.inputArea = this.add.dom(250, 550).setElement(inputEl).setDepth(5);

    // === Submit button ===
    const btnEl = document.createElement("button");
    btnEl.innerText = "Submit";
    Object.assign(btnEl.style, {
      width: "120px",
      height: "50px",
      fontSize: "20px",
      fontFamily: "monospace",
      backgroundColor: "#00d492",
      color: "#1a1f30",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background 0.2s",
    });
    btnEl.onmouseover = () => (btnEl.style.backgroundColor = "#00b67a");
    btnEl.onmouseout = () => (btnEl.style.backgroundColor = "#00d492");
    btnEl.onclick = () => this.checkAnswer();
    this.submitBtn = this.add.dom(525, 550).setElement(btnEl).setDepth(5);

    // === Counter box and text ===
    const boxX = 1050;
    const boxY = 35;
    const boxWidth = 101;
    const boxHeight = 25;
    this.counterBg = this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0x311900)
      .setOrigin(0.5)
      .setStrokeStyle(1, 0xff8400)
      .setDepth(8);
    this.counterText = this.add.text(boxX, boxY, "", {
      fontFamily: "monospace",
      fontSize: "20px",
      color: "#ff8400",
    }).setOrigin(0.5).setDepth(10);

    // === Keyboard enter ===
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on("down", () => this.checkAnswer());

    // === Start ===
    this.loadSnippet();
  }

loadSnippet() {
  const snippet = this.snippets[this.currentIndex].snippet;
  this.displayArea.setText("");
  this.displayArea.setFontSize(16); // reset font size
  this.displayArea.setY(this.snippetBox.top); // reset top
  this.typingIndex = 0;

  this.counterText.setText(`${this.currentIndex + 1} / ${this.snippets.length}`);

  let currentFontSize = 16;
  const minFontSize = 10;

  this.time.addEvent({
    delay: 25,
    repeat: snippet.length - 1,
    callback: () => {
      this.displayArea.text += snippet[this.typingIndex++];

      const bounds = this.displayArea.getBounds();
      const bottomY = bounds.y + bounds.height;

      if (bottomY > this.snippetBox.bottom) {
        if (currentFontSize > minFontSize) {
          // shrink font
          currentFontSize -= 1;
          this.displayArea.setFontSize(currentFontSize);

          // adjust position to keep text in box
          this.displayArea.setY(this.snippetBox.bottom - bounds.height);
        } else {
          // scroll up if reached min font size
          const overflow = bottomY - this.snippetBox.bottom;
          this.displayArea.y -= overflow;
        }
      }
    }
  });
}


  checkAnswer() {
    const input = this.inputArea.node.value.trim();
    const correct = this.snippets[this.currentIndex].answer;

    if (input === correct) {
      this.score++;
      this.showFeedback("✅ Correct!");
    } else {
      this.showFeedback("❌ Incorrect");
    }

    this.currentIndex++;
    if (this.currentIndex < this.snippets.length) {
      this.loadSnippet();
      this.inputArea.node.value = "";
    } else {
      this.showFinalScore();
    }
  }

  showFeedback(text) {
    const feedback = this.add.text(400, 350, text, {
      fontFamily: "monospace",
      fontSize: "24px",
      color: "#ffffff",
      backgroundColor: "#000",
    }).setOrigin(0.5).setDepth(15);

    this.time.delayedCall(1000, () => feedback.destroy());
  }

  showFinalScore() {
    this.add.text(400, 300, `Final Score: ${this.score}/${this.snippets.length}`, {
      fontFamily: "monospace",
      fontSize: "28px",
      color: "#00ff00",
    }).setOrigin(0.5).setDepth(12);

    this.inputArea.destroy();
    this.submitBtn.destroy();
  }
}
