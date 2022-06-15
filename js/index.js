const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

document.querySelector('#btn').addEventListener("click", function (e) {
    if (game.interval) {
        game.stop();
        this.innerText = "START";
    } else {
        game.start();
        this.innerText = "PAUSE";  
    }
});

document.querySelector('#btn-restart').addEventListener("click", function (e) {
    window.location.reload()
});

