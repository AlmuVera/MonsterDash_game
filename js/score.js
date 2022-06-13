class Score {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = ctx.canvas.width - 210;
    this.y = 60
    this.score = 0;
  }

  draw() {
    
    this.ctx.fillText(`${this.score.toString().padStart(6,'0')}`,this.x, this.y);
    this.ctx.font = "40px Arco"
    this.ctx.fillStyle = "#0099ee";

    this.ctx.fillText(`${this.score.toString().padStart(6,'0')}`,this.x + 3, this.y +2);
    this.ctx.font = "40px Arco"
    this.ctx.fillStyle = "black";
  
  }

  addScore(){
      this.score++
      console.log(this.score)
  }
}
