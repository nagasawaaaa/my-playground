"use strict";
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx; // canvas2d コンテキスト格納用

var main = function main () {
  // スクリーンの初期化
  screenCanvas = document.getElementById('screen');
  screenCanvas.width = 256;
  screenCanvas.height = 256;

  // 2dコンテキスト
  ctx = screenCanvas.getContext('2d');

  // イベントの登録
  screenCanvas.addEventListener('mousemove', mouseMove, true);
  window.addEventListener('keydown', keyDown, true);

  // その他のエレメント関連
  info = document.getElementById('info');

  // レンダリング処理を呼び出す
  var loop = function loop(){
    // HTMLを更新
    info.innerHTML = mouse.x + ' : ' + mouse.y;

    // screenクリア
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

    // パスの設定を開始
    ctx.beginPath();

    // 円の色を設定する
    ctx.fillStyle = 'rgba(0, 0, 255, 0.75)';

    // 円を描くパスを設定
    ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2, false);

    // 円を描く
    ctx.fill();

    // ループ処理
    if(run){
      setTimeout(loop, fps);
    }
  };
  loop();

}

// - event --------------------------------------------------------------------
function mouseMove (event) {
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown (event) {
  var ck = event.keyCode;
  if(ck === 27) {
    run = false;
  }
}

window.addEventListener('load', main, false);