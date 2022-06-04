class Player {
  constructor(ctx) {
    // TODO: init player attributes: position, size, v, a, img, audio, score, tick
    this.ctx = ctx;

    this.x = 50;
    this.y = 240;

    //creo this.maxY para limitar la posicion del player en canvas
    this.maxY = this.y

    this.vy = 0;

    this.w = 100;
    this.h = 100;

    this.g = 0.5;

    this.tick = 0;

    //creo un objeto donde guardo los sprites
    this.objImages = {}

    //creo una imagen para sprite 1
    let imgRun = new Image();
    imgRun.frames = 6;
    imgRun.frameIndex = 0;
    imgRun.src = "img/RunWithGun_001-Blue.png";
    //guardo la imagen en objeto de sprites 
    this.objImages['run'] = imgRun
    //creo una imagen para sprite 1
    let imgJumping = new Image();
    imgJumping.frames = 1;
    imgJumping.frameIndex = 0;
    imgJumping.src = "img/JumpingWithGun-Blue.png"
    //guardo la imagen en objeto de sprites 
    this.objImages['jump'] = imgJumping

    this.actionSelected = 'run'

    this.audioJump = new Audio("audio/jump.wav");
    
    this.bullets = [];

    this.life = new Life(ctx);
    
  }

  draw() {
    // TODO: draw player image
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

    this.bullets.forEach((bullet) => {
      console.log('pintando bala')
      bullet.draw();
    });
    // TODO: draw score
  }

  move() {
    // TODO: move player. v + a, position + v
    this.vy += this.g;
    this.y += this.vy;

    // TODO: check if floor to stop falling
    if (this.y >= this.maxY){
      this.y = this.maxY
      this.vy = 0;
      this.actionSelected = 'run'
      
    }
    // TODO: animate based on tick
    this.tick++;
    //======>no me cambia la velocidad de cambio de frame (patitas player)
    if (this.tick >= 20) {
      this.tick = 0;
      this.animate();
    }
    
    this.bullets.forEach((bullet) => {
      bullet.move();
    });

   
    // TODO: move score
    this.animate()

    
  }

  animate() {
    // TODO: increment frameIndex only if not vy
    if (this.vy === 0) {
      this.objImages[this.actionSelected].frameIndex++;

      if (this.objImages[this.actionSelected].frameIndex >= this.objImages[this.actionSelected].frames) {
        this.objImages[this.actionSelected].frameIndex = 0;
      }
    }
  }

  hit() {
    // TODO: decrement score
    this.life.dec();
  }

  isAlive() {
    // TODO: return true if life is > 0
    return this.life.total > 0;
  }

  keyDown(key) {
    if (key === KEY_UP && this.vy === 0) {
      // TODO: jump and play jump sound
      this.vy = -12;
      this.actionSelected = 'jump'
      this.audioJump.play().volume = 0.2;
    }
    if (key === KEY_SPACE) {
       this.shoot();
    
    }
  }

  keyUp(key) {
    if (key === KEY_UP && this.vy === 0) {
      // TODO: jump and play jump sound
      this.actionSelected = 'run'
    }
  }

  shoot() {
    console.log('shooting')
    const bullet = new Bullet(
      this.ctx,
      this.x + this.w - 90,
      this.y + this.h - 55
    );

    this.bullets.push(bullet);
  }
}



///si quiero que camie de color cuando colisione o pierda vida
//setTimeout(() => {this.actionSelected = 'correrrojo'}, 2000)