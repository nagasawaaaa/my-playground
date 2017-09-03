var Point = function Point () {
  this.x = 0;
  this.y = 0;
};

Point.prototype = {
  distance: function (p) {
    var q = new Point();
    q.x = p.x - this.x;
    q.y = p.y - this.y;
    return q;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  normalize: function(){
    var i = this.length();
    if(i > 0){
      var j = 1 / i;
      this.x *= j;
      this.y *= j;
    }
  }
}