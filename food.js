// function Food(track){
// 		this.track = track;
// 		this.type = "normal";

// 		this.init();
// }

// Food.prototype = {
// 		constructor:Food,
// 		init:function(){
// 				this.render();
// 		},
// 		render:function(){
// 				var food = document.createElement("div");
// 				food.setAttribute("class","food");
// 				food.style.top = this.track[1] * 5 + "px";
// 				food.style.left = this.track[0] * 5 + "px";

// 				document.getElementById("map").appendChild(food);
// 				return this;
// 		}
// }


// var food = new Food([10,20]);

// food = new Food([20,20]);