function Snake(){
  this.name = "snake";
  this.len = 10;
  this.direction = 1;    //0"up" 1"right" 2"down" 3"left"
  this.track = [];
  this.speed = 100; 

  this.target = [10,10];

  this.timer = "";
  this.init();

}
Snake.prototype = {
  constructor:Snake,
  init:function(){
      this
          .born()
          .timer = setInterval(function(){
              this
                  .move()
                  .dead()
                  .eat(this.target)
                  .render();
          }.bind(this),this.speed);
  },
  born:function(){
      var GPSsystem = document.getElementById(this.name),
          len = this.len,
          str = "";

      for( var i = 0; i < len; i++ ){
          this.track.push([0,0]);
          str += "<li></li>";
      };

      GPSsystem.innerHTML = str;



      // food
      var food = document.createElement("food");
      food.setAttribute("class","food");
      food.setAttribute("id","food");
      food.style.top = this.target[1] * 5 + "px";
      food.style.left = this.target[1] * 5 + "px";
      document.getElementById("map").appendChild(food);

      return this;
  },
  dead:function(){
      var len = this.track.length;
      var head = this.track[0];
      // 自杀
      for(var i = 1; i < len; i ++ ){
          if( head[0] == this.track[i][0] && head[1] == this.track[i][1] ){
              clearInterval(this.timer);
          }
      }

      // 撞墙死
      if(head[0] >= 100 || head[0] < 0 || head[1] >= 100 || head[1] < 0){
          clearInterval(this.timer);
      }
      return this;
  },
  render:function(){
      var GPSsystem = document.getElementById(this.name);
      var snakeChunks = GPSsystem.getElementsByTagName("li");

      var track = this.track;

      for( var i=0, len = track.length; i<len; i++ ){
          snakeChunks[i].style.left = track[i][0]*5 + "px";
          snakeChunks[i].style.top = track[i][1]*5 + "px";
      }

      return this;
  },
  turn:function(code){
      var lastDirection = this.direction;
      code = parseInt(code,10);
      switch (code){
        case 37:
            this.direction = lastDirection == 1 ? lastDirection : 3;
            break;
        case 38:
            this.direction = lastDirection == 2 ? lastDirection : 0;
            break;
        case 39:
            this.direction = lastDirection == 3 ? lastDirection : 1;
            break;
        case 40:
            this.direction = lastDirection == 0 ? lastDirection : 2;
            break;
        default:
            break;
      }
      return this;
  },
  move:function(){
      var headPositionTop = this.track[0][0];
      var headPositionRight = this.track[0][1];
      var newPosition = [];
      newPosition.push(headPositionTop);
      newPosition.push(headPositionRight);

      switch(this.direction){
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
      document.getElementById("console").innerHTML ="[" +mapSource + "]";

      return this;
  },
  growUp:function(){
      var GPSsystem = document.getElementById(this.name);
      this.len++;
      this.track.push(this.track[0]);

      var newChunk = GPSsystem.getElementsByTagName("li")[0].cloneNode(true);
      GPSsystem.appendChild(newChunk);
  },
  eat:function(target){
      var head = this.track[0];
      if(target[0] == head[0] && target[1] == head[1]){
          this.growUp();

          this.target[0] = this.randomNum(0,100);
          this.target[1] = this.randomNum(0,100);
          food.style.top = this.target[1] * 5 + "px";
          food.style.left = this.target[0] * 5 + "px";
      }


      return this;
  },
  randomNum:function(min,max){
      var result = parseInt(Math.random() * 100);
      if( result >= min && result < max){
          return result;
      }

      return this.randomNum(min,max);
  }
}










var snake = new Snake();
document.addEventListener("keydown",function(event){
    var code = event.keyCode;
    snake.turn(code);

},false)