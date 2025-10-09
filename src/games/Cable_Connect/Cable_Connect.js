import Phaser from "phaser";

export default class CableConnectScene extends Phaser.Scene {
  constructor() {
    super("CableConnectScene");
    this.level = 1;
    this.totalLevels = 5;
  }

  create() {
    this.colors = [0xff4d4d, 0xffa64d, 0x4da6ff, 0xb84dff, 0x4dff88];
    this.setupLevel();
  }

  setupLevel() {
    this.children.removeAll(true);
    this.connections = [];
    this.selectedPort = null;
    this.correctConnections = 0;

    const shuffled = Phaser.Utils.Array.Shuffle([...this.colors]);
    const startX = 200;
    const spacing = 120;
    const topY = 150;
    const bottomY = 400;

    this.graphics = this.add.graphics();

    // monitor
    this.monitor = this.add.rectangle(850, 300, 100, 60, 0x330000)
      .setStrokeStyle(3, 0xff0000);
    this.monitorStand = this.add.rectangle(850, 360, 40, 20, 0x330000)
      .setStrokeStyle(2, 0xff0000);

    this.add.text(50, 50, `Level ${this.level}`, {
      fontSize: "24px",
      fill: "#ffffff",
    });

    this.topPorts = this.colors.map((color, i) => {
      const x = startX + i * spacing;
      const port = this.add.rectangle(x, topY, 60, 40, color)
        .setStrokeStyle(2, 0xffffff)
        .setInteractive();
      port.colorValue = color;
      port.isTop = true;
      port.connected = false;
      return port;
    });

    this.bottomPorts = shuffled.map((color, i) => {
      const x = startX + i * spacing;
      const port = this.add.rectangle(x, bottomY, 60, 40, color)
        .setStrokeStyle(2, 0xffffff)
        .setInteractive();
      port.colorValue = color;
      port.isTop = false;
      port.connected = false;
      return port;
    });

    // --- Undo button
    const undoBtn = this.add.rectangle(100, 500, 120, 40, 0x333333)
      .setStrokeStyle(2, 0xffffff)
      .setInteractive();
    this.add.text(60, 490, "↩ Undo", {
      fontSize: "22px",
      fill: "#ffffff",
    });
    undoBtn.on("pointerdown", () => this.undoLastConnection());

    this.input.on("gameobjectdown", this.handleClick, this);
  }

  handleClick(pointer, port) {
    if (!port.isTop && !port.colorValue) return;
    if (port.connected) return;

    if (!this.selectedPort) {
      this.selectedPort = port;
      this.tweens.add({
        targets: port,
        scale: 1.2,
        duration: 150,
        yoyo: true,
      });
      return;
    }

    // Make sure ports are from opposite sides
    if (this.selectedPort.isTop === port.isTop) {
      this.selectedPort = port;
      return;
    }

    // --- Draw connection
    const portA = this.selectedPort.isTop ? this.selectedPort : port;
    const portB = this.selectedPort.isTop ? port : this.selectedPort;

    const midX = (portA.x + portB.x) / 2;
    const midY = (portA.y + portB.y) / 2 + Phaser.Math.Between(-30, 30);

    const curveData = { ax: portA.x, ay: portA.y, bx: portB.x, by: portB.y, midX, midY };
    this.connections.push({
      portA,
      portB,
      correct: portA.colorValue === portB.colorValue,
      curveData,
    });

    this.drawAllConnections();

    portA.connected = true;
    portB.connected = true;
    if (portA.colorValue === portB.colorValue) this.correctConnections++;

    if (this.correctConnections === 5) {
      this.nextLevel();
    }

    this.selectedPort = null;
  }

  drawAllConnections() {
    this.graphics.clear();
    this.connections.forEach(({ portA, portB, curveData }) => {
      const { ax, ay, bx, by, midX, midY } = curveData;
      this.graphics.lineStyle(4, portA.colorValue, 1);
      const curve = new Phaser.Curves.QuadraticBezier(
        new Phaser.Math.Vector2(ax, ay),
        new Phaser.Math.Vector2(midX, midY),
        new Phaser.Math.Vector2(bx, by)
      );
      curve.draw(this.graphics, 32);
    });
  }

  undoLastConnection() {
    if (this.connections.length === 0) return;

    const last = this.connections.pop();
    last.portA.connected = false;
    last.portB.connected = false;

    if (last.correct) this.correctConnections--;
    this.drawAllConnections();
  }

  nextLevel() {
    if (this.level < this.totalLevels) {
      this.level++;
      this.time.delayedCall(1000, () => this.setupLevel());
    } else {
      this.turnOnMonitor();
    }
  }

  turnOnMonitor() {
    this.monitor.setFillStyle(0x004d00);
    this.monitor.setStrokeStyle(3, 0x00ff00);
    this.monitorStand.setFillStyle(0x004d00);
    this.monitorStand.setStrokeStyle(2, 0x00ff00);

    this.add.text(420, 520, "All cables connected! ✅", {
      fontSize: "24px",
      color: "#00ff00",
    });
  }
}
