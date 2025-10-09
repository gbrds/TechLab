import Phaser from "phaser";

export default class Ui_GameScene extends Phaser.Scene {
  constructor() {
    super("Ui_GameScene");
    this.score = 0;
  }

  create() {
    // --- Canvas dimensions
    const screenWidth = 1190;
    const screenHeight = 600;
    this.cameras.main.setBackgroundColor(0x0f0f1a);

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

    // --- Drop Zones Setup
    const zoneWidth = 210;
    const zoneHeight = 330;
    const radius = 24;
    const totalZones = 5;
    const spacing = 230;
    const totalWidth = (totalZones - 1) * spacing + zoneWidth;
    const startX = (screenWidth - totalWidth) / 2 + zoneWidth / 2 - 30;
    const yPos = 350;

    this.dropZones = [
      { label: "Empatiseerimine", subtitle: "Vajaduste ja probleemide mõistmine", color: 0x8b5cf6 },
      { label: "Defineerimine", subtitle: "Probleemi sõnastamine", color: 0x10b981 },
      { label: "Ideestamine", subtitle: "Ideede genereerimine", color: 0xfacc15 },
      { label: "Prototüüpimine", subtitle: "Ideede realiseerimine", color: 0xef4444 },
      { label: "Testimine", subtitle: "Lahenduste valideerimine", color: 0xf97316 },
    ];

    this.zoneStacks = {};

    this.dropZones.forEach((zone, i) => {
      const x = startX + i * spacing;
      zone.x = x;
      zone.y = yPos;

      const rect = this.add.graphics();
      rect.lineStyle(2, zone.color, 1);
      rect.fillStyle(Phaser.Display.Color.GetColor(20, 22, 33), 0.35);
      rect.strokeRoundedRect(x - zoneWidth / 2, yPos - zoneHeight / 2, zoneWidth, zoneHeight, radius);

      const drop = this.add.zone(x, yPos, zoneWidth, zoneHeight).setRectangleDropZone(zoneWidth, zoneHeight);
      drop.setData("color", zone.color);
      drop.label = zone.label;
      zone.area = drop;

      this.add.text(x, yPos - zoneHeight / 2 + 25, zone.label, {
        fontSize: "18px",
        color: Phaser.Display.Color.IntegerToColor(zone.color).rgba,
        fontStyle: "bold",
      }).setOrigin(0.5);

      this.add.text(x, yPos - zoneHeight / 2 + 45, zone.subtitle, {
        fontSize: "13px",
        color: "#a0aec0",
        align: "center",
        wordWrap: { width: zoneWidth - 10 },
      }).setOrigin(0.5);

      this.zoneStacks[zone.label] = [];
    });

    // --- Score text
    this.scoreText = this.add.text(screenWidth / 2 - 80, yPos + zoneHeight / 2 + 40, `0/${this.wordsData.length} õigesti`, {
      fontSize: "22px",
      color: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // --- Draggable cards
    Phaser.Utils.Array.Shuffle(this.wordsData);
    const cardsPerRow = 5;
    const cardSpacingX = 180;
    const cardSpacingY = 60;
    const totalCardWidth = cardsPerRow * cardSpacingX;
    const startCardX = (screenWidth - totalCardWidth) / 2 + cardSpacingX / 2;
    const startCardY = 20; // moved higher to avoid drop zones

    this.wordsData.forEach((word, index) => {
      const x = startCardX + (index % cardsPerRow) * cardSpacingX;
      const y = startCardY + Math.floor(index / cardsPerRow) * cardSpacingY;

      const card = this.add.text(x, y, word.text, {
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#1e90ff",
        padding: { x: 10, y: 6 },
        fontFamily: "Arial",
      })
        .setOrigin(0.5)
        .setInteractive({ draggable: true });

      card.data = new Phaser.Data.DataManager(card);
      card.data.set("correct", word.correct);
      card.data.set("placedIn", null);
      card.originalX = x;
      card.originalY = y;
    });

    // --- Drag logic
    this.input.on("drag", (pointer, obj, dragX, dragY) => {
      obj.x = dragX;
      obj.y = dragY;
    });

    this.input.on("dragend", (pointer, obj, dropped) => {
      if (!dropped) {
        obj.x = obj.originalX;
        obj.y = obj.originalY;
      }
    });

    // --- Drop behavior
    this.input.on("drop", (pointer, obj, zone) => {
      const label = zone.label;
      const prevZone = obj.data.get("placedIn");

      if (prevZone && this.zoneStacks[prevZone]) {
        this.zoneStacks[prevZone] = this.zoneStacks[prevZone].filter(c => c !== obj);
      }

      const stack = this.zoneStacks[label];
      stack.push(obj);

      const zoneHeight = zone.input.hitArea.height;
      const paddingTop = 90;
      const paddingBottom = 20;
      const availableHeight = zoneHeight - paddingTop - paddingBottom;
      const spacingY = Math.min(35, availableHeight / Math.max(stack.length, 1));

      stack.forEach((card, i) => {
        card.x = zone.x;
        card.y = zone.y - zoneHeight / 2 + paddingTop + i * spacingY;
      });

      obj.data.set("placedIn", label);
    });

    // --- Check answers button aligned with score text
    this.checkButton = this.add.text(screenWidth / 2 + 120, yPos + zoneHeight / 2 + 40, "Check Answers", {
      fontSize: "20px",
      color: "#000000",
      backgroundColor: "#ffd700",
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setInteractive();

    this.checkButton.on("pointerdown", () => {
      this.checkAnswers();
    });
  }

  // --- Method to check answers (points fix applied)
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
