import Phaser from "phaser";

export default class CableConnectScene extends Phaser.Scene {
  constructor() {
    super("CableConnectScene");
    this.level = 1;
    this.totalLevels = 5;

    this.portData = [
      { name: "Red", hex: 0xa11d1d },
      { name: "Pink", hex: 0xffc7fc },
      { name: "Orange", hex: 0xc06605 },
      { name: "Blue", hex: 0x1378d0 },
      { name: "Purple", hex: 0xac4dff },
      { name: "BlueLight", hex: 0x058aaf },
    ];
  }

  preload() {
    this.portData.forEach(port => {
      this.load.image(`port${port.name}`, `/assets/port${port.name}.png`);
    });
    // preload monitor images
    this.load.image("monitorRed", "/assets/monitorRed.png");
    this.load.image("monitorGreen", "/assets/monitorGreen.png");
  }

  create() {
    this.setupLevel();
  }

  setupLevel() {
    this.children.removeAll(true);
    this.connections = [];
    this.selectedPort = null;
    this.correctConnections = 0;

    const shuffled = Phaser.Utils.Array.Shuffle([...this.portData]);
    const startX = 200;
    const spacing = 80;
    const topY = 150;
    const bottomY = 400;

    this.graphics = this.add.graphics();

    // --- Monitors
    this.monitors = [];
    const monitorStartX = 800;
    for (let i = 0; i < 3; i++) {
      const monitor = this.add.image(monitorStartX + i * 80, 300, "monitorRed").setScale(0.5);
      this.monitors.push(monitor);
    }

    this.add.text(50, 50, `Level ${this.level}`, {
      fontSize: "24px",
      fill: "#ffffff",
    });

    // Top ports
    this.topPorts = this.portData.map((port, i) => {
      const x = startX + i * spacing;
      const img = this.add.image(x, topY, `port${port.name}`).setDisplaySize(60, 60).setInteractive();
      img.portName = port.name;
      img.colorValue = port.hex;
      img.isTop = true;
      img.connected = false;
      return img;
    });

    // Bottom ports (shuffled)
    this.bottomPorts = shuffled.map((port, i) => {
      const x = startX + i * spacing;
      const img = this.add.image(x, bottomY, `port${port.name}`).setDisplaySize(60, 60).setInteractive();
      img.portName = port.name;
      img.colorValue = port.hex;
      img.isTop = false;
      img.connected = false;
      return img;
    });

    // Undo button
    const undoBtn = this.add.rectangle(100, 500, 120, 40, 0x333333).setStrokeStyle(2, 0xffffff).setInteractive();
    this.add.text(60, 490, "↩ Undo", { fontSize: "22px", fill: "#ffffff" });
    undoBtn.on("pointerdown", () => this.undoLastConnection());

    this.input.on("gameobjectdown", this.handleClick, this);
  }

  handleClick(pointer, port) {
    if (port.connected) return;

    if (!this.selectedPort) {
      this.selectedPort = port;
      this.tweens.add({ targets: port, scale: 1.2, duration: 150, yoyo: true });
      return;
    }

    if (this.selectedPort.isTop === port.isTop) {
      this.selectedPort = port;
      return;
    }

    const portA = this.selectedPort.isTop ? this.selectedPort : port;
    const portB = this.selectedPort.isTop ? port : this.selectedPort;

    const midX = (portA.x + portB.x) / 2;
    const midY = (portA.y + portB.y) / 2 + Phaser.Math.Between(-30, 30);

    const curveData = { ax: portA.x, ay: portA.y, bx: portB.x, by: portB.y, midX, midY };
    this.connections.push({ portA, portB, correct: portA.colorValue === portB.colorValue, curveData });

    portA.connected = true;
    portB.connected = true;
    if (portA.colorValue === portB.colorValue) this.correctConnections++;

    this.drawAllConnections();
    this.updateMonitors();

    if (this.correctConnections === this.portData.length) this.nextLevel();

    this.selectedPort = null;
  }

  drawAllConnections() {
    this.graphics.clear();
    this.connections.forEach(({ portA, portB, curveData }) => {
      const { ax, ay, bx, by, midX, midY } = curveData;
      this.graphics.lineStyle(4, portA.colorValue, 1);
      const curve = new Phaser.Curves.QuadraticBezier(new Phaser.Math.Vector2(ax, ay),
        new Phaser.Math.Vector2(midX, midY),
        new Phaser.Math.Vector2(bx, by)
      );
      curve.draw(this.graphics, 32);
    });
  }

  updateMonitors() {
    if (this.correctConnections >= 2) this.monitors[0].setTexture("monitorGreen");
    if (this.correctConnections >= 4) this.monitors[1].setTexture("monitorGreen");
    if (this.correctConnections >= 6) this.monitors[2].setTexture("monitorGreen");
  }

  undoLastConnection() {
    if (this.connections.length === 0) return;
    const last = this.connections.pop();
    last.portA.connected = false;
    last.portB.connected = false;
    if (last.correct) this.correctConnections--;
    this.drawAllConnections();
    this.updateMonitors();
  }

  nextLevel() {
    if (this.level < this.totalLevels) {
      this.level++;
      this.time.delayedCall(1000, () => this.setupLevel());
    } else {
      this.turnOnAllMonitors();
    }
  }

  turnOnAllMonitors() {
    this.monitors.forEach(m => m.setTexture("monitorGreen"));
    this.add.text(420, 520, "All cables connected! ✅", { fontSize: "24px", color: "#00ff00" });
  }
}