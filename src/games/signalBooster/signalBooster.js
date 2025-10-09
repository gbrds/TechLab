import Phaser from "phaser";

// ======= SIGNAL STRENGTHS + COLORS =======
const SIGNAL_STRENGTHS = { strong: 4, medium: 3, weak: 2 };
const SIGNAL_COLORS = { 3: 0x00ff00, 2: 0xffff00, 1: 0xff4444 };

// ======= IOT TYPES =======
const IOT_TYPES = { phone: { required: 1 }, pc: { required: 3 } };

export default class SignalBooster extends Phaser.Scene {
  constructor() { super("SignalBooster"); }

  preload() {
    this.load.image("router", "/assets/RouterVector.png");
    this.load.image("block", "/assets/BlockVector.png");
    this.load.image("pc", "/assets/PcVector.png");
    this.load.image("phone", "/assets/SmartphoneVector.png");

    // ======= LEVELS =======
    this.load.json("levels", "/levels.json")
  }

  create() {
    // ======= LOAD LEVELS =======
    const levels = this.cache.json.get("levels")
    this.currentLevel = 1

    // ======= GRID SETUP =======
    const gridSize = 8;
    const tileSize = 65;
    const gap = 4;
    const step = tileSize + gap;

    const offsetX = (this.scale.width - (gridSize * step - gap)) / 2;
    const offsetY = (this.scale.height - (gridSize * step - gap)) / 2;

    this.gridOffsetX = offsetX;
    this.gridOffsetY = offsetY;
    this.tileSize = tileSize;
    this.step = step;
    this.gridSize = gridSize;
    this.grid = [];

    this.totalScore = 0
    this.maxScore = levels.length
    this.levelText = this.add.text(20, 50, "Level 1", { fontSize: "20px", color: "#fff" })
    this.totalScoreText = this.add.text(20, 80, "Total 0/5", { fontSize: "20px", color: "#fff" })

    for (let y = 0; y < gridSize; y++) {
      this.grid[y] = [];
      for (let x = 0; x < gridSize; x++) {
        const posX = offsetX + x * step;
        const posY = offsetY + y * step;

        const tile = this.add.rectangle(posX, posY, tileSize, tileSize, 0x222222)
          .setOrigin(0)
          .setStrokeStyle(2, 0x333333)
          .setInteractive();

        tile.gridX = x;
        tile.gridY = y;
        tile.on("pointerover", () => tile.setFillStyle(0x444444));
        tile.on("pointerout", () => tile.setFillStyle(0x222222));

        this.grid[y][x] = tile;
      }
    }

    // ======= SCORE TEXT =======
    this.scoreText = this.add.text(20, 20, "Score: 0/0", { fontSize: "20px", color: "#fff" });

    // ======= LEVEL CONTROL =======
    this.level = 0;
    this.loadLevel(levels[this.level]);
  }

  // ===================== LOAD LEVEL =====================
  loadLevel(level) {
    // destroy previous objects
    [this.routers, this.blocks, this.iots, this.signalDots].forEach(arr => arr?.forEach(obj => obj.destroy()));
    this.routers = [];
    this.blocks = [];
    this.iots = [];
    this.signalDots = [];

    // add blocks

level.blocks.forEach(b => {
  const x = this.gridOffsetX + b.x * this.step + this.tileSize / 2;
  const y = this.gridOffsetY + b.y * this.step + this.tileSize / 2;

  // background rectan
 
  const block = this.add.image(x, y, "block")
    .setDisplaySize(40, 40)
    .setDepth(0.5);

  block.gridX = b.x;
  block.gridY = b.y;

  // group for signal blocking logic
  this.blocks.push(block);
});


    // add iots
    level.iots.forEach(i => {
      const x = this.gridOffsetX + i.x * this.step + this.tileSize / 2;
      const y = this.gridOffsetY + i.y * this.step + this.tileSize / 2;
      const spriteKey = i.type === "pc" ? "pc" : "phone";
      const iot = this.add.image(x, y, spriteKey).setDisplaySize(40, 40).setDepth(0.5);
      iot.gridX = i.x; iot.gridY = i.y; iot.type = i.type;
      this.iots.push(iot);
    });

    // ======= SPAWN ROUTERS IN POOL =======
    const poolX = this.gridOffsetX + this.gridSize * this.step + 80; // right side of grid
    const poolStartY = this.gridOffsetY +120;
    const poolSpacing = 70;

    for (let i = 0; i < level.routerCount; i++) {
      const x = poolX;
      const y = poolStartY + i * poolSpacing;
      this.createRouterPool(x, y);
    }

    // initial signal calculation
    this.calculateSignal();
  }

  // ===================== CREATE ROUTER ON GRID =====================
  createRouter(x, y) {
    const posX = this.gridOffsetX + x * this.step + this.tileSize / 2;
    const posY = this.gridOffsetY + y * this.step + this.tileSize / 2;

    const router = this.add.image(posX, posY, "router")
      .setDisplaySize(30, 30)
      .setInteractive({ draggable: true });

    router.gridX = x; router.gridY = y;
    router._initial = { x: posX, y: posY, gx: x, gy: y };
    this.routers.push(router);
    this.input.setDraggable(router);

    router.on("dragstart", () => this.input.setDefaultCursor("grabbing"));
    router.on("dragend", () => this.input.setDefaultCursor("grab"));

    router.on("drag", (pointer, dragX, dragY) => {
      router.x = dragX; router.y = dragY;
      this.grid.forEach(row => row.forEach(tile => tile.setFillStyle(0x222222)));
      const tileX = Math.floor((pointer.x - this.gridOffsetX) / this.step);
      const tileY = Math.floor((pointer.y - this.gridOffsetY) / this.step);
      if (tileX >= 0 && tileX < this.gridSize && tileY >= 0 && tileY < this.gridSize)
        this.grid[tileY][tileX].setFillStyle(0x555555);
    });

    router.on("dragend", () => {
      this.grid.forEach(row => row.forEach(tile => tile.setFillStyle(0x222222)));
      let tileX = Math.round((router.x - this.gridOffsetX - this.tileSize / 2) / this.step);
      let tileY = Math.round((router.y - this.gridOffsetY - this.tileSize / 2) / this.step);
      tileX = Phaser.Math.Clamp(tileX, 0, this.gridSize - 1);
      tileY = Phaser.Math.Clamp(tileY, 0, this.gridSize - 1);

      const occupied = this.routers.some(rr => rr !== router && rr.gridX === tileX && rr.gridY === tileY);
      if (occupied) {
        router.x = router._initial.x; router.y = router._initial.y;
        router.gridX = router._initial.gx; router.gridY = router._initial.gy;
      } else {
        router.x = this.grid[tileY][tileX].x + this.tileSize / 2;
        router.y = this.grid[tileY][tileX].y + this.tileSize / 2;
        router.gridX = tileX; router.gridY = tileY;
        router._initial = { x: router.x, y: router.y, gx: tileX, gy: tileY };
      }

      this.calculateSignal();
    });
  }

  // ===================== CREATE ROUTER IN POOL =====================
  createRouterPool(x, y) {
    const router = this.add.image(x, y, "router")
      .setDisplaySize(35, 35)
      .setInteractive({ draggable: true });

    router.gridX = null;
    router.gridY = null;
    router._initial = { x, y, gx: null, gy: null };
    this.routers.push(router);
    this.input.setDraggable(router);

    router.on("dragstart", () => this.input.setDefaultCursor("grabbing"));
    router.on("dragend", () => this.input.setDefaultCursor("grab"));

    router.on("drag", (pointer, dragX, dragY) => {
      router.x = dragX; router.y = dragY;
      this.grid.forEach(row => row.forEach(tile => tile.setFillStyle(0x222222)));
      const tileX = Math.floor((pointer.x - this.gridOffsetX) / this.step);
      const tileY = Math.floor((pointer.y - this.gridOffsetY) / this.step);
      if (tileX >= 0 && tileX < this.gridSize && tileY >= 0 && tileY < this.gridSize)
        this.grid[tileY][tileX].setFillStyle(0x555555);
    });

    router.on("dragend", () => {
      this.grid.forEach(row => row.forEach(tile => tile.setFillStyle(0x222222)));
      let tileX = Math.round((router.x - this.gridOffsetX - this.tileSize / 2) / this.step);
      let tileY = Math.round((router.y - this.gridOffsetY - this.tileSize / 2) / this.step);
      tileX = Phaser.Math.Clamp(tileX, 0, this.gridSize - 1);
      tileY = Phaser.Math.Clamp(tileY, 0, this.gridSize - 1);

      const occupied = this.routers.some(rr => rr !== router && rr.gridX === tileX && rr.gridY === tileY);
      if (occupied) {
        // return to pool
        router.x = router._initial.x;
        router.y = router._initial.y;
        router.gridX = null;
        router.gridY = null;
      } else {
        // snap to grid
        router.x = this.grid[tileY][tileX].x + this.tileSize / 2;
        router.y = this.grid[tileY][tileX].y + this.tileSize / 2;
        router.gridX = tileX;
        router.gridY = tileY;
        router._initial = { x: router.x, y: router.y, gx: tileX, gy: tileY };
      }

      this.calculateSignal();
    });
  }

  // ===================== BLOCK CHECK =====================
  _isBlockAt(x, y) {
    return this.blocks.some(b => b.gridX === x && b.gridY === y);
  }

  // ===================== BRESENHAM LINE =====================
  bresenhamLine(x0, y0, x1, y1) {
    const points = [];
    let dx = Math.abs(x1-x0), dy = Math.abs(y1-y0);
    const sx = x0<x1 ? 1:-1, sy=y0<y1 ?1:-1;
    let err = dx - dy;
    let x=x0, y=y0;

    while(true){
      points.push({x,y});
      if(x===x1 && y===y1) break;
      const e2 = 2*err;
      if(e2>-dy){ err-=dy; x+=sx; }
      if(e2<dx){ err+=dx; y+=sy; }
    }
    return points;
  }

  isBlockedBetween(sx, sy, tx, ty) {
    const line = this.bresenhamLine(sx, sy, tx, ty);
    for(let i=1; i<line.length; i++){
      if(this._isBlockAt(line[i].x, line[i].y)) return true;
    }
    return false;
  }

  // ===================== SIGNAL CALCULATION =====================
  calculateSignal() {
    const gridSignal = Array.from({ length: this.gridSize }, () => Array(this.gridSize).fill(0));

    for(const router of this.routers){
      const base = SIGNAL_STRENGTHS.strong;
      const sx = router.gridX, sy = router.gridY;

      if (sx === null || sy === null) continue; // skip pool routers

      for(let dy=-base; dy<=base; dy++){
        for(let dx=-base; dx<=base; dx++){
          const tx = sx+dx, ty = sy+dy;
          if(tx<0||tx>=this.gridSize||ty<0||ty>=this.gridSize) continue;

          const manhattan = Math.abs(dx)+Math.abs(dy);
          if(manhattan>base) continue;

          let diagonalPenalty = 0;
          if(Math.abs(dx)===Math.abs(dy) && Math.abs(dx)>1) diagonalPenalty=1;

          if(this.isBlockedBetween(sx,sy,tx,ty)) continue;
          if(this._isBlockAt(tx,ty)) continue;

          const strength = base - manhattan - diagonalPenalty;
          if(strength<=0) continue;

          gridSignal[ty][tx] = Math.max(gridSignal[ty][tx], strength);
        }
      }
    }

    this.gridSignal = gridSignal;
    this.renderSignal();
    this.checkConnections();
  }

  // ===================== RENDER SIGNAL DOTS =====================
  renderSignal() {
    this.signalDots?.forEach(d=>d.destroy());
    this.signalDots=[];
    for(let y=0; y<this.gridSize; y++){
      for(let x=0; x<this.gridSize; x++){
        const s = this.gridSignal[y][x];
        if(!s) continue;
        const color = SIGNAL_COLORS[s];
        const posX = this.gridOffsetX + x*this.step + this.tileSize/2;
        const posY = this.gridOffsetY + y*this.step + this.tileSize/2;
        this.signalDots.push(this.add.circle(posX,posY,6,color).setDepth(0.2));
      }
    }
  }

  // ===================== CHECK IOT CONNECTIONS + SCORE =====================
  checkConnections() {
    let connected = 0;
    for(const iot of this.iots){
      const req = IOT_TYPES[iot.type].required;
      const sig = this.gridSignal[iot.gridY]?.[iot.gridX] ?? 0;
      if(sig>=req){
        iot.setTint(0x00ff00);
        connected++;
      }else{
        iot.setTint(0xff0000);
      }
    }
    this.scoreText.setText(`Score: ${connected}/${this.iots.length}`);
    this.scoreText.setVisible(false);
this.totalScoreText.setVisible(false);

    // auto-next level if all connected
    if(connected===this.iots.length){
        // Award 1 point per fully cleared level
        if (!this.levelCleared) {
            this.totalScore++
            this.totalScoreText.setText(`Total: ${this.totalScore}/${this.maxScore}`)
            this.levelCleared = true
        }

        this.time.delayedCall(500, () => this.nextLevel());
    }
  }

  // ===================== NEXT LEVEL =====================
  nextLevel() {
    const levels = this.cache.json.get("levels")
    this.level++;
    this.levelCleared = false

    if(this.level>=levels.length){
        this.add.text(this.scale.width / 2, this.scale.height / 2, "You Win!", { fontSize: "32px", color: "#fff" }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, `Final Score: ${this.totalScore}/${this.maxScore}`, { fontSize: "24px", color: "#fff" }).setOrigin(0.5);
    } else {
        this.levelText.setText(`Level: ${this.level + 1}`)
        this.loadLevel(levels[this.level]);
    }
  }

  update() {}
}