"use strict";
// - global -------------------------------------------------------------------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx; // canvas2d コンテキスト格納用
var fire = false;
var counter = 0;

// - const --------------------------------------------------------------------
var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;

var ENEMY_COLOR = 'rgba(255, 0, 0, 0.75)';
var ENEMY_MAX_COUNT = 10;

// - main --------------------------------------------------------------------
var main = function main () {
  // 汎用変数
  var i, j;
  var p = new Point();

  // スクリーンの初期化
  screenCanvas = document.getElementById('screen');
  screenCanvas.width = 256;
  screenCanvas.height = 256;

  // 2dコンテキスト
  ctx = screenCanvas.getContext('2d');

  // イベントの登録
  screenCanvas.addEventListener('mousemove', mouseMove, true);
  screenCanvas.addEventListener('mousedown', mouseDown, true);
  window.addEventListener('keydown', keyDown, true);

  // その他のエレメント関連
  info = document.getElementById('info');

  // 自機初期化
  var chara = new Character();
  chara.init(10);

  // ショットの初期化
  var charaShot = new Array(CHARA_SHOT_MAX_COUNT);;
  for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    charaShot[i] = new CharacterShot();
  }

  // 敵機初期化
  var enemy = new Array(ENEMY_MAX_COUNT);
  for (var i = 0; i < ENEMY_MAX_COUNT; i++) {
    enemy[i] = new Enemy();
  }

  // レンダリング処理を呼び出す
  var loop = function loop(){
    // カウンタをインクリメント
    counter++;

    // HTMLを更新
    info.innerHTML = mouse.x + ' : ' + mouse.y;

    // screenクリア
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

    // パスの設定を開始
    ctx.beginPath();

    // 自機の位置を設定
    chara.position.x = mouse.x;
    chara.position.y = mouse.y;

    // 自機を描くパスを設定
    ctx.arc(chara.position.x, chara.position.y, chara.size, 0, Math.PI * 2, false);

    // 自機の色を設定する
    ctx.fillStyle = CHARA_COLOR;

    // 円を描く
    ctx.fill();

    // ショットの生成
    // fireフラグの値により分岐
    if(fire) {
      // すべての自機ショットを調査する
      for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
        // 自機ショットが既に発射されているかチェック
        if(!charaShot[i].alive){
           // 自機ショットを新規にセット
          charaShot[i].set(chara.position, 3, 5);

          // ループを抜ける
          break;
        }
      }
      fire = false;
    }

    // パスの設定を開始
    ctx.beginPath();

    // すべての自機ショットを調査する
    for (var i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
      // 自機ショットが既に発射されているかチェック
      if (charaShot[i].alive) {
        // 自機ショットを動かす
        charaShot[i].move();

         // 自機ショットを描くパスを設定
        ctx.arc(
          charaShot[i].position.x,
          charaShot[i].position.y,
          charaShot[i].size,
          0, Math.PI * 2, false
        );

        // パスをいったん閉じる
        ctx.closePath();
      }
    }

    // 自機ショットの色を設定する
    ctx.fillStyle = CHARA_SHOT_COLOR;

    // 自機ショットを描く
    ctx.fill()

    // エネミーの出現管理 -------------------------------------------------
    // 100 フレームに一度出現させる
    if(counter % 100 === 0){
      // すべてのエネミーを調査する
      for (var i = 0; i < ENEMY_MAX_COUNT; i++) {
        // エネミーの生存フラグをチェック
        if(!enemy[i].alive) {
          // タイプを決定するパラメータを算出
          j = (counter % 200) / 100;

          // タイプに応じて初期位置を決める
          var enemySize = 15;
          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j;
          p.y = screenCanvas.height / 2;

          // エネミーを新規にセット
          enemy[i].set(p, enemySize, j);

          // 1体出現させたのでループを抜ける
          break;
        }
      }
    }

    // 敵機描画
    // パスの設定を開始
    ctx.beginPath();

    // すべての自機ショットを調査する
    for (var i = 0; i < ENEMY_MAX_COUNT; i++) {
      // 自機ショットが既に発射されているかチェック
      if (enemy[i].alive) {
        // 自機ショットを動かす
        enemy[i].move();

         // 自機ショットを描くパスを設定
        ctx.arc(
          enemy[i].position.x,
          enemy[i].position.y,
          enemy[i].size,
          0, Math.PI * 2, false
        );

        // パスをいったん閉じる
        ctx.closePath();
      }
    }

    // 自機ショットの色を設定する
    ctx.fillStyle = ENEMY_COLOR;

    // 自機ショットを描く
    ctx.fill()

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

function mouseDown (event) {
  // フラグを立てる
  fire = true;
}

window.addEventListener('load', main, false);