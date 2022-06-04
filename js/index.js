const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

// TODO: start/stop game on button click
// TODO: change button text based on game interval
document.querySelector('#btn').addEventListener("click", function (e) {
    if (game.interval) {
        game.stop();
        this.innerText = "START";
    } else {
        game.start();
        this.innerText = "PAUSE";
        
    }
});

