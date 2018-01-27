// ステージを作成
var stage = new createjs.Stage("myCanvas");
var info = document.getElementById('info');

// キーボードが押されているかの判定を行う
var isPressLeft = false;
var isPressRight = false;
var isPressUp = false;
var isPressDown = false;

var angle = 0; // 船の角度
var speed = 0; // 船の移動の速さ

// マウスオーバーを有効にする
stage.enableMouseOver();

// タッチ操作をサポートしているブラウザーならば
if(createjs.Touch.isSupported() == true){
    // タッチ操作を有効にします。
    createjs.Touch.enable(stage)
}

// オブジェクトの作成
var shape = new createjs.Shape();
shape.graphics
  .beginFill("DarkRed")
  .moveTo(-10,+5)
  .lineTo(-10,-5)
  .lineTo(5,0)
shape.x = stage.canvas.width / 2;
shape.y = stage.canvas.height / 2;
stage.addChild(shape);

// キーボードを押したタイミングを検知
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
  var keyCode = event.keyCode;
  // 条件文で船の位置を変更する
  if (keyCode == 39) { // 右
    angle += 5;
  } else if (keyCode == 37) { // 左
    angle -= 5;
  }

  if (keyCode == 40) { // 下
    speed -= 1;
  } else if (keyCode == 38) { // 上
    speed += 1;
  }
}

function handleKeyUp(event) {
  // var keyCode = event.keyCode;
  // // Up
  // if (keyCode === 38) {
  //   isPressUp = false;
  // }
  // // Right
  // if (keyCode === 39) {
  //   isPressRight = false;
  // }
  // // Down
  // if (keyCode === 40) {
  //   isPressDown = false;
  // }
  // // Left
  // if (keyCode === 37) {
  //   isPressLeft = false;
  // }
}


function handleTick(event){
  // 船の角度を設定する
  shape.rotation = angle;

  // 角度をラジアンに変換
  var radian = angle * Math.PI / 180;
  // スピード(スカラ)と方向からxとyの成分に分解
  var vx = speed * Math.cos(radian);
  var vy = speed * Math.sin(radian);
  // 船の位置を更新する
  shape.x += vx;
  shape.y += vy;

  //摩擦
  speed *= 0.9;

  // 画面端の処理
  if(shape.x < 0) shape.x = 0;
  if(shape.x > stage.canvas.width) shape.x = stage.canvas.width;
  if(shape.y < 0) shape.y = 0;
  if(shape.y > stage.canvas.height) shape.y = stage.canvas.height;

  stage.update();
}

createjs.Ticker.timingMode = createjs.Ticker.RAF;
createjs.Ticker.addEventListener("tick", handleTick);