var statusMap = {
  "GAME_WILL_START": 0,
  "IS_GAMIMG": 1,
  "GAME_COMPLETE": 2,
  "GAME_FAIL": 3,
}



function Game() {
  this.map = new Map();
  this.snake = new Snake();
  this.food = new Food();
  this.timer = null;

  this.speed = 50;
  this._status = statusMap["GAME_WILL_START"];
  this.init();
}

Game.prototype = {
  constructor: Game,
  init: function() {
    this.snake.born();
    this.timer = setInterval(function() {
      this.snake.move().render();

      this.successToEat().checkIsFail();
    }.bind(this), this.speed)

    // 记录游戏状态
    this._setProperty("status", statusMap["IS_GAME"], this._status, function(value) {
      if (value == statusMap["GAME_FAIL"]) clearInterval(this.timer);
    }.bind(this))
  },
  _setProperty(name, value, private, callback) {
    Object.defineProperty(this, name, {
      enumerable: true,
      get: function() { return private },
      set: function(val) {
        callback && callback(val);
        private = val;
      }
    });
  },
  checkIsFail: function() {
    var snakeHead =this.snake.track[0];
    var area = this.map.area;

    if (this.snake.isDead()) {
      this.status = statusMap["GAME_FAIL"];
    }

    if (snakeHead[0] >= area[0] 
      || snakeHead[0] < 0 
      || snakeHead[1] >= area[1] 
      || snakeHead[1] < 0) {
      this.status = statusMap["GAME_FAIL"];
    }
     
    return this;
  },
  successToEat: function() {
    let food = this.food.coordinate;
    let snakeHead = this.snake.track[0];
    if (snakeHead[0] === food[0]
      && snakeHead[1] === food[1]) {
        this.snake.growUp();
        this.resetFoodCoordinate(this.randomNum(0, this.map.area[0]), this.randomNum(0, this.map.area[1]));
    }
    return this;
  },
  resetFoodCoordinate: function(x, y) {
    this.food.setCoordinate(x, y);
  },
  randomNum: function (min, max) {
    var result = parseInt(Math.random() * 100);
    if (result >= min && result < max) {
        return result;
    }

    return this.randomNum(min, max);
}
}