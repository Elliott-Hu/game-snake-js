var game = new Game();
var snake = game.snake;


document.addEventListener("keydown", function (event) {
    var code = event.keyCode;
    snake.turn(code);

}, false)