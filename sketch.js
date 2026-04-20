let capture;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設的影片標籤，我們只需要在畫布上顯示
  capture.hide();
}

function draw() {
  background(220); // 淺灰色背景
  
  // 計算影像寬高為畫布的 60%
  let videoW = width * 0.6;
  let videoH = height * 0.6;
  
  // 處理左右顛倒（鏡像）並顯示在畫布中間
  push();
  translate(width, 0); // 將座標原點移至右側
  scale(-1, 1);        // 水平翻轉畫布
  image(capture, (width - videoW) / 2, (height - videoH) / 2, videoW, videoH);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
