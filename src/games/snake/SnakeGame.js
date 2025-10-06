import Phaser from "phaser";

/* Delete from final */

export default class SnakeGame extends Phaser.Scene {
  constructor() {
    super("SnakeGame");
  }

  preload() {
    this.load.image("ball", "/ball.png"); // put ball.png in public/
  }

  create() {
    this.add.text(200, 200, "Hello Phaser!", { font: "32px Arial", fill: "#fff" });
    this.add.image(300, 300, "ball");
  }
}