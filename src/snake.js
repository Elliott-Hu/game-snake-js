function Snake() {
  this.name = "snake";
  this.len = 10;
  this.invincible = 10;
  this.direction = 1; //0"up" 1"right" 2"down" 3"left"
  this.track = [];

}

Snake.prototype = {
  constructor: Snake,
  born: function () {
    var GPSsystem = document.getElementById(this.name),
      len = this.len,
      str = "";

    for (var i = 0; i < len; i++) {
      this.track.push([0, 0]);
      str += "<li></li>";
    };

    GPSsystem.innerHTML = str;
  },
  isDead: function () {
    var len = this.track.length;
    var head = this.track[0];
    // 咬到了自己
    for (var i = 1; i < len; i++) {
      if (head[0] == this.track[i][0] &&
        head[1] == this.track[i][1] &&
        i > 1) { // 避免蛇被噎死
        return true;
      }
    }
    return false;
  },
  render: function () {
    var GPSsystem = document.getElementById(this.name);
    var snakeChunks = GPSsystem.getElementsByTagName("li");

    var track = this.track;

    for (var i = 0, len = track.length; i < len; i++) {
      snakeChunks[i].style.left = track[i][0] * 5 + "px";
      snakeChunks[i].style.top = track[i][1] * 5 + "px";
    }

    return this;
  },
  turn: function (code) {
    var lastDirection = this.direction;
    code = parseInt(code, 10);
    switch (code) {
      case 37:
      case 65: // 左
        this.direction = lastDirection == 1 ? lastDirection : 3;
        break;
      case 38:
      case 87: // 上
        this.direction = lastDirection == 2 ? lastDirection : 0;
        break;
      case 39:
      case 68: // 右
        this.direction = lastDirection == 3 ? lastDirection : 1;
        break;
      case 40:
      case 83: // 下
        this.direction = lastDirection == 0 ? lastDirection : 2;
        break;
      default:
        break;
    }
    return this;
  },
  move: function () {
    if (this.invincible > 0) --this.invincible;

    var headPositionTop = this.track[0][0];
    var headPositionRight = this.track[0][1];
    var newPosition = [];
    newPosition.push(headPositionTop);
    newPosition.push(headPositionRight);

    switch (this.direction) {
      case 0:
        newPosition[1]--;
        break;
      case 1:
        newPosition[0]++;
        break;
      case 2:
        newPosition[1]++;
        break;
      case 3:
        newPosition[0]--;
        break;
      default:
        break;
    }

    this.track.unshift(newPosition);
    this.track.pop();

    var mapSource = this.track.join("] [")
    document.getElementById("console").innerHTML = "[" + mapSource + "]";

    return this;
  },
  growUp: function () {
    var GPSsystem = document.getElementById(this.name);
    this.track.unshift(this.track[0]);
    this.len = this.track.length;

    var newChunk = GPSsystem.getElementsByTagName("li")[0].cloneNode(true);
    GPSsystem.appendChild(newChunk);
  },
}