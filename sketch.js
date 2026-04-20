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
  
  // 將影像顯示在畫布中間
  image(capture, (width - videoW) / 2, (height - videoH) / 2, videoW, videoH);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
