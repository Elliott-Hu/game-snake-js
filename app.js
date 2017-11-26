var game = new Game();
var snake = game.snake;


document.addEventListener("keydown", function (event) {
    var code = event.keyCode;
    console.log(code);
    if (code == 74) return game.start();

    snake.turn(code);


}, false)