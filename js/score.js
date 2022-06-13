class Score {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width - 200;
    this.y = 40
    this.score = 0;
    

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillText(`Score: ${this.score.toString().padStart(6,'0')}`,this.x, this.y);
    this.ctx.closePath();
    
  }

  addScore(){
      this.score++
      console.log(this.score)
  }
}
