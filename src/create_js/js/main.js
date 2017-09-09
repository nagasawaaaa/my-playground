var stage = new createjs.Stage("myCanvas");

var container = new createjs.Container();
stage.addChild(container);

var circleRed = new createjs.Shape();
circleRed.graphics.beginFill("DarkRed").drawCircle(40, 40, 40);

// 緑の円を作成
var circleGreen = new createjs.Shape();
circleGreen.graphics.beginFill("green").drawCircle(120, 40, 40);

// ２つの円をコンテナーに追加
container.addChild(circleRed);
container.addChild(circleGreen);

circleRed.addEventListener("click", removeCircleClick);
circleGreen.addEventListener("click", removeCircleClick);

function removeCircleClick (event) {
  console.log(event.target);
  event.target.parent.removeChild(event.target);
}

createjs.Ticker.addEventListener("tick", stage);

console.log('https://ics.media/tutorial-createjs/ticker.html');