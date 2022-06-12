class Bullet {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;

      this.w = 50;
      this.h = 25;


      // this.r = 5;
      //this.g = 0.1;
  
      this.vx = 15;
      this.vy = 0;
  
      this.audio = new Audio("audio/shoot.wav").play();
      this.audio.volume = 0.00;

      

      // new Audio("audio/shoot.wav").play().volume = 0.1;

      this.img = new Image();
      this.img.src = "img/Bullet-2.png";
      
      this.impact = false
      
    }
  
    draw() {
        this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
    }
   
  
    move() {
      this.x += this.vx;
    }
  
    isVisible() {
      // return this.x + this.r < this.ctx.canvas.width;
      return this.x + this.w && this.y + this.h > 0;
    }
}