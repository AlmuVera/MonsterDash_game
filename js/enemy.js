class Enemy {
  constructor(ctx) {
    this.ctx = ctx;
    
    this.x = this.ctx.canvas.width;
    this.y = 240;

    //creo this.maxY para limitar la posicion del enemy en canvas
    this.maxY = this.y

    this.w = 90;
    this.h = 90;

    this.vy = 0;
    this.vx = -5

    this.g = 0.5;

    this.tick = 0;

    this.img = new Image();
    this.img.frames = 8;
    this.img.frameIndex = 0;
    this.img.src = "img/ZombieWalking.png";

    this.audio = new Audio("./audio/slimer_appear_1.wav");
    this.audio.volume = 0.3

    this.alive = true

  
  }

  draw() {
    // TODO: draw 
    this.ctx.drawImage(
      this.img, //img
      (this.img.frameIndex * this.img.width) / this.img.frames, //sy
      0, //sx
      this.img.width / this.img.frames, //sw
      this.img.height, //sh
      this.x, // dx
      this.y, // dy
      this.w, // dw
      this.h // dh
    );
    // console.log("zombieeeeee")
  }

  move() {
    // TODO: move, add a to v and v to position
    this.x += this.vx;
    //this.y += this.vy;

    //animate based on tick
    this.tick++;

    if (this.tick >= 10) {
      this.tick = 0;
      this.animate();
    }
  }

  animate() {
    if (this.vy === 0) {
      this.img.frameIndex++;

      if (this.img.frameIndex >= this.img.frames) {
        this.img.frameIndex = 0;
      }
    }
  }

  isVisible() {
    // TODO: return if pumpkin is inside the canvas based on x and y
    return this.x + this.w && this.y + this.h > 0;

  }

  collision(p) {
    const colX = this.x <= p.x + p.w -60 && this.x + this.w -30 > p.x;
    const colY = this.y + this.h > p.y  && this.y < p.y + p.h -35;
    return colX && colY;
   
    
  }
}
