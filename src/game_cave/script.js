(function(){
  "use strict";

  var y = 250, v = 0, keyDown = false, WALLS = 80, score = 0;
  var walls = [], slope = 0, timer, ship, main;

  function init() {
    main = document.getElementById('main'); // ゲーム領域
    ship = document.getElementById('ship'); // player

    // 洞窟の通り道を作成
    for (var i = 0 ; i < WALLS ; i++) {
      walls[i] = document.createElement("div");
      walls[i].style.position = "absolute";
      walls[i].style.top = "100px";
      walls[i].style.left = i * 10 + "px";
      walls[i].style.width = "10px";
      walls[i].style.height = "400px";
      walls[i].style.backgroundColor = "#333";
      main.appendChild(walls[i]);
    }

    slope = Math.floor(Math.random() * 5) + 1;  // 勾配の度合いを計算
    timer = setInterval(mainloop, 50); // 50ミリ秒毎に mainloop() を発火

    // 何かしらキーが押されているかどうかのイベントを取得
    window.addEventListener('keydown', function () { keyDown = true; });
    window.addEventListener('keyup', function () { keyDown = false; });
  }

  // 衝突判定
  function hitTest(){
    var st = parseInt(ship.style.top) + 10; // ship top
    var sh = parseInt(ship.style.height); // ship height
    var sb = st + sh - 20; // ship bottom

    var wt = parseInt(walls[14].style.top);  // wall top
    var wh = parseInt(walls[14].style.height);  // wall height
    var wb = wh + wt;  // wall bottom

    // shipの上端が洞窟の上端より小さい or shipの下端が洞窟の下端より大きい場合に true を返す
    return (st < wt) || (sb > wb );
  }

  function mainloop() {
    // 自機が壁にぶつかったら
    if (hitTest()) {
      // timerを止めて
      clearInterval(timer);
      // 爆発画像を表示して
      document.getElementById('bang').style.top = (y - 40) + "px";
      document.getElementById('bang').style.visibility = "visible";
      // 終了
      return;
    }

    score += 10;  // 50ms毎に 10pづつ加算
    document.getElementById('score').innerHTML = score.toString();  // Score欄に記入

    // velocity(速度) yard(距離？)
    v += keyDown ? -3 : 3;  // 速度を更新 キーが押されると自機が上昇するので 負の値を加算する
    y += v;  // 速度を距離に反映
    ship.style.top = y + 'px';  // 自機の位置

    var edge = walls[WALLS - 1].style;  // 右端の洞窟のスタイル
    var t = parseInt(edge.top);;  // 右端の洞窟の上端
    var h = parseInt(edge.height);  // 右端の洞窟の高さ
    var b = h + t;  // 右端の洞窟の下端
    t += slope; // 勾配を洞窟の上端に追加
    b += slope; // 勾配を洞窟の下端に追加

    // 勾配が上端か下端に到達したかを判定
    if ((t < 0) && (slope < 0) || (b > 600) && (slope > 0)) {
      slope = (Math.floor(Math.random() * 5) + 1) * (slope < 0 ? 1 : -1);
      edge.top = (t + 10) + "px";
      edge.height = (h - 20) + "px";
    } else {
      edge.top = t + "px";
    }

    // 横スクロールを実装
    for (var i = 0 ; i < WALLS - 1 ; i++) {
      walls[i].style.top = walls[i + 1].style.top;
      walls[i].style.height = walls[i + 1].style.height;
    }
  }

  window.addEventListener('DOMContentLoaded', init, true);
}());