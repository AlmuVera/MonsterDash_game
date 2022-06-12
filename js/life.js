class Life {
  constructor(ctx, x, y) {
    // TODO: init position, size
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.w = 35;
    this.h = 35;

    this.img = new Image();
    this.img.src = "/img/HeartColoredBlue@4x.png";
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}
