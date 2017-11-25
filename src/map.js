function Map() {
  this.area = [45, 80];

  this.init();
}
Map.prototype = {
  constructor: Map,
  init: function() {
    this.render()
  },
  render: function() {
    var map = document.getElementById("map");
    map.style.width = this.area[0] * 5 + "px";
    map.style.height = this.area[1] * 5 + "px";
  }
}