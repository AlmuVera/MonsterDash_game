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
    this.gameTime = 0;

    this.audio = new Audio("audio/theme_MD.mp3");
    this.audio.volume = 0.2;
    this.gameOverAudio = new Audio("audio/slimer_death_2.wav");
    this.gameOverAudio.volume = 0.3;
    this.menuGameAudio = new Audio("audio/Menu theme- Monster Dash Zombie Metropolis.mp3");
    this.menuGameAudio.volume = 0.1;
    


    this.setListeners();

    this.record = window.localStorage.getItem("Score")
      ? JSON.parse(window.localStorage.getItem("Score"))
      : [];
   
  }

  start() {
    // TODO: play audio
    this.audio.play();
    this.menuGameAudio.pause();

    // TODO: init game loop: clear, draw, move, check collisions and randomly add enemy based on ticks
    this.interval = setInterval(() => {
      this.clear();
      this.draw();
      this.move();
      this.checkCollisions();
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
      if (this.player.isAlive()) {
        this.player.score.addScore();
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

    // TODO: clear not visible enemies (tip: filter)
    this.enemies = this.enemies.filter((e) => e.isVisible() && e.alive);
    this.pumpkins = this.pumpkins.filter((p) => p.isVisible() && p.alive);
    this.player.bullets = this.player.bullets.filter((b) => !b.impact);
  }

  draw() {
    // TODO: draw everything
    this.background.draw();
    //this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.player.draw();
    this.pumpkins.forEach((pumpkin) => {
      pumpkin.draw();
    });

    this.player.score.draw();
  }

  move() {
    // TODO: move everything
    this.background.move();
    this.player.move();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    this.pumpkins.forEach((pumpkin) => {
      pumpkin.move();
    });
  }

  addEnemy() {
    // TODO: create new enemy and add it to this.enemies
    const enemy = new Enemy(ctx);
    enemy.audio.play();
    this.enemies.push(enemy);
  }

  addPumpkin() {
    // TODO: create new pumpkin and add it to this.pumpkins
    const pumpkins = new Pumpkin(ctx);
    pumpkins.audio.play();
    this.pumpkins.push(pumpkins);
  }

  checkCollisions() {
    let hit = false;
    
    // if enemy collide with player
    this.enemies.forEach((e) => {
      if (!hit && e.collision(this.player)) {
        // console.log('Colision enemy with player')
        this.player.hit();
        hit = true;
        e.alive = false;
        // console.log('zombie borrado')
      }
      // if bullet collide with enemy
      this.player.bullets.forEach((b) => {
        if (e.collision(b)) {
          // console.log('collision enemy with 1 bullet')
          e.alive = false;
          b.impact = true;
          this.gameTime++;
          console.log('gametime test')
          if(this.gameTime > 5){
            this.addEnemy()
            // this.addEnemy()
          }
        }
      });
    });

    this.pumpkins.forEach((pumpkin) => {
      if (!hit && pumpkin.collision(this.player)) {
        // console.log('Colision enemy with player')
        this.player.hit();
        hit = true;
        pumpkin.alive = false;
        // console.log('pumpkin borrado')
      }
  
    });

    // TODO: check if game over
    if (!this.player.isAlive()) {
      this.gameOver();
    }
  }

  gameOver() {
    this.record.push({ score: this.player.score.score });
    window.localStorage.setItem("Score", JSON.stringify(this.record));
    // TODO: play game over audio
    this.gameOverAudio.play();
    this.menuGameAudio.play();
    // TODO: stop game
    this.stop();

    // TODO: write "game over"
    //background Game over
    this.ctx.fillStyle = "#66064b";
    this.ctx.fillRect(0, 0, 800, 350);

    // Black shadow - "score" in GameOver cover
    this.ctx.font = "70px Arco"; 
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`SCORE: ${this.player.score.score}`, 190 + 3, 230 + 2);
    // Text - "score" in GameOver cover  
    this.ctx.fillStyle = "#0099ee";
    this.ctx.fillText(`SCORE: ${this.player.score.score}`, 190, 230);
    
    // Black shadow - "best score" in GameOver cover  
    this.ctx.font = "50px Arco";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`BEST SCORE: ${this.checkHighestScore()}`, 160 + 3, 300 + 2);
    // Text - "score" in GameOver cover 
    this.ctx.fillStyle = "#FFFF01";
    this.ctx.fillText(`BEST SCORE: ${this.checkHighestScore()}`, 160, 300);
    this.ctx.font = "50px Arco";
    // console.log(`BEST SCORE: ${this.checkHighestScore()}`);

    this.ctx.fillStyle = "black";
    this.ctx.fillText("GAME OVER", 245 + 3, 150 + 2);

    this.ctx.fillStyle = "#e4b9c2";
    this.ctx.fillText("GAME OVER", 245, 150);
    // this.ctx.font = "80px Arco";

    // TODO: restart player and enemies
    this.enemies = [];
    // this.game = new Game (ctx)
    this.player = new Player(ctx);
    
    const restart = document.getElementById('btn-restart')
    restart.style.display = 'block'
    

  

    
  }

  checkHighestScore() {
    //find the highest value into the array of records
    let score = this.record.map((object) => {
      return object.score;
    });
    console.log(score);
    let highestScore = Math.max(...score);
    console.log(highestScore);
    return highestScore;
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
