function Food() {
	this.coordinate = [10, 10];
	this.view = null;
	this.init();
}

Food.prototype = {
	constructor: Food,
	init: function() {
		this.render();
	},
	setCoordinate: function(x, y) {
		this.coordinate = [x, y];
		this.paintView();
	},
	paintView: function() {
		this.view.style.top = this.coordinate[1] * 5 + "px";
		this.view.style.left = this.coordinate[0] * 5 + "px";
	},
	render: function() {
		var renderElement = document.createElement("div");
		renderElement.setAttribute("class", "food");
		renderElement.setAttribute("id", "snake_food");
		this.view = renderElement;
		this.paintView();
		
		document.getElementById("map").appendChild(renderElement);
	}
}