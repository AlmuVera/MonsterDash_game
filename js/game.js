class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.interval = null;

    this.background = new Background(ctx);
    this.player = new Player(ctx);
    this.enemies = [];
    this.pumpkins = [];
    
    
    this.tick = 0;
    this.tock = 0;

    this.audio = new Audio("audio/theme_MD.mp3");
    this.audio.volume = 0.2
    this.gameOverAudio = new Audio("audio/slimer_death_2.wav");

    this.setListeners();
  }

  start() {
    // TODO: play audio
    this.audio.play();

    // TODO: init game loop: clear, draw, move, check collisions and randomly add enemy based on ticks
    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions()
      //radomly add enemyies:
      this.tick++;
      this.tock++;
     
      if (this.tick++ > Math.random() * 12000 + 50) {
        this.tick = 0;
        this.addEnemy();
      }
      if (this.tock++ > Math.random() * 1500 + 200) {
        this.tock = 0;
        this.addPumpkin();
      }
      if(this.player.isAlive()){
        this.player.score.addScore()
      }
    }, 1000 / 60);
    
  }

  stop() {
    // TODO: pause audio, stop interval, set interval to null
    this.audio.pause();

    clearInterval(this.interval);
    this.interval = null;
  }

  clear() {
    // TODO: clear entire canvas

    // TODO: clear not visible enemies (tip: filter)
    this.enemies = this.enemies.filter((e) => e.isVisible() && e.alive);
    this.pumpkins = this.pumpkins.filter((p) => p.isVisible() && p.alive);
    this.player.bullets = this.player.bullets.filter((b) => !b.impact)
  }

  draw() {
    // TODO: draw everything
    this.background.draw();
    //this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw()
    });
    this.pumpkins.forEach((pumpkin) => {
      pumpkin.draw()

    });
    this.player.draw();
    this.player.score.draw();
    
  }

  move() {
    // TODO: move everything
    this.background.move();
    this.player.move();
    this.enemies.forEach((enemy) => {
      enemy.move()
    });
    this.pumpkins.forEach((pumpkin) => {
      pumpkin.move()
    });
  }

  addEnemy() {
    // TODO: create new enemy and add it to this.enemies
    const enemy = new Enemy(ctx)
    enemy.audio.play()
    this.enemies.push(enemy)
  }

  addPumpkin() {
    // TODO: create new pumpkin and add it to this.pumpkins
    const pumpkins = new Pumpkin(ctx)
    pumpkins.audio.play()
    this.pumpkins.push(pumpkins)
  }

  checkCollisions() {
    let hit = false
    // if enemy collide with player
    this.enemies.forEach((e) => {
      if (!hit && e.collision(this.player)) {
        // console.log('Colision enemy with player')
        this.player.hit();
        hit = true
        e.alive = false
        // console.log('zombie borrado')
      }
     // if bullet collide with enemy 
      this.player.bullets.forEach(b => {
        if (e.collision(b)) {
          // console.log('collision enemy with 1 bullet')
          e.alive = false;
          b.impact = true;
        }
      })
    });

    this.pumpkins.forEach((pumpkin) => {
      if (!hit && pumpkin.collision(this.player)) {
        // console.log('Colision enemy with player')
        this.player.hit();
        hit = true
        pumpkin.alive = false
        // console.log('pumpkin borrado')
      }
     // if bullet collide with pumpkin 
      this.player.bullets.forEach(b => {
        if (pumpkin.collision(b)) {
          pumpkin.alive = false;
          b.impact = true;
        }   
      })
      
    });
   
    // TODO: check if game over
    if (!this.player.isAlive()) {
      this.gameOver();
    }
  }

  gameOver() {
    // TODO: play game over audio
    this.gameOverAudio.play();
    // TODO: stop game
    this.stop();

    // TODO: write "game over"
    this.ctx.font = "60px Roboto";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width * 0.3,
      this.ctx.canvas.height / 2
    );
    // TODO: restart player and enemies
    
    this.enemies = [];

  }

  setListeners() {
    // TODO: proxy "keydown" key to player keyDown method
    // TODO: proxy "keyup" key to player keyUp method
    document.addEventListener("keydown", (event) => {
      this.player.keyDown(event.keyCode);
    });

    document.addEventListener("keyup", (event) => {
      this.player.keyUp(event.keyCode);
    });

  }
}
