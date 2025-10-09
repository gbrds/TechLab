import Phaser from "phaser";

export default class Ui_GameScene extends Phaser.Scene {
  constructor() {
    super("Ui_GameScene");
    this.score = 0;
  }

  create() {
    // --- Background
    this.cameras.main.setBackgroundColor(0x0f0f1a);

    // --- Score text
    this.scoreText = this.add.text(500, 550, `0/${15} correct`, {
      fontSize: "24px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // --- Game data
    this.wordsData = [
      { text: "Intervjuud", correct: "Empatiseerimine" },
      { text: "Kasutajauuringud", correct: "Empatiseerimine" },
      { text: "Persoonad", correct: "Defineerimine" },
      { text: "Probleemi sõnastamine", correct: "Defineerimine" },
      { text: "Mõttekkaardid", correct: "Ideestamine" },
      { text: "Loovmeetodid", correct: "Ideestamine" },
      { text: "Ajurünnakud", correct: "Ideestamine" },
      { text: "Visandamine", correct: "Prototüüpimine" },
      { text: "Interaktiivne prototüüp", correct: "Prototüüpimine" },
      { text: "Disainimine", correct: "Prototüüpimine" },
      { text: "Kasutatavuse testid", correct: "Testimine" },
      { text: "Tagasiside kogumine", correct: "Testimine" },
      { text: "Teststsenaariumid", correct: "Testimine" },
      { text: "Kasutaja teekond", correct: "Empatiseerimine" },
      { text: "Kasutajalooad", correct: "Defineerimine" },
    ];

    // --- Drop zones
    this.dropZones = [
      { label: "Empatiseerimine", x: 120, y: 420, color: 0x0074d9 },
      { label: "Defineerimine", x: 320, y: 420, color: 0xff4136 },
      { label: "Ideestamine", x: 520, y: 420, color: 0xffdc00 },
      { label: "Prototüüpimine", x: 720, y: 420, color: 0x2ecc40 },
      { label: "Testimine", x: 920, y: 420, color: 0xb10dc9 },
    ];

    // --- Create drop zones visually
    this.dropZones.forEach(zone => {
      const rect = this.add.rectangle(zone.x, zone.y, 160, 160, zone.color, 0.4)
        .setStrokeStyle(3, 0xffffff)
        .setInteractive({ dropZone: true });

      const label = this.add.text(zone.x, zone.y + 90, zone.label, {
        fontSize: "14px",
        color: "#ffffff",
        align: "center",
      }).setOrigin(0.5);

      rect.label = zone.label;
      zone.area = rect;
    });

    // --- Create draggable words
    Phaser.Utils.Array.Shuffle(this.wordsData);
    this.wordsData.forEach((word, index) => {
      const x = 120 + (index % 5) * 180;
      const y = 80 + Math.floor(index / 5) * 60;

      const card = this.add.text(x, y, word.text, {
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#1e90ff",
        padding: { x: 10, y: 5 },
      })
        .setOrigin(0.5)
        .setInteractive({ draggable: true });

      card.data = new Phaser.Data.DataManager(card);
      card.data.set("correct", word.correct);
      card.data.set("placedIn", null);
    });

    // --- Drag events
    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragenter", (pointer, gameObject, dropZone) => {
      dropZone.setFillStyle(dropZone.fillColor, 0.7);
    });

    this.input.on("dragleave", (pointer, gameObject, dropZone) => {
      dropZone.setFillStyle(dropZone.fillColor, 0.4);
    });

    this.input.on("drop", (pointer, gameObject, dropZone) => {
      if (!dropZone.children) dropZone.children = [];

      // Remove from old drop zone
      if (gameObject.data.get("placedIn")) {
        const oldZone = this.dropZones.find(z => z.label === gameObject.data.get("placedIn"));
        if (oldZone && oldZone.area.children) {
          oldZone.area.children = oldZone.area.children.filter(child => child !== gameObject);
          const spacing = 30;
          const total = oldZone.area.children.length;
          oldZone.area.children.forEach((child, index) => {
            child.x = oldZone.area.x;
            child.y = oldZone.area.y - ((total - 1) * spacing) / 2 + index * spacing;
          });
        }
      }

      // Add to new drop zone
      dropZone.children.push(gameObject);
      gameObject.data.set("placedIn", dropZone.label);

      const spacing = 30;
      const total = dropZone.children.length;
      dropZone.children.forEach((child, index) => {
        child.x = dropZone.x;
        child.y = dropZone.y - ((total - 1) * spacing) / 2 + index * spacing;
      });

      dropZone.setFillStyle(dropZone.fillColor, 0.4);
    });

    this.input.on("dragend", (pointer, gameObject, dropped) => {
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    // --- Check answers button inside Phaser
    this.checkButton = this.add.text(500, 500, "Check Answers", {
      fontSize: "20px",
      color: "#000000",
      backgroundColor: "#ffd700",
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setInteractive();

    this.checkButton.on("pointerdown", () => {
      this.checkAnswers();
    });
  }

  // --- Method to check answers
  checkAnswers() {
    let correctCount = 0;
    let totalWords = 0;
    
    // Count all draggable text objects
    this.children.list.forEach(child => {
      if (child.data && child.data.get("correct")) {
        totalWords++;
        if (child.data.get("placedIn") === child.data.get("correct")) {
          correctCount++;
        }
      }
    });

    this.score = correctCount;
    if (this.scoreText) this.scoreText.setText(`${correctCount}/${totalWords} correct`);
    this.events.emit("updateScore", correctCount);

    // Emit game completion event with score (0-5 scale)
    const scoreOutOfFive = Math.round((correctCount / totalWords) * 5);
    this.events.emit("gameComplete", scoreOutOfFive);

    if (correctCount === totalWords) {
      const winText = this.add.text(500, 300, "🎉 All Correct!", {
        fontSize: "32px",
        color: "#00ff00",
        fontStyle: "bold",
      }).setOrigin(0.5);
      this.tweens.add({
        targets: winText,
        scale: 1.3,
        yoyo: true,
        repeat: -1,
        duration: 800,
      });
    }
  }

  // --- Optional restart/reset
  restartGame() {
    this.scene.restart();
  }
}