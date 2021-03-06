class Pumpkin {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = Math.random() * this.ctx.canvas.width + 220;
    this.y = 0;

    //Added this.maxY to limited the pumpkin position Y into the canvas
    this.maxY = this.y + 290;

    this.w = 40;
    this.h = 40;

    this.vy = 0;
    this.vx = -5;

    // if increase this.g = 10; falling faster (for future levels)
    this.g = 5;

    this.tick = 0;

    this.img = new Image();
    this.img.src = "img/pumpkin.png";

    this.audio = new Audio("./audio/fall.wav");
    this.audio.volume = 0.1;

    this.alive = true;
  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.vx;
    this.y += this.g;

    if (this.y >= this.maxY){
        this.y = this.maxY
        this.vy = 0;
        this.x += this.vx; 
    }
  }

  isVisible() {
    // Return if pumpkin is inside the canvas based on x and y
    return this.x + this.w && this.y + this.h > 0;
  }

  collision(p) {
    const colX = this.x <= p.x + p.w - 60 && this.x + this.w - 30 > p.x;
    const colY = this.y + this.h > p.y && this.y < p.y + p.h - 35;
    return colX && colY;
   
  }

}
