class Player {
  constructor(ctx) {
    this.ctx = ctx;

    this.x = 50;
    this.y = 240;

    //Added this.maxY to limited the player position Y into the canvas
    this.maxY = this.y

    this.vy = 0;

    this.w = 100;
    this.h = 100;

    this.g = 0.5;

    this.tick = 0;

    this.lifes = [new Life(this.ctx, 60, 30 ), new Life(this.ctx, 105, 30 ), new Life(this.ctx, 150, 30 )]

    //Added an object to have the different sprites of the player
    this.objImages = {}

    //created a new image for sprite player-running 
    let imgRun = new Image();
    imgRun.frames = 6;
    imgRun.frameIndex = 0;
    imgRun.src = "img/RunWithGun_001-Blue.png";
    //Saved it into the images's object 
    this.objImages['run'] = imgRun
    //created a new image for sprite player-jumping
    let imgJumping = new Image();
    imgJumping.frames = 1;
    imgJumping.frameIndex = 0;
    imgJumping.src = "img/JumpingWithGun-Blue.png"
    //Saved it into the images's object 
    this.objImages['jump'] = imgJumping

    this.actionSelected = 'run'

    this.audioJump = new Audio("audio/jump.wav");
    this.audioJump.volume = 0.2;
    this.audioInjured = new Audio('/audio/female-fighter-grunts-03.m4a')
    this.audioInjured.volume = 0.1;
    
    this.bullets = [];

    this.life = new Life(ctx);
    this.score = new Score(ctx);
  }

  draw() {
    //actiomSelected by default: "running"
    this.ctx.drawImage(
      this.objImages[this.actionSelected],
      (this.objImages[this.actionSelected].frameIndex * this.objImages[this.actionSelected].width) / this.objImages[this.actionSelected].frames,
      0,
      this.objImages[this.actionSelected].width / this.objImages[this.actionSelected].frames,
      this.objImages[this.actionSelected].height,
      this.x,
      this.y,
      this.w,
      this.h
    );

    this.life.draw();
    this.score.draw();

    this.bullets.forEach((bullet) => {
      // console.log('pintando bala')
      bullet.draw();
     
    });
    this.lifes.forEach((life) => {
      life.draw()
    })
    
  }

  move() {
    this.vy += this.g;
    this.y += this.vy;

    // Checked if floor to stop falling
    if (this.y >= this.maxY){
      this.y = this.maxY
      this.vy = 0;
      this.actionSelected = 'run'
      
    }
    // Animate based on tick
    this.tick++;

    if (this.tick >= 6) {
      this.tick = 0;
      this.animate();
    }
    
    this.bullets.forEach((bullet) => {
      bullet.move();
    });
  
  }

  animate() {
    // Increment frameIndex only if not vy
    if (this.vy === 0) {
      this.objImages[this.actionSelected].frameIndex++;

      if (this.objImages[this.actionSelected].frameIndex >= this.objImages[this.actionSelected].frames) {
        this.objImages[this.actionSelected].frameIndex = 0;
      }
    }
  }

  hit() {
    // Decrement life
    this.lifes.pop();
    this.audioInjured.play().volume = 0.2;

  }

  isAlive() {
    // Return true if life is > 0
    return this.lifes.length > 0;
  }

  keyDown(key) {
    if (key === KEY_UP && this.vy === 0) {
      this.vy = -14;
      this.actionSelected = 'jump'
      this.audioJump.play()
    }
    if (key === KEY_SPACE) {
      this.shoot();
    }
  }

  keyUp(key) {
    if (key === KEY_UP && this.vy === 0) {
      this.actionSelected = 'run'
    }
  }

  shoot() {
    const bullet = new Bullet(
      this.ctx,
      this.x + this.w - 90,
      this.y + this.h - 55  
    );
    
    this.bullets.push(bullet); 
  }
}



///NOTE for myself for futures features: si quiero que camie de color cuando colisione o pierda vida
//setTimeout(() => {this.actionSelected = 'correrrojo'}, 2000)