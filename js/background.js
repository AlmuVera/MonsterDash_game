class Background {
  constructor(ctx) {
    // TODO: init background x, y, vx, vy, img
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;

    // this.w = this.ctx.canvas.width;
    // this.h = this.ctx.canvas.height;
    this.w = 2000
    this.h = 350;

    this.vx = -2;

    this.img = new Image();
    this.img.src = "img/bg_Moster_Dash_Red2.png"; 

  }

  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.ctx.drawImage(this.img, this.x + this.w, this.y, this.w, this.h);
  }
    
  move() {
    this.x += this.vx;

    if (this.x <= -this.w) {
      this.x = 0;
    }
  }
}

// function draw() {  
//   const canvas = document.getElementById('canvas')  
//   canvas.setAttribute('width', '500')  
//   canvas.setAttribute('height', '500')  
//   if(canvas.getContext){  
//     const ctx = canvas.getContext('2d')  
//     ctx.drawImage('/img/bg_Moster_Dash_Red2.png', 10, 50);  
//   }  
// }  
// draw()