class Life {
  constructor(ctx) {
    // TODO: init position, size
    this.ctx = ctx;

    this.x = 20;
    this.y = 20;
    this.w = 200;
    this.h = 20;

    this.total = 3;
    //this.lifes = 3
  }

  draw() {
    // TODO: draw red rectangle
    // TODO: stroke black rectangle
    const prevStyle = this.ctx.fillStyle;

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.w * this.total, this.h);
    this.ctx.fillStyle = prevStyle;
    this.ctx.strokeRect(this.x, this.y, this.w, this.h);
    
  }

  move() {}

  dec() {
    // TODO: substract 0.5 to this.total
    this.total -= 1;
  }
}
